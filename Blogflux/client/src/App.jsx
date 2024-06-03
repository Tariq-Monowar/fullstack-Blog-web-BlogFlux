import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blog from "./fatures/blog/Blog";
import "./App.scss";
import Join from "./fatures/join/JoinView";
import Profile from "./fatures/profile/ProfileView";
import Navbar from "./components/navBar/Navbar";
import CreateBlog from "./fatures/createBlog/CreateBlog";
const App = () => {
 
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Blog />} />
          <Route path="/createblog" element={<CreateBlog />} />
          <Route path="/join" element={<Join />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
