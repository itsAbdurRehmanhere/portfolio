from dotenv import load_dotenv
import os
from typing import List
import json

load_dotenv()
class Config:
    DATABASE_URL = os.getenv("DATABASE_URL", "postgresql+psycopg://neondb_owner:npg_WYM8RGnT4lfh@ep-royal-dawn-am7gytqo-pooler.c-5.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require")
    SECRET_KEY = os.getenv("SECRET_KEY", "9f3c8a1e7d4b2c6f5a8e1b9d0c3f1a2s54asda52128c1f9a7e6d5c3b2a1f0e9d8c7b6")
    ALGORITHM = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    cors_origins = os.getenv("CORS_ORIGINS", '["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173"]')
    
    CORS_ORIGINS: List[str] = json.loads(cors_origins)

    EMAIL_REGEX = r'^[a-zA-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'


    RATE_LIMITING_REQUESTS = 5
    RATE_LIMITING_PERIOD = 60

config = Config()