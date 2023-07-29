import React from 'react';
import { Link, Outlet,useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import './sidebar.css';
function Sidebar1() {
    const navigate = useNavigate();
    function logout(){
        window.localStorage.clear();
        navigate("/user/login");
    }
    return (
        <div className='sidebar'>
            <div className="menu">
                <Link to="/userdashboard" className='link'> Home</Link>
                <Link to="/userdashboard/profile" className='link'> Profile</Link>
                <Link to="/userdashboard/request-for-fund" className='link'> Request for Fund</Link>
                <Button
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={logout}
                >
                    log out
                </Button>
            </div>

        </div>

    )
}

export default Sidebar1;
