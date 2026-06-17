from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.orm import DeclarativeBase

class Base(DeclarativeBase):
  pass

class Cart(Base):
  __tablename__ = 'cart'
  id = Column(Integer, primary_key=True, index=True)
  user_id = Column(String, nullable=False)

  items = relationship("CartItem", back_populates="cart", cascade="all, delete-orphan")


class CartItem(Base):
  __tablename__ = 'cart_item'
  id = Column(Integer, primary_key=True, index=True)
  cart_id = Column(Integer, ForeignKey("cart.id"), nullable=False)
  product_id = Column(Integer, nullable=False)
  quantity = Column(Integer, nullable=False, default=1)
  name = Column(String, nullable=False)
  price = Column(Integer, nullable=False)
  
  cart = relationship("Cart", back_populates="items")