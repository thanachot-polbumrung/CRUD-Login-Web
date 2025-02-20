const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const UserModel = require("./Model/User");
const BlogModel = require("./Model/Blog");
const PhotoModel = require("./Model/TestImg");
const multer = require("multer");
const path = require("path");

const isLogin = require("./middlewares/Islogin");
const { Upload } = require("@mui/icons-material");

dotenv.config();
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // 1 day
  })
);

//imgup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("ไม่พบไฟล์");
  }
  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  res.status(200).json({
    message: "อัปโหลดสำเร็จ",
    imageUrl: imageUrl,
  });
});

app.use("/uploads", express.static("uploads"));

app.listen(5000, () => {
  console.log("Server กำลังทำงานที่พอร์ต 5000");
});

//

app.post("/upload", isLogin, upload.single("PhotoModel"), async (req, res) => {
  if (!req.file) {
    return res.status(400).send("ไม่พบไฟล์");
  }

  const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
    req.file.filename
  }`;

  try {
    const newImage = new Image({
      imageUrl: imageUrl,
      title: req.body.title || "Untitled",
    });

    await newImage.save();

    res.status(200).json({
      message: "อัปโหลดและบันทึกลงฐานข้อมูลสำเร็จ",
      imageUrl: imageUrl,
      PhotoModel: newImage,
    });
  } catch (error) {
    res.status(500).json({
      message: "เกิดข้อผิดพลาดในการบันทึกลงฐานข้อมูล",
      error: error.message,
    });
  }
});

//

app.post("/logout", isLogin, (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Failed to logout" });
      } else {
        res.status(200).json("Logout successful");
      }
    });
  } else {
    res.status(400).json({ error: "No session found" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await UserModel.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
      return res.status(400).json({ err: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ err: err.massage });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        req.session.user = {
          id: user._id,
          name: user.username,
          email: user.email,
        };
        console.log(user.username);
        res.json("Success");
        console.log("login success");
      } else {
        res.status(401).json("Password don't match");
      }
    } else {
      res.status(404).json("No Records found");
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/user", isLogin, (req, res) => {
  res.json({ user: req.session.user });
});

app.get("/blog", async (req, res) => {
  try {
    const blog = await BlogModel.find({}).sort({ uploadDate: -1 });
    const populatedBlogs = await Promise.all(
      blog.map(async (value) => {
        const user = await UserModel.findById(value.userId);
        return {
          ...value.toObject(),
          user,
        };
      })
    );
    res.json({ blog: populatedBlogs });
  } catch (err) {
    res.status(400).json(err);
  }
});

app.post("/blog", isLogin, (req, res) => {
  console.log(req.body);
  console.log("blog: ", req.session.user);
  console.log("ดูค่าreq.session.user.id: ", req.session.user.id);
  BlogModel.create({ ...req.body, userId: req.session.user.id })
    .then((blog) => res.json({ blog }))
    .catch((err) => console.log("err", err));
});

app.put("/updateBlog/:id", isLogin, (req, res) => {
  const id = req.params.id;
  console.log(id);
  BlogModel.findByIdAndUpdate(
    { _id: id },
    {
      postContent: req.body.postContent,
      category: req.body.category,
    }
  )
    .then((blog) => res.json({ blog }))
    .catch((err) => res.json(err));
  console.log("postContent: ", req.body.postContent);
  console.log("category: ", req.body.category);
});

app.delete("/deleteBlog/:id", isLogin, (req, res) => {
  const id = req.params.id;
  console.log(id);
  BlogModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.get("/getEditBlog/:id", isLogin, (req, res) => {
  const id = req.params.id;
  console.log(id);
  BlogModel.findById({ _id: id })
    .then((blog) => res.json({ blog }))
    .catch((err) => res.json(err));
  console.log("blog: ", req.session.user);
});

app.get("/proFile", isLogin, async (req, res) => {

  try {
    console.log("req.session.user.id profile: ",req.session.user.id)
    const blog = await BlogModel.find({ userId: req.session.user.id }).sort({
      uploadDate: -1,
    });
    console.log("blogprofile: ",blog)
    const populatedBlogs = await Promise.all(
      blog.map(async (value) => {
        const user = await UserModel.findById(value.userId);
        return {
          ...value.toObject(),
          user,
        };
      })
    );

    res.json({ blog:populatedBlogs });
  } catch (err) {
    res.json(err);
  }
});

app.get("/category/:category", isLogin, async (req, res) => {
  const category = req.params.category;
  try {
    console.log(category);
    const blog = await BlogModel.find({ category: category }).sort({
      uploadDate: -1,
    });

    const populatedBlogs = await Promise.all(
      blog.map(async (value) => {
        const user = await UserModel.findById(value.userId);
        return {
          ...value.toObject(),
          user,
        };
      })
    );

    res.json({ blog: populatedBlogs });
  } catch (err) {
    res.json(err);
  }
});
