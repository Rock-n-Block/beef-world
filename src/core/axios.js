import axios from 'axios'

axios.defaults.baseURL = 'https://beef.world/api'
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.access_token}`

window.axios = axios

export default axios