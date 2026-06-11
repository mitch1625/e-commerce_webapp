from sqlalchemy import Column, ForeignKey, String, Integer
# from database import Base
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()
class User(Base):
  __tablename__ = 'user'
  id = Column(Integer, primary_key=True, index=True)
  email = Column(String(100), unique=True, index=True, nullable=False)
  first_name = Column(String(50), unique=False, nullable=False)
  last_name = Column(String(50), unique=False, nullable=False)
  password = Column(String, nullable=False)
