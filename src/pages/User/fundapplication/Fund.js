import React, { useState } from 'react';
import './fund.css';
import Box from "@mui/material/Box";
import Textarea from '@mui/joy/Textarea';
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@mui/material";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import axios from 'axios';
function Fund() {
    const [projectData, setData] = useState({
        pName: "",
        pDetails: "",
        pBudget: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...projectData,
            [name]: value,
        })
    }
    const postData = async (e) => {
        e.preventDefault();
        const { pName, pDetails, pBudget } = projectData;

        if (pName && pDetails && pBudget) {
            axios.
                post("http://localhost:5000/user/sendProjectData", projectData, {
                    headers: {
                        token: "Bearer " + localStorage.getItem('token'),
                    }
                })
                .then((res) => {
                    if (res.data.statusCode == "200") {
                        toast.success("Project data saved");
                    }
                    else if (res.data.statusCode == "403") {
                        toast.error("Token is expired please login");
                    }
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        else {
            toast.error("All fileds are required");
        }
    }
    return (
        <div className="fundForm">
            <Box
                component="form"
                sx={{
                    marginTop: 10,
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 600,
                    gap: 2
                }}
            >
                <Textarea required placeholder="Project Name…" name='pName' color="neutral" minRows={1} className='textarea' onChange={handleChange} />
                <Textarea required placeholder='Project Details...' name='pDetails' color="neutral" minRows={6} className='textarea' onChange={handleChange} />
                <FormControl fullWidth sx={{ m: 1 }}>
                    <InputLabel htmlFor="outlined-adornment-amount">Budget</InputLabel>
                    <OutlinedInput
                        type='number'
                        name='pBudget'
                        placeholder='Enter the Budget'
                        onChange={handleChange}
                        id="outlined-adornment-amount"
                        startAdornment={<InputAdornment position="start">₹</InputAdornment>}
                        label="Amount"
                    />
                </FormControl>
                <Button
                    type="submit"
                    fullWidth
                    color='success'
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    className="btn"
                    onClick={postData}
                >
                    Submit
                </Button>
                <ToastContainer />
            </Box>
        </div>

    );
}
export default Fund;

