from fastapi.testclient import TestClient
from main import app
from queries.watchlists import (
    WatchlistOut,
    WatchlistRepository,
)
from routers import auth

client = TestClient(app)
watchlist_db = {
    "watchlists": [
        {
            "id": 1,
            "user_id": 0,
            "title": "Naruto",
            "date": "2023-01-24",
            "img_url": "Naruto.png",
        },
        {
            "id": 7,
            "user_id": 1,
            "title": "My Hero Academia",
            "date": "2023-01-24",
            "img_url": "MHA.jpg",
        },
    ]
}


def set_watchlist_db():
    return watchlist_db


class FakeWatchlistRespository:
    def get_all(self, user_id) -> list[WatchlistOut]:
        results = []
        target_list = watchlist_db["watchlists"]
        for item in target_list:
            if item["user_id"] == user_id:
                results.append(item)
        return results


class FakeAuthenticator:
    def get_current_account_data(self):
        return {
            "id": 0,
            "first_name": "string",
            "last_name": "string",
            "email": "string",
            "username": "string",
        }


def test_get_all_watchlists():
    app.dependency_overrides[WatchlistRepository] = FakeWatchlistRespository
    app.dependency_overrides[
        auth.authenticator.get_current_account_data
    ] = FakeAuthenticator
    response = client.get("/api/watchlists/1")
    assert response.status_code == 200
    assert response.json()["watchlists"][0] == watchlist_db["watchlists"][1]
    app.dependency_overrides = {}
