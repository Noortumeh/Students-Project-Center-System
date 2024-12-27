import { useQuery } from "@tanstack/react-query";
import { fetchTasksForworkgroup } from "../../../../../util/httpsForUser/https";

export default function useTasks(id){
    const {data, isLoading, error} = useQuery({
        queryKey:['tasks', id],
        queryFn: () => fetchTasksForworkgroup(id),
        enabled: !!id,
    });
    return { tasks: data, tasksLoading: isLoading, tasksErr: error };
}