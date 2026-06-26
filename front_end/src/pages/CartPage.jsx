import { cartApi } from "../utilities"
import { useEffect, useState } from "react"
import CartItemComponent from '../components/CartItemComponent'

function CartPage() {
  const [cartItems, setCartItems] = useState([]) 
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCartItems = async() => {
      let token = localStorage.getItem('token')
      if (token) {
        try {
          let response = await cartApi.get('/get_cart/', {
            headers: {
              'Authorization' : `Bearer ${token}`,
              'Content-Type': 'application/json', 
            }
          }
          )
          setCartItems(response.data)
          setLoading(false)
        } catch (err) {
          console.log(err.response)
          setLoading(false)
        }
      }
    }
    getCartItems()
  }, [loading])
  
   if (loading) {
    return <div></div>
  }

 return (
  <>
  <div id='cart-container'>
    <div id='cart-item-container'>
      <div>
        {!cartItems ? 
          (<p>Cart is empty</p>)
           : 
          (cartItems.items.map((item, index) => (
            <CartItemComponent 
            product={item}
            key={index}
            />
          )))
        } 

      </div>
    </div>
  </div>  
  </>
 )
}

export default CartPage