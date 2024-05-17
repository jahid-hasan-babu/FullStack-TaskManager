import React, { Fragment, Suspense } from "react";
import MasterLayout from "../components/MasterLayout/MasterLayout";
import New from "../components/New/New";
import LazyLoader from "../components/MasterLayout/LazyLoader";

const NewPage = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <New />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default NewPage;
