from uagents.setup import fund_agent_if_low
from uagents import Agent, Context, Model
 
from openai_handler import OpenAI

class ItineraryMsg(Model):
    location: str
    bucket_list: str

class Response(Model):
    response: str

# TODO: move env
ITINERARY_AGENT_ADDRESS = "agent1qwvxvmrxrz5jp0eccam4fmktrggkvk8s5jeuvdq83z2mwacur88yguncgq3"

# agent1qdfqmk0y0hvzng9u7x6dvsq9862r9ced3sgrc6jca92r7a5ayfr75ednxey

# TODO: move env
i_agent_user = Agent(
    name="i_agent_user",
    port=8001,
    seed="dev itinerary agent user seed123!ddkjgndakjn",
    endpoint='http://127.0.0.1:8001/submit',
)

fund_agent_if_low(i_agent_user.wallet.address())
 
@i_agent_user.on_event("startup")
async def startup_intro(ctx: Context):
    ctx.logger.info(f"i_agent_user addr: {i_agent_user.address}\ni_agent_user wallet addr: {i_agent_user.wallet.address()}")

@i_agent_user.on_query(model=ItineraryMsg, replies={Response})
async def query_handler(ctx: Context, sender: str, _query: ItineraryMsg):
    ctx.logger.info("Query received")
    try:
        # do something here
        await ctx.send(sender, Response(text="success"))
    except Exception:
        await ctx.send(sender, Response(text="fail"))

@i_agent_user.on_message(model=ItineraryMsg)
async def itinerary_message_handler(ctx: Context, sender: str, msg: ItineraryMsg):
    ctx.logger.info(f"Received message from {sender}: {msg}")


if __name__ == "__main__":
    i_agent_user.run()
