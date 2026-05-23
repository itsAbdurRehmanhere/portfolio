from h11._abnf import status_code
import traceback
import traceback
from fastapi import APIRouter, HTTPException, Depends, status, Request
from sqlalchemy.orm import Session
from typing import List, Optional
from app import models, schemas
from app.database import get_db
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

router = APIRouter(prefix="/api/projects", tags=["projects"])

@router.get("/")
async def get_project( request: Request, db: Session = Depends(get_db)):
    try:
        project = db.query(models.Project).all()
        project_dict = []
        for pro in project:
            p = pro.__dict__.copy()
            p.pop("_sa_instance_state", None)
            project_dict.append(p)
        print("Projects", project_dict)
        return JSONResponse(content=jsonable_encoder(project_dict), status_code=200)
    except Exception as e:
        print(f"Error: {traceback.format_exc()}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(e))
    # if featured_only:
    #     query = query.filter(models.Project.featured == True)
    # projects = query.order_by(models.Project.order).offset(skip).limit(limit).all()
    # return projects

@router.get("/{project_id}")
async def get_project(project_id: int, request: Request, db: Session = Depends(get_db)):
    try:
        project = db.query(models.Project).filter(models.Project.id == project_id).first()
        if not project:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail = "Project not found")
        project_dict = project.__dict__.copy()
        project_dict.pop("_sa_instance_state", None)
        print("Project", project_dict)
        return JSONResponse(content = jsonable_encoder(project_dict), status_code=200)
    except Exception as e:
        print(f"Error: {traceback.format_exc()}")
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail = str(e))

@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_project(request: Request, db: Session = Depends(get_db)):
    try:
        project = await request.json()
        print(f"Project Data:{project}")
        db_project = models.Project(**(project))
        db.add(db_project)
        db.commit()
    except Exception as e:
        print(f"Error: {traceback.format_exc()}")
        raise HTTPException(status_code = status.HTTP_400_BAD_REQUEST, detail= str(e))
    db.refresh(db_project)
    return db_project

@router.put("/{project_id}", response_model=schemas.ProjectResponse)
def update_project(
    project_id: int,
    project: schemas.ProjectUpdate,
    db:Session = Depends(get_db)
):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail="Project Not Found")
    
    for key, value in project.dict().items():
        setattr(db_project, key, value)

    db.commit()
    db.refresh(db_project)
    return db_project

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_project(project_id: int, db: Session= Depends(get_db)):
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=404, detail = "Project Not Found")
    
    db.delete(db_project)
    db.commit()
    return None