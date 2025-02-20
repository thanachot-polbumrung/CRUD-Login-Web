import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Bar from "../Services/Bar";
import axios from "axios";
import { useUserContext } from "../../App";
import BlogCard from "../Services/BlogCard";

function Entertain() {
  const [open, setOpen] = useState(false);
  const { user } = useUserContext();
  const [blog, setBlog] = useState([]);
  const [postEdit, setPostEdit] = useState("");
  const [categoryEdit, setCategoryEdit] = useState("");


 

  const getBlog = () => {
    axios
      .get("http://localhost:3001/category/Entertain", { withCredentials: true })
      .then((Response) => {
        if (Response.data.blog) {
          setBlog(Response.data.blog);

          console.log(Response.data.blog);
        }
      })
      .catch((err) => console.log("ข้อมูลไม่ถูก", err));
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


  useEffect(() => {
    getBlog();
  }, []);

  const handleClickOpen = (id) => {
    handleEdit(id);

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
        <Typography>บันเทิง</Typography>

        <Card sx={{ maxWidth: 1000, margin: "20px auto" }}>
          <CardContent>
            <Box>
              {blog?.map((value) => (
                <BlogCard
                  key={value._id}
                  isShowEdit={user?.id === value.userId}
                  isShowDelete={user?.id === value.userId}
                  value={value}
                  handleClickOpen={handleClickOpen}
                  handleClose={handleClose}
                  postEdit={postEdit}
                  setPostEdit={setPostEdit}
                  setCategoryEdit={setCategoryEdit}
                  categoryEdit={categoryEdit}
                  DialogActions={DialogActions}
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

export default Entertain;
