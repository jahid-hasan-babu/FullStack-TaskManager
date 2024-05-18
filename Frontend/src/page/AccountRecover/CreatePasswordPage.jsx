import React, { Suspense } from "react";
import LazyLoader from "./../../components/MasterLayout/LazyLoader";
import CreatePassword from "../../components/AccountRecover/CreatePassword";

const CreatePasswordPage = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <CreatePassword />
    </Suspense>
  );
};

export default CreatePasswordPage;
