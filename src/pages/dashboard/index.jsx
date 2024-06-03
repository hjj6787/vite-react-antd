import React, { useState } from "react";
import { Tabs } from "antd";
import NewUpload from "./Newupload";
import MaterialStatistics from "./MaterialStatistics";

const items = [
  {
    key: "1",
    label: "每日素材",
    children: <NewUpload />,
  },
  {
    key: "2",
    label: "素材统计",
    children: <MaterialStatistics />,
  },
];

const Dashboard = () => {
  const onChange = (key) => {
    console.log(key);
  };
  return (
    <>
      <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    </>
  );
};
export default Dashboard;
