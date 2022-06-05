import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Page404: React.FC = () => (
  <Container maxWidth="lg">
    <Box p={4}>
      <Typography variant="h4" align="center">
        Nothing here{' -> '}
        <Button component={Link} to="/" variant="contained" color="secondary">
          <Typography variant="h4">GO TO FRONT PAGE</Typography>
        </Button>
      </Typography>
    </Box>
  </Container>
);

export default Page404;
