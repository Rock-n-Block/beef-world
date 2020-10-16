import axios from 'axios'

axios.defaults.baseURL = 'https://beefdev.rocknblock.io/api'
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.access_token}`

window.axios = axios

export default axios