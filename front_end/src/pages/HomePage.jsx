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
    <button id='banner-button' onClick={redirectClick}>
      Shop Now
    </button>
    </div>
   <img 
      id='home-banner' 
      src="https://d3pllegt6tci1b.cloudfront.net/cropped-banner.png"
      alt="coffee banner image"
    />
  </div>
  <FeaturedProductsComponent/>
  </>
 )
}

export default HomePage