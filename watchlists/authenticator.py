# authenticator.py
import os
from typing import Union
from jwtdown_fastapi.authentication import Authenticator
from pydantic import BaseModel
from jose import JWTError, jwt
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="fastapi_token")
SECRET_KEY = os.environ["SIGNING_KEY"]

class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str


class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Union[str, None] = None

class User(BaseModel):
    username: str
    email: Union[str, None] = None

class UserInDB(User):
    hashed_password: str

class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts,
    ):
        pass
        # Use your repo to get the account based on the
        # username (which could be an email)

    def get_account_getter(
        self,
        accounts,
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account):
        # Return the encrypted password value from your
        # account object
        return account.hashed_password

    def get_account_data_for_cookie(self, account):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        return account.username, AccountOut(**account.dict())


authenticator = MyAuthenticator(SECRET_KEY)
