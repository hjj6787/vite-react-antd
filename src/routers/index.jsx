import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routercomponent";
import AuthRoute from "../component/useMenu";

//RouterProvider createBrowserRouter 新出的data api
const Routerpages = () => {
  const GetRoutes = () => useRoutes(routes);

  return (
          <React.Suspense fallback={<div>loading</div>}>
            <AuthRoute><GetRoutes /></AuthRoute>
            
          </React.Suspense>
  );
};

export default Routerpages;
