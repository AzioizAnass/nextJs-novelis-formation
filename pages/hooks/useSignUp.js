import axios from "axios"
import { useMutation } from "react-query"
import { useRouter } from "next/router"

export const axiosOne = axios.create({
    baseURL: 'http://localhost:8080'
})

const postUser = async (user) => {
    
    const response = await axiosOne.post("/users/addUser", user)
    return response.data
}

export const useSignUp = () => {
    const router = useRouter()
    const { error, isError, isLoading, isSuccess, mutate, mutateAsync, reset, status } = useMutation(postUser, {
        onSuccess: (data) => {
            router.push("/articles/1")
            localStorage.setItem("token",data)
        },
        onError: (e) => { console.log('err', e) }
    })
    return { error, isError, isLoading, isSuccess, mutate, }
}