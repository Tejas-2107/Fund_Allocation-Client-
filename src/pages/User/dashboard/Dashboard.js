import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar1 from '../../../components/sidebar/Sidebar';
import './dash.css';
import axios from "axios";
function Dashboard() {
    return (
        <div className='dashboard'>
            <Sidebar1 />
            <Outlet />
        </div>

    );
}

export default Dashboard;