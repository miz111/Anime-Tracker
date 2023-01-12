import os
from jwtdown_fastapi.authentication import Authenticator



class MyAuthenticator(Authenticator):
    async def get_account_data(
        self,
        username: str,
        accounts,
    ):
        pass


    def get_account_getter(
        self,
        accounts,
    ):
        # Return the accounts. That's it.
        return accounts



    def get_hashed_password(self, account):
        # Return the encrypted password value from your
        # account object
        return account['password']


authenticator = MyAuthenticator(os.environ["SIGNING_KEY"])