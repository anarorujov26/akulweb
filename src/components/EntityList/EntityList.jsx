import React from 'react';
import { Box, Paper } from '@mui/material';
import EntityListHeader from './components/EntityListHeader';
import EntityListControls from './components/EntityListControls';
import EntityListGrid from './components/EntityListGrid';
import useEntityList from './hooks/useEntityList';

const EntityList = () => {

  const {
    fields,
    list,
    columnVisibilty,
    handleChangeColumnWidth,
    handleChangeColumn,
    isLoading,
    onRowClick,
  } = useEntityList();

  return (
    <Box sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      height: 'calc(100vh - 101px)',
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
    }}>
      <Paper 
        elevation={0}
        sx={{
          p: 2.5,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(226, 232, 240, 0.8)',
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
          position: 'relative',
          zIndex: 1,
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
            backgroundColor: 'rgba(255, 255, 255, 0.8)'
          }
        }}
      >
        <Box sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 2
        }}>
          <EntityListHeader />
          <EntityListControls
            fields={fields}
            handleChangeColumn={handleChangeColumn}
            isLoading={isLoading}
          />
        </Box>

        <Box sx={{ mt: 3, overflow: 'hidden' }}>
          <EntityListGrid
            onRowClick={onRowClick}
            columnVisibilty={columnVisibilty}
            fields={fields}
            handleChangeColumnWidth={handleChangeColumnWidth}
            isLoading={isLoading}
            list={list}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default EntityList; 