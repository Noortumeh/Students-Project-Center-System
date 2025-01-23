import { Box, TextField, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { resetPasswordProfile } from '../Authantication/AuthHttp';

export default function ResetPasswordProfile() {
    const navigate = useNavigate();

    const { mutate, isLoading, error } = useMutation({
        mutationFn: resetPasswordProfile,
        onSuccess: () => {
            toast.success('Password Reset successfully!')
            navigate(-1);
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
        
        mutate({ data });
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
