from sqlalchemy import Column, ForeignKey, String, Integer, JSON
from database import Base

class Products(Base):
  __tablename__ = 'products'
  id = Column(Integer, primary_key=True, index=True)
  name = Column(String(100), index=True, nullable=False)
  flavors = Column(JSON, nullable=False) #parent_one = Parent(list_of_items=['item1', 'item2'])
  description = Column(String(), nullable=False)
  size = Column(String(), nullable=False)
  price = Column(Integer, nullable=False)
