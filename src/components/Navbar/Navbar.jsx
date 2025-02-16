import React from 'react';
import { AppBar, Container, Toolbar, useMediaQuery } from '@mui/material';
import NavbarLogo from './components/NavbarLogo';
import NavbarTabs from './components/NavbarTabs';
import NavbarUserMenu from './components/NavbarUserMenu';
import NavbarChildTabs from './components/NavbarChildTabs';
import useNavbar from './hooks/useNavbar';
import useCommon from '../../shared/context/useCommon';

const Navbar = () => {
  const isSmallScreen = useMediaQuery("(max-width: 900px)");

  const parents = useCommon((state) => state.parents);
  const childs = useCommon((state) => state.childs);
  
  const {
    value,
    childValue,
    anchorEl,
    selectedChildId,
    handleChange,
    handleChangeChild,
    handleMenuOpen,
    handleMenuClose,
    handleExit
  } = useNavbar();

  return (
    <AppBar position="static" sx={{ backgroundColor: "#092332", overflow: "hidden" }}>
      <Container disableGutters maxWidth={false}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", flexWrap: "nowrap" }}>
          <NavbarLogo isSmallScreen={isSmallScreen} />

          <NavbarTabs
            parents={parents}
            value={value}
            onChange={handleChange}
            isSmallScreen={isSmallScreen}
          />

          <NavbarUserMenu
            isSmallScreen={isSmallScreen}
            hasParents={parents.length > 0}
            anchorEl={anchorEl}
            onMenuOpen={handleMenuOpen}
            onMenuClose={handleMenuClose}
            onExit={handleExit}
          />
        </Toolbar>
      </Container>

      <NavbarChildTabs
        selectedChildId={selectedChildId}
        childs={childs}
        childValue={childValue}
        onChangeChild={handleChangeChild}
      />
    </AppBar>
  );
};

export default Navbar; 