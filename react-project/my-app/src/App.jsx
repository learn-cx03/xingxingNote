import React, { useState, useEffect } from 'react'
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom"
import NavBar from './components/NavBar'
import routes from '@/router'



function App() {
  const location = useLocation();
  const { pathname } = location;
  const isShowNav = ['/', '/data', '/user'];
  const [showNav, setShowNav] = useState(false)
  useEffect(() => {
    setShowNav(isShowNav.includes(pathname));
  }, [pathname])
  return (
    <>
      <Routes>
        {routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component />} />)}
      </Routes>
      <NavBar showNav={showNav} />
    </>
  )
}

export default App
