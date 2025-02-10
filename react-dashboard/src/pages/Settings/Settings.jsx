import React, { useState, useEffect } from "react";
import { TextField, Box, Typography, Grid, Switch, Button, Paper, Divider } from "@mui/material";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    orderConfirmation: true,
    orderStatusChanged: false,
    orderDelivered: true,
    emailNotification: true,
  });

  const [profile, setProfile] = useState({
    name: "",
    storeName: "",
    location: "",
    currency: "",
    email: "",
    phone: "",
    address: "",
  });

  // Load saved profile information from localStorage on component mount
  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem("profile"));
    if (savedProfile) {
      setProfile(savedProfile);
    }
  }, []);

  const handleToggle = (name) => {
    setNotifications((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // Save profile settings to localStorage
    localStorage.setItem("profile", JSON.stringify(profile));
    alert("Settings saved successfully!");
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper sx={{ p: 3 }}>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Edit Profile */}
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Edit Profile
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Your Name"
                  value={profile.name}
                  onChange={handleInputChange}
                  name="name"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Store Name"
                  value={profile.storeName}
                  onChange={handleInputChange}
                  name="storeName"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Location"
                  value={profile.location}
                  onChange={handleInputChange}
                  name="location"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Currency"
                  value={profile.currency}
                  onChange={handleInputChange}
                  name="currency"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  value={profile.email}
                  onChange={handleInputChange}
                  name="email"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  name="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Address"
                  value={profile.address}
                  onChange={handleInputChange}
                  name="address"
                />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Change Password */}
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Change Password
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth margin="normal" label="Current Password" type="password" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth margin="normal" label="New Password" type="password" />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField fullWidth margin="normal" label="Confirm Password" type="password" />
              </Grid>
            </Grid>
          </Box>

          <Divider />

          {/* Notifications */}
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Notifications
            </Typography>
            {[
              { label: "Order Confirmation", key: "orderConfirmation", desc: "You will be notified when a customer orders any product" },
              { label: "Order Status Changed", key: "orderStatusChanged", desc: "You will be notified when a customer makes changes to an order" },
              { label: "Order Delivered", key: "orderDelivered", desc: "You will be notified once the order is delivered" },
              { label: "Email Notification", key: "emailNotification", desc: "Turn on email notifications to get updates through email" },
            ].map((item) => (
              <Box key={item.key} display="flex" justifyContent="space-between" alignItems="center" sx={{ py: 1 }}>
                <Box>
                  <Typography variant="body1" fontWeight="bold">
                    {item.label}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.desc}
                  </Typography>
                </Box>
                <Switch checked={notifications[item.key]} onChange={() => handleToggle(item.key)} />
              </Box>
            ))}
          </Box>

          {/* Save Button */}
          <Box display="flex" justifyContent="flex-end">
            <Button variant="contained" color="primary" onClick={handleSave}>
              Save
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
