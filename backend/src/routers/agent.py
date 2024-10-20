from fastapi import APIRouter, Request
from uagents import Model
from uagents.query import query
 
import httpx

import logging

ITINERARY_AGENT_USER_ADDRESS = "agent1qdfqmk0y0hvzng9u7x6dvsq9862r9ced3sgrc6jca92r7a5ayfr75ednxey"

class ItineraryMsg(Model):
    location: str
    bucket_list: str

logging.basicConfig(level=logging.DEBUG)

router = APIRouter()

@router.post("/get_itinerary")
async def get_itinerary(req: Request):
    try:
        model = ItineraryMsg.parse_obj(await req.json())
        res = await query(
            destination=ITINERARY_AGENT_USER_ADDRESS, 
            message=model,
            timeout=10.0
        )
        # print(res.decode_payload())


    except Exception as e:
        return f"Unsuccessful agent call {str(e)}"

    return res
