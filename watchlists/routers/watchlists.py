from fastapi import APIRouter, Depends
from queries.watchlists import (
    WatchlistList,
    WatchlistIn,
    WatchlistOut,
    WatchlistRepository,
)
from routers import auth

router = APIRouter()


@router.post("/api/watchlists", response_model=WatchlistOut)
def create_watchlist(
    new_watchlist: WatchlistIn,
    repo: WatchlistRepository = Depends(),
    account_data: dict = Depends(auth.authenticator.get_current_account_data),
):
    if account_data:
        return repo.create(new_watchlist)


@router.get("/api/watchlists/{user_id}", response_model=WatchlistList)
def get_watchlist(
    user_id: int,
    repo: WatchlistRepository = Depends(),
    account_data: dict = Depends(auth.authenticator.get_current_account_data),
):
    if account_data:
        return {"watchlists": repo.get_all(user_id)}


# get_all for whole database did not work
# @router.get("/api/watchlists", response_model=WatchlistList)
# def get_all_watchlist(
#     repo: WatchlistRepository = Depends(),
#     account_data: dict = Depends(authenticator.get_current_account_data),
#     ):
#     print("GET all watchlists: account data", account_data)
#     print("GET all watchlists: repo", repo)
#     if account_data:
#         return {"watchlists":repo.get_all}


@router.delete("/api/watchlists/{user_id}/{watchlist_id}")
def delete_watchlist(
    user_id: int,
    watchlist_id: int,
    repo: WatchlistRepository = Depends(),
    account_data: dict = Depends(auth.authenticator.get_current_account_data),
):
    print("DEL: account data", account_data)
    print("DEL: repo", repo)
    if account_data:
        return repo.delete(watchlist_id)
