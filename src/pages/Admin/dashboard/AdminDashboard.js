import React, { useState, useEffect } from 'react';
// import { useParams } from "react-router-dom";
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './admin.css';
function AdminDasboard() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

        const [open, setOpen] = useState(false);
        const handleOpen = () => setOpen(true);
        const handleClose = () => setOpen(false);

        const [projects, setProjects] = useState(null);
        const StyledTableCell = styled(TableCell)(({ theme }) => ({
            [`&.${tableCellClasses.head}`]: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            [`&.${tableCellClasses.body}`]: {
                fontSize: 16,
            },
        }));

        const StyledTableRow = styled(TableRow)(({ theme }) => ({
            '&:nth-of-type(odd)': {
                backgroundColor: theme.palette.action.hover,
            },
            // hide last border
            '&:last-child td, &:last-child th': {
                border: 0,
            },
        }));

        useEffect(() => {
            axios
                .get("http://localhost:5000/admin/getprojectdata")
                .then((res) => {
                    setProjects(res.data.projects)
                })
                .catch((err) => {
                    console.log(err);
                })
                
        }, []);
       const updt=async(id)=> {
             await axios.put("http://localhost:5000/admin/" + id)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                })
               
        }
        const delet=async(id)=> {
            await axios.delete("http://localhost:5000/admin/" + id)
               .then(res => {
                   console.log(res);
               })
               .catch(err => {
                   console.log(err);
               })
              
       }
        if (!projects) {
            return <h1>No projects found</h1>
        }

        return (
            <div className="admindash">
                <div className="table">
                
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell align='center'>Project Name</StyledTableCell>
                                    <StyledTableCell align="center">Project id</StyledTableCell>
                                    <StyledTableCell align="center">Project Budget</StyledTableCell>
                                    <StyledTableCell align="center">Project Details</StyledTableCell>
                                    <StyledTableCell align="center">Action</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {projects.map((project) => (

                                    <StyledTableRow key={project.pName}>
                                        <StyledTableCell component="th" scope="row" align='center'>
                                            {project.pName}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">{project._id}</StyledTableCell>
                                        <StyledTableCell align="center">{project.pBudget}</StyledTableCell>
                                        <StyledTableCell align="center"><Button onClick={handleOpen}>Detail</Button>
                                            <Modal
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="modal-modal-title"
                                                aria-describedby="modal-modal-description"
                                            >
                                                <Box sx={style}>
                                                    <Typography id="modal-modal-title" variant="h6" component="h2">
                                                        {project.pDetails}
                                                    </Typography>
                                                </Box>
                                            </Modal></StyledTableCell>
                                        <StyledTableCell align="center">
                                            {project.pAccept == 1 ? <p>Accpeted</p>:<><Button variant="contained" color="success" onClick={()=>updt(project._id) } >
                                                Accept
                                            </Button> <p style={{display:"inline-block"}}> | </p> 
                                            <Button variant="outlined" color="error" onClick={()=>delet(project._id) }  >
                                                 Reject
                                            </Button></>}
                                        </StyledTableCell>
                                    </StyledTableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    }

    export default AdminDasboard;

//onClick={deleteOne(project._id)