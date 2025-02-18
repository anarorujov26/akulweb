import React from 'react';
import { Box, TextField, Typography, Button, Stack } from '@mui/material';
import DynamicIcon from '../../../shared/components/DynamicIcon';
import { useNavigate } from 'react-router-dom';
import useGetRootByMenu from '../../../shared/hooks/useGetRootByMenu';

const EntityListHeader = () => {
  const getRootByMenu = useGetRootByMenu();
  const navigate = useNavigate();
  
  const handleCreate = () => {
    const response = getRootByMenu.refetch();
    navigate(`/${response.type}`, {
      state: {
        ...response,
        thisId: null
      }
    })
  }

  const commonButtonStyle = {
    height: '40px',
    px: 2.5,
    backgroundColor: 'rgba(9, 35, 50, 0.05)',
    color: '#092332',
    borderRadius: '6px',
    textTransform: 'none',
    fontSize: '0.875rem',
    fontWeight: 500,
    border: 'none',
    '&:hover': {
      backgroundColor: 'rgba(9, 35, 50, 0.1)',
      border: 'none'
    }
  };

  return (
    <Stack 
      direction="row" 
      spacing={1.5} 
      alignItems="center"
      sx={{
        flex: 1,
        '@media (max-width: 900px)': {
          flexDirection: 'column',
          alignItems: 'stretch',
          gap: 2,
          '& > *': {
            width: '100%'
          }
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: 1.5,
        '@media (max-width: 900px)': {
          justifyContent: 'center'
        }
      }}>
        <DynamicIcon name={'HelpOutline'} sx={{ fontSize: 15, color: '#092332' }} />
        <Typography 
          variant="h6" 
          sx={{ 
            fontSize: '1rem',
            fontWeight: 600,
            color: '#334155',
            mr: 2
          }}
        >
          {"Test üçün gözləyir"}
        </Typography>
      </Box>
      
      <Box sx={{ 
        display: 'flex', 
        gap: 1.5, 
        flexWrap: 'wrap',
        '@media (max-width: 900px)': {
          width: '100%',
          '& > button': {
            flex: 1
          }
        }
      }}>
        <Button
          variant="outlined"
          startIcon={<DynamicIcon name={'Add'} sx={{ fontSize: 18 }} />}
          sx={commonButtonStyle}
          onClick={handleCreate}
        >
          Yeni Yarat
        </Button>

        <Button
          variant="outlined"
          startIcon={<DynamicIcon name={'FilterList'} sx={{ fontSize: 18 }} />}
          sx={commonButtonStyle}
        >
          Filter
        </Button>
      </Box>

      <TextField
        size="small"
        placeholder="Ad üzrə axtar..."
        sx={{
          minWidth: '200px',
          '@media (max-width: 900px)': {
            width: '100%'
          },
          '& .MuiOutlinedInput-root': {
            height: '40px',
            backgroundColor: '#ffffff',
            '&:hover fieldset': {
              borderColor: '#e0e0e0',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#092332',
              borderWidth: '1px',
            }
          }
        }}
        InputProps={{
          startAdornment: <DynamicIcon name="Search" sx={{ fontSize: 18, color: '#64748b', mr: 1 }} />
        }}
      />
    </Stack>
  );
};

export default EntityListHeader; 