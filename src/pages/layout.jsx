import React, { useEffect, useState } from "react";
import { Layout, Button, Popconfirm } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuCon from "../component/Menu/Menu";
import styles from "./css/layout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginoutfu } from "../store/user/userSlices";

const { Header, Sider, Content } = Layout;
// Footer,

function LayoutPage() {
  const [collapsed, setCollapsed] = useState(false);
  const path = useLocation();
  const navigate = useNavigate();
  const islogin = useSelector((state) => state.user.ISlogin);
  const dispatch = useDispatch();

  useEffect(() => {
    const loginTime = localStorage.getItem("loginTime");
    if (loginTime) {
      const currentTime = new Date().getTime();
      const timeDiff = currentTime - loginTime;
      const threeHours = 3 * 60 * 60 * 1000;

      if (timeDiff > threeHours) {
        // 超过3小时，强制用户重新登录
        localStorage.removeItem("loginTime");
        navigate("/login"); // 跳转到登录页面
      }
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const loginout = () => {
    dispatch(loginoutfu());
    navigate("/login");
  };

  return (
    <Layout className={styles.Layoutcot} style={{ backgroundColor: "#ffffff" }}>
      <Header style={{ backgroundColor: "#0046a1" }}>
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span className={styles.HeadSpanStyle}>
            {/* <img
              src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
              alt=""
              style={{ height: "50%" }}
            /> */}
          </span>
          <h1 style={{ color: "white" }}>素材库</h1>
          <Popconfirm
            placement="bottomLeft"
            title={"登出"}
            okText="是"
            cancelText="否"
            onConfirm={loginout}
          >
            <span className={styles.HeadSpanuesrStyle}>
              <UserOutlined />
            </span>
          </Popconfirm>
        </div>
      </Header>
      <Layout>
        <Sider
          className={styles.sidestyle}
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
          style={{ backgroundColor: "#212323", paddingTop: "15px" }}
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
