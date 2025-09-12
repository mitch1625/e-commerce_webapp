import './App.css'
import { BrowserRouter as Router, Routes, Route, useOutletContext } from 'react-router-dom'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'
import LoginPage from "./pages/LoginPage"
import RegistrationPage from "./pages/RegistrationPage"
import AllProductsPage from "./pages/AllProductsPage"
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import { useEffect, useState } from 'react'
import UserContext from './contexts/UserContext'
import { api } from './utilities'


function App() {
  const [user, setUser] = useState(null)

  const checkUser = async() => {
    let token = localStorage.getItem('token')
    if (token){
      console.log(token)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
      let response = await api.get('/userinfo/')
      console.log(response)
      setUser(response.data.email)
    }
  }

  useEffect(() => {
    checkUser()
  }, [])


  return (
    <>
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <NavBar user={user}/>
          <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/login' element={<LoginPage/>}></Route>
            <Route path='/register' element={<RegistrationPage/>}></Route>
            <Route path='/products' element={<AllProductsPage/>}></Route>
            <Route path='/cart' element={<CartPage/>}></Route>
            <Route path='/products/:productId' element={<ProductDetailPage/>}></Route>
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  )
}

export default App
