from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from app import models, schemas
from app.database import get_db
import traceback
from fastapi.responses import JSONResponse
import json

router = APIRouter(prefix="/api/skills", tags = ["skills"])

@router.get("/")
async def get_skills(
    request: Request,
    db:Session = Depends(get_db)
):
    try:
        query = db.query(models.Skill).all()
        skill_dict = []
        for skill in query:
            s = skill.__dict__.copy()
            s.pop('_sa_instance_state', None)
            skill_dict.append(s)
        print("Skills: ", skill_dict)

        return JSONResponse(content = skill_dict, status_code=200)

    except Exception as e:
        print(f"Error: {traceback.format_exc()}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(e))            

    # query = db.query(models.Skill)
    # if category:
    #     query = query.filter(models.Skill.category == category)
    # skills = query.order_by(models.Skill.order).all()
    # return skills

@router.post("/", response_model=schemas.SkillResponse, status_code=201)
def create_skill(skill: schemas.SkillCreate, db:Session = Depends(get_db)):
    db_skill = models.Skill(**skill.dict())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

@router.put("/{id}", response_model = schemas.SkillResponse)
def update_skill(id:int, skill: schemas.SkillUpdate, db:Session = Depends(get_db)):
    db_skill = db.query(models.Skill).filter(models.Skill.id == id).first()
    if not db_skill:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail ="Skill not found")
    for key,value in skill.dict().items():
        setattr(db_skill, key, value)
    db.commit()
    db.refresh(db_skill)
    return db_skill

@router.delete("/{id}")
def delete_skill(id:int, db:Session = Depends(get_db)):
    db_skill = db.query(models.Skill).filter(models.Skill.id == id).first()
    if not db_skill:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail ="Skill not found")
    db.delete(db_skill)
    db.commit()
    return None
