import IndividualProductComponent from "../components/IndividualProductComponent"
import SortByComponent from "../components/SortByComponent"
import { useEffect, useState } from "react"
import { allProducts } from "../productData"
import {productApi} from '../utilities'


function AllProductsPage() {
  const [sortGroup, setSortGroup] = useState("AlphaA-Z")
  const [allProducts, setAllProducts] = useState([])
  const [sortedProducts, setSortedProducts] = useState([])
  function handleSort(event) {
    setSortGroup(event.target.value)
  }

  const getAllProducts = async() => {
    let response = await productApi.get('/all_products/')
    setAllProducts(response.data)
  }

  useEffect(() => {
    let sorted = [...allProducts]  // copy array to avoid mutating state
    switch (sortGroup) {
      case "AlphaA-Z":
        sorted.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "AlphaZ-A":
        sorted.sort((a, b) => b.name.localeCompare(a.name))
        break
      case "PriceLow-High":
        sorted.sort((a, b) => a.price - b.price)
        break
      case "PriceHigh-Low":
        sorted.sort((a, b) => b.price - a.price)
        break
    }

    setSortedProducts(sorted)
  }, [sortGroup, allProducts])

  
useEffect(() => {
  getAllProducts()
},[])
 

 return (
  <>
    <div id='all-products-text-container'>
      <div id='all-products-header'>All Single Origin Coffee</div>
      <div id='all-products-desc'>Our single origin coffee is a celebration of coffee’s true essence, offering a rich and distinct taste experience that highlights the unique flavors of beans sourced from a single region. Unlike blends, each cup delivers the pure character and signature profile of its origin—whether it's the fruity brightness of Ethiopia, the chocolatey smoothness of Guatemala, or the earthy depth of Sumatra. Perfect for the discerning coffee drinker, our selection of single origin coffees showcases the best beans from around the world, ethically sourced from sustainable farms. Each batch is roasted to highlight its natural flavors, delivering an authentic and unforgettable coffee experience in every sip.</div>
    </div>
    <SortByComponent handleSort={handleSort}/>
    <div id='all-product-container'>
      {sortedProducts.map((product, index) => (
        <IndividualProductComponent 
          product={product}
          key={index}
        />
      ))}
    </div>
  </>
 )
}


export default AllProductsPage