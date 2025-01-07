import { useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { confirmEmail } from './AuthHttp';

export default function ConfirmationComponent({ apiEndpoint, successMessage, errorMessage, buttonLabel, redirectPath }) {
    const navigate = useNavigate();

    const { mutate, isLoading, isSuccess, error } = useMutation({
        mutationFn: confirmEmail,
    });

    useEffect(() => {
        // Replace this with actual token and id logic
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');
        const id = queryParams.get('userId');
        if (token && id) {
            mutate({ apiEndpoint, token, id });
        }
    }, []);

    const handleRedirect = () => {
        navigate(redirectPath);
    };

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                gap: 3,
                px: 2,
            }}
        >
            {isSuccess ? (
                <>
                    <Typography variant="h4" component="h1">
                        {successMessage}
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleRedirect}
                    >
                        {buttonLabel}
                    </Button>
                </>
            ) : (
                <>
                    <Typography variant="h4" component="h1" color="error">
                        {errorMessage}
                    </Typography>
                    <Typography variant="body1">
                        {error?.message || 'Something went wrong. Please try again later.'}
                    </Typography>
                </>
            )}
        </Box>
    );
}
