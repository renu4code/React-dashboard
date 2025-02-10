import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Link,
  Grid,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    reEnterPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showReEnterPassword, setShowReEnterPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [passwordLengthValid, setPasswordLengthValid] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
    if (e.target.name === "password") {
      checkPasswordStrength(e.target.value);
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowReEnterPassword = () => {
    setShowReEnterPassword(!showReEnterPassword);
  };

  const checkPasswordStrength = (password) => {
    // password complexity hernae
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

    if (password.length >= 6) {
      setPasswordLengthValid(true);
    
      if (regex.test(password)) {
        setPasswordStrength("Strong"); 
      } else {
        setPasswordStrength("Weak");
      }
    } else {
      setPasswordStrength(""); // Hides the strength message if password is too short
      setPasswordLengthValid(false); // Don't show message if length is less than 6 characters
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }
    
    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase, number, and special symbol.";
    }
    
    // Re-enter password validation
    if (formData.reEnterPassword !== formData.password) {
      newErrors.reEnterPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Form is valid if no errors
  };

  const handleRegister = () => {
    if (validateForm()) {
      console.log("Registering with:", formData);

      // Save user data to localStorage
      localStorage.setItem("user", JSON.stringify(formData));

      // Navigate to login page
      navigate("/login");
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
          width: 900,
          height: 600,
          bgcolor: "white",
          borderRadius: 2,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          overflow: "hidden",
        }}
      >
        <Grid container>
          {/* Left Section: Register Form */}
          <Grid item xs={6} sx={{ p: 4 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              mb={2}
            >
              Sign Up
            </Typography>
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              helperText={errors.name}
            />
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
              type={showPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            {passwordLengthValid && (
              <Typography
                variant="body2"
                sx={{
                  color: passwordStrength === "Strong" ? "green" : "red",
                  textAlign: "left",
                  mt: 1,
                }}
              >
                {passwordStrength === "Strong" ? "Strong Password" : "Weak Password"}
              </Typography>
            )}
            <Typography variant="body2" color="text.secondary" mb={1}>
              Password must contain at least 12 characters, including uppercase, lowercase, a number, and a special symbol.
            </Typography>
            <TextField
              fullWidth
              label="Re-enter Password"
              name="reEnterPassword"
              type={showReEnterPassword ? "text" : "password"}
              variant="outlined"
              margin="normal"
              value={formData.reEnterPassword}
              onChange={handleChange}
              error={!!errors.reEnterPassword}
              helperText={errors.reEnterPassword}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowReEnterPassword}>
                      {showReEnterPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2, py: 1.2 }}
              onClick={handleRegister}
            >
              Register
            </Button>
            <Typography
              variant="body2"
              textAlign="center"
              mt={2}
              color="text.secondary"
            >
              Already have an account?{" "}
              <Link
                onClick={() => navigate("/login")}
                underline="hover"
                sx={{ cursor: "pointer" }}
              >
                Login
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
              src="./Sign up.png"
              alt="Register Illustration"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Register;




