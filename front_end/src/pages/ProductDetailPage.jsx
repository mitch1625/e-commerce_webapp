import IndividualProductComponent from "../components/IndividualProductComponent"
import coffeeImg from "../assets/coffeeBag.png"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { productApi, cartApi, convertApi } from "../utilities"


function ProductDetailPage() {
  const [quantity, setQuantity] = useState(1)
  const [product, setProduct] = useState(null)
  const {productId} = useParams()
  const [loading, setLoading] = useState(true)
  const [price, setPrice] = useState('$14')
  const [selectedCurrency, setSelectedCurrency] = useState("USD")

  useEffect(() => {
    const getProduct = async(e) => {
      try {
        const response = await productApi.get(`/product/${productId}`)
        setProduct(response.data)
        setLoading(false)
      } catch (err) {
        console.log(err.response)
        setLoading(false)
      }
    } 
    getProduct()
  }, [productId])

  useEffect(() => {
    const convertCurrency = async() => {
      try {
        const response = await convertApi.post('/convert', {
          amount: product.price,
          from: "USD",
          to_currency: selectedCurrency,
        })
        const converted = response.data.converted_amount
        const symbolMap = {
          USD: "$",
          EUR: "€",
          JPY: "¥",
          GBP: "£"
        }
        
        setPrice(`${symbolMap[selectedCurrency]}${converted}`)
      } catch (err) {
        console.log(err.response.data)
      }
    }

    convertCurrency()
  }, [selectedCurrency])

  const addItemToCart = async(e) => {
      e.preventDefault();
    let data = {
      product_id : product.id,
      quantity : quantity,
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

  const decreaseQuantity = () => {
    if (quantity > 1){
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

   if (loading) {
    return <div></div>
  }

 return ( 
  <>
  <div id="product-details-container">
    <div id="product-details-product">
      <div id='ind-product-container'>
        <img id='ind-product-img' src={coffeeImg}/>
        <div>
        <h3 id="ind-product-details">{product.name}</h3>
        <div id='ind-product-flavors'>{product.flavors[0]} • {product.flavors[1]} • {product.flavors[2]}</div>
        </div>
        </div>
    </div>
    <div id='product-details-text'>
      <p>{product.description}</p>
      <div id='product-details-size-price'>
        Size: 12 oz bottle<br/>
        {price}
        <select id='currency-select' name='currency' value={selectedCurrency} onChange={(e) => setSelectedCurrency(e.target.value)}>
          <option className="currency">USD</option>
          <option className="currency">EUR</option>
          <option className="currency">JPY</option>
          <option className="currency">GBP</option>
        </select>
      </div>
    </div>
    <div id='product-details-button-container'>
      <div id='increase-decrease-quant'>
        <button onClick={() => decreaseQuantity()}>-</button>
        <input id='quantity-input' type='number' value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}></input>
        <button onClick={() => increaseQuantity()}>+</button>
      </div>
      <button type="button" onClick={(e) => addItemToCart(e)} >Add to Cart</button>
    </div>
    <div>
    </div>
  </div>
  </>
 )
}

export default ProductDetailPage