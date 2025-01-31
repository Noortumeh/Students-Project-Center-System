import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../../../util/httpsForUser/https";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const useLogin = () =>{
    const navigate = useNavigate()
    const queryClient = useQueryClient();

    const { mutateAsync , isPending, error, isError } = useMutation({
        mutationFn: login,
        onSuccess: () => {
            toast.success('Login successfully!')
            window.location.reload();
            navigate('/');
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: ()=>{
            toast.error('Invalid Credentials!');
        }
    });

    return {loginMutate : mutateAsync, isPending, error, isError };
}