import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Stack,
  AppBar,
  Toolbar,
  Container,
  Menu,
  MenuItem,
  IconButton,
  Divider
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useNavigate } from 'react-router-dom';

const EntityManageHeader = ({ title }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: "#092332",
        boxShadow: 'none',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        height:66,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center'
      }}
    >
      <Container disableGutters maxWidth={false}>
        <Toolbar 
          sx={{ 
            display: "flex", 
            justifyContent: "space-between", 
            flexWrap: "nowrap",
            minHeight: '56px !important'
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Button
              onClick={() => navigate(-1)}
              sx={{
                minWidth: '34px',
                width: '40px',
                height: '40px',
                p: 0,
                borderRadius: '6px',
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                }
              }}
            >
              <ArrowBackIcon sx={{ fontSize: '18px' }} />
            </Button>
            <Typography 
              variant="h6" 
              sx={{ 
                fontSize: '1rem',
                fontWeight: 500,
                color: '#fff',
                opacity: 0.9,
                letterSpacing: '0.3px'
              }}
            >
              {title || 'Düzənlə'}
            </Typography>
          </Stack>

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              startIcon={<SaveIcon sx={{ fontSize: '18px' }} />}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                textTransform: 'none',
                fontSize: '0.875rem',
                fontWeight: 500,
                px: 2.5,
                height: '40px',
                borderRadius: '6px',
                color: '#fff',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)'
                }
              }}
            >
              Yadda saxla
            </Button>

            <IconButton
              onClick={handleMenuClick}
              sx={{
                width: '40px',
                height: '40px',
                color: '#fff',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)'
                }
              }}
            >
              <MoreVertIcon sx={{ fontSize: '20px' }} />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              sx={{
                '& .MuiPaper-root': {
                  borderRadius: '8px',
                  minWidth: '180px',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                  mt: 1
                }
              }}
            >
              <MenuItem 
                onClick={handleMenuClose}
                sx={{ 
                  py: 1,
                  px: 2,
                  '&:hover': { backgroundColor: '#f8fafc' }
                }}
              >
                <PrintOutlinedIcon sx={{ fontSize: '20px', mr: 1, color: '#475569' }} />
                Print
              </MenuItem>
              <MenuItem 
                onClick={handleMenuClose}
                sx={{ 
                  py: 1,
                  px: 2,
                  '&:hover': { backgroundColor: '#f8fafc' }
                }}
              >
                <FileDownloadOutlinedIcon sx={{ fontSize: '20px', mr: 1, color: '#475569' }} />
                Excel
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem 
                onClick={handleMenuClose}
                sx={{ 
                  py: 1,
                  px: 2,
                  color: '#dc2626',
                  '&:hover': { backgroundColor: '#fee2e2' }
                }}
              >
                <DeleteOutlineIcon sx={{ fontSize: '20px', mr: 1 }} />
                Sil
              </MenuItem>
              <Divider sx={{ my: 0.5 }} />
              <MenuItem 
                onClick={handleMenuClose}
                sx={{ 
                  py: 1,
                  px: 2,
                  '&:hover': { backgroundColor: '#f8fafc' }
                }}
              >
                <SettingsOutlinedIcon sx={{ fontSize: '20px', mr: 1, color: '#475569' }} />
                Ayarlar
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default EntityManageHeader; 