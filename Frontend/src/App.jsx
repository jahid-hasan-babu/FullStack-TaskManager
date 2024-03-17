import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoardPage from "./page/DashBoardPage";
import CreatePage from "./page/CreatePage";
import NewPage from "./page/NewPage";
import ProgressPage from "./page/ProgressPage";
import CompletedPage from "./page/CompletedPage";
import CanceledPage from "./page/CanceledPage";
import ProfilePage from "./page/ProfilePage";
import RegistrationPage from "./page/RegistrationPage";
import ForgetPage from "./page/ForgetPage";
import Page404 from "./page/Page404";
import LoginPage from "./page/LoginPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashBoardPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/all" element={<NewPage />} />
        <Route path="/progress" element={<ProgressPage />} />
        <Route path="/completed" element={<CompletedPage />} />
        <Route path="/canceled" element={<CanceledPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/forget-pass" element={<ForgetPage />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
