import axios from "axios"
import { useRouter } from "next/router"
import { useMutation } from "react-query"
import { useDispatch } from "react-redux";

export const axiosOne = axios.create({
    baseURL: 'http://localhost:8080'
})


const login = async (user) => {
    const response = await axiosOne.post("/users/login", user)
    return response.data
}

export const useLogin = () => {
    const router = useRouter()
    
    const {
        error, isError, isLoading, isSuccess, mutate, mutateAsync, reset, status
    } = useMutation(login, {
        onSuccess: (data) => {
            router.push("/articles/1")
            console.log(data)
            localStorage.setItem("token",data)

        },
        onError: (e) => { console.log('err', e) }
    })


    return { error, isError, isLoading, isSuccess, mutate };
} 