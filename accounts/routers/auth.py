 # authenticator.py
import os
from fastapi import Depends
from jwtdown_fastapi.authentication import Authenticator
from queries.accounts import AccountQueries
from models import AccountOut, Account

class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts: AccountQueries,
    ):
        # Use your repo to get the account based on the
        # username (which could be an email)
        return accounts.get_account_by_username(username)

    def get_account_getter(
        self,
        accounts: AccountQueries = Depends(),
    ):
        # Return the accounts. That's it.
        return accounts

    def get_hashed_password(self, account: Account):
        # Return the encrypted password value from your
        # account object
        return account['password']

    def get_account_data_for_cookie(self, account: Account):
        # Return the username and the data for the cookie.
        # You must return TWO values from this method.
        del account['password']
        return account['username'], AccountOut(**account)


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])