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
import { Getfilelist, GetfilesImg } from "../utils/request/api";
import { addfiles, addimg } from "../store/files/filesSlices";
const { Header, Sider, Content } = Layout;
// Footer,

function LayoutPage() {
  const [collapsed, setCollapsed] = useState(false);
  const [listdata, setlistdata] = useState([]);
  const path = useLocation();
  const navigate = useNavigate();
  const islogin = useSelector((state) => state.user.ISlogin);
  const dispatch = useDispatch();
  const staticurl = import.meta.env.VITE_API_IMGURL;
  const fileslist = useSelector((state) => state.files.fileslist);
  const reset = useSelector((state) => state.files.reset);
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

  useEffect(() => {
    (async function dayinit() {
      const resdata = await Getfilelist();
      setlistdata([...resdata.data].reverse());
      dispatch(addfiles([...resdata.data].reverse()));
    })();
  }, [reset]);

  useEffect(() => {
    (async function fetchImgData() {
      // console.log(fileslist);
      const promises = fileslist.map((item) => GetfilesImg(item.id));
      const imgdatalists = await Promise.all(promises);
      const newImgList = fileslist.map((item, index) => ({
        filesid: item.id,
        imgdata: imgdatalists[index].data,
      }));
      newImgList.forEach((item) => {
        item.imgpath = staticurl + item.imgpath;
      });
      // console.log(newImgList);
      dispatch(addimg(newImgList));
    })();
  }, [fileslist]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const loginout = () => {
    dispatch(loginoutfu());
    navigate("/login");
  };

  return (
    <Layout className={styles.Layoutcot} style={{ backgroundColor: "#ffffff" }}>
      <Header
        style={{
          backgroundColor: "#0046a1",
          position: "sticky",
          top: 0,
          width: "100%",
          zIndex: "100",
        }}
      >
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
      <Layout style={{}}>
        <Sider
          className={styles.sidestyle}
          collapsed={collapsed}
          onCollapse={toggleCollapsed}
          style={{
            backgroundColor: "#212323",
            paddingTop: "15px",
            position: "fixed",
            height: "100vh",
            left: 0,
            top: "64px",
          }}
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
