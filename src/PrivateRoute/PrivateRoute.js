import React from 'react';
import spinner from '../images/spinner.gif'
import { Navigate, useLocation } from 'react-router-dom';
import UseAuth from '../Hooks/useAuth';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, loading } = UseAuth()

    let location = useLocation();
    if (loading) { 
        return  <div>
        <img className="mx-auto" src={spinner} alt="spinner" />
    </div> }

    if (user.email) {
        return children;
    }
    return <Navigate to="/signin" state={{ from: location }} />;
};

export default PrivateRoute;