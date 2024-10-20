import requests
import os
from fastapi import HTTPException
from datetime import datetime, timedelta

from dotenv import load_dotenv
load_dotenv()

AMADEUS_CLIENT_ID = os.getenv("AMADEUS_CLIENT_ID")
AMADEUS_CLIENT_SECRET = os.getenv("AMADEUS_CLIENT_SECRET")
AMADEUS_BASE_URL = "https://test.api.amadeus.com"

assert AMADEUS_CLIENT_ID is not None
assert AMADEUS_CLIENT_SECRET is not None

def get_access_token():
    url = f"{AMADEUS_BASE_URL}/v1/security/oauth2/token"
    data = {
        "grant_type": "client_credentials",
        "client_id": AMADEUS_CLIENT_ID,
        "client_secret": AMADEUS_CLIENT_SECRET
    }
    response = requests.post(url, data=data)
    if response.status_code == 200:
        return response.json().get("access_token")
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to authenticate with Amadeus API")


def search_cheapest_flights(origin: str, max_price: int = None, duration: str = "7 days"):
    access_token = get_access_token()
    url = f"{AMADEUS_BASE_URL}/v1/shopping/flight-destinations"
    headers = {"Authorization": f"Bearer {access_token}"}
    
    # Generate a list of dates over the next 6 months
    today = datetime.now()
    dates = [(today + timedelta(days=i)).strftime("%Y-%m-%d") for i in range(0, 180, 15)]  # Every 15 days for 6 months

    cheapest_flights = []

    for departure_date in dates:
        params = {
            "origin": origin,
            "departureDate": departure_date,
            "maxPrice": max_price,
            "duration": duration,
            "oneWay": "false"
        }

        response = requests.get(url, headers=headers, params=params)
        if response.status_code == 200:
            # Collect flight data
            flight_data = response.json().get("data", [])
            cheapest_flights.extend(flight_data)
        else:
            raise HTTPException(status_code=response.status_code, detail=f"Failed to retrieve data for {departure_date}")

    # Sort collected flights by price (if applicable)
    sorted_flights = sorted(cheapest_flights, key=lambda x: x["price"]["total"]) if cheapest_flights else []
    
    return sorted_flights