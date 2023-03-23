import axios from "axios"
//const URL = import.meta.env.VITE_BACKEND
const URL = "http://192.168.1.207:5000/api"

const api = axios.create({
    baseURL: URL,
})
export default api;