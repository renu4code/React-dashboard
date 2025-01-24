import React from "react";
import { Box, Button, Typography, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const [open, setOpen] = React.useState(true); 
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
    navigate(-1); 
  };

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false"); // Clear authentication
    navigate("/login"); // Redirect to login page
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Logout</DialogTitle>
      <DialogContent>
        <Typography>Are you sure you want to logout?</Typography>
      </DialogContent>
      <DialogActions>
      <Button
          variant="outlined"
          onClick={handleClose}
          sx={{ color: "gray", borderColor: "gray" }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleLogout}
          sx={{
            bgcolor: "green",
            "&:hover": {
              bgcolor: "darkgreen",
            },
          }}
        >
          Yes, Logout
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default Logout;

