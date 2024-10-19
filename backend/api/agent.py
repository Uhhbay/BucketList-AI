import fastapi

router = fastapi.APIRouter()

@router.get("/")
def root():
    return "Hello from Agent API"

# TODO: Get itinerary from LLM agent with post bucket list data
@router.post("/itinerary")
async def get_itinerary():
    pass
