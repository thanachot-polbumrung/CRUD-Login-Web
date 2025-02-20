import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from '@mui/material/IconButton';
import { useNavigate } from "react-router";
import { Link } from "react-router";

function Bar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        <Link to={"../Entertain"}>
          <Button >บันเทิง</Button>
        </Link>
      </List>
      <List>
        <Link to={"../Sport"}>
        <Button>กีฬา</Button>
        </Link>
      </List>
      <List>
        <Link to={"../Politics"}>
        <Button>การเมือง</Button>
        </Link>
      </List>
      <List>
        <Link to={"../Fashion"}>
        <Button>แฟชั่น</Button>
        </Link>
      </List>
      <List>
        <Link to={"../Car"}>
        <Button >ยานพาหนะ</Button>
        </Link>
      </List>
      <Divider />
      <List></List>
    </Box>
  );
  return (
    <div>
      <IconButton  onClick={toggleDrawer(true)}>::หมวดหมู่+</IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default Bar;
