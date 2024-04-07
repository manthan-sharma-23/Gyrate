import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthLayout from "./pages/layouts/AuthLayout";
import Signin from "./pages/views/auth/Signin";
import Signup from "./pages/views/auth/Signup";
import { RecoilRoot } from "recoil";
import ApplicationLayout from "./pages/layouts/ApplicationLayout";

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ApplicationLayout />}>
              <Route path="/" element={<Home />} />
            </Route>
            <Route path="/auth" element={<AuthLayout />}>
              <Route path="/auth/signin" element={<Signin />} />
              <Route path="/auth/signup" element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
};

export default App;
