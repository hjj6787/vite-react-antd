import React, {useState}from "react";
import { Provider } from "react-redux";
import { BrowserRouter, useRoutes,} from "react-router-dom";
import routes from "./routercomponent";
import MenuCon from "../component/Menu";
import { Layout, Button } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
const { Header, Footer, Sider, Content } = Layout;
//RouterProvider createBrowserRouter 新出的data api 
import styles from '../pages/css/layout.module.css'
const Routerpages = () => {
  const GetRoutes=()=>useRoutes(routes)
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <BrowserRouter>
        <Sider width="15%" height="100%"  collapsed={collapsed} onCollapse={toggleCollapsed}>
        <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
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
