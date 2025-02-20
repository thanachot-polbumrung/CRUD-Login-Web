import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import EditIcon from "@mui/icons-material/Edit";
import React from "react";

function BlogCard({
  value,
  handleDelete,
  handleClickOpen,
  handleClose,
  postEdit,
  setPostEdit,
  setCategoryEdit,
  categoryEdit,
  DialogActions,
  handleUpdate,
  open,
  isShowEdit,
  isShowDelete
}) {
  return (
    <Box sx={{ marginLeft: "50px" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Avatar>{value.user?.username ?? ""}</Avatar>
        <Typography style={{ marginLeft: "90%" }}>{value.category}</Typography>
        <img style={{ width: "50%", marginLeft: "25%" }} src={value.imageUrl} />
      </Box>

      <FormControlLabel
        sx={{ marginLeft: "5%", marginTop: "2%" }}
        control={<p />}
        label={value.postContent}
      />
      <Box sx={{ marginLeft: "90%", display: "flex", flexDirection: "column" }}>
        {isShowDelete === true &&(<Button
          color="error"
          onClick={() => handleDelete(value._id)}
          edge="end"
          aria-label="delete"
        >
          <DeleteOutlineRoundedIcon />
        </Button>)}
        {isShowEdit === true && (
          <Button
            color="info"
            onClick={() => handleClickOpen(value._id)}
            edge="end"
            aria-label=""
          >
            <EditIcon />
          </Button>
        )}
      </Box>
      <hr />

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit your content</DialogTitle>
        <DialogContent fullWidth>
          <TextField
            fullWidth
            multiline
            minRows={3}
            placeholder="คุณกำลังคิดอะไรอยู่..."
            value={postEdit}
            onChange={(e) => setPostEdit(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <RadioGroup
            onChange={(e) => setCategoryEdit(e.target.value)}
            value={categoryEdit}
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="Entertain"
              control={<Radio />}
              label="บันเทิง"
            />
            <FormControlLabel value="sport" control={<Radio />} label="กีฬา" />
            <FormControlLabel
              value="politics"
              control={<Radio />}
              label="การเมือง"
            />
            <FormControlLabel
              value="fashion"
              control={<Radio />}
              label="แฟชั่น"
            />
            <FormControlLabel
              value="car"
              control={<Radio />}
              label="ยานพาหนะ"
            />
          </RadioGroup>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdate}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default BlogCard;
