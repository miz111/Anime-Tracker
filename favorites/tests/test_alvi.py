from fastapi.testclient import TestClient
from datetime import date
from main import app
from queries.favorites import (
    FavoriteOut,
    FavoriteIn,
    FavoriteRepository,
)
from authenticator import authenticator
from routers import favorites

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

favorites_db = {
  "favorites": [
    {
      "id": 0,
      "user_id": 0
      "anime_title": "string",
      "date": "2023-01-24",
      "img_url": "string"
    }
  ]
}

def set_favorites_db():
  return favorites_db



def test_get_all_favorites():
  app.dependency_overrides[FavoriteRepository] = FakeFavoriteRespository
  app.dependency_overrides[
        authenticator.get_current_account_data
    ] = FakeAuthenticator
  response = client.get("/favorites")
  assert response.status_code == 200
  assert response.json == [favorites_db]
  app=.dependency_overrides{}