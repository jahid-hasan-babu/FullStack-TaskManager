import React, { Suspense } from "react";
import LazyLoader from "../../components/MasterLayout/LazyLoader";
import VerifyOTP from "../../components/AccountRecover/VerifyOTP";

const VerifyOTPPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <VerifyOTP />
    </Suspense>
  );
};

export default VerifyOTPPage;
