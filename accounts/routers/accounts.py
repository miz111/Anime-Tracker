from fastapi import (
    Depends,
    APIRouter,
    Request,
    Response,
    HTTPException,
    status,
)

from queries.accounts import (
    AccountQueries,
    DuplicateAccountError,
    Error,
    AccountIn,
    AccountOut,
    AccountOutWithPassword,
)

from jwtdown_fastapi.authentication import Token
from typing import Union, Optional, List
from pydantic import BaseModel
from routers import auth


class UserForm(BaseModel):
    username: str
    password: str


class UserToken(Token):
    account: AccountOut


class HttpError(BaseModel):
    detail: str


router = APIRouter()


@router.get("/token", response_model=UserToken | None)
async def get_token(
    request: Request,
    account: dict = Depends(auth.authenticator.try_get_current_account_data),
) -> UserToken | None:
    if account and auth.authenticator.cookie_name in request.cookies:
        return {
            "access_token": request.cookies[auth.authenticator.cookie_name],
            "type": "Bearer",
            "account": account,
        }


@router.post("/api/accounts", response_model=Union[UserToken, Error])
async def create_account(
    info: AccountIn,
    request: Request,
    response: Response,
    account_queries: AccountQueries = Depends(),
):
    hashed_password = auth.authenticator.hash_password(info.password)
    try:
        account = account_queries.create(info, hashed_password)
    except DuplicateAccountError:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot create an account with those credentials",
        )

    form = UserForm(username=info.username, password=info.password)
    token = await auth.authenticator.login(
        response, request, form, account_queries
    )
    return UserToken(account=account, **token.dict())


@router.get(
    "/api/accounts/{user_id}", response_model=Optional[AccountOutWithPassword]
)
def get_account_by_id(
    user_id: int,
    response: Response,
    queries: AccountQueries = Depends(),
    data: dict = Depends(auth.authenticator.try_get_current_account_data),
):
    if data:
        return queries.get_by_id(user_id)
    else:
        response.status_code = 401
        return {"message": "invalid token"}


@router.get("/api/accounts", response_model=Union[List[AccountOut], Error])
def get_all_accounts(
    repo: AccountQueries = Depends(),
):
    return repo.get_all()


@router.put("/api/accounts/{user_id}")
def update_account(
    user_id: int,
    account: AccountIn,
    response: Response,
    repo: AccountQueries = Depends(),
    data: dict = Depends(auth.authenticator.try_get_current_account_data),
):
    hashed_password = auth.authenticator.hash_password(account.password)
    if data:
        return repo.update(user_id, account, hashed_password)
    else:
        response.status_code = 401
        return {"message": "invalid token"}


@router.delete("/api/accounts/{user_id}", response_model=bool)
def delete_user(
    user_id: int,
    queries: AccountQueries = Depends(),
    data: dict = Depends(auth.authenticator.get_current_account_data),
):
    if data:
        return queries.delete(user_id)
