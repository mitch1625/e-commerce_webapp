import coffeeImg from "../assets/coffeeBag.png"
import { useNavigate } from "react-router-dom"
import { cartApi } from "../utilities"
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { ToastContainer, Zoom, toast } from 'react-toastify';

function IndividualProductComponent({product}) {
  const navigate = useNavigate()
  const {user}= useContext(UserContext)
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
        let response = await cartApi.post('/add_item/', data, {
          headers: {
            'Authorization' : `Bearer ${token}`,
            'Content-Type': 'application/json', 
          }
        })
        if (response.status === 201) {
          toast.success('Item added to cart', {
          position: "bottom-center",
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
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
        <button 
          type='button' 
          onClick={(e)=> {
            user ?  addItemToCart(e) : navigate('/login')
          }}
        >
          Quick Add
        </button>
        <button type='button' onClick={detailsPageRedirect}>Details</button>
        <ToastContainer
        position="bottom-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Zoom}
        />
      </div>
      </div>
    </>
  )
  }


export default IndividualProductComponent