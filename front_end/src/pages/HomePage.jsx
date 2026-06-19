import croppedBanner from "../assets/cropped-banner.png"
import FeaturedProductsComponent from '../components/FeaturedProductsComponent'
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const navigate = useNavigate()

  const redirectClick = () => {
    navigate('/products')
  }
 return (
  <>
  <div id='banner-container'>
    <div>
   <div className='banner-text'>Brewed to Perfection.<br/>
    Delivered to Your Door.</div> 
    </div>
    <button id='banner-button' onClick={redirectClick}>
      Shop Now
    </button>
   <img id='home-banner' src={croppedBanner}/>
  </div>
  <FeaturedProductsComponent/>
  </>
 )
}

export default HomePage