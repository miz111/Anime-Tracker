# import os
# from psycopg_pool import ConnectionPool

# pool = CoonectionPool(conninfo = os.environ['DATABASE_URL'])

from psycopg import connection
import os

DATABASE_URL = os.environ["DATABASE_URL"]

def get_conn():
    kwargs = {"autocommit": True}
    return connection(conninfo=DATABASE_URL, **kwargs)
