import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Avatar, Button, Grid } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import "./signup.css";

function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    document.title = "signup";
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };
  const postData = async (e) => {
    e.preventDefault();
    const { username, email, password } = user;

    if (username && password && email) {
      axios
        .post("http://localhost:5000/user/signup", user)
        .then((res) => {
          if (res.data.statusCode == "200") {
            setTimeout(() => {
              toast.success("Account created login to continue");
            }, 100)
            navigate("/user/login");
          }
          else if (res.data.statusCode == "401") {
            toast.error("Email already exist please login");
          }
          else {
            toast.error("Server error");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    else {
      toast.error("All fields are required");
    }
  };

  return (

    <Box
      component="form"
      className="signup_form"
      sx={{
        padding: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 350,
      }}
    >
      <ToastContainer />
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
      <h2>Signup</h2>
      <form method="post">
        <TextField
          color='warning'
          name="username"
          fullWidth
          margin="normal"
          label="Username"
          type="text"
          variant="outlined"
          autocomplete="off"
          onChange={handleChange}
          required
        />
        <TextField
          color='warning'
          name="email"
          fullWidth
          margin="normal"
          label="Email"
          type="email"
          variant="outlined"
          autocomplete="off"
          onChange={handleChange}
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
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          className="btn-auth"
          onClick={postData}
          color='success'
        >
          Signup
        </Button>
        <ToastContainer theme="dark" />
        <Grid container>
          <Grid item>
            <a className="s" href="login">Already have an account? Log in</a>
          </Grid>
        </Grid>
      </form>

    </Box>
  );
}

export default Signup;
