import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Avatar, Button, Link, Grid } from "@mui/material";
import "./login.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
function Login() {
  const navigate = useNavigate();
  const [user, setLogin] = useState({
    email: "",
    password: "",
  });
  useEffect(()=>{
    document.title = "login";
  },[]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...user,
      [name]: value,
    });
  };

  const postData = (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (email && password) {
      axios.post("http://localhost:5000/user/login", user)
        .then((res) => {
          if (res.data.statusCode == "200") {
            localStorage.setItem("token",res.data.token);
            console.log("token",res.data.token);
            navigate("/userdashboard");
          }
          else if (res.data.statusCode == "401") {
            toast.error("User not found");
          }
          else if (res.data.statusCode == "403") {
            toast.error("Wrong Password");
          }
          else {
            toast.error("Server error");
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
    else {
      toast.error("All fields are required");
    }
  };

  return (

    <>
      <Box
        className="login_form"
        sx={{
          padding: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 350,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
        <h2>Login</h2>
        <form method="post">
          <TextField
            name="email"
            fullWidth
            color='warning'
            margin="normal"
            label="Email"
            type="email"
            variant="outlined"
            onChange={handleChange}
            autocomplete="off"
            required
          />
          <TextField
          color='warning'
            name="password"
            fullWidth
            margin="normal"
            label="Password"
            variant="outlined"
            type="password"
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <Button
            type="submit"
            color='success'
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            className="btn-auth"
            onClick={postData}
          >
            Login
          </Button>
          <Grid container>
            <Grid item >
            <a className="s" href="signup">Don't have an account? Sign up</a>
            </Grid>
          </Grid>
          <p id="error"></p>
        </form>
        <ToastContainer theme="dark" />
      </Box>
    </>

  );
}
export default Login;

{/*  */ }