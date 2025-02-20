import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Test from "./Services/Test";
import {
  Avatar,
  Card,
  CardContent,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  styled,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import Bar from "./Services/Bar";
import { TextField } from "@mui/material";
import axios from "axios";
import { useUserContext } from "../../src/App";
import { useNavigate, useParams } from "react-router";
import BlogCard from "./Services/BlogCard";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function Proflie() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { user } = useUserContext();
  const [postContent, setPostContent] = useState("");
  const [blog, setBlog] = useState([]);
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState("");
  const [postEdit, setPostEdit] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [fileName, setFileName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePostSubmit = (e) => {
    e.preventDefault();

    if (postContent.trim()) {
      console.log("Post content:", postContent);
      axios
        .post(
          "http://localhost:3001/blog",
          { category, postContent, imageUrl },
          { withCredentials: true }
        )
        .then((result) => getBlog())
        .catch((err) => console.log(err));
      setCategory(null);
      setPostContent("");
      setImageUrl(null);
      setFileName("");
      setSelectedFile("");
    }
  };

  const getBlog = () => {
    axios
      .get("http://localhost:3001/proFile", { withCredentials: true })
      .then((Response) => {
        if (Response.data.blog) {
          setBlog(Response.data.blog);

          console.log(Response.data.blog);
        }
      })
      .catch((err) => console.log("ข้อมูลไม่ถูก", err));
  };

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/deleteBlog/" + id, {
        withCredentials: true,
      })
      .then(() => getBlog())
      .catch((err) => console.log(err));
  };

  const handleEdit = (id) => {
    axios
      .get("http://localhost:3001/getEditBlog/" + id, { withCredentials: true })
      .then((result) => {
        setPostEdit(result.data.blog.postContent);
        setCategoryEdit(result.data.blog.postContent);
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(
        "http://localhost:3001/updateBlog/" + editId,
        { postContent: postEdit, category: categoryEdit },
        { withCredentials: true }
      )
      .then(() => getBlog())

      .catch((err) => console.log(err));

    handleClose();
  };

  useEffect(() => {
    getBlog();
  }, []);

  const handleClickOpen = (id) => {
    handleEdit(id);
    setEditId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  console.log("ดูค่าusername: ", user?.name);

  return (
    <Box>
      <Bar />
      <Box sx={{ marginTop: "10px" }}>
        <Card sx={{ maxWidth: 1000, margin: "20px auto" }}>
          <CardContent>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Avatar>You</Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  placeholder="คุณกำลังคิดอะไรอยู่..."
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  variant="outlined"
                  sx={{ mb: 2 }}
                />

                <Box>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      เลือกหมวดหมู่
                    </FormLabel>
                    <RadioGroup
                      onChange={(e) => setCategory(e.target.value)}
                      value={category}
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="Entertain"
                        control={<Radio />}
                        label="บันเทิง"
                      />
                      <FormControlLabel
                        value="sport"
                        control={<Radio />}
                        label="กีฬา"
                      />
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
                  </FormControl>
                  <Test
                    imageUrl={imageUrl}
                    setImageUrl={setImageUrl}
                    fileName={fileName}
                    setFileName={setFileName}
                    selectedFile={selectedFile}
                    setSelectedFile={setSelectedFile}
                  />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <Button
                    variant="contained"
                    onClick={handlePostSubmit}
                    disabled={!postContent.trim()}
                  >
                    โพสต์
                  </Button>
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 1000, margin: "20px auto" }}>
          <CardContent>
            <Box>
              {blog?.map((value) => (
                <BlogCard
                  key={value._id}
                  isShowEdit={user?.id === value.userId}
                  isShowDelete={user?.id === value.userId}
                  value={value}
                  handleDelete={handleDelete}
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
                  postEdit={postEdit}
                  setPostEdit={setPostEdit}
                  setCategoryEdit={setCategoryEdit}
                  categoryEdit={categoryEdit}
                  DialogActions={DialogActions}
                  handleUpdate={handleUpdate}
                  open={open}
                />
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default Proflie;
