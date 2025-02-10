import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotRootPage from './../shared/components/NotRootPage';
import EntityList from './../components/EntityList/EntityList';

const MainRouters = () => {

  // Sahifələrdən route yaratmaq üçün bu datanı gətirdik 
  // const childs = useCommon(state => state.childs);

  return (
    <Routes>
      <Route path='/' element={<Navigate to={'/list/:root'} replace />} />
      <Route path='/list' element={<NotRootPage/>}/>
      <Route path='/list/:root' element={<EntityList />} />
    </Routes>
  )
}

export default MainRouters
