import React, { useEffect, useState } from "react";
import * as Icons from "@ant-design/icons";
import { Menu } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./Menu.module.css";
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
  // 使用 find 方法来尝试找到直接满足条件的元素
  const foundItem = arr.find((item) => {
    // 检查当前元素的键是否匹配
    if (item.key === key) {
      return true;
    }
    // 否则，如果存在子数组，递归查找子数组
    if (item.children) {
      return findPsAByKey(item.children, key);
    }
    // 当前元素不匹配，且无子数组，返回 false 继续搜索
    return false;
  });

  // 如果找到了匹配的元素，返回其 ps_c 属性，否则返回 null
  return foundItem ? foundItem.ps_c : null;
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
