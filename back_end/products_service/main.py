from fastapi import FastAPI, HTTPException, Depends, status, Request
from pydantic import BaseModel
from typing import List, Annotated
# import models
from sqlalchemy.orm import Session
from werkzeug.security import generate_password_hash, check_password_hash
from jose import JWTError, jwt
from datetime import datetime, timezone, timedelta
from fastapi.middleware.cors import CORSMiddleware
from  products_service.routes.routes import router as products_router
def create_app() -> FastAPI:    
  app = FastAPI(
    title="Product service DB"
  )
  app.include_router(products_router)
  app.add_middleware(
      CORSMiddleware,
      allow_origins=[
        "https://e-commerce-webapp-3lmc.vercel.app/",
        "http://localhost:5173",
      ],
      allow_credentials=True,
      allow_methods=["*"],
      allow_headers=["*"],
  )
  return app

app = create_app()



