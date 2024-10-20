from openai import OpenAI
from fastapi import APIRouter
import httpx
import asyncio

import os
from dotenv import load_dotenv

router = APIRouter()

load_dotenv(override=True)
API_KEY = os.getenv("OPENAI_API_KEY", "NOKEY")
assert API_KEY != "NOKEY", "OpenAI API key error"

HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}
MODEL = "gpt-4o-mini"
SYS_MSG = """
You are Travel Guide, an AI travel expert that provides engaging and adventurous travel information.
""".strip()
USER_MSG = """
From the list given, give 0 to 5 most famous tourist activities at <LOC>. Do not include activities that do not pertain to <LOC> If there are no good results, mention similar activities:
""".strip()

class OpenAI:
    @staticmethod
    async def get_itinerary_data(location: str, bucket_list: list[str]):
        async with httpx.AsyncClient() as client:
            msg = USER_MSG.replace("<LOC>", location.strip()) + "\n" + ",\n".join(bucket_list)

            res = await client.post(
                "https://api.openai.com/v1/chat/completions",
                headers=HEADERS,
                json={
                    "model": MODEL,
                    "messages": [
                        {
                            "role": "system",
                            "content": SYS_MSG
                        },
                        {
                            "role": "user",
                            "content": msg
                        }
                    ]
                }
            )
            if res.status_code != 200:
                res.raise_for_status()

            return res.json()


async def temp():
    a = await OpenAI.get_itinerary_data("seoul", ["cocacola", "taj mahal"])
    print(a["choices"][0]["message"]["content"])

def parseGPT(content: str) -> dict[str]:
    content_split = content.split("**")
    titles = []
    content = []

    for val in content_split[1::2]:
        titles.append(val.strip())

    for val in content_split[2::2]:
        content.append(val.strip("0123456789.: \n"))

    if len(content) > len(titles):
        content = content[:-1]
    if len(content) > 0:
        content[-1] = content[-1][:content[-1].find("\n\n")]
    
    end = dict(zip(titles, content))
    return end

@router.post("/get_itinerary")
async def get_itinerary(location: str, bucket_list: list[str]):
    print(location, bucket_list)
    itinerary_data = await OpenAI.get_itinerary_data(location, bucket_list)
    data_content = None

    if "choices" in itinerary_data:
        data_content = itinerary_data["choices"][0]["message"]["content"]
        data_content = parseGPT(data_content)
    
    return data_content

if __name__ == "__main__":
    asyncio.run(temp())