import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import UserContext from "../contexts/UserContext"
import { api, setAuthToken } from "../utilities"

function NavBar( {user}) {
  const navigate = useNavigate()
  const { setUser } = useContext(UserContext)

  const handleLogout = async() => {
    try {
      localStorage.clear();
      setUser(null)
      setAuthToken(null)
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.error("Logout failed", err)
    }
  }

 return (
  <>
  <div id='nav-bar' className="flex flex-row justify-between">
    <div><Link to='/'>Coffee Shop</Link></div>
    <nav className="flex justify-evenly w-1/2">
     <Link to='/'>Home</Link>
     <Link to='/products'>Shop</Link>
     {user ?
     <>
      <Link onClick={handleLogout} to="/">Logout</Link>
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