import React from 'react'
import { Navigate,Outlet, useLocation } from 'react-router-dom'
function ProtectedRout() {
  return (
    <Outlet/>
  )
}

export default ProtectedRout