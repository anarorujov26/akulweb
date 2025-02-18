import { Box, CircularProgress } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MainRouters from './routes/MainRouters';
import useCommon from './shared/context/useCommon';
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar/Navbar';
import { useLocation } from 'react-router-dom';

function App() {
  const childs = useCommon(state => state.childs);
  const [authToken, setAuthToken] = useState(localStorage.getItem('token'));
  const location = useLocation();
  
  // Tam ekran olması gereken sayfaları kontrol et
  const isFullscreenRoute = ['/entity', '/document'].some(path => 
    location.pathname.startsWith(path)
  );

  function controllerToken() {
    if (localStorage.getItem('token') == null) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      if (urlSearchParams.has('data')) {
        const token = urlSearchParams.get('data');
        localStorage.setItem('token', token);
        window.location.href = 'http://localhost:3000'
        setAuthToken(token);
      } else {
        window.location.href = `https://accounts.bein.az/login.php?refer=http://localhost:3000/`;
      }
    }
  }

  useEffect(() => {
    controllerToken();
  }, [])

  if (isFullscreenRoute) {
    return (
      <Box sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <ToastContainer/>
        <MainRouters />
      </Box>
    )
  }

  return (
    authToken == null ?
      <Box sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <CircularProgress size={'3rem'} />
      </Box>
      :
      <Box sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <ToastContainer/>
        <Navbar />
        {
          childs == null ?
            <Box sx={{
              width: '100vw',
              height: 'calc(100vh - 101px)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <CircularProgress />
            </Box>
            :
            <Box sx={{
              width: '100vw',
              height: 'calc(100vh - 101px)',
            }}>
              <MainRouters />
            </Box>
        }
      </Box>
  )
}

export default App
