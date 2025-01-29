import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const Sidebar = () => {
  const location = useLocation(); // Get current route

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, to: "/dashboard" },
    { text: "Customers", icon: <PeopleIcon />, to: "/customers" },
    { text: "Products", icon: <ShoppingCartIcon />, to: "/ProductsTable" },
    { text: "Settings", icon: <SettingsIcon />, to: "" },
    { text: "Logout", icon: <LogoutIcon />, to: "/Logout" },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          bgcolor: "#263238",
          color: "white",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" color="inherit">
          Acme Inc
        </Typography>
        <Typography variant="caption" color="gray">
          Your tier: Premium
        </Typography>
      </Box>
      <List>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={index}
            component={Link}
            to={item.to}
            sx={{
              backgroundColor: location.pathname === item.to ? "primary.main" : "transparent", // Active item background color
              "&:hover": {
                backgroundColor: location.pathname === item.to ? "primary.main" : "#424242", // Hover background color for non-active items
              },
            }}
          >
            <ListItemIcon sx={{ color: "white" }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={item.text}
              sx={{
                color: "white", // Make text color white for all items
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;

