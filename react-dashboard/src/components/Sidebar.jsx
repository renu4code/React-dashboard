import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, Box } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Settings as SettingsIcon,
  Login as LoginIcon,
  PersonAdd as RegisterIcon,
  Error as ErrorIcon,
} from '@mui/icons-material';

const Sidebar = () => {
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Customers', icon: <PeopleIcon /> },
    { text: 'Products', icon: <ShoppingCartIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
    { text: 'Login', icon: <LoginIcon /> },
    { text: 'Register', icon: <RegisterIcon /> },
    { text: 'Error', icon: <ErrorIcon /> },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          bgcolor: '#263238',
          color: 'white',
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
          <ListItem button key={index}>
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
