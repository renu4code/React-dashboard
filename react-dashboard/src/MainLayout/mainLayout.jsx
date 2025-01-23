import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';


const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex' }}>
        <Sidebar/>
      <Box sx={{ flexGrow: 1 }}>
        <Header/>
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default MainLayout;