import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AuthLayout from "./pages/layouts/AuthLayout";
import Signin from "./pages/views/auth/Signin";
import Signup from "./pages/views/auth/Signup";
import { RecoilRoot } from "recoil";
import ApplicationLayout from "./pages/layouts/ApplicationLayout";
import Global from "./pages/views/global/Global";
import Chat from "./pages/views/chat/Chat";

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ApplicationLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/global" element={<Global />}>
                <Route path="/global/:path" element={<Global />} />
              </Route>
              <Route path="/chat" element={<Chat />} />
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
