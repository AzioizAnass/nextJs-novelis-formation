import axios from "axios"

export const axiosOne = axios.create({
    baseURL: 'http://localhost:8080'
})

export const getComments = async () => {
    const token = localStorage.getItem("token") 
    const response = await axiosOne.get("/comments/getAll",{
        headers: {
            'Authorization':'Bearer ' + token
        }
    })
    return response.data
}


