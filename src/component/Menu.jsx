import React from 'react';
import {
  ContainerOutlined,
  DesktopOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import { Menu } from 'antd';
import routes from '@/routers/routercomponent';
import DynamicIcon from '../utils/iconimoprt';
// import {getTreeMenu} from '@/utils/common'

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
// const iconc=DynamicIcon
const items = [
  getItem('Option 1', '1', <DynamicIcon iconName="HomeOutlined"/>),
  getItem('Option 2', '2', <DesktopOutlined />),
  getItem('Option 3', '3', <ContainerOutlined />),
];
const MenuCon = () => {
  // const item = getTreeMenu(routes)
  // console.log(item);
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        items={items}
      />
    </div>
  );
};
export default MenuCon;