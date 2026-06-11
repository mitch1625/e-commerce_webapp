from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()
USERNAME = os.getenv('username')
PASSWORD = os.getenv('password')
# DB_NAME = os.getenv('USR_DB_NAME')
URL_DATABASE = f'postgresql+psycopg://{USERNAME}:{PASSWORD}@localhost/user_db'


engine = create_engine(URL_DATABASE)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

