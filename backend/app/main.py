from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app import models
from app.database import engine
from app.routers import contact, projects, skills
from app.config import config

models.Base.metadata.create_all(bind=engine)

limiter = Limiter(key_func=get_remote_address)
app = FastAPI(
    title="Portfolio API",
    description="Backend API for portfolio Website",
    version="1.0.0"
)

app.state.limiter = limiter

app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins = config.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc = RequestValidationError):
    return JSONResponse(
        status_code=422,
        content={"details":"Validation error", "errors":exc.errors()}
    )

app.include_router(contact.router)
app.include_router(projects.router)
app.include_router(skills.router)

@app.get("/")
async def root():
    return{
         "message": "Welcome to Portfolio API",
        "version": "1.0.0",
        "endpoints": ["/api/contact", "/api/projects", "/api/skills"]
    }

@app.get("/api/health")
async def health_check():
    return{"status": "healthy", "database": "connected"}