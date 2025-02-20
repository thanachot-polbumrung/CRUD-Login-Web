import { Box } from "@mui/material";
import React from "react";

import "../../font/EOT/LINESeedSansTH_W_He.eot"
import businessman from "../../imgim/businessman.svg"


function BgCurve() {

  return (
    <Box  >
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "550px", 
        overflow: "hidden",
        // "&::before": {
        //   content: '""',
        //   position: "absolute",
        //   bottom: 0,
        //   left: 0,
        //   width: "100%",
        //   height: "50%",
        //   backgroundColor: "#fff",
        //   borderRadius: "50% 50% 0 0",
        //   transform: "scaleX(1.5)",
        // },
      }}
    >

        <img style={{position:"absolute",textAlign:"center", marginLeft:"40%",transform: 'translate(0, 10%)'}} src={businessman} alt="businessman"/>
        <h1 className="Title2" >Everthing Hispory Read</h1>
        <h1 className="Title" >คุณอ่านทุกสิ่งได้ที่นี่</h1>

        

        
    </Box>
    <Box>
      
    </Box>
   

    
    </Box>
    
  );
}

export default BgCurve;
