from pydantic import BaseModel
from datetime import date
from queries.pool import get_conn


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
                [user_id],
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
                    [
                        watchlist.user_id,
                        watchlist.title,
                        watchlist.date,
                        watchlist.img_url,
                    ],
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
