import axios from 'axios'

axios.defaults.baseURL = 'http://5.9.121.164:8011/'
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.access_token}`

window.axios = axios

export default axios