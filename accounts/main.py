from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import accounts, auth

app = FastAPI()
app.include_router(accounts.router)
app.include_router(auth.authenticator.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000"),
        # "https://catjj.gitlab.io/ani-reactor",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(auth.authenticator.router)
app.include_router(accounts.router)

# class AccountIn(BaseModel):
#     email: str
#     password: str

# class AccountOut(BaseModel):
#     id: str
#     email: str

# @app.get("/api/launch-details")
# def launch_details():
#     return {
#         "launch_details": {
#             "year": 2022,
#             "month": 12,
#             "day": "9",
#             "hour": 19,
#             "min": 0,
#             "tz:": "PST"
#         }
#     }
