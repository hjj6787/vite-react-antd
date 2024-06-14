import React from "react";
import { Table } from "antd";
import Stylefrom from "./index.module.css";

const Tebleitem = (props) => {
  const { columns, dataSource } = props;
  console.log(dataSource);
  return (
    <>
      <Table
        pagination={{ pageSize: 20 }}
        columns={columns}
        dataSource={dataSource}
        rowClassName={(resword, index) => {
          let className = "";
          className = resword.isB ? Stylefrom.black : Stylefrom.no;
          return className;
        }}
      ></Table>
    </>
  );
};

export default Tebleitem;
