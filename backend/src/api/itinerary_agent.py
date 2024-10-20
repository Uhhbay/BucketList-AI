from uagents import Agent, Context, Model
from uagents.setup import fund_agent_if_low

from openai_handler import OpenAI

class ItineraryMsg(Model):
    location: str
    bucket_list: list[str]
 
# agent1qwvxvmrxrz5jp0eccam4fmktrggkvk8s5jeuvdq83z2mwacur88yguncgq3

# TODO: move env
i_agent = Agent(
    name="i_agent",
    port=8000,
    seed="dev itinerary agent seed123!",
    endpoint=["http://127.0.0.1:8000/submit"],
)

fund_agent_if_low(i_agent.wallet.address())

@i_agent.on_event("startup")
async def startup_intro(ctx: Context):
    ctx.logger.info(f"i_agent addr: {i_agent.address}\ni_agent wallet addr: {i_agent.wallet.address()}")

@i_agent.on_message(model=ItineraryMsg)
async def message_handler(ctx: Context, sender: str, msg: ItineraryMsg):
    ctx.logger.info(f"Received message from {sender}: {msg}")
 
    itinerary_data = await OpenAI.get_itinerary_data(msg.location, msg.bucket_list)

    ctx.send(sender, itinerary_data)

if __name__ == "__main__":
    i_agent.run()
