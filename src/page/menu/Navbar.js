import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import "../../font/EOT/LINESeedSansTH_W_He.eot"

import businessman from "../../imgim/businessman.svg"

import { Button } from "@mui/material";
import { Link } from "react-router";
import Popup from "../PopupLogin";


export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar sx={{ backgroundColor: "#000000"}} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1,fontFamily: 'LINESeedSansTH_W_He'  }}>
            Website.com
          </Typography>
          <Box
            sx={{
              marginLeft: "5px",
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            <Box sx={{ marginRight: "20px" }}>
              <Link to="/">
              <Button sx={{ my: 2, color: "white", display: "block" }}>
                :::home
              </Button>
              </Link>
            </Box>
            <Box sx={{ marginRight: "20px" }}>
              <Link to={"TapBar"}>
              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  marginLeft: "5px",
                }}
              >
                _service
              </Button>
              </Link>
            </Box>
            <Box sx={{ marginRight: "20px" }}>
              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  marginLeft: "5px",
                }}
              >
                _portfolio
              </Button>
            </Box>
            <Box sx={{ marginRight: "20px" }}>
              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  marginLeft: "5px",
                }}
              >
                _blog
              </Button>
            </Box>
            <Box sx={{ marginRight: "20px" }}>
              <Button
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  marginLeft: "5px",
                }}
              >
                _contact
              </Button>
            </Box>
            <Popup/>
          </Box>


        </Toolbar>
      </AppBar>
    </Box>
  );
}
