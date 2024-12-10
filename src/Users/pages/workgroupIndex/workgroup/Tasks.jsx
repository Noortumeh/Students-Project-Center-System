import { Box } from "@mui/material";
import ProgressCircle from "../../../components/ProgressCircle";

export default function TasksPage() {
    return (
        <Box>
            
            <h1 style={{ textAlign: "center" }}>Tasks Page</h1>
            <Box>
                <ProgressCircle totalTasks={5} />
            </Box>
        </Box>
    )
}