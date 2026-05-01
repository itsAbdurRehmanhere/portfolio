from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from app import models, schemas
from app.database import get_db

router = APIRouter(prefix="/api/skills", tags = ["skills"])

@router.get("/", response_model=List[schemas.SkillResponse])
def get_skills(
    category: Optional[str] = None,
    db:Session = Depends(get_db)
):
    query = db.query(models.Skill)
    if category:
        query = query.filter(models.Skill.category == category)
    skills = query.order_by(models.Skill.order).all()
    return skills

@router.post("/", response_model=schemas.SkillResponse, status_code=201)
def create_skill(skill: schemas.SkillCreate, db:Session = Depends(get_db)):
    db_skill = models.Skill(**skill.dict())
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill

