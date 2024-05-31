import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const AuthWrap = () => {
    return (
        localStorage.getItem('authtoken') ? <Outlet /> : <Navigate to='/login' />
    )
}

export default AuthWrap