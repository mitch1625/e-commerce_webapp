import coffeeImg from "../assets/coffeeBag.png"
import { useNavigate } from "react-router-dom"
import { cartApi } from "../utilities"

function IndividualProductComponent({product}) {
  const navigate = useNavigate()
  
  const detailsPageRedirect = () => {
    navigate(`/products/${product.id}`)
  }
  const addItemToCart = async(e) => {
    e.preventDefault();
    let data = {
      product_id : product.id,
      quantity : 1,
      name : product.name,
      price: product.price
    }
    let token = localStorage.getItem('token')
    if (token) {
      try {
        console.log(data)
        let response = await cartApi.post('/cart/add/', data, {
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json', 
          }
        })
        console.log(response.status)
        if (response.status === 201) {
          alert('Item added to cart')
        }
      } catch (err) {
        console.log(err.response.data)
      }
    }
  }

  return (
    <>
    <div id='ind-product-container'>
      <img id='ind-product-img' src={coffeeImg}/>
      <div>
      <h3 id="ind-product-details">{product.name}</h3>
      <div id='ind-product-flavors'>{product.flavors[0]} • {product.flavors[1]} • {product.flavors[2]}</div>
      </div>
      <div id='featured-button-container'>
        <button type='button' onClick={(e)=> addItemToCart(e)}>Quick Add</button>
        <button type='button' onClick={detailsPageRedirect}>Details</button>
      </div>
      </div>
    </>
  )
  }


export default IndividualProductComponent