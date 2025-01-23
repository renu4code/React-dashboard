import React, { useState } from 'react';
import {Card,CardContent,Typography,Box,Button,Menu,MenuItem,} from '@mui/material';
import { BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer,} from 'recharts';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const data = [
  { name: '1 Aug', thisYear: 15, lastYear: 20 },
  { name: '2 Aug', thisYear: 5, lastYear: 12 },
  { name: '3 Aug', thisYear: 10, lastYear: 18 },
  { name: '4 Aug', thisYear: 8, lastYear: 15 },
  { name: '5 Aug', thisYear: 6, lastYear: 17 },
  { name: '6 Aug', thisYear: 9, lastYear: 13 },
  { name: '7 Aug', thisYear: 7, lastYear: 19 },

];

const LatestSalesChart = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState('Last 7 Days');

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (option) => {
    setAnchorEl(null);
    if (option) setFilter(option);
  };

  const menuOptions = ['Last 7 Days', 'Last 30 Days', 'This Year'];

  return (
    <Card>
      {/* Typography Box with Options */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 2,
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Typography variant="h6">Latest Sales</Typography>
        <Button
          size="small"
          onClick={handleClick}
          endIcon={<ArrowDropDownIcon />}
        >
          {filter}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleClose()}
        >
          {menuOptions.map((option) => (
            <MenuItem
              key={option}
              onClick={() => handleClose(option)}
            >
              {option}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {/* Chart Section */}
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="thisYear" fill="#3f51b5" />
            <Bar dataKey="lastYear" fill="#c4c4c4" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LatestSalesChart;
