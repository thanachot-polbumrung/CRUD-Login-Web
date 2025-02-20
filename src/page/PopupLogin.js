import React, { useContext, useEffect, useState, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";

import DialogTitle from "@mui/material/DialogTitle";
import { Box, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { UserContext, useUserContext } from "../App";

function Popup() {
  const { user,setUser } = useUserContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const loginUser = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/login",
        { email, password },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.data === "Success") {
          axios
            .get("http://localhost:3001/user", { withCredentials: true })
            .then((Response) => {
              if (Response.data.user) {
                setUser(Response.data.user);
                navigate("TapBar", { state: { user: Response.data.user } });
                console.log(Response.data.user);
              }
            })
            .catch((err) => console.log("ข้อมูลไม่ถูก", err));
        } else {
          alert("Login failed");
        }
      })
      .catch((err) => console.log(err));
  };

  const handleLogout = () => {
    axios
      .post("http://localhost:3001/logout", {}, { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setUser(null)
          navigate("/");
          
        }
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  if (user) {
    return (
      <React.Fragment>
        <Link to={"Proflie"}>
          <Button sx={{ color: "#fff", marginLeft: "10%" ,marginTop:"25%" }}>{user.name}</Button>
        </Link>
        <Button onClick={handleLogout} color="error" sx={{ marginLeft: "1%" }}>
          Logout
        </Button>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Button
        sx={{ color: "#fff", marginLeft: "10%" }}
        variant="text"
        onClick={handleClickOpen}
      >
        Login
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle sx={{ marginLeft: "40%", alignItems: "center" }}>
          Login
        </DialogTitle>
        <form onSubmit={loginUser}>
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            label="E-mail"
            variant="filled"
            fullWidth
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="filled"
            fullWidth
          />

          <Link to={"Register"}>
            <Button onClick={handleClose}>register</Button>
          </Link>

          <DialogActions>
            <Button onClick={handleClose}>cancel</Button>
            <Button type="submit" onClick={handleClose} autoFocus>
              confirm
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

export default Popup;
