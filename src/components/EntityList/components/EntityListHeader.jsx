import React from 'react';
import { Box, TextField, Typography } from '@mui/material';
import DynamicIcon from '../../../shared/components/DynamicIcon';

const EntityListHeader = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, flex: '1 1 250px' }}>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        sx={{ width: '100%', maxWidth: '250px', borderRadius: '4px', backgroundColor: 'white' }}
      />

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
        <DynamicIcon name={'HelpOutline'} sx={{ fontSize: 15, color: '#092332' }} />
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Entity Listesi
        </Typography>
      </Box>
    </Box>
  );
};

export default EntityListHeader; 