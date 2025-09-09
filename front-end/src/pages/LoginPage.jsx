import { useContext, useState } from "react"
import ButtonComponent from "../components/ButtonComponent"
import { useNavigate } from "react-router-dom"
import { useOutletContext } from "react-router-dom";
import { api } from "../utilities";
import { Link } from "react-router-dom"
import UserContext from "../contexts/UserContext";

function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext)

  const login = async(e) => {
    e.preventDefault()
    try {
      let response = await api.post('/login/', {
        email:email,
        password:password
      })
      setUser(response.data.user_id)
      localStorage.setItem('token', response.data.token);
      api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
      navigate('/')
    } catch (err) {
        console.log(err.response.data)
      }
  }

 return (
  <>
    <div id='login-page'>
      <div className="login-register-container">
        <div className="login-register-header">My Account</div>
        <div className="login-register-subtext">Login below to access your account</div>
      </div>
    <form type='submit' onSubmit={(e) => login(e)}>
      <div className="form-labels">
        EMAIL ADDRESS
        <input 
          type='text' 
          name='email'
          placeholder="Enter Email Address"
          onChange={(e)=>setEmail(e.target.value)}>
          </input>
      </div> 
      <div className="form-labels">
        PASSWORD
        <input type='password' 
        name='passwrod' 
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}>
          
        </input>
      </div> 
    <button id="login-register-button" type="submit">Login</button>
    </form>
    <div className="login-register-redirect-text">
      Don't have an account? Click <Link to='/register'>here to register.</Link>
    </div>
    </div>
  </>
 )
} 
 

export default LoginPage 