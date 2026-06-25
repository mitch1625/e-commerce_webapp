from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()
USERNAME = os.getenv('DB_USER')
PASSWORD = os.getenv('DB_PASSWORD')
URL_DATABASE = os.getenv('USER_DB_URL')


engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

