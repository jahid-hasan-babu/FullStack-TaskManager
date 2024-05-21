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
              <Route path="/create" element={<CreatePage />} />
              <Route path="/all" element={<NewPage />} />
              <Route path="/progress" element={<ProgressPage />} />
              <Route path="/completed" element={<CompletedPage />} />
              <Route path="/canceled" element={<CanceledPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<Page404 />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registration" element={<RegistrationPage />} />
              <Route path="/sendOTP" element={<SendOTPPage />} />
              <Route path="/verifyOTP" element={<VerifyOTPPage />} />
              <Route path="/createPassword" element={<CreatePasswordPage />} />
              <Route path="*" element={<Navigate to="/login" />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
      <FullScreenLoader />
    </Fragment>
  );
};

export default App;
