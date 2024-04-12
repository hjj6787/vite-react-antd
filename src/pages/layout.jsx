import React, { useEffect, useState } from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuCon from "../component/Menu";
import styles from "./css/layout.module.css";

const { Header, Sider, Content } = Layout;
// Footer,

function LayoutPage() {
  const [collapsed, setCollapsed] = useState(false);
  const path = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // console.log(path);
    if (path.pathname === "/main") {
      navigate("/main/dashboard");
    }
  }, []);
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
