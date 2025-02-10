import React from 'react';
import { Box, Typography } from '@mui/material';

const NavbarLogo = ({ isSmallScreen }) => {
  if (isSmallScreen) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center", minWidth: "70px" }}>
      <Typography variant="h6" noWrap>
        AKUL
      </Typography>
    </Box>
  );
};

export default NavbarLogo; 