import axios from "axios";
import { config } from "vue/types/umd";

const service = axios.create({
    baseURL: '/api',
    timeout: 3000
})

service.interceptors.request.use((config)=>{

    return config
},(error)=>{
    return Promise.reject(error)
})


service.interceptors.response.use((response)=>{
    return response
},(error)=>{
    return Promise.reject(error)
})

export default service;