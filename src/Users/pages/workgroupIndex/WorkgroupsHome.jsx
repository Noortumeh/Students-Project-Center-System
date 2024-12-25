import { Box, CircularProgress } from "@mui/material";
import WorkgroupCard from "../../components/Card";
import { getWorkgroups } from "../../../util/httpsForUser/https";
import { useQuery } from "@tanstack/react-query";
export default function WorkgroupsHome() {
    const { data, isFetching, isError, error } = useQuery({
        queryKey: ['workgroups'],
        queryFn: getWorkgroups,
    });
    let content = null;
    if (isFetching) {
        content = <Box sx={{ textAlign: 'center' }}><CircularProgress /></Box>;
    }
    if (isError) {
        content = <Box sx={{ textAlign: 'center' }}>{error.message}</Box>;
    }
    if (data) {
        content = (
            <Box sx={{ display: 'flex', flexDirection:{xs: 'column', md:'row'}, alignItems: 'center', justifyContent: 'space-around' }}>
                {data.result.map((workgroup) => (
                    <WorkgroupCard
                        key={workgroup.id}
                        title={workgroup.name}
                        description={`Team: ${workgroup.team}, Customer: ${workgroup.customerName}, Supervisor: ${workgroup.supervisorName}`}
                        action={'Enter'}
                        id={workgroup.id}
                    />
                ))}
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 5 }}>
            <h1 style={{ textAlign: "center" }}>Workgroups Home</h1>
            {content}
        </Box>
    );
}