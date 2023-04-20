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
function Profile() {
  const [projects, setProjects] = useState(null);
  // const[data,setdata]=useState([]);
  useEffect(() => {
    axios
      .post("http://localhost:5000/user/getprojectdata",{
        headers: {
            token: "Bearer " + localStorage.getItem('token'),
        }
    })
      .then((res) => {
      setProjects(res.data.projects)
      })
      .catch((err) => {
        console.log(err);
      })
  }, []);
console.log(projects)

  if(!projects){
    return <h1>Loading... or failed idk</h1>
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

  // return map
  return (
    <div className="userprofile">
      {/* <h1>Account Review</h1>
      <h3>Profile</h3> */}
      <h2>Poject Details</h2>
      <div className='ptable'>
        <ul>
          <li>Project Name</li>
          <li>Project Budget</li>
          <li>Fund</li>
          <li>Accept</li>
        </ul>
       {
        projects.map((project,index)=>
        <ul>
        <li>{project.pName}</li>
          <li>{project.pBudget}</li>
          <li>{project.pDetails}</li>
          <li>Accept</li>
        </ul>
        )
       }
      </div>
    </div>
  );
}

export default Profile;



{/* <TableContainer component={Paper} sx={{ marginTop: 5 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Project Name</StyledTableCell>
              <StyledTableCell align="center">Your Budget</StyledTableCell>
              <StyledTableCell align="center">Fund Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <StyledTableRow >
              {/* <StyledTableCell align="center">{data.pName}</StyledTableCell>
              <StyledTableCell align="center">{data.pBudget}</StyledTableCell>
              <StyledTableCell align="center">-</StyledTableCell>
              <StyledTableCell align="center"><DeleteIcon /></StyledTableCell> */}
      //        { projects.map((item,index)=>
      //        <>
      //         <StyledTableCell align="center">{item.pName}</StyledTableCell>
      //         <StyledTableCell align="center">{item.pBudget}</StyledTableCell>
      //         <StyledTableCell align="center">-</StyledTableCell>
      //         <StyledTableCell align="center"><DeleteIcon /></StyledTableCell>
      //          <br />
      //         </>
      //         )}
      //       </StyledTableRow>
      //     </TableBody>
      //   </Table>
      // </TableContainer> */}