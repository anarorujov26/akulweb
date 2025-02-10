import React from 'react';
import { Box, Avatar, IconButton, Menu, MenuItem, Divider, Skeleton } from '@mui/material';
import DynamicIcon from '../../../shared/components/DynamicIcon';

const NavbarUserMenu = ({ 
  isSmallScreen, 
  hasParents, 
  anchorEl, 
  onMenuOpen, 
  onMenuClose, 
  onExit 
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: 'center',
          cursor: "pointer",
          padding: 1,
          borderRadius: 1,
          "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
          minWidth: "70px",
        }}
        onClick={onMenuOpen}
      >
        {hasParents ? (
          <>
            <Avatar 
              sx={{ 
                bgcolor: "grey", 
                width: isSmallScreen ? 30 : 35, 
                height: isSmallScreen ? 30 : 35, 
                fontSize: 12 
              }}
            >
              AO
            </Avatar>
            {!isSmallScreen && (
              <IconButton color="inherit">
                <DynamicIcon sx={{ fontSize: 20, color: "grey" }} name="ArrowDropDown" />
              </IconButton>
            )}
          </>
        ) : (
          <Skeleton 
            variant="circular" 
            width={35} 
            height={35} 
            sx={{ backgroundColor: "rgba(255,255,255,0.1)" }} 
          />
        )}
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
        sx={{
          '& .MuiMenu-paper': {
            borderRadius: 8,
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <MenuItem onClick={onMenuClose} sx={{ padding: '12px 16px', fontWeight: 500 }}>
          <DynamicIcon name="AccountCircle" sx={{ marginRight: 1, color: "#092332" }} />
          Profil
        </MenuItem>

        <Divider sx={{ marginY: 1 }} />

        <MenuItem 
          onClick={onExit} 
          sx={{ 
            padding: '12px 16px', 
            fontWeight: 500, 
            color: '#D32F2F', 
            '&:hover': { 
              backgroundColor: '#FFEBEE' 
            } 
          }}
        >
          <DynamicIcon name="ExitToApp" sx={{ marginRight: 1, color: "#D32F2F" }} />
          Çıxış
        </MenuItem>

        <MenuItem onClick={onMenuClose} sx={{ padding: '12px 16px', fontWeight: 500 }}>
          <DynamicIcon name="SwitchAccount" sx={{ marginRight: 1, color: "#092332" }} />
          Digər Hesab
        </MenuItem>
      </Menu>
    </>
  );
};

export default NavbarUserMenu; 