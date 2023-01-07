import pymongo
import os
# from bson import ObjectId

dbuser = os.environ['MONGO_USER']
dbpass = os.environ['MONGO_PASSWORD']
dbhost = os.environ['MONGO_HOST']
mongodb = os.environ['MONGO_DATABASE']
mongo_str = f"mongodb://{dbuser}:{dbpass}@{dbhost}"
client = pymongo.MongoClient(mongo_str)

class AccountQueries:
    def create_account(self, new_account):
        db = client[mongodb]
        result = db.accounts.insert_one(new_account.dict())
        account = self.get_account_by_id(result.inserted_id)
        return account
