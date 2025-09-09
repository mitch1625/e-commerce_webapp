// import { Outlet } from 'react-router-dom'
// import NavBar from './NavBar'
// import { useEffect, useState } from 'react'
// import { api } from '../utilities'

// function Layout() {
//   const [user, setUser] = useState(null)

//   const getInfo = async () => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       api.defaults.headers.common["Authorization"] = `Bearer ${token}`
//       try {
//         const response = await api.get("/userinfo/")
//         setUser(response.data.display_name)
//       } catch (err) {
//         console.log(err)
//       }
//     }
//   }

//   useEffect(() => {
//     getInfo()
//   }, [])

//   return (
//     <>
//       <Outlet context={{ user, setUser }} />
//     </>
//   )
// }

// export default Layout