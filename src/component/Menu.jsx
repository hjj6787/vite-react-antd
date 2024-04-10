import React, { useEffect, useState } from "react";
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import * as Icons from "@ant-design/icons";
import { Menu } from "antd";
import request from "../utils/request";
import styles from "./Menu.module.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// 请求模拟数据
const iconList = Icons;
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

function findPsAByKey(arr, key) {
  let result = null;

  for (const item of arr) {
    if (item.key === key) {
      return item.ps_c; // 如果找到匹配的键，返回 ps_a 的值
    }

    if (item.children) {
      result = findPsAByKey(item.children, key); // 递归搜索子数组
      if (result) break; // 如果在子数组中找到结果，结束循环
    }
  }

  return result; // 返回找到的 ps_a 的值，或者如果没有找到则返回 null
}

function MenuCon() {
  const [menu, setmemu] = useState([]);
  const menudata = useSelector((state) => state.user.commom.route);
  const Navigate = useNavigate();
  useEffect(() => {
    setmemu(addIconToMenu(JSON.parse(JSON.stringify(menudata))));
  }, [menudata]);
  const Menuclick = (e) => {
    const path = findPsAByKey(menudata, e.key * 1);
    Navigate(path);
  };
  return (
    <div
      style={{
        width: "100%",
      }}
      className={styles.memucon}
    >
      <Menu
        defaultSelectedKeys={["101"]}
        mode="inline"
        theme="dark"
        items={menu}
        className={styles.menu}
        onClick={(e) => Menuclick(e)}
      />
    </div>
  );
}
export default MenuCon;
