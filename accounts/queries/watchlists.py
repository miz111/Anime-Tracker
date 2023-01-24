from pydantic import BaseModel
from datetime import date
from queries.pool import *
from typing import Union


class WatchlistIn(BaseModel):
    user_id: int
    title: str
    date: date
    img_url: str

class WatchlistOut(BaseModel):
    id: int
    user_id: int
    title: str
    date: date
    img_url: str

class AccountOut(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    username: str

class WatchlistList(BaseModel):
    watchlists: list[WatchlistOut]

class WatchlistRepository:
    def get_all(self, user_id: int) -> list[WatchlistOut]:
        print("get_all called", self)
        print("user id", user_id)
        connection = get_conn()
        with connection.cursor() as db:
            # if user_id is None:
            #     print("user_id is none")
            #     db.execute(
            #         """
            #         SELECT *
            #         FROM watchlists
            #         """
            #     )
            # else:
            #     print("user_id is not none")
            db.execute(
                    """
                    SELECT *
                    FROM watchlists
                    WHERE user_id = %s
                    """,
                    [user_id]
            )
            results = []
            print("results", results)
            for row in db.fetchall():
                anime = {}
                for i, column in enumerate(db.description):
                    anime[column.name] = row[i]
                results.append(anime)
            return results

    def create(self, watchlist: WatchlistIn) -> WatchlistOut:
        print("create called")
        try:
            connection = get_conn()
            with connection.cursor() as db:
                result = db.execute(
                    """
                    INSERT INTO watchlists
                        (user_id, title, date, img_url)
                    VALUES
                        (%s, %s, %s, %s)
                    RETURNING id;
                    """,
                    [watchlist.user_id, watchlist.title, watchlist.date, watchlist.img_url],
                )
                print(result)
                id = result.fetchone()[0]
                print("id after db", id)
                old_data = watchlist.dict()
                print("id", id)
                print("old_data", old_data)
                return WatchlistOut(id=id, **old_data)
        except Exception:
            return {"message": "Could not create the watchlist"}

    def delete(self, watchlist_id: int):
        connection = get_conn()
        with connection.cursor() as db:
            db.execute(
                """
                DELETE FROM watchlists
                WHERE id = %s
                """,
                [watchlist_id],
            )
            if watchlist_id:
                return True

            # if watchlist_id:
            #     return {f"watchlist {watchlist_id} is deleted"}

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

    # def delete(self, id: int) -> bool:
    #     try:
    #         connection = get_conn()
    #         with connection.cursor() as db:
    #             db.execute(
    #                 """
    #                     DELETE FROM watchlists
    #                     WHERE id = %s
    #                 """,
    #                 [id],
    #             )
    #             connection.close()
    #             return True
    #     except Exception:
    #         return False

    # def get_all_for_user(self, user_id: int) -> Union[List[WatchlistOut],Error]:
    #     try:
    #         connection = get_conn()
    #         with connection.cursor() as db:
    #             db.execute(
    #                 """
    #                     SELECT id, user_id, title, date, img_url
    #                     FROM watchlists
    #                     WHERE user_id = %s;
    #                     ORDERED BY id
    #                 """,
    #                 [user_id]
    #             )
    #             # print(user_id)
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
    #     except Exception as e:
    #         print(e)
    #         return {"message": "The watchlist does not exist"}

    # def create(self, watchlist: WatchlistIn, user_id) -> WatchlistOut:
    #     try:
    #         connection = get_conn()
    #         with connection.cursor() as db:
    #             result = db.execute(
    #                 """
    #                     INSERT INTO watchlists
    #                         (user_id, title, date, img_url)
    #                     VALUES
    #                         (%s, %s, %s, %s)
    #                     RETURNING id
    #                 """,
    #                 [watchlist.id, watchlist.user_id, watchlist.title, watchlist.date, watchlist.img_url],
    #             )
    #             connection.close()
    #             id = result.fetchone()[0]
    #             old = watchlist.dict()
    #             return WatchlistOut(id=id, **old)
    #     except Exception:
    #         return {"message": "Could not create the watchlist"}
