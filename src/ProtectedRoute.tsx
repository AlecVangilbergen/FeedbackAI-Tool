/* import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
    allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
    const token = sessionStorage.getItem('access_token');
    const userRole = sessionStorage.getItem('role');

    console.log('ProtectedRoute:', { token, userRole, allowedRoles });

    if (!token) {
        // If there's no token, redirect to the login page
        return <Navigate to="/login" />;
    }

    if (userRole && allowedRoles.includes(userRole)) {
        // If the user role is allowed, render the children components
        return <>{children}</>;
    } else {
        // If the user role is not allowed, redirect to a 403 page or home
        return <Navigate to="/" />;
    }
};

export default ProtectedRoute;
 */