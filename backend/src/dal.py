from bson import ObjectId
from motor.motor_asyncio import AsyncIOMotorCollection
from pymongo import ReturnDocument
from pydantic import BaseModel
from uuid import uuid4

# Data Models
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
    name: str
    items: list[BucketListItem]

    @staticmethod
    def from_doc(doc) -> "BucketList":
        return BucketList(
            name=doc["name"],
            items=[BucketListItem.from_doc(item) for item in doc["items"]],
        )

# Data Access Layer
class BucketListDAL:
    def __init__(self, bucket_collection: AsyncIOMotorCollection):
        self._bucket_collection = bucket_collection
        self._bucketlist_id = ObjectId("6508e2e2e2e8e2e2e2e2e2e2")  # Fixed ID for single bucket list

    async def get_bucket_list(self, session=None) -> BucketList:
        doc = await self._bucket_collection.find_one(
            {"_id": self._bucketlist_id},
            session=session,
        )
        return BucketList.from_doc(doc)

    async def add_item(self, description: str, session=None) -> BucketList | None:
        result = await self._bucket_collection.find_one_and_update(
            {"_id": self._bucketlist_id},
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
        if result:
            return BucketList.from_doc(result)

    async def set_item_completed(self, item_id: str, completed: bool, session=None) -> BucketList | None:
        result = await self._bucket_collection.find_one_and_update(
            {"_id": self._bucketlist_id, "items.id": item_id},
            {"$set": {"items.$.completed": completed}},
            session=session,
            return_document=ReturnDocument.AFTER,
        )
        if result:
            return BucketList.from_doc(result)

    async def delete_item(self, item_id: str, session=None) -> BucketList | None:
        result = await self._bucket_collection.find_one_and_update(
            {"_id": self._bucketlist_id},
            {"$pull": {"items": {"id": item_id}}},
            session=session,
            return_document=ReturnDocument.AFTER,
        )
        if result:
            return BucketList.from_doc(result)
