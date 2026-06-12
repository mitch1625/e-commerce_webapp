from datetime import datetime, timezone, timedelta
from pydantic import BaseModel
from fastapi import FastAPI, HTTPException, Depends, status, Request, APIRouter
from typing import List, Annotated
# import models
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy.orm import Session
from security import jwt_utils
from user_service.database import SessionLocal
from user_service.schemas import auth
from user_service import models
from user_service.database import engine
  
models.Base.metadata.create_all(bind=engine)
router = APIRouter()
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.post('/signup/', status_code=status.HTTP_201_CREATED)
async def create_user(
  user: auth.RegisterRequest, 
  db: db_dependency
  ) -> dict:

  print('Registering Account')
  # print(auth.RegisterRequest)
  existing_user = db.query(models.User).filter(models.User.email == user.email).first()
  if existing_user:
    raise HTTPException(status_code=400, detail='Email already registered to account')
  
  hashed_password = generate_password_hash(user.password)
  new_user = models.User(
    email = user.email,
    first_name = user.first_name,
    last_name = user.last_name,
    password = hashed_password
  )
  token, expires_in = jwt_utils.create_jwt(subject=str(user.email))
 
  db.add(new_user)
  db.commit()
  db.refresh(new_user)

  return {
    "user_id" : user.email,
    "token" : token
  }

@router.post('/login/')
def login(user: auth.LoginRequest, db:db_dependency, status_code=status.HTTP_201_CREATED):
  existing_user = db.query(models.User).filter(models.User.email == user.email).first()
  if existing_user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )
  if not check_password_hash(existing_user.password, user.password):
    raise HTTPException(status_code=401, detail='Invalid email or password')

  # token = jwt.encode({
  #           'sub': user.email, 
  #           'exp': datetime.now(timezone.utc) + timedelta(hours=1)}, 
  #           JWT_KEY,
  #           algorithm='HS256')
  token, expires_in = jwt_utils.create_jwt(subject=str(user.email))
  print(f'User {user.email} logged in')
  return {
    "user_id": user.email,
    "token": token,
  }

@router.get("/userinfo/")
def get_user_info(db: db_dependency, payload=Depends(jwt_utils.verify_token)):
    user_email = payload.get('sub')
    if not user_email:
        raise HTTPException(status_code=401, detail="Invalid token payload")

    user = db.query(models.User).filter(models.User.email == user_email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    return {
        "id": user.id,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
        "display_name": f"{user.first_name} {user.last_name}"
    }   