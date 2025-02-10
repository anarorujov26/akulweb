import React from 'react';
import { Box, Button, CircularProgress } from '@mui/material';
import DynamicIcon from '../../../shared/components/DynamicIcon';
import DraggableMenu from '../../../shared/components/DraggableMenu';

const EntityListControls = ({ fields, onChangeColumn, isLoading }) => {
  return (
    <Box sx={{
      display: 'flex',
      gap: 1,
      alignItems: 'center',
      flex: '1 1 250px',
      flexWrap: 'wrap',
      justifyContent: 'flex-end',
      '@media (max-width: 600px)': {
        justifyContent: 'center',
        width: '100%',
        marginTop: '1rem',
      }
    }}>
      <Button
        variant="outlined"
        color="primary"
        sx={{ px: 3, fontWeight: 'normal', borderRadius: '4px', backgroundColor: 'white', textTransform: 'none' }}
      >
        <DynamicIcon name={'Add'} sx={{ fontSize: 18, mr: 1 }} />
        Yeni Yarat
      </Button>
      
      <Button
        variant="outlined"
        color="secondary"
        sx={{ px: 3, fontWeight: 'normal', borderRadius: '4px', backgroundColor: 'white', textTransform: 'none' }}
      >
        <DynamicIcon name={'FilterList'} sx={{ fontSize: 18, mr: 1 }} />
        Filter
      </Button>

      {isLoading || !fields[0] ? (
        <CircularProgress />
      ) : (
        <DraggableMenu
          list={fields.map(field => {
            return field.show !== 2 && {
              ...field
            }
          }).filter(x => x !== false)}
          onChange={onChangeColumn}
        />
      )}
    </Box>
  );
};

export default EntityListControls; 