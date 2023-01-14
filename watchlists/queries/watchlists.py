from pydantic import BaseModel
from datetime import datetime
from queries.pool import  *
from typing import Union, List

class Error(BaseModel):
    message: str

class WatchlistIn(BaseModel):
    user_id: int
    title:str
    date: datetime
    img_url: str

class WatchlistOut(BaseModel):
    id: int
    user_id: int
    title:str
    date: datetime
    img_url: str

class WatchlistRepository:
    def get_all(self) -> Union[Error, List[WatchlistOut]]:
        try:
            #with pool.connection()as conn:
            connection = get_conn()
            with connection.cursor() as db:
                db.execute(
                    """
                        SELECT id, user_id, title, date, img_url
                        FROM watchlists
                        ORDERED BY id ASC
                    """
                )
                connection.close()
                return [
                    WatchlistOut(
                        id=entry[0],
                        user_id=entry[1],
                        title=entry[2],
                        date=entry[3],
                        img_url=entry[4]
                    )
                    for entry in db
                ]
        except Exception:
            return {"message": "Could not retrieve watchlists"}

    # def get_all(self) -> Union[Error, List[WatchlistOut]]:
    #     try:
    #         #with pool.connection()as conn:
    #         connection = get_conn()
    #         with connection.cursor() as db:
    #             db.execute(
    #                 """
    #                     SELECT * FROM dblink(
    #                     'dbname=users options=-csearch_path=',
    #                     'select id, username from users')
    #                     INNER JOIN watchlists.user_id, watchlists.title, watchlists.date, watchlists.img_url
    #                     ON users.id = watchlists.user_id
    #                     ORDERED BY user_id ASC
    #                 """
    #             )
    #             connection.close()
    #             return [
    #                 WatchlistOut(
    #                     id=entry[0],
    #                     user_id=entry[1],
    #                     title=entry[2],
    #                     date=entry[3],
    #                     img_url=entry[4]
    #                 )
    #                 for entry in db
    #             ]
    #     except Exception:
    #         return {"message": "Could not retrieve watchlists"}

    def delete(self, id: int) -> bool:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                db.execute(
                    """
                        DELETE FROM watchlists
                        WHERE id = %s
                    """,
                    [id],
                )
                connection.close()
                return True
        except Exception:
            return False

    def get_all_for_user(self, user_id: int) -> Union[Error, List[WatchlistOut]]:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                db.execute(
                    """
                        SELECT id, user_id, title, date, img_url
                        FROM watchlists
                        WHERE user_id = %s;
                        ORDERED BY id
                    """,
                    [user_id]
                )
                connection.close()
                return [
                    WatchlistOut(
                        id=entry[0],
                        user_id=entry[1],
                        title=entry[2],
                        date=entry[3],
                        img_url=entry[4]
                    )
                    for entry in db
                ]
        except Exception:
            return {"message": "The watchlist does not exist"}

    def create(self, watchlist: WatchlistIn) -> WatchlistOut:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                result = db.execute(
                    """
                        INSERT INTO watchlists
                            (user_id, title, date, img_url)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id
                    """,
                    [watchlist.user_id, watchlist.title, watchlist.date, watchlist.img_url],
                )
                connection.close()
                id = result.fetchone()[0]
                old = watchlist.dict()
                return WatchlistOut(id=id, **old)
        except Exception:
            return {"message": "Could not create the watchlist"}
