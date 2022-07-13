import { Box, Typography } from '@mui/material';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <Box p={2} sx={{ backgroundColor: '#1976d2', height: '50px' }}>
      <Typography align="center" color={'white'}>
        Ognjen Bjeletic 2018/0447
      </Typography>
    </Box>
  );
};

export default Footer;
