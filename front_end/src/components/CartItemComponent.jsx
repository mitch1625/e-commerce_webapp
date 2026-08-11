import { useState, useEffect } from "react"
import {cartApi} from "../utilities/"


const CartItemComponent = ({product}) => {
  const [quantity, setQuantity] = useState(product.quantity)
  const [price, setPrice] = useState(product.price * product.quantity) 

  const deleteCartItem = async(e) => {
    let token = localStorage.getItem('token')
    if (token) {
      try {
        let response = await cartApi.put(`/remove_item/${product.id}`,null, {
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

  const updateCartItemQuantity = async(newQuantity) => {
    let token = localStorage.getItem('token')
    if (token) {
      try {
        let response = await cartApi.put(`/update_cart/${product.id}`,
          {
            quantity: newQuantity 
          },
          { 
            headers: {
              'Authorization' : `Bearer ${token}`,
              'Content-Type': 'application/json', 
            }
          }
        )
        setQuantity(newQuantity) 
        setPrice(product.price * newQuantity)
        } catch (error) {
          console.error("Failed to update cart item:", error)
        }
      }
    }

  const decreaseQuantity = async() => {
    const newQuantity = quantity - 1 
    await updateCartItemQuantity(newQuantity) 
  }

  const increaseQuantity = async() => { 
    const newQuantity = quantity + 1 
    await updateCartItemQuantity(newQuantity) 
  }

  const handleQuantityChange = async (e) => { 
    const newQuantity = Number(e.target.value) 
    if (newQuantity >= 1) { 
      await updateCartItemQuantity(newQuantity) } 
    }

  return (
    <>
      <div>
          <div className='cart-item'>
            <div id="cart-product-name">{product.name}</div>
            <div className="cart-quantity-box">
              <button className='cart-quantity-button' onClick={decreaseQuantity}>-</button>
              <input 
                className="cart-product-quantity" 
                type="number" 
                min="1" 
                value={quantity} 
                onChange={handleQuantityChange} 
              />
              <button className='cart-quantity-button' onClick={increaseQuantity}>+</button>
            </div>
            <div id='cart-product-price'>${price.toFixed(2)}</div>
            <button onClick={(e) => deleteCartItem(e)}>Delete Item</button>
          </div>
      </div>
    </>
  )
}


export default CartItemComponent