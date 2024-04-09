import React, { useEffect} from "react";
import { useRoutes } from "react-router-dom";
import routes from "./routercomponent";
import { useSelector, useDispatch } from "react-redux";
import { adduserrouter } from "../store/user/userSlices";
import request from "../utils/request";
import { addRouteToMenu } from "../utils/addroutertomenu";

const Routerpages = () => {
  const dispatch=useDispatch()
  useEffect(()=>{
    request
    .get("/api/user")
    .then((res) => {
      const data=JSON.parse(JSON.stringify(res.data.data.menus))
      dispatch(adduserrouter(data))
      console.log(data);
      const datacom=addRouteToMenu(data)
      console.log(datacom);
      routes[1].children=[...datacom]
      console.log(routes);
    })
    .catch((error) => {
      console.error("请求出错：", error);
    });
  },[])
  const GetRoutes = () => useRoutes(routes);
  return (
          <React.Suspense fallback={<div>loading</div>}>
            <AuthRoute><GetRoutes /></AuthRoute>
          </React.Suspense>
  );
};

export default Routerpages;
