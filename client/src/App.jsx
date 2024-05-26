import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import PostPage from "./pages/PostPage";
import Profile from "./pages/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Security from "./pages/Security";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";
import Comment from "./components/Comment";
import Posts from "./components/Posts";
import Users from "./components/Users";

const App = () => {
  return (
    <Router>
      <ToastContainer />
      <Navbar />
      <Routes>
        <Route exact path="/post/:id" element={<PostPage />} />

        <Route exact path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/security" element={<Security />} />
          <Route exact path="/profile" element={<Profile />} />
        </Route>
        <Route element={<AdminRoute />}>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/dashboard/comment" element={<Comment />} />
          <Route exact path="/dashboard/posts" element={<Posts />} />
          <Route exact path="/dashboard/users" element={<Users />} />
        </Route>
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="*" element={<Home />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
