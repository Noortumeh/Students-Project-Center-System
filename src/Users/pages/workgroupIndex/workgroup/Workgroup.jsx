import { Box } from '@mui/material';
import TaskProgressCard from '../../../components/TaskCard';

export default function WorkgroupHome() {
    return (
        <Box  sx = {{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight:'20%', marginTop:'10px'}}>
                <Box>
                    <TaskProgressCard />
                </Box>
                <Box>
                    <h1 style={{ textAlign: "center" }}>Table</h1>
                </Box>
        </Box >
    );
}