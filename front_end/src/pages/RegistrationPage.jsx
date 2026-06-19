import { useState, useEffect, useContext } from "react"
import { data, Link, useOutletContext } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { api } from "../utilities"
import UserContext from "../contexts/UserContext"

function RegistrationPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const navigate = useNavigate()
  const [user, setUser] = useContext(UserContext)
  
  const createUser = async(e) => {
    e.preventDefault()
    let data = {
      "email": email,
      "first_name": firstName,
      "last_name": lastName,
      "password": password
    }

    try {
      let response = await api.post('/signup/', data)
      if (response.status === 201) {
        setUser(response.data.user_id)
        localStorage.setItem('token', response.data.token);
        api.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`
        }
      } catch (err) {
        console.log(err.response.data)
      }

  }

 return (
  <>
   <div id='registration-page'>
      <div className="login-register-container">
        <div className="login-register-header">Register Account</div>
        <div className="login-register-subtext">Enter information to create an account</div>
      </div>
    <form type='submit' onSubmit={(e) => createUser(e)}>
      <div className="form-labels">
        FIRST NAME
        <input 
          type='text' 
          name='first-name'
          placeholder="Enter First Name"
          onChange={(e)=>setFirstName(e.target.value)}>
          </input>
      </div> 
      <div className="form-labels">
        LAST NAME
        <input 
          type='text' 
          name='last-name'
          placeholder="Enter Last Name"
          onChange={(e)=>setLastName(e.target.value)}>
          </input>
      </div>
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
        name='password' 
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}>
        </input>
      </div> 
    <button id="login-register-button" type="submit">Register</button>
    </form>
    <div className="login-register-redirect-text">
      Already have an account? Click <Link to='/login'>here to login.</Link>
    </div>
    </div>
  </>
 )
}


export default RegistrationPage