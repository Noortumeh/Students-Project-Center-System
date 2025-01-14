import { Box, CircularProgress, Container } from '@mui/material';
import TaskProgressCard from '../../../components/TaskProgressCard';
import { useWorkgroup } from './WorkgroupCustomHook/useWorkgroup';
import { useNavigate, useParams } from 'react-router-dom';
import MemberTable from '../../../components/MemberTable';
import CustomButton from '../../../components/CustomButton';

export default function WorkgroupHome() {
    const navigate = useNavigate();
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
        <Container maxWidth="lg"
        >
            {(data.role === 'supervisor' || data.role === 'co_supervisor') && <CustomButton
                onClick={() => { navigate('addmembers') }}
                sx={{ flex: 1 }}
            >
                Add Members
            </CustomButton>}
            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', mr: 5, mt: 3, mb: 5 }}>
                <Box sx={{ mb: 5 }}>
                    <TaskProgressCard title='Task Name' buttonName='Go to Tasks' link="./tasks" percentage={data.progress} />
                </Box>
                <MemberTable
                    columns={columns}
                    rows={data.members}
                    title="Workgroup Members"
                />
            </Box >
        </Container>
    );
}