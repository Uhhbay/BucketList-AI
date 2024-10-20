from openai import OpenAI
import httpx
import asyncio

import os
from dotenv import load_dotenv

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

if __name__ == "__main__":
    asyncio.run(temp())