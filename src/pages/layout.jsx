import React from "react";
import { Layout, Button } from "antd";
// import Routerpages from "@/routers";
import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet } from "react-router-dom";
import MenuCon from "../component/Menu";
import styles from "./css/layout.module.css";

const { Header, Footer, Sider, Content } = Layout;
const siderstyle = {
  flex: "0 0 300px",
};

function LayoutPage() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <Layout className={styles.Layoutcot}>
      <Header>Header</Header>
      <Layout>
        <Sider
          className={styles.sidestyle}
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
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}

export default LayoutPage;
