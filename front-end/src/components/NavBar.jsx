import { useContext } from "react"
import { Link } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import { api } from "../utilities"

function NavBar( {user}) {

 return (
  <>
  <div id='nav-bar' className="flex flex-row justify-between">
    <div><Link to='/'>Coffee Shop</Link></div>
    <nav className="flex justify-evenly w-1/2">
     <Link to='/'>Home</Link>
     <Link to='/products'>Shop</Link>
     {user ?
     <>
      <div>Logout</div>
      <Link to='/cart'>Cart</Link>
     </>
     :
      <Link to='/login'>Login/Register</Link>
     }
    </nav>
  </div>
  </>
 )
}


export default NavBar