import React, { Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import SendOTP from "../../components/AccountRecover/SendOTP";

const SendOTPPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <SendOTP />
    </Suspense>
  );
};

export default SendOTPPage;
