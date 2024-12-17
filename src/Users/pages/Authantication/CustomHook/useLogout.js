import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { logout, queryClient } from "../../../../util/httpsForUser/https";
import { useNavigate } from "react-router-dom";

export const useLogout = () =>{
    const navigate = useNavigate()

    const { mutateAsync , isPending } = useMutation({
        mutationFn: logout,
        onSuccess:async () => {
            toast.success('Logout successfully!');
            await queryClient.cancelQueries();
            queryClient.clear();
            queryClient.invalidateQueries();
            // queryClient.removeQueries();
            // queryClient.invalidateQueries();
            window.location.replace('/');
        },
        onError: ()=>{
            toast.error('Invalid Credentials!');
        }
    });

    return {logoutMutate : mutateAsync, isPending };
}