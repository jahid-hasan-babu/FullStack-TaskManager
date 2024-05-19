import React, { Fragment, Suspense } from "react";
import MasterLayout from "../components/MasterLayout/MasterLayout";
import LazyLoader from "../components/MasterLayout/LazyLoader";
import NotFound from "../components/NotFound/NotFound";

const Page404 = () => {
  return (
    <Fragment>
      <MasterLayout>
        <Suspense fallback={<LazyLoader />}>
          <NotFound />
        </Suspense>
      </MasterLayout>
    </Fragment>
  );
};

export default Page404;
