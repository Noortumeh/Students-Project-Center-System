import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    IconButton,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';

export default function UserProfilePage() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        profilePicture: 'https://via.placeholder.com/150', // صورة افتراضية
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '123-456-7890',
    });

    const [editable, setEditable] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({ ...prev, [name]: value }));
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setUserData((prev) => ({ ...prev, profilePicture: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = () => {
        // حفظ البيانات المحدثة على الباك اند (طلب API هنا)
        setEditable(false);
        alert('Profile updated successfully!');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                maxWidth: 500,
                mx: 'auto',
                mt: 12,
                px: 2,
            }}
        >
            <Box
                sx={{
                    position: 'relative',
                    display: 'inline-block',
                    width: 150,
                    height: 150,
                }}
            >
                <Avatar
                    src={userData.profilePicture}
                    alt="Profile Picture"
                    sx={{ width: 150, height: 150 }}
                />
                <IconButton
                    color="primary"
                    component="label"
                    sx={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: 'white',
                        p: 1,
                        boxShadow: 1,
                    }}
                >
                    <PhotoCamera />
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleProfilePictureChange}
                    />
                </IconButton>
            </Box>
            <Typography variant="h4" component="h1">
                User Profile
            </Typography>
            <TextField
                fullWidth
                label="Name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                disabled={!editable}
            />
            <TextField
                fullWidth
                label="Email"
                name="email"
                value={userData.email}
                onChange={handleInputChange}
                disabled={!editable}
            />
            <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={userData.phone}
                onChange={handleInputChange}
                disabled={!editable}
            />
            {editable ? (
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleSaveChanges}
                >
                    Save Changes
                </Button>
            ) : (
                <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => setEditable(true)}
                >
                    Edit Profile
                </Button>
            )}
            <Button
                variant="text"
                color="secondary"
                fullWidth
                onClick={() => navigate('reset-password')}
            >
                Change Password
            </Button>
        </Box>
    );
}
