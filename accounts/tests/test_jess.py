from fastapi.testclient import TestClient
from main import app
from queries.accounts import AccountQueries
from routers import auth


client = TestClient(app)


class MockAccountQueries:
    def get_all(self):
        return [userDb]


userDb = {
    "id": 1,
    "first_name": "jess",
    "last_name": "zhang",
    "email": "woof@email.com",
    "username": "3meow",
}


def set_current_db():
    return userDb


def test_get_all_accounts():
    app.dependency_overrides[AccountQueries] = MockAccountQueries
    app.dependency_overrides[
        auth.authenticator.try_get_current_account_data
    ] = set_current_db
    response = client.get("/api/accounts")
    assert response.status_code == 200
    assert response.json() == [userDb]
    app.dependency_overrides = {}
