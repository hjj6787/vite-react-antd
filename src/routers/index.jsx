import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, useRoutes, createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from "./routercomponent";


const App = () => {
  const GetRoutes=()=>useRoutes(routes)
  return (
    <>
        <React.Suspense fallback={<div>loading</div>}>
            <RouterProvider router={createBrowserRouter(routes)} />
        </React.Suspense>
    </>
  );
};

export default App;
