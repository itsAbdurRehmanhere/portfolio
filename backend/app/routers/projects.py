from h11._abnf import status_code
import traceback
import traceback
import os
import uuid
from fastapi import APIRouter, HTTPException, Depends, status, Request, UploadFile, File
from sqlalchemy.orm import Session
from typing import List, Optional
from app import models, schemas
from app.database import get_db
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder

router = APIRouter(prefix="/api/projects", tags=["projects"])

# Uploads directory — relative to the backend package root
UPLOADS_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "uploads", "projects")

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


ALLOWED_EXTENSIONS = {"image/jpeg", "image/png", "image/gif", "image/webp"}
MAX_FILE_SIZE_MB = 5

@router.post("/upload-image")
async def upload_project_image(
    project_id: int,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    """
    Upload an image for a specific project.
    Saves the image to disk, updates the project's image_url in the database,
    and returns the URL path to access the uploaded image.
    Supported formats: JPEG, PNG, GIF, WebP. Max size: 5MB.
    """
    # Check that the project exists
    db_project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not db_project:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Project not found")

    # Validate content type
    if file.content_type not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Unsupported file type: {file.content_type}. Allowed: JPEG, PNG, GIF, WebP."
        )

    # Read file content
    contents = await file.read()

    # Validate file size
    if len(contents) > MAX_FILE_SIZE_MB * 1024 * 1024:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File too large. Maximum size is {MAX_FILE_SIZE_MB}MB."
        )

    # Build a unique filename using project_id prefix for easy identification
    ext = file.filename.rsplit(".", 1)[-1] if "." in file.filename else "jpg"
    unique_filename = f"project_{project_id}_{uuid.uuid4().hex}.{ext}"

    # Ensure the uploads directory exists
    os.makedirs(UPLOADS_DIR, exist_ok=True)

    file_path = os.path.join(UPLOADS_DIR, unique_filename)

    # Write to disk
    with open(file_path, "wb") as f:
        f.write(contents)

    # Update the project's image_url in the database
    image_url = f"/static/projects/{unique_filename}"
    db_project.image_url = image_url
    db.commit()
    db.refresh(db_project)

    return {
        "image_url": image_url,
        "filename": unique_filename,
        "project_id": project_id,
        "message": f"Image uploaded and linked to project #{project_id} successfully."
    }