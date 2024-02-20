import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, useRoutes, createBrowserRouter, RouterProvider} from "react-router-dom";
import routes from "./routercomponent";
import MenuCon from "../component/Menu";
import { Layout } from "antd";
const { Header, Footer, Sider, Content } = Layout;
//RouterProvider createBrowserRouter 新出的data api 
import styles from '../pages/css/layout.module.css'
const Routerpages = () => {
  const GetRoutes=()=>useRoutes(routes)
  return (
    <>
      <BrowserRouter>
        <Sider width="15%" height="100%">
          <MenuCon/>
      </Sider>
        <Content className={styles.Contentp}>
        <React.Suspense fallback={<div>loading</div>}>
            <GetRoutes/>
        </React.Suspense>
        </Content>
        </BrowserRouter>
    </>
  );
};

export default Routerpages;
