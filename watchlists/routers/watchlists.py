from fastapi import APIRouter, Depends, Response, status
from typing import Union, List
from queries.watchlists import WatchlistIn, WatchlistOut, Error, WatchlistRepository
# from authenticator import authenticator
from auth import *

router = APIRouter()

@router.post("/api/watchlists", response_model=Union[WatchlistOut, Error])
def create_watchlist(
    new_watchlist : WatchlistIn,
    watchlist_queries: WatchlistRepository = Depends(),
    account: dict = Depends(get_current_account_data),
    ):
    return watchlist_queries.create_watchlist(new_watchlist)

@router.get('/api/watchlists/{user_id}', response_model=WatchlistOut | None)
def get_watchlist(
    user_id: int,
    watchlist_queries: WatchlistRepository = Depends(),
    account: dict = Depends(get_current_account_data),
    ):
    return watchlist_queries.get_watchlist_by_id(user_id)

@router.get("/api/watchlists", response_model=List[WatchlistOut])
def get_all(
    watchlist_quaries: WatchlistRepository = Depends(),
    ):
    return watchlist_quaries.get_all()


# router = APIRouter()

# @router.post("/api/watchlists", response_model=Union[WatchlistOut, Error])
# def create_watchlist(
#     new_watchlist : WatchlistIn,
#     watchlist_queries: WatchlistRepository = Depends(),
#     account: dict = Depends(authenticator.get_current_account_data),
#     ):
#     return watchlist_queries.create_watchlist(new_watchlist)

# @router.get('/api/watchlists/{user_id}', response_model=WatchlistOut | None)
# def get_watchlist(
#     user_id: int,
#     watchlist_queries: WatchlistRepository = Depends(),
#     account: dict = Depends(authenticator.get_current_account_data),
#     ):
#     return watchlist_queries.get_watchlist_by_id(id)

# @router.get("/api/watchlists", response_model=List[WatchlistOut])
# def get_all(
#     watchlist_quaries: WatchlistRepository = Depends(),
#     ):
#     return watchlist_quaries.get_all()
