import React, { useEffect } from "react";
import { useRoutes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import routes from "./routercomponent";
import { adduserrouter } from "../store/user/userSlices";
import request from "../utils/request";
import addRouteToMenu from "../utils/addroutertomenu";
import AuthRoute from "@/component/AuthRoute";

function Routerpages() {
  const dispatch = useDispatch();
  useEffect(() => {
    // request
    //   .get("/user")
    //   .then((res) => {
    //     const data = JSON.parse(JSON.stringify(res.data.menus));
    //     dispatch(adduserrouter(data));
    //     const datacom = addRouteToMenu(data);
    //     routes[1].children = [...datacom];
    //   })
    //   .catch((error) => {
    //     console.error("请求出错：", error);
    //   });
  }, []);
  const GetRoutes = () => useRoutes(routes);
  return (
    <React.Suspense fallback={<div>loading</div>}>
      <GetRoutes />
    </React.Suspense>
  );
}

export default Routerpages;
