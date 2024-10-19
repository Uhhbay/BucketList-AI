from .utils.agents_util import CLIENT_ID, TOKEN_URL, SCOPE

import logging
import requests, re
import httpx
import fastapi

logging.basicConfig(level=logging.DEBUG)
log = logging.getLogger("__name__")

router = fastapi.APIRouter()

refreshed_token = "<YOUR_REFRESH_TOKEN>"
token = f"Bearer <YOUR_ACCESS_TOKEN>"

def refresh_tokens(refresh_token):
    response = requests.post(
        TOKEN_URL,
        json={
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'client_id': CLIENT_ID,
            'scope': SCOPE,
        }
    )
    if response.status_code == 200:
        print('New token generated.')
        response_data = response.json()
        return response_data['access_token'], response_data.get('refresh_token', refresh_token)
    else:
        print("Error refreshing tokens:", response.text)
        return None, None

def update_token():
    global token, refreshed_token
    new_tokens = refresh_tokens(refreshed_token)

    fauna_token = new_tokens[0]
    refreshed_token = new_tokens[1]
    token = f'Bearer {fauna_token}'

def normalize_question(question):
    question_lower = question.strip().lower()
    question_normalized = re.sub(r'[^\w\s]', '', question_lower) # remove punctuations

    return question_normalized

def is_uuid(key):
    # Function to check if a string is a valid UUID
    # UUID Format: (8-4-4-4-12)
    pattern = re.compile(r"^[0-9a-f]{8}-[0-9a-f]{4}-[1-4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$", re.IGNORECASE)
    return pattern.match(key)

async def send_post_req(url: str, data: dict, headers: dict):
    async with httpx.AsyncClient as client:
        res = await client.post(url,
            data=data,
            headers=headers
        )
        if res.status.code != 200:
            log.info("Attempting to update refresh token...")
            update_token()
            res = await client.post(url,
                data=data,
                headers=headers
            )
            if res.status.code != 200:
                log.error(f"post status code: {res.status.code}")

        return res
    
async def send_get_req(url: str, headers: dict):
    async with httpx.AsyncClient as client:
        res = await client.post(url,
            headers=headers
        )

        if res.status.code != 200:
            log.info("Attempting to update refresh token...")
            update_token()
            res = await client.post(url,
                headers=headers
            )
            if res.status.code != 200:
                log.error(f"get status code: {res.status.code}")

        return res

async def send_user_choice_as_uuid(session_id, user_choice, token):
    data = {
        "payload": {
            "type": "user_json",
            "user_json": {
                "type": "options",
                "selection": [user_choice]
            },
            "session_id": session_id
        }
    }

    return await send_post_req(
        "https://agentverse.ai/v1beta1/engine/chat/sessions/{session_id}/submit",
        data=data,
        headers={ "Authorization": token }
    )

async def send_user_message(session_id, user_message, token):
    data = {
        "payload": {
            "type": "user_message",
            "user_message": user_message
        },
        "session_id": session_id
    }
    return await send_post_req(
        f"https://agentverse.ai/v1beta1/engine/chat/sessions/{session_id}/submit", 
        data=data, 
        headers={"Authorization": token}
    )
    
async def stop_session(session_id, token):
    data = {"payload": {"type": "stop"}}
    response = await send_post_req(
        f"https://agentverse.ai/v1beta1/engine/chat/sessions/{session_id}/submit", 
        data=data, 
        headers={"Authorization": token}
    )
    log.info("Session stopped: ", response.json())

@router.get("/")
def root():
    return "Hello from Agent API"

# TODO: Get itinerary from LLM agent with post bucket list data
@router.post("/itinerary")
async def get_itinerary():
    pass
    # global token
    # response = requests.post(url, json=json_data, headers=headers)
    # if response.status_code != 200:
    #     update_token()
    #     headers["Authorization"] = token
    #     response = requests.post(url, json=json_data, headers=headers)
    # return response
