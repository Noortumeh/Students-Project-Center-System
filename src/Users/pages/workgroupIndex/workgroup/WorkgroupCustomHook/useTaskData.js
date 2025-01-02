import { useQuery } from "@tanstack/react-query";
import { fetchTaskData } from "../../../../../util/httpsForUser/https";

export default function useTaskData(id){
    const {data, isLoading, error} = useQuery({
        queryKey:['task', id],
        queryFn:  () => fetchTaskData(id),
        enabled: !!id,
        staleTime: 10000
    });
    return { taskData: data, taskDataLoading: isLoading, taskDataErr: error };
}