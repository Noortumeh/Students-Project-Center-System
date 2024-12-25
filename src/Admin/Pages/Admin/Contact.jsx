import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { TextField, Button, Typography, Checkbox, FormControlLabel, Box, Alert, Paper } from "@mui/material";
import { postContactUs } from "../../../util/http for admin/http.js"; // تأكد من المسار الصحيح

const ContactUsForm = () => {
  const [contactData, setContactData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [agreedToPolicy, setAgreedToPolicy] = useState(false);

  const mutation = useMutation({
    mutationFn: postContactUs,
    onSuccess: () => {
      setSuccessMessage("Your message has been sent successfully!");
      setErrorMessage("");
      setContactData({ name: "", email: "", phone: "", message: "" });
      setAgreedToPolicy(false);
    },
    onError: (error) => {
      console.error("Error sending contact message:", error);
      setErrorMessage("There was an error sending your message. Please try again.");
      setSuccessMessage("");
    },
  });

  const handleChange = (e) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreedToPolicy) {
      setErrorMessage("You must agree to the privacy policy.");
      return;
    }
    mutation.mutate(contactData);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(to right, #374151, #1f2937)",
        padding: 2,
      }}
    >
      <Paper elevation={6} sx={{ padding: 4, maxWidth: 500, width: "100%" }}>
        <Typography variant="h4" align="center" gutterBottom sx={{ fontWeight: "bold", color: "#374151" }}>
          CONTACT US
        </Typography>
        <Typography variant="body2" align="center" gutterBottom color="textSecondary">
          If you need some help or any other questions, feel free to ask.
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            margin="normal"
            label="Your name"
            name="name"
            value={contactData.name}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Your email"
            type="email"
            name="email"
            value={contactData.email}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Phone Number"
            name="phone"
            value={contactData.phone}
            onChange={handleChange}
            required
          />
          <TextField
            fullWidth
            margin="normal"
            label="Message"
            name="message"
            value={contactData.message}
            onChange={handleChange}
            multiline
            rows={4}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={agreedToPolicy}
                onChange={(e) => setAgreedToPolicy(e.target.checked)}
                color="primary"
              />
            }
            label="I agree with the privacy policy."
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 2, py: 1.5, fontWeight: "bold" }}
          >
            Submit
          </Button>
          {successMessage && <Alert severity="success" sx={{ mt: 2 }}>{successMessage}</Alert>}
          {errorMessage && <Alert severity="error" sx={{ mt: 2 }}>{errorMessage}</Alert>}
        </form>
      </Paper>
    </Box>
  );
};

export default ContactUsForm;
