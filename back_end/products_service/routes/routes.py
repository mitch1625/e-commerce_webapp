from fastapi import FastAPI, HTTPException, Depends, status, APIRouter,Request
from typing import List, Annotated
# import models
from sqlalchemy.orm import Session
from products_service import models
from products_service.database import engine, SessionLocal

models.Base.metadata.create_all(bind=engine)
router = APIRouter(prefix="/products")
def get_db():
  db = SessionLocal()
  try:
    yield db
  finally:
    db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.get('/all_products/', status_code=status.HTTP_200_OK)
async def get_all_products(db:db_dependency):
  products = db.query(models.Products).all()
  return products

@router.get('/featured_products/', status_code=status.HTTP_200_OK)
async def get_featured_products(db:db_dependency):
  featured_products = db.query(models.Products).limit(3).all()
  return featured_products

@router.get('/product/{id}')
async def get_product_by_name(id:str, db:db_dependency):
  product = db.query(models.Products).filter(models.Products.id == int(id)).first()

  if not product:
    raise HTTPException(status_code=404, detail="Product not found")
  
  return product