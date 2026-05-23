from dotenv import load_dotenv
import os
from typing import List
import json

load_dotenv()
class Config:
    DATABASE_URL = os.getenv("DATABASE_URL")
    SECRET_KEY = os.getenv("SECRET_KEY")
    ALGORITHM = os.getenv("ALGORITHM", "HS256")
    ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "30"))
    cors_origins = os.getenv("CORS_ORIGINS", '["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:5173", "http://127.0.0.1:5173"]')
    
    CORS_ORIGINS: List[str] = json.loads(cors_origins)

    EMAIL_REGEX = r'^[a-zA-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'


    RATE_LIMITING_REQUESTS = 5
    RATE_LIMITING_PERIOD = 60

    # Email Configuration
    SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
    SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
    SENDER_EMAIL = os.getenv("SENDER_EMAIL", "your-email@gmail.com")
    SENDER_PASSWORD = os.getenv("SENDER_PASSWORD", "your-app-password")
    RECIPIENT_EMAIL = os.getenv("RECIPIENT_EMAIL", "your-email@gmail.com")

config = Config()