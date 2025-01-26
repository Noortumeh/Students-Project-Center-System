import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function ConfirmationComponent() {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/login');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '95vh',
                textAlign: 'center',
                gap: 3,
                color: 'Green'
            }}
        >
            <Typography variant="h3" component="h1" sx={{}}>
                Email Confirmed Successfully!
            </Typography>
            <Typography variant="h4" component="h1">
                You Can Log in Now!
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={handleRedirect}
            >
                Go To Login
            </Button>
        </Box>
    );
}
