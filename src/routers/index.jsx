import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routercomponent";
//RouterProvider createBrowserRouter 新出的data api
const Routerpages = () => {
  const GetRoutes = () => useRoutes(routes);

  return (
          <React.Suspense fallback={<div>loading</div>}>
            <GetRoutes />
          </React.Suspense>
  );
};

export default Routerpages;
