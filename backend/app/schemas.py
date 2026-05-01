from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List
from datetime import datetime

class ContactBase(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    message: str = Field(..., min_length=10, max_length=5000)

class ContactCreate(ContactBase):
    pass

class ContactResponse(ContactBase):
    id: int
    is_read: bool
    created_at: datetime

    class config:
        from_attributes = True

class ProjectBase(BaseModel):
    title: str = Field(..., min_length=3, max_length=200)
    description: str = Field(..., min_length=10, max_length=500)
    long_description: Optional[str] = None
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    live_url: Optional[str] = None
    technologies: List[str] = []
    featured: bool = False
    order: int = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class ProjectResponse(ProjectBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime]
    
    class Config:
        from_attributes = True

class SkillBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    category: str
    proficiency: int = Field(..., ge=0, le=100)
    icon: Optional[str] = None
    order: int = 0

class SkillCreate(SkillBase):
    pass

class SkillResponse(SkillBase):
    id: int
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None