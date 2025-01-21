
import React from 'react';
import { AppBar, Toolbar, IconButton, TextField, Box } from '@mui/material';
import { Notifications as NotificationsIcon, AccountCircle } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            variant="outlined"
            placeholder="Search..."
            size="small"
            fullWidth
          />
        </Box>

        <IconButton>
          <NotificationsIcon />
        </IconButton>

        <IconButton>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
