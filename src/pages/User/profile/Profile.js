import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import './profile.css';
import { useQuery } from '@tanstack/react-query';
function Profile() {
  const [projects, setProjects] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/user/getUserProfile", {
  //       headers: {
  //         token: "Bearer " + localStorage.getItem('token'),
  //       }
  //     })
  //     .then((res) => {
  //       setProjects(res.data.projects)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }, []);
  useEffect(()=>{
    refetch()
  },[]);
  const { refetch, data = [], isLoading, isFetching } = useQuery(
    "user-profile",
    () => axios.get("http://localhost:5000/user/getUserProfile", {
      headers: {
        token: "Bearer " + localStorage.getItem('token'),
      }
    })
  )

  console.log(data);
  if(isLoading){
    return <h1>loading</h1>
  }
  if (!data) {
    return <h1>No Data Found</h1>
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  return (
    <div className="userprofile">
      <h2>Poject Details</h2>
      <div className='ptable'>
        <ul>
          <li>Project Name</li>
          <li>Project Budget</li>
          <li>Fund</li>
          <li>Accept</li>
        </ul>
        {
          projects.map((project, index) =>
            <ul key={index}>
              <li>{project.pName}</li>
              <li>{project.pBudget}</li>
              <li>{project.pDetails}</li>
              <li>{project.pAccept ? "Acccepted" : "Pending"}</li>
            </ul>
          )
        }
      </div>
    </div>
  );
}

export default Profile;



