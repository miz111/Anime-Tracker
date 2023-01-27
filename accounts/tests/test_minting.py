from fastapi.testclient import TestClient
from routers import auth
from main import app

client = TestClient(app)


def test_get_token_for_logged_in_user():
    account = {
        "id": 1,
        "first_name": "jess",
        "last_name": "zhang",
        "email": "woof@email.com",
        "username": "3meow",
    }
    app.dependency_overrides[
        auth.authenticator.try_get_current_account_data
    ] = lambda: account
    response = client.get(
        "/token", cookies={auth.authenticator.cookie_name: "anime"}
    )
    app.dependency_overrides = {}
    assert response.status_code == 200
    data = response.json()
    assert data["access_token"] == "anime"
    assert data["account"] == account
    assert data["token_type"] == "Bearer"
