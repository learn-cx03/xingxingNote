import React, { useState } from 'react'
import {
  Routes,
  Route
} from "react-router-dom"


import routes from '@/router'
function App() {
  return (
    <Routes>
      {routes.map(route => <Route exact key={route.path} path={route.path} element={<route.component />} />)}
    </Routes>
  )
}

export default App
