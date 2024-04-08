import React from "react";
import { Layout, Button } from "antd";
import styles from "./css/layout.module.css";
// import Routerpages from "@/routers";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import MenuCon from "../component/Menu";
import { Outlet } from "react-router-dom";

const { Header, Footer, Sider, Content } = Layout;

const layoutStyle = {
  height: "100%",
  width: "100%",
};

const LayoutPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Layout style={layoutStyle} className={styles.Layoutcot}>
        <Header>Header</Header>
        <Layout>
          <Sider
            width="15%"
            height="100%"
            collapsed={collapsed}
            onCollapse={toggleCollapsed}
          >
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{
                marginBottom: 16,
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <MenuCon />
          </Sider>
          <Content className={styles.Contentp}>
            <Outlet/>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default LayoutPage;
