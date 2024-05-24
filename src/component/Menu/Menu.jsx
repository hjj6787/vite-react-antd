import React, { useEffect, useState } from "react";
import { StockOutlined, PieChartOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
// 请求模拟数据
const iconList = { StockOutlined, PieChartOutlined };
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
function menudata() {
  return [
    {
      key: 101,
      label: "文件",
      icon: <PieChartOutlined />,
      path: "dashboard",
    },
    {
      key: 102,
      label: "上传",
      icon: <PieChartOutlined />,
      path: "media",
    },
    {
      key: 103,
      label: "账号管理",
      icon: <PieChartOutlined />,
      path: "admin",
    },
  ];
}

function MenuCon() {
  const Navigate = useNavigate();
  useEffect(() => {}, []);
  console.log();
  const Menuclick = (e) => {
    const { path } = menudata().find((item) => item.key == e.key);
    Navigate(path);
  };
  const path = useLocation();
  // console.log(path.pathname.split("/")[2]);
  let defaultkey = menudata().find(
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
        items={menudata()}
        className={styles.menu}
        onClick={(e) => Menuclick(e)}
      />
    </div>
  );
}
export default MenuCon;
