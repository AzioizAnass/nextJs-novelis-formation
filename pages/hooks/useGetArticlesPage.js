import axios from "axios"
import { useQuery } from "react-query"

export const axiosOne = axios.create({
    baseURL: 'http://localhost:8080'
})

export const getArticlePage = async (page, pageSize) => {
    const token = localStorage.getItem("token")
    const response = await axiosOne.get(`/articles/getAtricleByPage/${page}/${pageSize}`, {
        headers: {
            'Authorization': 'Bearer ' +token
        }
    })
    return response.data
}

export const useGetArticlesPage = (page, pageSize) => {
    const {
        isLoading,
        isError,
        error,
        data: pageArticles,
        isFetching,
        isPreviousData,
    } = useQuery(['articlesByPage', page], () => getArticlePage(page - 1, pageSize), {
        keepPreviousData: true
    })

    return {
        isLoading,
        isError,
        pageArticles
    };
} 