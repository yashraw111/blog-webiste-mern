import {  RouteIndex, RouterSignIn } from '@/helpers/RouteName'

import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthRouteProtechtion = () => {
    const user = useSelector(state => state.user)
    if (user && user.isLoggedIn) {
        return (
            <Outlet />
        )
    } else {
        return <Navigate to={RouteIndex}/>
    }

}

export default AuthRouteProtechtion