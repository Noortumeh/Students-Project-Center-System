import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../../util/httpsForUser/https";

export function useUser(){
    const {isFetching, data: user} = useQuery({
        queryKey: ['user'],
        queryFn: getCurrentUser,
    });
    return {isFetching, user, isAuth: user && true};
}