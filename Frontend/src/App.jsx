import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import CreatePage from "./page/CreatePage";
import DashBoardPage from "./page/DashBoardPage";
import NewPage from "./page/NewPage";
import ProgressPage from "./page/ProgressPage";
import CompletedPage from "./page/CompletedPage";
import CanceledPage from "./page/CanceledPage";
import ProfilePage from "./page/ProfilePage";
import LoginPage from "./page/LoginPage";
import RegistrationPage from "./page/RegistrationPage";
import FullScreenLoader from "./components/MasterLayout/FullScreenLoader";
import Page404 from "./page/Page404";
import { getToken } from "./helper/SessionHelper";
import SendOTPPage from "./page/AccountRecover/SendOTPPage";
import VerifyOTPPage from "./page/AccountRecover/VerifyOTPPage";
import CreatePasswordPage from "./page/AccountRecover/CreatePasswordPage";

const App = () => {
  const isAuthenticated = getToken();

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          {isAuthenticated ? (
            <>
              <Route path="/" element={<DashBoardPage />} />
              <Route path="/Create" element={<CreatePage />} />
              <Route path="/All" element={<NewPage />} />
              <Route path="/Progress" element={<ProgressPage />} />
              <Route path="/Completed" element={<CompletedPage />} />
              <Route path="/Canceled" element={<CanceledPage />} />
              <Route path="/Profile" element={<ProfilePage />} />
              <Route path="*" element={<Page404 />} />
            </>
          ) : (
            <>
              <Route path="/Login" element={<LoginPage />} />
              <Route path="/Registration" element={<RegistrationPage />} />
              <Route path="/SendOTP" element={<SendOTPPage />} />
              <Route path="/VerifyOTP" element={<VerifyOTPPage />} />
              <Route path="/CreatePassword" element={<CreatePasswordPage />} />
              <Route path="*" element={<Navigate to="/Login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
      <FullScreenLoader />
    </Fragment>
  );
};

export default App;
