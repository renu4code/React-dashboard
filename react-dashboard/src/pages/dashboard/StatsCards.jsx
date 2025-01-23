import React from 'react';
import { Box, Grid, Card, CardContent, Typography, LinearProgress } from '@mui/material';
import {
  AttachMoney as BudgetIcon,
  People as CustomersIcon,
  AssignmentTurnedIn as TasksIcon,
  MonetizationOn as ProfitIcon,
  ArrowDownward,
  ArrowUpward,
} from '@mui/icons-material';

const StatsCards = () => {
  const stats = [
    {
      title: 'Budget',
      value: '$24k',
      progress: '12%',
      color: 'error.main',
      icon: <BudgetIcon />,
      arrow: <ArrowDownward sx={{ color: 'red', fontSize: 16 }} />,
    },
    {
      title: 'Total Customers',
      value: '1.6k',
      progress: '16%',
      color: 'success.main',
      icon: <CustomersIcon />,
      arrow: <ArrowUpward sx={{ color: 'green', fontSize: 16 }} />,
    },
    {
      title: 'Tasks Progress',
      value: '60%',
      color: 'warning.main',
      icon: <TasksIcon />,
      progressBarValue: 50, // Half-filled progress bar
    },
    {
      title: 'Total Profit',
      value: '$23k',
      progress: '',
      color: 'primary.main',
      icon: <ProfitIcon />,
    },
  ];

  return (
    <Grid container spacing={3}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card sx={{ height: 100 }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="subtitle2" color="textSecondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" sx={{ color: stat.color }}>
                    {stat.value}
                  </Typography>
                </Box>
                <Box sx={{ color: stat.color, fontSize: 36 }}>{stat.icon}</Box>
              </Box>
              {stat.progress && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {stat.arrow && stat.arrow}
                  <Typography variant="caption" color={stat.arrow ? 'textSecondary' : 'inherit'}>
                    {stat.progress && `Since last month: ${stat.progress}`}
                  </Typography>
                </Box>
              )}
              {stat.title === 'Tasks Progress' && (
                <Box sx={{ mt: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={stat.progressBarValue}
                    sx={{
                      bgcolor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        bgcolor: 'blue',
                      },
                    }}
                  />
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;
