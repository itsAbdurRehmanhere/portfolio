from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from app.utils.validators import validate_email
from slowapi import Limiter
from slowapi.util import get_remote_address

router = APIRouter(prefix="/api/contact", tags=["contact"])
limiter = Limiter(key_func=get_remote_address)

@router.post("/", response_model=schemas.ContactResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def create_contact(
    contact: schemas.ContactCreate,
    request: Request,
    db: Session = Depends(get_db)
):
    if not validate_email(contact.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail= "Invalid Email Address"
        )

    db_contact = models.ContactMessage(**contact.dict())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    return db_contact

@router.get("/",response_model=list[schemas.ContactResponse])
def get_contacts(
    skip: int = 0,
    limit: int = 100,
    db:Session = Depends(get_db)
):
    
    contacts = db.query(models.ContactMessage).offset(skip).limit(limit).all()
    return(contacts)