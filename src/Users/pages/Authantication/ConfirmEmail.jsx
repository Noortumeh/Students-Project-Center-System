import { useEffect } from 'react';
import { Box, Typography, Button, CircularProgress } from '@mui/material';
import { useNavigate, useLoaderData } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export default function ConfirmEmail() {
    const navigate = useNavigate();
    const { token, id } = useLoaderData();

    // Mutation for sending token and id to the backend
    const {mutate, isLoading, isSuccess, error} = useMutation({
        mutationFn: async () => {
            const response = await fetch(`http://spcs.somee.com/api/auth/confirm-email?userId=${id}&token=${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to confirm email.');
            }

            return response.json();
        }
    });

    useEffect(() => {
        mutate();
    }, []);

    const handleLoginRedirect = () => {
        navigate('/login');
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
                        Email Confirmed Successfully!
                    </Typography>
                    <Typography variant="body1">
                        Your email address has been successfully verified. You can now log in to your account.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleLoginRedirect}
                    >
                        Go to Login
                    </Button>
                </>
            ) : (
                <>
                    <Typography variant="h4" component="h1" color="error">
                        Confirmation Failed
                    </Typography>
                    <Typography variant="body1">
                        {error?.message || 'Something went wrong. Please try again later.'}
                    </Typography>
                </>
            )}
        </Box>
    );
}
// export function Loader({ params }){

// }
