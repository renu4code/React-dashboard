import React from 'react';
import { IconButton, TextField, InputAdornment, Box, Typography } from '@mui/material';
import { Notifications as NotificationsIcon, Search } from '@mui/icons-material';

const Header = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px' }}>
      
        {/* Left Side */}
      <Box sx={{ ml: 5}}> 
        <TextField
          variant="outlined"
          size="small"
          sx={{
            width: 300,
            backgroundColor: 'white', 
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'transparent', 
              border: 'none', 
            },
            '& .MuiInputBase-root': {
              padding: 0, 
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ pl: 1 }}>
                <Search />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Right Side - Notification, Picture, and Name */}
      <Box sx={{ display: 'flex', alignItems: 'center', mr: 5 }}>
        <IconButton sx={{ p: 1 }}>
          <NotificationsIcon />
        </IconButton>

        {/* Picture and Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <img 
            src="./133798587135091506.jpg" 
            alt="Your Name" 
            style={{ width: 40, height: 40, borderRadius: '50%' }} 
          />
          <Typography variant="body1" sx={{ ml: 1 }}>
            Renu Chand
          </Typography>
        </Box>
      </Box>
    </div>
  );
};

export default Header;

