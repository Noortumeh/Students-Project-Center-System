import React from 'react';
import { Grid, TextField, Button, Typography, Box, Stack } from '@mui/material';
import { styled } from '@mui/system';
import laptopImage from '../../assets/images/SignBg.jpg';
import { Link } from 'react-router-dom';

// تنسيق للخلفية
const SignUpContainer = styled(Box)({
    display: 'flex',
    minHeight: '100vh',
    backgroundImage: `url(${laptopImage})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    paddingTop: '20px',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.2)', // تضيف طبقة معتمة فوق الخلفية
    },
    zIndex: 1, // يضمن أن المحتوى يظهر فوق الطبقة المعتمة
});

// تنسيق الحقول الشفافة
const FormContainer = styled(Box)({
    // backgroundColor: 'rgba(0, 0, 0, 0.2)', // شفافية
    padding: '30px',
    borderRadius: '10px',
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // شفافية أقل
});

const RightSection = styled(Box)({
    textAlign: 'center',
    color: 'white',
    zIndex: 1
});

const SignUpPage = () => {
    return (
        <SignUpContainer>
            <Grid container>
                {/* القسم الأيسر */}
                <Grid item xs={12} md={6} display="flex" justifyContent="center" alignItems="center">
                    <FormContainer>
                        <Typography variant="h4" gutterBottom>
                            Login
                        </Typography>
                        <TextField fullWidth label="Email" margin="normal" variant="outlined" />
                        <TextField fullWidth label="Password" type="password" margin="normal" variant="outlined" />
                        <Box mt={2}>
                            <Button fullWidth variant="contained" color="primary">
                                Login
                            </Button>
                        </Box>
                        <Box mt={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                            <Link to="/" style={{ color: 'white', marginBottom: 6 }}>
                                Forgot password?
                            </Link>
                            <Link to="/signup" style={{ color: 'white' }}>
                                Don't have an account? Signup
                            </Link>
                        </Box>
                    </FormContainer>
                </Grid>

                {/* القسم الأيمن */}
                <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <RightSection>
                        <Typography variant="h1" sx={{ fontWeight: 'bold', fontSize: '90px' }}>Welcome Back!</Typography>
                    </RightSection>
                </Grid>
            </Grid>
        </SignUpContainer>
    );
};

export default SignUpPage;
