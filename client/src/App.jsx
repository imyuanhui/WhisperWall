import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import CreatePost from "./pages/CreatePost";
import ViewPost from "./pages/ViewPost";
import UpdatePost from "./pages/UpdatePost";
import LandingPage from "./pages/LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-whisper" element={<CreatePost />} />
          <Route path="/update-whisper/:postId" element={<UpdatePost />} />
        </Route>
        <Route path="/view-whisper/:postId" element={<ViewPost />} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
