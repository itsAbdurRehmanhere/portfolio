from h11._abnf import status_code
import traceback
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from app import models, schemas
from app.database import get_db
from fastapi.responses import JSONResponse
import json


router = APIRouter(prefix="/api/experience", tags=["experience"])

@router.get("/")
async def get_experience(request: Request, db:Session = Depends(get_db)):
    try:
        # data = await request.json()
        # print("DATA:", data)
        experience = db.query(models.experience).all()
        experience_dicts = []

        for exp in experience:
            d = exp.__dict__.copy()
            d.pop('_sa_instance_state', None)
            experience_dicts.append(d)

        print("EXPERIENCES:", experience_dicts)

        return JSONResponse(content=experience_dicts, status_code=200)
    except Exception as e:
        print(f"ERROR: {traceback.format_exc()}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(e))

@router.post("/")
async def create_experience(request: Request, db:Session = Depends(get_db)):
    try:
        experience = await request.json()
        print("EXPERIENCE:", experience)
        db_experience = models.experience(**(experience))
        db.add(db_experience)
        db.commit()
    except Exception as e:
        print(f"Error: {traceback.format_exc()}")
        raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail= str(e))
    db.refresh(db_experience)
    return db_experience

@router.put("/{id}")
async def update_experince(id:int,request: Request, db:Session = Depends(get_db)):
    db_experience = db.query(models.experience).filter(models.experience.id == id).first()
    if not db_experience:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail ="Experience not found")
    experience = await request.json()
    for key,value in experience.items():
        if hasattr(db_experience, key) and key != "id":
            setattr(db_experience, key, value)
    db.commit()
    db.refresh(db_experience)
    return db_experience

@router.delete("/{id}", status_code = status.HTTP_204_NO_CONTENT)
def delete_experience(id:int, db:Session = Depends(get_db)):
    db_experience = db.query(models.experience).filter(models.experience.id == id).first()
    if not db_experience:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail ="Experience not found")
    db.delete(db_experience)
    db.commit()
    return None