import React from 'react';
import { Navigate } from 'react-router-dom';
function ProtectRoute({children}) {
    if(localStorage.getItem("token")){
        return children;
    }
    else{
        return <Navigate to="/user/login" />;
    }
}

export default ProtectRoute;