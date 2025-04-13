import { Link, Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';           
import { MainPage } from '../main/MainPage';
 
export const AppRouter = () => {

  return (
    <>  
        <Routes> 
          <Route path="*" element={<MainPage/>}/> 
        </Routes> 
    </>  
  )
}
