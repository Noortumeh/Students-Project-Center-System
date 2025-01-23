import { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { forgetPassword } from './AuthHttp';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ForgetPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const { mutate, isLoading } = useMutation({
        mutationFn: forgetPassword,
        onSuccess: () => {
            toast.success('Reset Code send successfully!')
            navigate(`/reset-password?email=${email}`)
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({ email });
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
        </Box>
    );
}
