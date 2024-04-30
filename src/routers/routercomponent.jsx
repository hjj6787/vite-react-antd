import React from "react";
import { Navigate } from "react-router-dom";

const Layout = React.lazy(() => import("../pages/layout"));
const Login = React.lazy(() => import("../pages/login"));
const Dashboard = React.lazy(() => import("../pages/dashboard"));
const Admin = React.lazy(() => import("../pages/admin"));
const Pages404 = React.lazy(() => import("../pages/404page"));

const routes = [
  { path: "/", element: <Navigate to="/main" />, auth: false, name: "/" },
  // {
  //   path: "/main",
  //   element: <Navigate to="/main/dashboard" />,
  //   auth: false,
  //   name: "main",
  //   icon: "PieChartOutlined",
  // },
  {
    path: "/main/*",
    element: <Layout />,
    auth: false,
    name: "main",
    icon: "PieChartOutlined",
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
        auth: false,
        name: "man",
        icon: "PieChartOutlined",
        children: [],
      },
      {
        path: "admin",
        element: <Admin />,
        auth: false,
        name: "man",
        icon: "PieChartOutlined",
        children: [],
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
    auth: false,
    name: "login",
    icon: "DesktopOutlined",
  },
  { path: "*", element: <Pages404 />, auth: false, name: "404" },
];

export default routes;
