from fastapi import APIRouter
from uagents import Model
from uagents.query import query
 
import httpx

import logging

class ItineraryMsg(Model):
    location: str
    bucket_list: list[str]

ITINERARY_AGENT_USER_ADDRESS = "agent1qftaxx7zkpvnv0ep4vuy2qra30vt3eh8zdaxp478st3qjh5av7a6q6788lp"

logging.basicConfig(level=logging.DEBUG)

router = APIRouter()

@router.post("/get_itinerary")
async def get_itinerary(location: str, bucket_list: list[str]):
    try:
        res = await query(
            destination=ITINERARY_AGENT_USER_ADDRESS, 
            message=ItineraryMsg(location=location, bucket_list=bucket_list),
            timeout=10.0
        )
    except Exception as e:
        return f"Unsuccessful agent call {str(e)}"

    return res

        