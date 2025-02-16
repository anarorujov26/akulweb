import React from 'react';
import { Box, Tabs, Tab, Skeleton } from '@mui/material';
import DynamicIcon from '../../../shared/components/DynamicIcon';

const NavbarTabs = ({ parents, value, onChange, isSmallScreen }) => {
  if (parents.length === 0) {
    
    return (
      <Box sx={{ display: "flex", gap: 1, padding: 1, paddingLeft: 2 }}>
        {[...Array(5)].map((_, i) => (
          <Skeleton 
            key={i} 
            variant="rounded" 
            width={80} 
            height={50} 
            sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} 
          />
        ))}
      </Box>
    );
  }

  return (
    <Tabs
      textColor="inherit"
      value={value}
      onChange={onChange}
      indicatorColor="transparent"
      variant="scrollable"
      sx={{ minHeight: 50 }}
    >
      {parents.map((item, index) => (
        <Tab
          key={index}
          sx={{
            minHeight: 50,
            fontSize: 12,
            padding: "10px",
            backgroundColor: value === index ? "rgba(255,255,255,0.1)" : "transparent",
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              cursor: 'pointer',
            },
          }}
          icon={<DynamicIcon sx={{ fontSize: isSmallScreen ? 18 : 25 }} name={item.icon} />}
          label={item.title}
        />
      ))}
    </Tabs>
  );
};

export default NavbarTabs; 