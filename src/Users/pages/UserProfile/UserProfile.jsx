import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    IconButton,
    CircularProgress,
    Alert,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { getProfileinfo, updateProfileInfo, updateProfilePicture } from './httpProfile';
import { toast } from 'react-toastify';
import { validateInputs } from './validateInputs';
import { queryClient } from '../../../util/httpsForUser/https';

export default function UserProfilePage() {
    const { data: userData, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: getProfileinfo,
    });

    const navigate = useNavigate();
    const [editable, setEditable] = useState(false);
    const profileImage = JSON.parse(localStorage.getItem('userInfo')).user.profileImageUrl;
    const [profilePicture, setProfilePicture] = useState(null);
    const [errors, setErrors] = useState({});
    const [alert, setAlert] = useState('');
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        profilePicture: profileImage || '',
    });

    useEffect(() => {
        if (userData) {
            setUserInfo({
                firstName: userData.firstName || "",
                middleName: userData.middleName || "",
                lastName: userData.lastName || "",
                email: userData.email || "",
                phoneNumber: userData.phoneNumber || "",
                address: userData.address || "",
            });
        }
    }, [userData]);

    const profileMutation = useMutation({
        mutationFn: updateProfileInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast.success('Profile updated successfully!');
            setEditable(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const { mutate: pictureMutation } = useMutation({
        mutationFn: updateProfilePicture,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            toast.success('Profile picture updated successfully!')
        },
        onError: (error) => toast.error(error.message),
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value || "" }));
    };

    const handleProfilePictureChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // تحديث حالة الصورة للعرض الفوري
            setProfilePicture(file);

            // رفع الصورة إلى الخادم
            const formData = new FormData();
            formData.append('file', file);
            pictureMutation({ file: formData });

            // تحديث الصورة في localStorage
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo && userInfo.user) {
                const reader = new FileReader();
                reader.onload = () => {
                    // تعيين الصورة الجديدة
                    userInfo.user.profileImageUrl = reader.result;

                    // حفظ التحديث في localStorage
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));
                };
                reader.readAsDataURL(file); // تحويل الصورة إلى Base64
            }
        }
    };

    const handleSaveChanges = () => {
        const validationErrors = validateInputs(userInfo);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        profileMutation.mutate({ userInfo });
    };

    if (isLoading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
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
                gap: 3,
                maxWidth: 500,
                mx: 'auto',
                mt: 12,
                px: 2,
            }}
        >
            {alert && <Alert severity="info">{alert}</Alert>}
            <Box
                sx={{
                    position: 'relative',
                    display: 'inline-block',
                    width: 150,
                    height: 150,
                }}
            >
                <Avatar
                    src={profilePicture ? URL.createObjectURL(profilePicture) : profileImage}
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
                label="First Name"
                name="firstName"
                value={userInfo.firstName}
                onChange={handleInputChange}
                disabled={!editable}
                error={editable && !!errors.firstName}
                helperText={editable && errors.firstName}
            />
            <TextField
                fullWidth
                label="Middle Name"
                name="middleName"
                value={userInfo.middleName}
                onChange={handleInputChange}
                disabled={!editable}
            />
            <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={userInfo.lastName}
                onChange={handleInputChange}
                disabled={!editable}
                error={editable && !!errors.lastName}
                helperText={editable && errors.lastName}
            />
            <TextField
                fullWidth
                label="Email"
                name="email"
                value={userInfo.email}
                disabled={true}
            />
            <TextField
                fullWidth
                label="Phone Number"
                name="phoneNumber"
                value={userInfo.phoneNumber}
                onChange={handleInputChange}
                disabled={!editable}
                error={editable && !!errors.phoneNumber}
                helperText={editable && errors.phoneNumber}
            />
            <TextField
                fullWidth
                label="User Address"
                name="address"
                value={userInfo.address}
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