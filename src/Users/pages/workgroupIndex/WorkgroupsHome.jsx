import { Box } from "@mui/material";
import WorkgroupCard from "../../components/Card";
export default function WorkgroupsHome() {
    return (
        <Box sx={{ mt: 5 }}>
            <h1 style={{ textAlign: "center" }}>Workgroups Home</h1>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <WorkgroupCard
                    title={'Workgroup Name1'}
                    description={" Team: student 1, Customer:Customer 1, Supervisor: Supervisor 1"}
                    action={'Enter'}
                    id={1}
                />
                <WorkgroupCard
                    title={'Workgroup Name2'}
                    description={" Team: student 1, Customer:Customer 1, Supervisor: Supervisor 1"}
                    action={'Enter'}
                    id={2}
                />
                <WorkgroupCard
                    title={'Workgroup Name3'}
                    description={" Team: student 1, Customer:Customer 1, Supervisor: Supervisor 1"}
                    action={'Enter'}
                    id={3}
                />
            </Box>
        </Box>
    );
}