import axios from 'axios'
import store from 'store'
import { showError } from 'store/snackbar/actions'

const baseUrl = 'https://www.googleapis.com/books/v1/volumes'

const instance = axios.create({
  baseURL: baseUrl,
})

instance.interceptors.request.use(
  (config) => {
    return { ...config, params: { ...config.params, key: process.env.BOOKS_API_KEY } }
  },
  (error) => {
    store.dispatch(showError(error.message))
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    if (response.status >= 400) {
      store.dispatch(showError(response.data.error.message))
    }
    return response
  },
  (error) => {
    store.dispatch(showError(error.message))
    return Promise.reject(error)
  },
)

export default instance
