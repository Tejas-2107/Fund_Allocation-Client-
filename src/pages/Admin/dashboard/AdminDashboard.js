import React, { useState, useEffect } from 'react';
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
    const [clicked, setClicked] = useState(0);

    const [projects, setProjects] = useState([]);
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
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const projectData = await axios.get("http://localhost:5000/admin/getprojectdata");
            setProjects(projectData.data.projects);
        } catch (error) {
            console.log(error);
        }
    }

    const updateProjectStatus = async (id) => {
        try {
            const updatedProjectData = await axios.put("http://localhost:5000/admin/" + id);
            const update = projects.map(oldData => {
                return oldData._id === updatedProjectData.data._id ? updatedProjectData.data : oldData;
            })
            setProjects(update);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteProject = async (id) => {
        try {
            const afterDelete = await axios.delete("http://localhost:5000/admin/" + id);
            setProjects(afterDelete.data);
        } catch (error) {
            console.log(error);
        }
    }

    const sortDataWithName = (projects) => {
        const sortedData = [...projects].sort((a, b) => { return parseFloat(a.pBudget) - parseFloat(b.pBudget) });
        setProjects(sortedData);
    }
    if (!projects) {
        return <h1>No projects found</h1>
    }

    const sortWithAccpetance = (projects) => {
        const acceptedProjects = [...projects].filter((project) => {
            return (project.pAccept === 1);
        })
        setProjects(acceptedProjects);
    }

    return (
        <div className="admindash">
            <div className="table">

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align='center' onClick={() => sortDataWithName(projects)}>Project Name</StyledTableCell>
                                <StyledTableCell align="center">Project id</StyledTableCell>
                                <StyledTableCell align="center">Project Budget</StyledTableCell>
                                <StyledTableCell align="center">Project Details</StyledTableCell>
                                <StyledTableCell align="center" onClick={() => sortWithAccpetance(projects)}>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {projects.map((project) => (

                                <StyledTableRow key={project._id}>
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
                                        {project.pAccept == 1 ? <p>Accpeted</p> : <><Button variant="contained" color="success" onClick={() => updateProjectStatus(project._id)} >
                                            Accept
                                        </Button> <p style={{ display: "inline-block" }}> | </p>
                                            <Button variant="outlined" color="error" onClick={() => deleteProject(project._id)}  >
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