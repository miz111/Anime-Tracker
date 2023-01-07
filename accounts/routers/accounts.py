from fastapi import (
    Depends,
    APIRouter,
)

from queries.accounts import (
    AccountQueries
)

from models import (
    AccountIn,
    AccountOut
)

router = APIRouter()

@router.post('/api/accounts', response_model=AccountOut)
def create_account(
    new_account: AccountIn,
    account_queries: AccountQueries = Depends(),
):
    return account_queries.create_account(new_account)
