import React from 'react';
import { CircularProgress } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { formatPrice } from '../../../services/formatPrice';

const EntityListGrid = ({ fields, list, columnVisibilty, onColumnWidthChange, isLoading }) => {

  const columns = fields.map(field => ({
    field: field.name,
    headerName: field.title,
    width: field.width === 'auto' ? 200 : field.width,
    renderCell: (params) => (
      field.dataType === "price" ? formatPrice(params.value) : params.value
    ),
    hide: false
  }))

  const rows = list.map((item, index) => {
    let row = { id: item.id || index };
    fields.forEach(field => {
      row[field.name] = item[field.name];
    });
    return row;
  })


  if (isLoading || !fields[0]) {
    return (
      <div style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        getRowId={(row) => row.id}
        onColumnWidthChange={(response) => onColumnWidthChange(response.width, response.colDef.field)}
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        columnVisibilityModel={columnVisibilty}
        columnBuffer={10}
        sx={{
          backgroundColor: 'white',
          border: 'none',
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: 'white',
          },
          '& .MuiDataGrid-root': {
            backgroundColor: 'white',
          },
          '& .MuiDataGrid-cell': {
            fontSize: '14px',
          },
          '& .MuiDataGrid-cell:hover': {
            cursor: 'pointer'
          }
        }}
        disableColumnMenu
      />
    </div>
  );
};

export default EntityListGrid; 