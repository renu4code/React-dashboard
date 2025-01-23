import React from 'react';
import { Grid } from '@mui/material';
import StatsCards from './StatsCards';
import LatestSalesChart from './LatestSalesChart';
import TrafficByDevice from './TrafficByDevice';

const Dashboard = () => {
  return (
    <div>
      <StatsCards/>
      <Grid container spacing={3} sx={{ mt: 3 }}>
        <Grid item xs={12} md={8}>
         <LatestSalesChart/>
        </Grid>
        <Grid item xs={12} md={4}>
          <TrafficByDevice />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;

