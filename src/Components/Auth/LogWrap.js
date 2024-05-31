import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const LogWrap = () => {
    return (
        !localStorage.getItem('authtoken') ? <Outlet /> : <Navigate to='/' />
    )
}

export default LogWrap