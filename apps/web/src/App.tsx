import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Callback from "./pages/Callback";
import AuthLayout from "./pages/layouts/AuthLayout";
import Signin from "./pages/views/auth/Signin";
import Signup from "./pages/views/auth/Signup";

const App = () => {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="/auth/signin" element={<Signin />} />
            <Route path="/auth/signup" element={<Signup />} />
          </Route>
          <Route path="auth/github/callback" element={<Callback />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
