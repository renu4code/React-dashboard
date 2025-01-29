import React from 'react';
import { AppBar, Toolbar, IconButton, TextField, Box, InputAdornment } from '@mui/material';
import { Notifications as NotificationsIcon, AccountCircle, Search } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="sticky" color="inherit" elevation={1}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
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

