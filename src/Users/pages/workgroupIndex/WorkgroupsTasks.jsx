import { Box, Button, CircularProgress } from "@mui/material";
import DataTable from "../../components/DataTable";
import { useQuery } from "@tanstack/react-query";
import { getSupervisorTasks } from "../../../util/httpsForUser/https";

export default function WorkgroupsTasks() {
    const {data, isLoading, error} = useQuery({
        queryKey:['tasks'],
        queryFn: getSupervisorTasks,
        keepPreviousData: true,
    });
    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }
    if (error) {
        return <div>Error: {error.message}</div>;
    }
    console.log(data.result)
    const columns = [
        { id: 'title', label: 'Title', minWidth: 170 },
        { id: 'workgroupName', label: 'Workgroup Name', minWidth: 170 },
        { id: 'status', label: 'Status', minWidth: 130 },
        { id: 'action', label: 'Action', minWidth: 130 },
    ];
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
            <h1 style={{ textAlign: "center" }}>Workgroups Tasks</h1>
            <DataTable columns={columns} rows={data.result} title={"ALL Tasks"} />
        </Box>
    );
}