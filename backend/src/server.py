from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorClient
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from datetime import datetime
import os
import sys
import uvicorn

from dal import BucketListDAL, BucketList

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# API routes
@app.get("/api/hello")
async def hello():
    return {"message": "Hello from FastAPI!"}

# Serve React App
app.mount("/", StaticFiles(directory="../../frontend/build", html=True), name="react_app")

@app.get("/{full_path:path}")
async def serve_react(full_path: str):
    return FileResponse("../../frontend/build/index.html")


COLLECTION_NAME = "bucket_list"
MONGODB_URI = os.environ["MONGODB_URI"]
DEBUG = os.environ.get("DEBUG", "").strip().lower() in {"1", "true", "on", "yes"}


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup:
    client = AsyncIOMotorClient(MONGODB_URI)
    database = client.get_default_database()

    # Ensure the database is available:
    pong = await database.command("ping")
    if int(pong["ok"]) != 1:
        raise Exception("Cluster connection is not okay!")

    bucket_collection = database.get_collection(COLLECTION_NAME)
    app.bucket_list_dal = BucketListDAL(bucket_collection)

    # Yield back to FastAPI Application:
    yield

    # Shutdown:
    client.close()


app = FastAPI(lifespan=lifespan, debug=DEBUG)

# Models for request and response validation
class NewItem(BaseModel):
    description: str

class NewItemResponse(BaseModel):
    id: str
    description: str

class ItemUpdate(BaseModel):
    item_id: str
    completed: bool

# Routes
@app.get("/api/bucketlist", response_model=BucketList)
async def get_bucket_list() -> BucketList:
    """Retrieve the single bucket list"""
    return await app.bucket_list_dal.get_bucket_list()

@app.post("/api/bucketlist/items", status_code=status.HTTP_201_CREATED, response_model=NewItemResponse)
async def create_item(new_item: NewItem) -> BucketList:
    """Add a new item to the bucket list"""
    updated_list = await app.bucket_list_dal.add_item(description=new_item.description)
    return NewItemResponse(
        id=str(updated_list.items[-1].id),
        description=new_item.description,
    )

@app.patch("/api/bucketlist/items/{item_id}/completed", response_model=BucketList)
async def update_item_completed(item_id: str, update: ItemUpdate) -> BucketList:
    """Update the completion status of a bucket list item"""
    return await app.bucket_list_dal.set_item_completed(item_id=item_id, completed=update.completed)

@app.delete("/api/bucketlist/items/{item_id}", response_model=BucketList)
async def delete_item(item_id: str) -> BucketList:
    """Delete an item from the bucket list"""
    return await app.bucket_list_dal.delete_item(item_id=item_id)

# Utility dummy route for testing
class DummyResponse(BaseModel):
    id: str
    when: datetime

@app.get("/api/dummy", response_model=DummyResponse)
async def get_dummy() -> DummyResponse:
    """A dummy route for testing purposes"""
    return DummyResponse(
        id=str(ObjectId()),
        when=datetime.now(),
    )

# Main function to start the server
def main(argv=sys.argv[1:]):
    try:
        uvicorn.run("server:app", host="0.0.0.0", port=3001, reload=DEBUG)
    except KeyboardInterrupt:
        pass

if __name__ == "__main__":
    main()