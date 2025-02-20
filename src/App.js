import "./App.css";
import { Route, Routes, Link } from "react-router";

import { React, useState, useEffect, useContext, createContext } from "react";
import Home from "./page/Home";
import Navbar from "./page/menu/Navbar";
import TapBar from "./page/Services/TapBar";


import Register from "./page/Register";
import axios from "axios";
import Popup from "./page/PopupLogin";
import Proflie from "./page/Proflie";
import Test from "./page/Services/Test";
import Entertain from "./page/category/Entertain";
import Sport from "./page/category/Sport";
import Politics from "./page/category/Politics";
import Fashion from "./page/category/Fashion";
import Car from "./page/category/Car";
export const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};


function App() {
  const [user, setUser] = useState(null);
  
  const getUser = () => {
    axios
      .get("http://localhost:3001/user", { withCredentials: true })
      .then((Response) => {
        if (Response.data.user) {
          setUser(Response.data.user);

          console.log(Response.data.user);
        }
      })
      .catch((err) => console.log("ข้อมูลไม่ถูก", err));
  };

  

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="TapBar" element={<TapBar />} />
        <Route path="Entertain" element={<Entertain />} />
        <Route path="Sport" element={<Sport />} />

        <Route path="Politics" element={<Politics />} />
        <Route path="Fashion" element={<Fashion />} />
        <Route path="Car" element={<Car />} />



        <Route path="Register" element={<Register />} />
        <Route path="Popup" element={<Popup />} />
        <Route path="Proflie" element={<Proflie />} />
        <Route path="Test" element={<Test />} />
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
