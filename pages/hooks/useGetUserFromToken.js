import axios from "axios"
import { useQuery } from "react-query"
import { useDispatch } from "react-redux";
import {login} from '../features/user'
const axiosOne = axios.create({
    baseURL: 'http://localhost:8080'
})

export const getUserFromToken = async () => {
    const token = localStorage.getItem("token")
    const response = await axiosOne.get(`/users/token/${token}`)
    return response.data
}

export const useGetUserFromToken = (token)=>{
const dispatch = useDispatch()
const {
    isLoading : isLoadingUserToken,
    isError : isErrorUserToken,
    error,
    data: userToken,
    isFetching,
    isPreviousData,
} = useQuery('userToken', () => getUserFromToken(), {onSuccess: () => {
     dispatch(login(userToken))
  }})

return {
    isLoadingUserToken,
    isErrorUserToken,
    userToken
} ; 
} 