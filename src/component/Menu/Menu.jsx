import React, { useEffect, useState } from "react";
import {
  StockOutlined,
  PieChartOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
import { useSelector } from "react-redux";
// 请求模拟数据
const iconList = {
  StockOutlined,
  PieChartOutlined,
  DashboardOutlined,
  UsergroupAddOutlined,
};
function addIconToMenu(menuData) {
  for (let i = 0; i < menuData.length; i++) {
    if (menuData[i].ps_icon) {
      menuData[i].icon = React.createElement(iconList[menuData[i].ps_icon]);
    }
    if (menuData[i].children) {
      menuData[i].children = addIconToMenu(menuData[i].children);
    }
  }
  return menuData;
}

// function findPsAByKey(arr, key) {
//   for (const item of arr) {
//     if (item.key == key) {
//       return item.ps_c;
//     }
//     if (item.children) {
//       return findPsAByKey(item.children, key);
//     }
//   }
// }
function menudata(level) {
  const baseroute = [
    {
      key: 101,
      label: "Dashboard",
      icon: <DashboardOutlined />,
      path: "dashboard",
    },
    {
      key: 102,
      label: "文件",
      icon: <PieChartOutlined />,
      path: "files",
    },
  ];

  const authroute = {
    key: 103,
    label: "账号管理",
    icon: <UsergroupAddOutlined />,
    path: "admin",
  };

  if (level == 0) {
    baseroute.push(authroute);
  }

  return baseroute;
}

function MenuCon() {
  const Navigate = useNavigate();
  const level = useSelector((state) => state.user.userdata.level);
  const menulist = menudata(level);
  const Menuclick = (e) => {
    const { path } = menulist.find((item) => item.key == e.key);
    Navigate(path);
  };
  const path = useLocation();
  // console.log(path.pathname.split("/")[2]);
  let defaultkey = menulist.find(
    (item) => item.path == path.pathname.split("/")[2]
  )?.key;
  return (
    <div
      style={{
        width: "100%",
      }}
      className={styles.memucon}
    >
      <Menu
        defaultSelectedKeys={[`${defaultkey ? defaultkey : "1"}`]}
        mode="inline"
        theme="dark"
        style={{ backgroundColor: "#212323" }}
        items={menulist}
        className={styles.menu}
        onClick={(e) => Menuclick(e)}
      />
    </div>
  );
}
export default MenuCon;
