import React from "react";
import {
  Grid2 as Grid,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { Form, Link, Navigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../../util/httpsForUser/https";
//Style
import { FormContainer, RightSection, SignUpContainer } from "./AuthStyle";
import { useUser } from "./CustomHook/useUser";


const SignUpPage = () => {
  const navigate = useNavigate();
  const { isFetching, isAuth } = useUser();


  const { mutate, isPending, error, isError, data } = useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      navigate("/login");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    mutate(data);
  };

  if (!isFetching && isAuth) {
    return <Navigate replace to="/" />
  }
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
            Sign Up
          </Typography>
          <Form onSubmit={handleSubmit}>
            <Grid sx={{ display: "flex", gap: 1 }}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Middle Name"
                name="middleName"
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                margin="normal"
                variant="outlined"
              />
            </Grid>
            <TextField
              fullWidth
              label="Email"
              name="email"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              margin="normal"
              variant="outlined"
            />
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
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
                Register
              </Button>
            </Box>
            {isPending && "Submitting..."}
            {isError &&
              (error.info?.message ||
                "Failed to create event. Please check your inputs and try again later.")}
          </Form>
          <Box mt={2} textAlign="center">
            <Link to="/login" style={{ color: "white" }}>
              Already Registered? Login
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
            Hello, Friend!
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: "bold" }}>
            Start New Journey!
          </Typography>
        </RightSection>
      </Grid>
    </SignUpContainer>
  );
};

export default SignUpPage;
