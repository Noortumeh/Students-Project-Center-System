import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

export default function ForgetPasswordPage() {
    const [email, setEmail] = useState('');
    const [success, setSuccess] = useState(false);

    const { mutate, isLoading } = useMutation({
            mutationFn: async () => {
                const response = await fetch('https://your-backend-api.com/api/request-reset-password', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) {
                    throw new Error('Failed to send reset password email.');
                }

                return response.json();
            },
            onSuccess: () => setSuccess(true),
        });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate();
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                gap: 3,
                px: 2,
            }}
        >
            {success ? (
                <Typography variant="h5" component="p">
                    A reset password link has been sent to your email.
                </Typography>
            ) : (
                <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Forgot Password
                    </Typography>
                    <Typography variant="body1">
                        Please enter your email to confirm it.
                    </Typography>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        disabled={isLoading}
                        sx={{ mt: 2 }}
                    >
                        {isLoading ? 'Sending...' : 'Submit'}
                    </Button>
                </form>
            )}
        </Box>
    );
}
