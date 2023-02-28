import axios from "axios"
import { useRouter } from "next/router"
import { useMutation } from "react-query"

export const axiosOne = axios.create({
    baseURL: 'http://localhost:8080'
})


const comment = async (comment) => {
    const response = await axiosOne.post("/users/addComnt", comment)
    return response.data
}

export const useComment = () => {
    
    const {
        error:errorComment, isError:isErrorComment, isLoading:isLoadingComment, isSuccess:isSuccessComment, mutate:mutateComment, mutateAsync, reset, status
    } = useMutation(comment, {
        onSuccess: (data) => {
            console.log(data)

        },
        onError: (e) => { console.log('err', e) }
    })


    return { errorComment, isErrorComment, isLoadingComment, isSuccessComment, mutateComment };
} 