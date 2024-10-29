import { Box, List } from "@mui/material";
import Sidebar from "../components/sidebar";
import DescriptionCard from "../components/Card";

export default function WorkgroupsProjects() {
    return (
        <Box>
            <Box>
                <h1 style={{ textAlign: "center" }}>Workgroups Projects</h1>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                <DescriptionCard
                    title={'Project Name1'}
                    action={'Go To Project'}
                />
                <DescriptionCard
                    title={'Project Name2'}
                    action={'Go To Project'}
                />
                <DescriptionCard
                    title={'Project Name3'}
                    action={'Go To Project'}
                />
            </Box>
        </Box>
    );
}