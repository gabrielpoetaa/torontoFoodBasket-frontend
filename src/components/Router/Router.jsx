import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "../../components/LandingPage/LandingPage";
import Dashboard from "../Dashboard/Dashboard";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default Router;
