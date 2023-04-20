import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar1 from '../../../components/sidebar/Sidebar';
import './dash.css';
import axios from "axios";
function Dashboard() {
    const getUserData = async () => {

        try {
            const res = await axios.post('http://localhost:5000/user/getUserData', {}, {
                headers: {
                    token: "Bearer " + localStorage.getItem('token'),
                }
            })

            if (res.data.statusCode == "403") {
                alert("Token expired please login");
                localStorage.clear();
                window.location.reload();  
            }
            else if (res.data.statusCode == "200") {
                localStorage.setItem("email",res.data.user.email);
                localStorage.setItem("username",res.data.user.username);
            }

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUserData();
    }, [])

    return (
        <div className='dashboard'>
            <Sidebar1 />
            <Outlet />

        </div>

    );
}

export default Dashboard;