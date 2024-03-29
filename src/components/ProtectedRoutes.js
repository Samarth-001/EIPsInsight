/* eslint-disable prettier/prettier */
/* eslint-disable react/prop-types */

import React from 'react'
import { Navigate } from 'react-router-dom'
import { useUserAuth } from 'src/Context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { user } = useUserAuth()

  if (user === null) {
    return <Navigate to="/login" />
  }
  return children
}

export default ProtectedRoute
