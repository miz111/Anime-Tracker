from fastapi.testclient import TestClient
from datetime import date
from main import app
from queries.watchlists import WatchlistList, WatchlistIn, WatchlistOut, WatchlistRepository
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
            img_url="https://www.pokemon.com/static-assets/content-assets/cms2/img/watch-pokemon-tv/_tiles/2023/new-animated-series-169.png",
            )

class FakeAuthenticator:
    def get_current_account_data(self):
        return {
            "id": 1,
            "first_name": "string",
            "last_name": "string",
            "email": "string",
            "username": "string"
            }

# Test Create
def test_create_watchlist():
    watchlist_in = WatchlistIn(
        user_id = 1,
        title="test_title",
        date=date(2023, 1, 1),
        img_url="https://www.pokemon.com/static-assets/content-assets/cms2/img/watch-pokemon-tv/_tiles/2023/new-animated-series-169.png",
        )
    watchlist_in.date = watchlist_in.date.isoformat()

    expected_watchlist = WatchlistOut(
        id = 1,
        user_id = 1,
        title="test_title",
        date=date(2023, 1, 1),
        img_url="https://www.pokemon.com/static-assets/content-assets/cms2/img/watch-pokemon-tv/_tiles/2023/new-animated-series-169.png",
        )

    expected_watchlist.date = expected_watchlist.date.isoformat()

    app.dependency_overrides[WatchlistRepository] = FakeWatchlistRepository
    app.dependency_overrides[authenticator.get_current_account_data] = FakeAuthenticator

    response = client.post("/api/watchlists", json=watchlist_in.dict())

    assert response.status_code == 200
    assert response.json() == expected_watchlist.dict()



# Test Get - Not working
# def test_get_watchlist():
#     watchlist_in = WatchlistIn(
#         user_id = 1,
#         title="test_title",
#         date=date(2023, 1, 1),
#         img_url="https://www.pokemon.com/static-assets/content-assets/cms2/img/watch-pokemon-tv/_tiles/2023/new-animated-series-169.png",
#         )
#     watchlist_in.date = watchlist_in.date.isoformat()

#     expected_watchlist = WatchlistOut(
#         id = 1,
#         user_id = 1,
#         title="test_title",
#         date=date(2023, 1, 1),
#         img_url="https://www.pokemon.com/static-assets/content-assets/cms2/img/watch-pokemon-tv/_tiles/2023/new-animated-series-169.png",
#         )

#     expected_watchlist.date = expected_watchlist.date.isoformat()

#     app.dependency_overrides[WatchlistRepository] = FakeWatchlistRepository
#     app.dependency_overrides[authenticator.get_current_account_data] = FakeAuthenticator

#     client.post("/api/watchlists/", json=watchlist_in.dict())
#     response = client.get("/api/watchlists/1", json=watchlist_in.dict())

#     assert response.status_code == 200
#     assert response.json() == expected_watchlist.dict()





# Based on Andrew's demo 0120
# watchlist_test = WatchlistOut(
#             id = 1,
#             user_id = 1,
#             title = "test_title",
#             date = "2023-12-31",
#             img_url =  "https://www.pokemon.com/static-assets/content-assets/cms2/img/watch-pokemon-tv/_tiles/2023/new-animated-series-169.png"
#         )

# def fake_authenticator():
#     pass

# class FakeWatchlistRepository:
#     def get_one(self):
#         return watchlist_test


# def test_get_watchlist():
#     app.dependency_overrides[
#         authenticator.get_current_account_data
#     ] = fake_authenticator
#     app.dependency_overrides[
#         WatchlistRepository
#     ] = FakeWatchlistRepository
#     response = client.get("/watchlists")
#     assert response.status_code == 200
#     assert response.json() == watchlist_test





# Demo from James
# def test_create_user():
#     response = client.post(
#         "/users/",
#         json={"email": "deadpool@example.com", "password": "chimichangas4life"},
#     )
#     assert response.status_code == 200, response.text
#     data = response.json()
#     assert data["email"] == "deadpool@example.com"
#     assert "id" in data
#     user_id = data["id"]

#     response = client.get(f"/users/{user_id}")
#     assert response.status_code == 200, response.text
#     data = response.json()
#     assert data["email"] == "deadpool@example.com"
#     assert data["id"] == user_id
