from fastapi import APIRouter, Depends, HTTPException, status, Request, BackgroundTasks
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import get_db
from app.utils.validators import validate_email
from app.utils.email import send_contact_email
from slowapi import Limiter
from slowapi.util import get_remote_address
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
import traceback

router = APIRouter(prefix="/api/contact", tags=["contact"])
limiter = Limiter(key_func=get_remote_address)

@router.post("/", status_code=status.HTTP_201_CREATED)
@limiter.limit("5/minute")
async def create_contact(
    contact: schemas.ContactCreate,
    request: Request,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db)
):
    try:
        if not validate_email(contact.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid Email Address"
            )

        db_contact = models.ContactMessage(**contact.model_dump())
        db.add(db_contact)
        db.commit()
        db.refresh(db_contact)
        
        # Send email notification to admin in the background
        background_tasks.add_task(
            send_contact_email,
            name=contact.name,
            email=contact.email,
            message=contact.message
        )
        
        print(f"Contact message created: {db_contact.id}")
        return db_contact
        
    except HTTPException:
        raise
    except Exception as e:
        print(f"Error: {traceback.format_exc()}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )


@router.get("/")
async def get_contacts(
    request: Request,
    db: Session = Depends(get_db)
):
    try:
        contacts = db.query(models.ContactMessage).all()
        contact_dict = []
        for contact in contacts:
            c = contact.__dict__.copy()
            c.pop('_sa_instance_state', None)
            contact_dict.append(c)
        
        print("Contacts:", contact_dict)
        return JSONResponse(content=jsonable_encoder(contact_dict), status_code=200)
        
    except Exception as e:
        print(f"Error: {traceback.format_exc()}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=str(e)
        )