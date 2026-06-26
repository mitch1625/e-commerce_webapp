import IndividualProductComponent from "./IndividualProductComponent"
import { productApi } from "../utilities"
import { useEffect, useState } from "react"

function FeaturedProductsComponent () {
  const [featuredProducts, setFeaturedProducts] = useState([])

  const getFeaturedProducts = async() => {
    let response = await productApi.get('/featured_products/')
    setFeaturedProducts(response.data)
  }

  useEffect(() => {
    getFeaturedProducts()
  }, [])

 return (
  <>
   <div id='featured-items-header'>Discover Our Best-Selling Coffees</div>
   <div id='featured-product-container'>
    {featuredProducts.map((product,index) => (
      <IndividualProductComponent
        key={index}
        product={product}
        />
    ))}
   </div>
  </>
 )
}



export default FeaturedProductsComponent