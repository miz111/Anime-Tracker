from pydantic import BaseModel
from datetime import datetime
from queries.pool import *
from typing import Union, List

class Error(BaseModel):
    message: str

class FavoriteIn(BaseModel):
    user_id: int
    anime_title: str
    date: datetime
    img_url: str

class FavoriteOut(BaseModel):
    id: int
    user_id: int
    anime_title: str
    date: datetime
    img_url: str

class FavoriteRepository:
    def get_all(self) -> Union[Error, List[FavoriteOut]]:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                db.execute(
                    """
                        SELECT id, user_id, anime_title, date, img_url
                        FROM favorites;
                    """
                )
                connection.close()
                return [
                    FavoriteOut(
                        id=record[0],
                        user_id=record[1],
                        anime_title=record[2],
                        date=record[3],
                        img_url=record[4]
                    )
                    for record in db
                ]
        except Exception:
            return {"message": "Could not retrieve favorites"}
    
    def delete(self, id: int) -> bool:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                db.execute(
                    """
                        DELETE FROM favorites
                        WHERE id = %s
                    """,
                    [id],
                )
                connection.close()
                return True
        except Exception:
            return False
    
    def get_all_for_user(self, user_id: int) -> Union[Error, List[FavoriteOut]]:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                db.execute(
                    """
                        SELECT id, user_id, anime_title, date, img_url
                        FROM favorites
                        WHERE user_id = %s;
                    """,
                    [user_id]
                )
                connection.close()
                return [
                    FavoriteOut(
                        id=record[0],
                        user_id=record[1],
                        anime_title=record[2],
                        date=record[3],
                        img_url=record[4]
                    )
                    for record in db
                ]
        except Exception:
            return {"message": "Does not exist"}
    
    def create(self, favorite: FavoriteIn) -> FavoriteOut:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                result = db.execute(
                    """
                        INSERT INTO favorites
                            (user_id, anime_title, date, img_url)
                        VALUES
                            (%s, %s, %s, %s)
                        RETURNING id;
                    """,
                    [favorite.user_id, favorite.anime_title, favorite.date, favorite.img_url],
                )
                connection.close()
                id = result.fetchone()[0]
                old_data = favorite.dict()
                return FavoriteOut(id=id, **old_data)
        except Exception:
            return {"message": "Could not create"}