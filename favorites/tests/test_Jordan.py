from fastapi.testclient import TestClient
from datetime import date
from main import app
from queries.favorites import (
    FavoriteOut,
    FavoriteIn,
    FavoriteRepository,
)
from routers import auth

client = TestClient(app)


class FakeFavoriteRespository:
    def create(self, favorite):
        return FavoriteOut(
            id=1,
            user_id=favorite.user_id,
            anime_title=favorite.anime_title,
            date=favorite.date,
            img_url=favorite.img_url,
        )


class FakeAuthenticator:
    def get_current_account_data(self):
        return {
            "id": 1,
            "first_name": "string",
            "last_name": "string",
            "email": "string",
            "username": "string",
        }


def test_create_favorite():
    favorite_in = FavoriteIn(
        user_id="1",
        anime_title="spy x family",
        date=date(2022, 1, 1),
        img_url="https://cdn.myanimelist.net/images/anime/1441/122795.jpg",
    )
    favorite_in.date = favorite_in.date.isoformat()

    expected_favorite = FavoriteOut(
        id=1,
        user_id="1",
        anime_title="spy x family",
        date=date(2022, 1, 1),
        img_url="https://cdn.myanimelist.net/images/anime/1441/122795.jpg",
    )

    expected_favorite.date = expected_favorite.date.isoformat()

    # two dependencies here because of auth
    # one for Favrepo
    # second for get_current_account_data
    app.dependency_overrides[FavoriteRepository] = FakeFavoriteRespository
    app.dependency_overrides[
        auth.authenticator.get_current_account_data
    ] = FakeAuthenticator
    response = client.post("/favorites", json=favorite_in.dict())
    assert response.status_code == 200
    assert response.json() == expected_favorite.dict()
