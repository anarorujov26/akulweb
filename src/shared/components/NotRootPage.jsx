import { Alert } from '@mui/material';
import React from 'react';

function NotRootPage() {
  return (
    <div>
      <Alert variant="standard" sx={{
        marginTop: 5,
        width: '50%',
        marginLeft: 5
      }} severity="info">
        Diqqət! Girilən url doğru deyil.
      </Alert>
    </div>
  );
}

export default NotRootPage;
