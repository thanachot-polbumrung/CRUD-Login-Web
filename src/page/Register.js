import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, ButtonGroup, Container, Dialog, DialogActions, DialogTitle } from "@mui/material";


function Register() {
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPass,setConfirmPass] = useState("")
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    
    const registerUser= (e)=>{
        e.preventDefault()
        if(password === confirmPass){
         axios.post("http://localhost:3001/register",{username,password,email})
        .then(result =>{
            if(result.status ==201 ){
                console.log("User created success")
                navigate("/")
            }
        })
        
        .catch(err=>{
            if(err.response && err.response.status===400){
                window.alert("Email already exists.Please use a diffrent email")
            }else{
                console.log(err)
            }
        })
      }else{
        window.alert("Password isn't match,check please")
      }
    }

    console.log("password: ",password)
    console.log("confirmpassword: ",confirmPass)

    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
  return (
    <React.Fragment>
      <Container maxWidth="90%">
          
            <Box display={"flex"} flexDirection={"row"} sx={{ width: "100%" }}>
            <form onSubmit={registerUser}>
              <Box sx={{ width: "60%", margin: "20px" }}>
                <Grid
                  container
                  justifyContent="flex-end"
                  rowSpacing={1}
                  columnSpacing={1}
                >
                  <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                      Username
                    </Typography>
                    <TextField
                      id="fname"
                      label="Username"
                      variant="outlined"
                      onChange={(e)=>setUsername(e.target.value)}
                      required
                      fullWidth
                      
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6" gutterBottom>
                      Email
                    </Typography>
                    <TextField
                      id="email"
                      label="Email@gmail.com"
                      variant="outlined"
                      onChange={(e)=>setEmail(e.target.value)}
                      required
                      fullWidth
                     
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography  variant="h6" gutterBottom>
                      Password
                    </Typography>
                    <TextField
                    onChange={(e)=>setPassword(e.target.value)}
                      id="lname"
                      label="Password"
                      variant="outlined"
                      required
                      fullWidth
                      type="password"
                     
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Typography  variant="h6" gutterBottom>
                      Confirm Password
                    </Typography>
                    <TextField
                      id="lname"
                      label="Confirm Password"
                      variant="outlined"
                      onChange={(e)=>setConfirmPass(e.target.value)}
                      type="password"
                      
                      required
                      fullWidth
                     
                    />
                  </Grid>
                  
                 
                </Grid>
              </Box>
              </form>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "20px",
                "& > *": {
                  m: 1,
                },
              }}
            >
              <ButtonGroup
                orientation="vertical"
                aria-label="Vertical button group"
                variant="contained"
              >
                {/* <Link href="/"> */}
                <Button variant="outlined"  onClick={handleClickOpen} color="error">
                  cancel
                </Button>
                {/* </Link> */}
              </ButtonGroup>
              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{"คุณต้องการยกเลิกใช่หรือไม่?"}</DialogTitle>
                
                <DialogActions>
                  <Button onClick={handleClose}>Disagree</Button>
                  <Link to="/">
                    <Button>Agree</Button>
                  </Link>
                </DialogActions>
              </Dialog>
              <ButtonGroup
                orientation="vertical"
                aria-label="Vertical button group"
                variant="contained"
              >
                <Button
                  variant="outlined"
                  color="success"
                  onClick={registerUser}
                >
                  Save
                </Button>
              </ButtonGroup>
            </Box>
          
          <Box sx={{ bgcolor: "#FFF", height: "100vh" }}></Box>
        </Container>
      
    </React.Fragment>
  )
}

export default Register
