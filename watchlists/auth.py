import os
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from pydantic import BaseModel

class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="fastapi_token")
SECRET_KEY = os.environ.get("SIGNING_KEY")
COOKIE_NAME = 'fastapi_token'

async def get_current_account_data(token: str = Depends(oauth2_scheme)):
    print(token)
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        print("load payload")
        payload = jwt.decode(token, SECRET_KEY, "HS256")
        print(payload)
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception

    except JWTError:
        raise credentials_exception
    user = AccountOut(**payload.get("account"))
    if user is None:
        raise credentials_exception
    return user
