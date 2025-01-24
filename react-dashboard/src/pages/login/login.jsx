

import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Checkbox,
  FormControlLabel,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Form is valid if no errors
  };

  const handleLogin = () => {
    if (validateForm()) {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (
        storedUser &&
        storedUser.email === formData.email &&
        storedUser.password === formData.password
      ) {
        console.log("Login successful!");
        localStorage.setItem("isAuthenticated", "true"); // Mark user as authenticated
        navigate("/dashboard"); // Redirect to dashboard
      } else {
        setErrors({
          email: "Invalid email or password.",
          password: "Invalid email or password.",
        });
      }
    }
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f4f5f7",
      }}
    >
      <Box
        sx={{
          width: 800,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <Grid container>
          {/* Left Section: Login Form */}
          <Grid item xs={6} sx={{ p: 4 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              mb={2}
            >
              Login
            </Typography>
            <TextField
              fullWidth
              label="Email"
              name="email"
              variant="outlined"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Remember me"
              sx={{ mt: 1 }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, py: 1.2 }}
              onClick={handleLogin}
            >
              Login
            </Button>
            <Typography
              variant="body2"
              textAlign="center"
              mt={2}
              color="text.secondary"
            >
              Forgot your password?{" "}
              <Link href="#" underline="hover">
                Reset Password
              </Link>
            </Typography>
            <Typography
              variant="body2"
              textAlign="center"
              mt={2}
              color="text.secondary"
            >
              Don’t have an account?{" "}
              <Link
                onClick={() => navigate("/register")}
                underline="hover"
                sx={{ cursor: "pointer" }}
              >
                Sign Up
              </Link>
            </Typography>
          </Grid>

          {/* Right Section: Image */}
          <Grid
            item
            xs={6}
            sx={{
              bgcolor: "#f4f5f7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src="./login.png" 
              alt="Login Illustration"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Login;
