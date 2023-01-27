import os
from pydantic import BaseModel
from jwtdown_fastapi.authentication import Authenticator


class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str


class MyAuthenticator(Authenticator):
    async def get_account_data(self):
        pass

    def get_account_getter(self):
        pass

    def get_hashed_password(self):
        pass

    def get_account_data_for_cookie(self):
        pass


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])
