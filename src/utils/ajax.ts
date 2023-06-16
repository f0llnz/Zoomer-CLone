import axios from "axios";



const ajax = axios.create({
    baseURL:import.meta.env.VITE_API_KEY,
    headers: {
        Accept:"application/json",
        "Content-Type":"application/json"
    }
})



export default ajax