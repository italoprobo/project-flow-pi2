import axios from 'axios'

const apiUrl = 'https://localhost:3000'

const api = axios.create({
    baseURL: apiUrl
})

export default api