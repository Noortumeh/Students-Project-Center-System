import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';

export default function ResetPasswordPage() {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { mutate, isLoading, isSuccess, error } = useMutation({
        mutationFn: async (data) => {
            const response = await fetch('https://your-backend-api.com/api/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to reset password.');
            }

            return response.json();
        },
        onSuccess: () => navigate('/login'),
    }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        const queryParams = new URLSearchParams(window.location.search);
        const token = queryParams.get('token');
        const id = queryParams.get('id');
        mutate({ token, id, password });
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
            <form onSubmit={handleSubmit} style={{ width: '100%', maxWidth: '400px' }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Reset Password
                </Typography>
                <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    sx={{ mt: 2 }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={isLoading}
                    sx={{ mt: 2 }}
                >
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
            </form>
        </Box>
    );
}
