/* eslint-disable react/prop-types */
import {Navigate} from 'react-router-dom'

export const ProtectedRoutes = ({children}) => {

    const token = localStorage.getItem("token");
    if(token) {
        return children;
    }

    return <Navigate to = "/login" />
}

