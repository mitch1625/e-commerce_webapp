import axios from 'axios';

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/"
})

export const productApi = axios.create({
  baseURL: "http://127.0.0.1:8001/"
})

export const cartApi = axios.create({
  baseURL: "http://127.0.0.1:8002/"
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