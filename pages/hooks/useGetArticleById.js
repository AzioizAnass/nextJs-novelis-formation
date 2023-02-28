import axios from "axios"
import { useQuery } from "react-query"

const axiosOne = axios.create({
    baseURL: 'http://localhost:8080'
})

export const getArticleById = async (id) => {
    const token = localStorage.getItem("token")
    const response = await axiosOne.get(`/articles/${id}`,
    {headers: {
        'Authorization': 'Bearer ' +token
    }})
    return response.data
}

export const useGetArticleById = (id)=>{
const {
    isLoading,
    isError,
    error,
    data: article,
    isFetching,
    isPreviousData,
} = useQuery('articleById', () => getArticleById(id), {
    keepPreviousData : true
})

return {isLoading,isError,article} ; 
} 