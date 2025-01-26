import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { resetForgottenPassword } from './AuthHttp';
import { toast } from 'react-toastify';

export default function ResetPasswordPage() {
    const navigate = useNavigate();

    const { mutate, isLoading, isSuccess, error } = useMutation({
        mutationFn: resetForgottenPassword,
        onSuccess: () => {
            toast.success('Password Reset successfully!')
            navigate('/login')
        },
    }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        if (data.newPassword !== data.confirmNewPassword) {
            alert("Passwords do not match!");
            return;
        }
        const queryParams = new URLSearchParams(window.location.search);
        const email = queryParams.get('email');
        console.log(data)
        console.log(email)
        mutate({ email, data });
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
                    label="Reset Code"
                    name="resetCode"
                    type="text"
                    required
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="New Password"
                    type="password"
                    name="newPassword"
                    required
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    fullWidth
                    label="Confirm Password"
                    type="password"
                    name='confirmNewPassword'
                    variant="outlined"
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
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                </Button>
            </form>
        </Box>
    );
}
