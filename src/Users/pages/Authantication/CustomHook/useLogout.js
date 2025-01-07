import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { logout, queryClient } from "../../../../util/httpsForUser/https";

export const useLogout = () =>{

    const { mutateAsync , isPending } = useMutation({
        mutationFn: logout,
        onSuccess:async () => {
            toast.success('Logout successfully!');
            await queryClient.cancelQueries();
            queryClient.clear();
            queryClient.invalidateQueries();
            window.location.replace('/');
        },
        onError: ()=>{
            toast.error('Invalid Credentials!');
        }
    });

    return {logoutMutate : mutateAsync, isPending };
}