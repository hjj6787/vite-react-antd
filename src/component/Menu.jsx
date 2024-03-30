import React, { useEffect, useState } from 'react';
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import * as Icons from '@ant-design/icons'
import { Menu } from 'antd';
import request from '../utils/request';
import styles from './Menu.module.css'
// 请求模拟数据
const iconList = Icons
function addIconToMenu(menuData) {
  for (let i = 0; i < menuData.length; i++) {
    if (menuData[i].ps_icon) {
      menuData[i].icon = React.createElement(iconList[menuData[i].ps_icon])
    }

    if (menuData[i].children) {
      menuData[i].children = addIconToMenu(menuData[i].children)
    }
  }

  return menuData
}
const MenuCon = () => {

 const [menu,setmemu]=useState([])
  useEffect(()=>{
    request.get('/api/user').then((res) => {
      setmemu(addIconToMenu(JSON.parse(JSON.stringify(res.data.data.menus))))
    }).catch((error) => {
      console.error("请求出错：", error);
    });
  },[])
  return (
    <div
      style={{
        width: "100%",
       
      }}
      className={styles.memucon}
    >
      <Menu
        defaultSelectedKeys={['101']}
        mode="inline"
        theme="dark"
        items={menu}
        className={styles.menu}
      />
    </div>
  );
};
export default MenuCon;