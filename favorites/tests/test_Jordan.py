from fastapi.testclient import TestClient
from datetime import date
from main import app
from queries.favorites import *
from authenticator import authenticator

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
            "username": "string"
            }

def test_create_favorite():
    favorite_in = FavoriteIn(
        user_id="1",
        anime_title="spy x family",
        date=date(2022, 1, 1),
        img_url="https://www.google.com/imgres?imgurl=https%3A%2F%2Fd28hgpri8am2if.cloudfront.net%2Fbook_images%2Fonix%2Fcvr9781974718160%2Fspy-x-family-vol-3-9781974718160_hr.jpg&imgrefurl=https%3A%2F%2Fwww.simonandschuster.com%2Fbooks%2FSpy-x-Family-Vol-3%2FTatsuya-Endo%2FSpy-x-Family%2F9781974718160&tbnid=rIGY9QxJCAsxNM&vet=12ahUKEwie8Ze1itj8AhVM1lMKHTpwALMQMygCegUIARDkAQ..i&docid=E4VZ3WYuEJ896M&w=1400&h=2100&q=spy%20family&ved=2ahUKEwie8Ze1itj8AhVM1lMKHTpwALMQMygCegUIARDkAQ",
        )
    favorite_in.date = favorite_in.date.isoformat()

    expected_favorite = FavoriteOut(
        id=1,
        user_id="1",
        anime_title="spy x family",
        date=date(2022, 1, 1),
        img_url="https://www.google.com/imgres?imgurl=https%3A%2F%2Fd28hgpri8am2if.cloudfront.net%2Fbook_images%2Fonix%2Fcvr9781974718160%2Fspy-x-family-vol-3-9781974718160_hr.jpg&imgrefurl=https%3A%2F%2Fwww.simonandschuster.com%2Fbooks%2FSpy-x-Family-Vol-3%2FTatsuya-Endo%2FSpy-x-Family%2F9781974718160&tbnid=rIGY9QxJCAsxNM&vet=12ahUKEwie8Ze1itj8AhVM1lMKHTpwALMQMygCegUIARDkAQ..i&docid=E4VZ3WYuEJ896M&w=1400&h=2100&q=spy%20family&ved=2ahUKEwie8Ze1itj8AhVM1lMKHTpwALMQMygCegUIARDkAQ",
        )

    expected_favorite.date = expected_favorite.date.isoformat()

# two dependencies here because of auth
# one for Favrepo
# second for get_current_account_data
    app.dependency_overrides[FavoriteRepository] = FakeFavoriteRespository
    app.dependency_overrides[authenticator.get_current_account_data] = FakeAuthenticator
    response = client.post("/favorites", json=favorite_in.dict())
    assert response.status_code == 200
    assert response.json() == expected_favorite.dict()