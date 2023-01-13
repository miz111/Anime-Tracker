from pydantic import BaseModel
from datetime import datetime
from queries.pool import *
from typing import Union, List

class Error(BaseModel):
    message: str

class FavoriteIn(BaseModel):
    user_id: int
    date: datetime
    img_url: str

class FavoriteOut(BaseModel):
    id: int
    user_id: int
    date: datetime
    img_url: str

class FavoriteRepository:
    def get_all(self) -> Union[Error, List[FavoriteOut]]:
        try:
            connection = get_conn()
            with connection.cursor() as db:
                db.execute(
                    """
                        SELECT id, user_id, date, img_url
                        FROM favorites;
                    """
                )
                connection.close()
                return [
                    FavoriteOut(
                        id=entry[0],
                        user_id=entry[1],
                        date=entry[2],
                        img_url=entry[3]
                    )
                    for entry in db
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
                        SELECT id, user_id, date, img_url
                        FROM favorites
                        WHERE user_id = %s;
                    """,
                    [user_id]
                )
                connection.close()
                return [
                    FavoriteOut(
                        id=entry[0],
                        user_id=entry[1],
                        date=entry[2],
                        img_url=entry[3]
                    )
                    for entry in db
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
                            (user_id, date, img_url)
                        VALUES
                            (%s, %s, %s)
                        RETURNING id;
                    """,
                    [favorite.user_id, favorite.date, favorite.img_url],
                )
                connection.close()
                id = result.fetchone()[0]
                old = favorite.dict()
                return FavoriteOut(id=id, **old)
        except Exception:
            return {"message": "Could not create"}