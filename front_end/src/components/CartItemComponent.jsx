import { useState, useEffect } from "react"
import {cartApi} from "../utilities/"


const CartItemComponent = ({product}) => {
  const [quantity, setQuantity] = useState(product.quantity)
  const [price, setPrice] = useState(product.price * product.quantity) 

  const deleteCartItem = async(e) => {
    let token = localStorage.getItem('token')
    if (token) {
      try {
        let response = await cartApi.put(`/cart/remove/${product.id}`,null, {
            headers: {
              'Authorization' : `Bearer ${token}`,
              'Content-Type': 'application/json', 
            }
          })
        window.location.reload()
      } catch (err) {
        console.log(err.response)
      }
   }
  }


  const decreaseQuantity = () => {
    if (quantity > 1){
      const newQuantity = quantity - 1
      setQuantity(newQuantity)
      setPrice(product.price * newQuantity)
    }
  }

  const increaseQuantity = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)
    setPrice(product.price * newQuantity)
  }

  return (
    <>
      <div>
          <div className='cart-item'>
            <div id="cart-product-name">{product.name}</div>
            <div>
              <button className='cart-quantity-button' onClick={decreaseQuantity}>-</button>
              <input 
                className='cart-product-quantity' 
                type='number' 
                value={quantity} 
                onChange={(e) => {
                  const newQuantity = Number(e.target.value)
                  setQuantity(newQuantity)
                  setPrice(product.price * newQuantity)
                }}
              />
              <button className='cart-quantity-button' onClick={increaseQuantity}>+</button>
            </div>
            <div id='cart-product-price'>${price}</div>
            <button onClick={(e) => deleteCartItem(e)}>Delete Item</button>
          </div>
      </div>
    </>
  )
}


export default CartItemComponent