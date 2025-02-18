import React from 'react';
import { Box, CircularProgress } from '@mui/material';
import DraggableMenu from '../../../shared/components/DraggableMenu';

const EntityListControls = ({ fields, handleChangeColumn, isLoading }) => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
      {isLoading || !fields[0] ? (
        <CircularProgress size={24} sx={{ color: '#092332' }} />
      ) : (
        <DraggableMenu
          list={fields.map(field => {
            return field.show !== 2 && {
              ...field
            }
          }).filter(x => x !== false)}
          onChange={handleChangeColumn}
        />
      )}
    </Box>
  );
};

export default EntityListControls; 