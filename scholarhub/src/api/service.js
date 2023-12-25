import axios from "axios";

const service = axios.create({
    baseURL: '/api',
    // timeout: 10000
})

service.interceptors.request.use((config) => {
    return config
}, (error) => {
    return Promise.reject(error)
})

service.interceptors.response.use((response) => {
    return response
}, (error) => {
    return Promise.reject(error)
})


export default service;
