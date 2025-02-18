import React from 'react'
import { useEntityManage } from './hooks/useEntityManage';
import { useLocation } from 'react-router-dom';
import { Alert, CircularProgress, Box } from '@mui/material';
import EntityManageHeader from './components/EntityManageHeader';
import EntityRegions from './components/EntityRegions';

function EntityManage() {
  const location = useLocation();
  const { isLoading, error, regions, fields } = useEntityManage();

  if (location.state == null) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          Məlumat tapılmadı. Xahiş edirik, düzəliş etmək üçün əvvəlcə siyahıdan bir element seçin.
        </Alert>
      </Box>
    )
  }

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
        <CircularProgress sx={{ color: '#092332' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 2 }}>
        <Alert severity="error">
          Məlumatları yükləyərkən xəta baş verdi.
        </Alert>
      </Box>
    );
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(180deg, rgba(9, 35, 50, 0.02) 0%, transparent 100%)',
          pointerEvents: 'none'
        }
      }}
    >
      <EntityManageHeader title={location.state?.root} />

      <Box 
        sx={{ 
          p: { xs: 2, md: 3 },
          position: 'relative',
          zIndex: 1
        }}
      >
        {regions && fields && <EntityRegions regions={regions} fields={fields} />}
      </Box>
    </Box>
  )
}

export default EntityManage
