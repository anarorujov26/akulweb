import React from 'react';
import { Box } from '@mui/material';
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
    isLoading
  } = useEntityList();

  return (
    <Box sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 2,
      height: 'calc(100vh - 101px)',
      backgroundColor: '#f5f5f5'
    }}>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 2
      }}>
        <EntityListHeader
        />
        <EntityListControls
          fields={fields}
          handleChangeColumn={handleChangeColumn}
          isLoading={isLoading}
        />
      </Box>

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <EntityListGrid
          columnVisibilty={columnVisibilty}
          fields={fields}
          handleChangeColumnWidth={handleChangeColumnWidth}
          isLoading={isLoading}
          list={list}
        />
      </Box>
    </Box>
  );
};

export default EntityList; 