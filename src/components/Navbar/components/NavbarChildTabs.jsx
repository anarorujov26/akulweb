import React from 'react';
import { Container, Tabs, Tab } from '@mui/material';
import DynamicIcon from '../../../shared/components/DynamicIcon';

const NavbarChildTabs = ({ selectedChildId, childs, childValue, onChangeChild }) => {
  if (!selectedChildId) return null;

  return (
    <Container sx={{ backgroundColor: "white" }} disableGutters maxWidth={false}>
      <Tabs
        textColor="inherit"
        value={childValue}
        onChange={onChangeChild}
        variant="scrollable"
        sx={{ minHeight: 35, overflowX: "auto" }}
      >
        {childs[selectedChildId]?.map((item, index) => (
          <Tab
            key={index}
            sx={{ 
              height: 20, 
              fontSize: 11, 
              minHeight: 35, 
              color: "#092332" 
            }}
            icon={<DynamicIcon name={item.icon} />}
            label={item.title}
          />
        ))}
      </Tabs>
    </Container>
  );
};

export default NavbarChildTabs; 