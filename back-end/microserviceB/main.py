from fastapi import FastAPI, HTTPException, Depends, status, Request
from pydantic import BaseModel
from typing import List, Annotated
from database import engine, SessionLocal, Base
import models
from sqlalchemy.orm import Session
from werkzeug.security import generate_password_hash, check_password_hash
from jose import JWTError, jwt
from datetime import datetime, timezone, timedelta
import os
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
models.Base.metadata.create_all(bind=engine)
JWT_KEY = os.getenv('JWT_KEY')

class SignUpRequest(BaseModel):
  email: str
  first_name: str
  last_name: str
  password: str

class UserResponse(BaseModel):
  id: int
  email: str
  first_name: str
  last_name: str

  class Config:
      orm_mode = True


class LoginRequest(BaseModel):
  email:str
  password: str

def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

db_dependency = Annotated[Session, Depends(get_db)]



@app.post('/signup/', status_code=status.HTTP_201_CREATED)
async def create_user(user: SignUpRequest, db: Session = Depends(get_db)):
  print('Registering Account')
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
  token = jwt.encode({
          'sub': user.email, 
          'exp': datetime.now(timezone.utc) + timedelta(hours=1)}, 
          JWT_KEY,
          algorithm='HS256')

 
  db.add(new_user)
  db.commit()
  db.refresh(new_user)

  return {
    "user_id" : user.email,
    "token" : token
  }

@app.post('/login/')
def login(user: LoginRequest, db:db_dependency, status_code=status.HTTP_201_CREATED):
  existing_user = db.query(models.User).filter(models.User.email == user.email).first()
  print('Attempting to login...')
  if not user or not check_password_hash(existing_user.password, user.password):
    raise HTTPException(status_code=401, detail='Invalid email or password')

  token = jwt.encode({
            'sub': user.email, 
            'exp': datetime.now(timezone.utc) + timedelta(hours=1)}, 
            JWT_KEY,
            algorithm='HS256')
  print(f'User ${user.email} logged in')
  return {
    "user_id": user.email,
    "token": token,
  }

security_schema = HTTPBearer()
def verify_token(token: HTTPAuthorizationCredentials = Depends(security_schema)):
  token_cred = token.credentials
  try:
    payload = jwt.decode(token_cred, JWT_KEY, algorithms=['HS256'])
    return payload
  except JWTError:
    raise HTTPException(
      status_code=status.HTTP_401_UNAUTHORIZED,
      detail='Invalid or expired token'
    )

@app.get("/userinfo/")
def get_user_info(db: db_dependency, payload=Depends(verify_token)):
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