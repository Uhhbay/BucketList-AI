from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorCollection
from pydantic import BaseModel
from uuid import uuid4
from typing import Optional
from passlib.context import CryptContext
from pymongo import ReturnDocument


# Password hashing utility
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Data Models
class User(BaseModel):
    id: str
    username: str
    hashed_password: str
    bucket_id: str

    @staticmethod
    def from_doc(doc) -> "User":
        return User(
            id=str(doc["_id"]),
            username=doc["username"],
            hashed_password=doc["hashed_password"],
            bucket_id=str(doc["bucket_id"]),
        )


class BucketListItem(BaseModel):
    id: str
    description: str
    completed: bool

    @staticmethod
    def from_doc(item) -> "BucketListItem":
        return BucketListItem(
            id=item["id"],
            description=item["description"],
            completed=item["completed"],
        )


class BucketList(BaseModel):
    id: str
    name: str
    items: list[BucketListItem]

    @staticmethod
    def from_doc(doc) -> "BucketList":
        return BucketList(
            id=str(doc["_id"]),
            name=doc["name"],
            items=[BucketListItem.from_doc(item) for item in doc["items"]],
        )


# Data Access Layer (DAL)
class UserDAL:
    def __init__(self, user_collection: AsyncIOMotorCollection, bucket_collection: AsyncIOMotorCollection):
        self._user_collection = user_collection
        self._bucket_collection = bucket_collection

    async def create_user(self, username: str, password: str, session=None) -> User:
        """Create a new user with a unique bucket list."""
        hashed_password = pwd_context.hash(password)
        bucket_id = await self.create_bucket(session)

        response = await self._user_collection.insert_one(
            {"username": username, "hashed_password": hashed_password, "bucket_id": bucket_id},
            session=session,
        )

        return User(id=str(response.inserted_id), username=username, hashed_password=hashed_password, bucket_id=bucket_id)

    async def create_bucket(self, session=None) -> str:
        """Create a new bucket list for the user."""
        response = await self._bucket_collection.insert_one(
            {"name": "My Bucket List", "items": []}, session=session
        )
        return str(response.inserted_id)
    
    async def set_item_completed(self, bucket_id: str, item_id: str, completed: bool, session=None) -> Optional[BucketList]:
        res = await self._bucket_collection.find_one_and_update(
            {"_id": ObjectId(bucket_id), "items.id": item_id},
            {"$set": {"items.$.completed": completed}},
            session=session,
            return_document=ReturnDocument.AFTER,
        )

        return BucketList.from_doc(res) if res else None
    
    async def delete_item(self, bucket_id: str, item_id: str, session=None) -> Optional[BucketList]:
        result = await self._bucket_collection.find_one_and_update(
            {"_id": ObjectId(bucket_id)},
            {"$pull": {"items": {"id": item_id}}},  # Remove the item by its id
            session=session,
            return_document=ReturnDocument.AFTER,  # Return the updated document
        )

        return BucketList.from_doc(result) if result else None

    async def get_user_by_username(self, username: str, session=None) -> Optional[User]:
        """Retrieve a user by their username."""
        doc = await self._user_collection.find_one({"username": username}, session=session)
        return User.from_doc(doc) if doc else None

    async def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify if the password matches the stored hashed password."""
        return pwd_context.verify(plain_password, hashed_password)

    # Bucket CRUD operations (integrated with user)
    async def add_item_to_bucket(self, bucket_id: str, description: str, session=None) -> Optional[BucketList]:
        result = await self._bucket_collection.find_one_and_update(
            {"_id": ObjectId(bucket_id)},
            {
                "$push": {
                    "items": {
                        "id": uuid4().hex,
                        "description": description,
                        "completed": False,
                    }
                }
            },
            session=session,
            return_document=ReturnDocument.AFTER,
        )
        return BucketList.from_doc(result) if result else None

    async def get_bucket(self, bucket_id: str, session=None) -> Optional[BucketList]:
        """Retrieve the bucket list by its ID."""
        doc = await self._bucket_collection.find_one({"_id": ObjectId(bucket_id)}, session=session)
        return BucketList.from_doc(doc) if doc else None
