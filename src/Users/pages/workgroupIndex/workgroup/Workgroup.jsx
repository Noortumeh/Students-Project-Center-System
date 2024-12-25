import { Box, CircularProgress } from '@mui/material';
import TaskProgressCard from '../../../components/TaskProgressCard';
import { useWorkgroup } from './WorkgroupCustomHook/useWorkgroup';
import { useParams } from 'react-router-dom';
import DataTable from '../../../components/DataTable';

export default function WorkgroupHome() {
    const { workgroupId } = useParams();
    const { data, isLoading, error } = useWorkgroup(workgroupId);
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
    const columns = [
        { id: 'fullName', label: 'Full Name', minWidth: 170 },
        { id: 'email', label: 'Email', minWidth: 170 },
        { id: 'role', label: 'Role', minWidth: 130 },
    ];
    console.log(data)
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '30px', marginTop: '10px' }}>
            <Box sx={{ mb: 5 }}>
                <TaskProgressCard title= 'Task Name' buttonName='Go to Tasks' link="./tasks" percentage={data.progress} />
            </Box>
            <DataTable
                columns={columns}
                rows={data.members}
                title="Workgroup Members"
            />
        </Box >
    );
}