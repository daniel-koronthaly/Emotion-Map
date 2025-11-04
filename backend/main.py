from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import emotions, demographics, export
from contextlib import asynccontextmanager
import models
from database import create_db_and_tables
import os
from dotenv import load_dotenv

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    create_db_and_tables()
    yield

app = FastAPI(lifespan=lifespan)
load_dotenv()
origins = os.getenv("FRONTEND_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(emotions.router)
app.include_router(demographics.router)
app.include_router(export.router)