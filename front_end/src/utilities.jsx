import axios from 'axios';
const USER_API = import.meta.env.VITE_USER_SERVICE
const PRODUCTS_API = import.meta.env.REACT_APP_PRODCUTS_SERVICE
const CART_API = import.meta.env.REACT_APP_CART_SERVICE

export const api = axios.create({
  baseURL: `${USER_API}/users`
})
export const productApi = axios.create({
  baseURL: `${PRODUCTS_API}/products`
})

export const cartApi = axios.create({
  baseURL: `${CART_API}/cart`
})

export const convertApi = axios.create({
  baseURL: "http://127.0.0.1:8003"
})

export const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`
  } else {
    delete api.defaults.headers.common["Authorization"]
  }
}