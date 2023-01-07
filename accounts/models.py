from pydantic import BaseModel



class AccountIn(BaseModel):
    email: str
    password: str

class AccountOut(BaseModel):
    id: str
    email: str
