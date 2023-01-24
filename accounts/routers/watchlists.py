from fastapi import APIRouter, Depends, HTTPException, Response, Request, status
from queries.watchlists import WatchlistList, WatchlistIn, WatchlistOut, WatchlistRepository
from authenticator import authenticator

router = APIRouter()

@router.post("/api/watchlists", response_model=WatchlistOut)
def create_watchlist(
    new_watchlist : WatchlistIn,
    repo: WatchlistRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
    ):
    if account_data:
        return repo.create(new_watchlist)

@router.get('/api/watchlists/{user_id}', response_model=WatchlistList)
def get_watchlist(
    user_id: int,
    repo: WatchlistRepository = Depends(),
    account_data: dict = Depends(authenticator.get_current_account_data),
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
    account_data: dict = Depends(authenticator.get_current_account_data),
):
    print("DEL: account data", account_data)
    print("DEL: repo", repo)
# if account_data.id == user_id:
    if account_data:
        return repo.delete(watchlist_id)

# Edited from MongDB
# router = APIRouter()

# @router.post("/api/watchlists", response_model=Union[WatchlistOut, Error])
# def create_watchlist(
#     request: Request,
#     new_watchlist : WatchlistIn,
#     watchlist_queries: WatchlistRepository = Depends(),
#     account: dict = Depends(authenticator.get_account_data),
#     ):
#         if account and request.cookies != None:
#             return watchlist_queries.create(new_watchlist)

# @router.get("/api/watchlists/{user_id}", response_model=WatchlistOut | None)
# def get_watchlist(
#     user_id: int,
#     watchlist_queries: WatchlistRepository = Depends(),
#     account: dict = Depends(authenticator.get_account_data),
#     ):
#     return watchlist_queries.get_all_for_user(user_id)

# @router.get("/api/watchlists", response_model=List[WatchlistOut])
# def get_all(
#     watchlist_quaries: WatchlistRepository = Depends(),
#     ):
#     return watchlist_quaries.get_all()
