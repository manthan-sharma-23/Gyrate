import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/views/home/Home";
import AuthLayout from "./pages/layouts/AuthLayout";
import Signin from "./pages/views/auth/Signin";
import Signup from "./pages/views/auth/Signup";
import { RecoilRoot } from "recoil";
import ApplicationLayout from "./pages/layouts/ApplicationLayout";
import Global from "./pages/views/global/Global";
import Chat from "./pages/views/chat/Chat";
import Forums from "./pages/views/global/forum/Forums";
import GlobalNew from "./pages/views/global/views/GlobalNew";
import CreateForum from "./pages/views/global/forum/CreateForum";
import ForumById from "./pages/views/global/forum/ForumById";
import Profile from "./pages/views/profile/Profile";

const App = () => {
  return (
    <div>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ApplicationLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/f/chat" element={<Chat />} />
              <Route path="/f/trending" element={<Chat />} />
              <Route path="/f/all" element={<Chat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/global" element={<Global />}>
                <Route path="/global/forums/:forumId" element={<ForumById />} />
                <Route path="/global/forums" element={<Forums />} />
                <Route path="/global/forums/create" element={<CreateForum />} />
                <Route path="/global/:path" element={<GlobalNew />} />
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
