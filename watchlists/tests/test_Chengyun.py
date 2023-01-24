from fastapi.testclient import TestClient
from datetime import date
from main import app
from queries.watchlists import (
    WatchlistIn,
    WatchlistOut,
    WatchlistRepository,
)
from authenticator import authenticator


client = TestClient(app)


# Basic case from FastAPI
@app.get("/")
async def read_main():
    return {"msg": "Hello World"}


def test_read_main():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"msg": "Hello World"}


class FakeWatchlistRepository:
    def create(self, watchlist):
        return WatchlistOut(
            id=1,
            user_id=watchlist.user_id,
            title=watchlist.title,
            date=watchlist.date,
            img_url=watchlist.img_url,
        )

    def get_all(self, user_id):
        return WatchlistOut(
            id=1,
            user_id=user_id,
            title="test_title",
            date=date(2023, 1, 1),
            img_url="https://www.pokemon.com/",
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


# Test Create
def test_create_watchlist():
    watchlist_in = WatchlistIn(
        user_id=1,
        title="test_title",
        date=date(2023, 1, 1),
        img_url="https://www.pokemon.com/",
    )
    watchlist_in.date = watchlist_in.date.isoformat()

    expected_watchlist = WatchlistOut(
        id=1,
        user_id=1,
        title="test_title",
        date=date(2023, 1, 1),
        img_url="https://www.pokemon.com/",
    )

    expected_watchlist.date = expected_watchlist.date.isoformat()

    app.dependency_overrides[WatchlistRepository] = FakeWatchlistRepository
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = FakeAuthenticator

    response = client.post("/api/watchlists", json=watchlist_in.dict())

    assert response.status_code == 200
    assert response.json() == expected_watchlist.dict()
