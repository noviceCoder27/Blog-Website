/* eslint-disable react/prop-types */
import {Navigate} from 'react-router-dom'

export const ProtectedRoutes = ({children}) => {

    const user = localStorage.getItem("user");
    if(user) {
        return children;
    }

    return <Navigate to = "/login" />
}

