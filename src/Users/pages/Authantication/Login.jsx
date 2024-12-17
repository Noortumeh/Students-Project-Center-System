import {
    Grid2 as Grid,
    TextField,
    Button,
    Typography,
    Box,
} from "@mui/material";
import { Form, Link, Navigate, redirect, useNavigate } from "react-router-dom";
//Style
import { FormContainer, RightSection, SignUpContainer } from "./AuthStyle";
//
import { useLogin } from "./CustomHook/useLogin.js";
import { useUser } from "./CustomHook/useUser.js";
import { useEffect } from "react";
 
const LoginPage = () => {
    const navigate = useNavigate();
    const {loginMutate , isPending, error, isError } = useLogin();
    const {isAuth} = useUser();
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        loginMutate(data);
    };
    useEffect(() => {
        if (isAuth) {
            navigate('/');
        }
    }, [isAuth, navigate]);
    
    return (
        <SignUpContainer>
            {/* القسم الأيسر */}
            <Grid
                item="true"
                xs={12}
                md={6}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <FormContainer>
                    <Typography variant="h4" gutterBottom>
                        Login
                    </Typography>
                    <Form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="email"
                            required
                            margin="normal"
                            variant="outlined"
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            required
                            margin="normal"
                            variant="outlined"
                        />
                        <Box mt={2}>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                            >
                                Login
                            </Button>
                        </Box>
                    </Form>
                    {isPending && "Submitting..."}
                    {isError &&
                        (error.info?.message ||
                            "Failed to login. Please check your inputs and try again.")}
                    <Box
                        mt={2}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexDirection: "column",
                        }}
                    >
                        <Link to="/" style={{ color: "white", marginBottom: 6 }}>
                            Forgot password?
                        </Link>
                        <Link to="/signup" style={{ color: "white" }}>
                            Don't have an account? Signup
                        </Link>
                    </Box>
                </FormContainer>
            </Grid>

            {/* القسم الأيمن */}
            <Grid
                item="true"
                xs={12}
                md={6}
                sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
            >
                <RightSection>
                    <Typography
                        variant="h1"
                        sx={{ fontWeight: "bold", fontSize: "90px" }}
                    >
                        Welcome Back!
                    </Typography>
                </RightSection>
            </Grid>
        </SignUpContainer>
    );
};

export default LoginPage;
