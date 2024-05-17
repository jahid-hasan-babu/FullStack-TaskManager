import React, { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { getToken } from "./helper/SessionHelper";
import CreatePage from "./page/CreatePage";
import DashBoardPage from "./page/DashBoardPage";
import NewPage from "./page/NewPage";
import ProgressPage from "./page/ProgressPage";
import CompletedPage from "./page/CompletedPage";
import CanceledPage from "./page/CanceledPage";
import ProfilePage from "./page/ProfilePage";
import LoginPage from "./page/LoginPage";
import RegistrationPage from "./page/RegistrationPage";
import Page404 from "./page/Page404";
import FullScreenLoader from "./components/MasterLayout/FullScreenLoader";

const App = () => {
  if (getToken()) {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashBoardPage />} />
            <Route path="/Create" element={<CreatePage />} />
            <Route path="/All" element={<NewPage />} />
            <Route path="/Progress" element={<ProgressPage />} />
            <Route path="/Completed" element={<CompletedPage />} />
            <Route path="/Canceled" element={<CanceledPage />} />
            <Route path="/Profile" element={<ProfilePage />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <FullScreenLoader />
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <BrowserRouter>
          <Routes>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/Registration" element={<RegistrationPage />} />

            {/* <Route exact path="/SendOTP" element={<SendOTPPage/>}/>
                      <Route exact path="/VerifyOTP" element={<VerifyOTPPage/>}/>
                      <Route exact path="/CreatePassword" element={<CreatePasswordPage/>}/> */}

            <Route path="*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
        <FullScreenLoader />
      </Fragment>
    );
  }
};

export default App;
