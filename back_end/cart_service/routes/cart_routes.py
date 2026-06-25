from fastapi import HTTPException, Depends, status, APIRouter
from fastapi.responses import JSONResponse
from cart_service.schemas.schemas import CartItemRequest, CartItemResponse
from sqlalchemy.orm import Session
from cart_service.models import Cart, CartItem
from cart_service.database import engine, SessionLocal
from security.jwt_utils import get_current_user, verify_token
from cart_service import models
from typing import Annotated

models.Base.metadata.create_all(bind=engine)
router = APIRouter(prefix="/cart")

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

def get_or_create_cart(db: db_dependency, 
                       user_id: str):
    cart = db.query(Cart).filter(Cart.user_id == user_id).first()
    if not cart:
        cart = Cart(user_id=user_id)
        db.add(cart)
        db.commit()
        db.refresh(cart)
    return cart

@router.post('/add_item/')
def add_to_cart(item: CartItemRequest, 
                db: db_dependency, 
                user_id: str = Depends(verify_token), 
                status_code=status.HTTP_201_CREATED):
    cart = get_or_create_cart(db, user_id['sub'])
    cart_item = db.query(CartItem).filter(
        CartItem.cart_id == cart.id,
        CartItem.product_id == item.product_id
    ).first()

    if cart_item:
        cart_item.quantity += item.quantity
    else:
        new_item = CartItem(
            cart_id=cart.id,
            product_id=item.product_id,
            quantity=item.quantity,
            name = item.name,
            price = item.price
        )
        db.add(new_item)
    db.commit()
    # print({"message": "Item added to cart", "product_id": item.product_id, "quantity": item.quantity, 'name': item.name})
    return JSONResponse(
        content={"message": "Item added to cart", "product_id": item.product_id, "quantity": item.quantity},
        status_code=status.HTTP_201_CREATED
    )

@router.get('/get_cart/')
def get_cart(db: db_dependency, 
             user_id: str = Depends(get_current_user)):
    cart = get_or_create_cart(db, user_id)
    if not cart:
        raise HTTPException(status_code=404, detail="Cart not found")
        
    items_response = [
        CartItemResponse(
            id=item.id,
            product_id=item.product_id,
            quantity=item.quantity,
            name=item.name,
            price=item.price
        )
        for item in cart.items  
    ]
   
    return {
        "id": cart.id,
        "user_id": cart.user_id,
        "items": items_response,
    }

@router.put('/remove_item/{item_id}')
def remove_from_cart(item_id: int, 
                     db: db_dependency, 
                     user_id: str = Depends(get_current_user)):

    cart = get_or_create_cart(db, user_id)
    cart_item = db.query(CartItem).filter(CartItem.id == item_id, CartItem.cart_id == cart.id).first()
    if not cart_item:
        raise HTTPException(status_code=404, detail="Item not found in cart")
    db.delete(cart_item)
    db.commit() 
