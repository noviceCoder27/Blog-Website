/* eslint-disable react/prop-types */
import {Navigate} from 'react-router-dom'
import { getFromLocalStorage } from '../utils/getFromLocalStorage';

export const ProtectedRoutes = ({children}) => {

    const token = getFromLocalStorage();
    if(token) {
        return children;
    }

    return <Navigate to = "/login" />
}

