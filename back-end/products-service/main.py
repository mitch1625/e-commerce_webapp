from fastapi import FastAPI, HTTPException, Depends, status, Request
from pydantic import BaseModel
from typing import List, Annotated
from database import engine, SessionLocal, Base
import models
from sqlalchemy.orm import Session
from werkzeug.security import generate_password_hash, check_password_hash
from jose import JWTError, jwt
from datetime import datetime, timezone, timedelta
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
models.Base.metadata.create_all(bind=engine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@app.get('/all_products/', status_code=status.HTTP_200_OK)
async def get_all_products(db:db_dependency):
  print('Getting All products')
  products = db.query(models.Products).all()
  return products

@app.get('/featured_products/', status_code=status.HTTP_200_OK)
async def get_featured_products(db:db_dependency):
  print('Getting Featured Products')
  featured_products = db.query(models.Products).limit(3).all()
  return featured_products

@app.get('/product/{id}')
async def get_product_by_name(id:str, db:db_dependency):
  print(f'Getting product with ID {id}')
  product = db.query(models.Products).filter(models.Products.id == int(id)).first()

  if not product:
    raise HTTPException(status_code=404, detail="Product not found")
  
  return product