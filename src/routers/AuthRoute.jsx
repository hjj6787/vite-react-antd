import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export default function AuthRoute(props) {
  const location = useLocation();
  const isLogin = localStorage.getItem("token");
  const currentPath = location.pathname;
  const islogin = useSelector((state) => state.user.ISlogin);
  const level = useSelector((state) => state.user.userdata.level);
  const condition = currentPath === "/login" && !Islogin;
  const adminfiles = currentPath === "/main/admin" && level != "0";

  if (condition) {
    return props.children;
  }

  if (adminfiles) {
    return <Navigate to="/main/files" />;
  }

  if (!islogin) {
    return <Navigate to="/login" />;
  }

  return props.children;
}
