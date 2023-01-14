from auth import get_current_user
from typing import List, Union
from fastapi import APIRouter, Depends
from queries.favorites import *

router = APIRouter()

@router.get("/favorites", response_model=Union[Error, List[FavoriteOut]])
def get_all(
    repo: FavoriteRepository = Depends(),
    account_data: dict = Depends(get_current_user),
):
    # print(account_data, "OKJASL;KDFJL;KASDJFAL;KSDJF")
    return repo.get_all()

@router.get("/favorites/{user_id}", response_model=Union[Error, List[FavoriteOut]])
def get_all_for_user(
    user_id: int,
    repo: FavoriteRepository = Depends(),
    account_data: dict = Depends(get_current_user)
) -> FavoriteOut:
    return repo.get_all_for_user(user_id)

@router.post("/favorites", response_model=FavoriteOut)
def create_favorite(
    favorite: FavoriteIn,
    repo: FavoriteRepository = Depends(),
    account_data: dict = Depends(get_current_user),
):
    return repo.create(favorite)

@router.delete("/favorites/{id}", response_model=bool)
def delete_favorite(
    id: int,
    repo: FavoriteRepository = Depends(),
    # account_data: dict = Depends(get_current_user),
) -> bool:
    return repo.delete(id)