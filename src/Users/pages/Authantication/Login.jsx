import {
    Grid2 as Grid,
    TextField,
    Button,
    Typography,
    Box,
    Alert,
} from "@mui/material";
import { Form , useNavigate } from "react-router-dom";
//Style
import { FormContainer, RightSection, SignUpContainer } from "./AuthStyle";
//
import { useLogin } from "./CustomHook/useLogin.js";
import { useUser } from "./CustomHook/useUser.js";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
    const navigate = useNavigate();
    const { loginMutate, isPending, error, isError } = useLogin();
    const { isAuth } = useUser();

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
                container
                spacing={2}
                columns={12}
                justifyContent="center"
                alignItems='center'
                gap={2}
                sx={{ mt: { xs: 8, sm: 8 } }}
            >
                <Grid size={{ xs: 12, sm: 12, md: 6 }}>
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
                        {isError && (
                            <Alert severity="error" sx={{ mt: 1 }}>
                                {error.info?.message + ", Please check your inputs and try again." ||
                                    "Failed to login. Please check your inputs and try again."}
                            </Alert>
                        )}
                        <Box
                            mt={2}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                            }}
                        >
                            <Link to="/forgot-password" style={{ color: "white", marginBottom: 6 }}>
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
                    size={{ xs: 12, sm: 12, md: 6 }}
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
            </Grid>
        </SignUpContainer>
    );
};

export default LoginPage;
