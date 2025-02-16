import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import NotRootPage from './../shared/components/NotRootPage';
import EntityList from './../components/EntityList/EntityList';
import EntityManage from './../components/EntityManage/EntityManage';
import DocumentManage from './../components/DocumentManage/DocumentManage';

const MainRouters = () => {

  // Sahifələrdən route yaratmaq üçün bu datanı gətirdik 
  // const childs = useCommon(state => state.childs);

  return (
    <Routes>
      <Route path='/list' element={<NotRootPage/>}/>
      <Route path='/list/:root' element={<EntityList />} />
      <Route path='/entity' element={<EntityManage/>}/>
      <Route path='/document' element={<DocumentManage/>}/>
    </Routes>
  )
}

export default MainRouters
