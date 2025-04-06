import {  RouterSignIn } from '@/helpers/RouteName'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const OnlyAdminAllowed = () => {
    const user = useSelector(state => state.user)
    if (user && user.isLoggedIn && user.user.role === 'admin') {
        return (
            <Outlet />
        )
    } else {
        return <Navigate to={RouterSignIn} />
    }

}

export default OnlyAdminAllowed