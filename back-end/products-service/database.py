from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
import os
from dotenv import load_dotenv

load_dotenv()

USERNAME = os.getenv('USERNAME')
PASSWORD = os.getenv('PASSWORD')
PRODUCT_DB = os.getenv('PRODUCT_DB')
URL_DATABASE = f'postgresql+psycopg://{USERNAME}:{PASSWORD}@localhost/{PRODUCT_DB}'
 

engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
