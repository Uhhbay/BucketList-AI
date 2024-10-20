import requests
import os
from fastapi import HTTPException
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

AMADEUS_CLIENT_ID = os.getenv("AMADEUS_CLIENT_ID")
AMADEUS_CLIENT_SECRET = os.getenv("AMADEUS_CLIENT_SECRET")
AMADEUS_BASE_URL = "https://test.api.amadeus.com/v1"

assert AMADEUS_CLIENT_ID is not None
assert AMADEUS_CLIENT_SECRET is not None

# Function to retrieve access token
def get_access_token():
    url = f"{AMADEUS_BASE_URL}/security/oauth2/token"
    headers = {
        "Content-Type": "application/x-www-form-urlencoded",
    }
    data = {
        "grant_type": "client_credentials",
        "client_id": AMADEUS_CLIENT_ID,
        "client_secret": AMADEUS_CLIENT_SECRET
    }
    response = requests.post(url, data=data, headers=headers)
    if response.status_code == 200:
        return response.json().get("access_token")
    else:
        raise HTTPException(status_code=response.status_code, detail="Failed to authenticate with Amadeus API")

# Function to search for the cheapest flights
def search_cheapest_flights(origin: str, max_price: int = None, access_token: str = ""):
    url = f"{AMADEUS_BASE_URL}/shopping/flight-destinations"
    headers = {"Authorization": f"Bearer {access_token}"}
    
    # Generate a list of dates over the next 6 months (every 15 days)
    today = datetime.now()
    dates = [(today + timedelta(days=i)).strftime("%Y-%m-%d") for i in range(0, 180, 15)]  # Every 15 days for 6 months

    cheapest_flights = []

    for departure_date in dates:
        params = {
            "origin": origin,
            "departureDate": departure_date,
            "maxPrice": max_price if max_price is not None else None,  # Only include maxPrice if it's provided
            "oneWay": "false"
        }

        response = requests.get(url, headers=headers, params=params)
        
        # If request is successful
        if response.status_code == 200:
            flight_data = response.json().get("data", [])
            cheapest_flights.extend(flight_data)  # Collect flight data
        else:
            # Log the error but don't stop the loop
            print(f"Failed to retrieve data for {departure_date}: {response.status_code} {response.text}")
    
    # Sort collected flights by price
    sorted_flights = sorted(cheapest_flights, key=lambda x: x["price"]["total"]) if cheapest_flights else []
    
    return sorted_flights
