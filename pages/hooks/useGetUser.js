import axios from "axios"
import { useQuery } from "react-query"

export const axiosOne = axios.create({
    baseURL: 'http://localhost:8080'
})

export const getUser = async (username) => {
    const token = localStorage.getItem("token")
    const response = await axiosOne.get(`/users/getByUsername/${username}`,{
        headers: {
            'Authorization': token
        }
    })
    return response.data
}

export const useGetUser = (username)=>{
const {
    isLoading,
    isError,
    error,
    data: user,
    isFetching,
    isPreviousData,
} = useQuery('user', () => getUser(username), {
    keepPreviousData : true
})

return {
    isLoading,
    isError,
    user
} ; 
} 