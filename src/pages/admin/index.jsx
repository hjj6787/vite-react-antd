import React from "react";
import { Table, Space, Tag, Card, Input } from "antd";
import {
  DownloadOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Column, ColumnGroup } = Table;
const data = [
  {
    key: "1",
    firstName: "John",
    lastName: "Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    tags: ["nice", "developer"],
  },
  {
    key: "2",
    firstName: "Jim",
    lastName: "Green",
    age: 42,
    address: "London No. 1 Lake Park",
    tags: ["loser"],
  },
  {
    key: "3",
    firstName: "Joe",
    lastName: "Black",
    age: 32,
    address: "Sydney No. 1 Lake Park",
    tags: ["cool", "teacher"],
  },
];
function Admin() {
  return (
    <>
      <Card
        style={{
          width: "100%",
          margin: "0 15px",
          textAlign: "left",
          paddingLeft: "20px",
        }}
        size="small"
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontSize: "20px", fontWeight: "600" }}>账号管理</span>
        </div>
      </Card>
      <Table dataSource={data}>
        <Column title="账号名" dataIndex="lastName" key="lastName" />
        <Column title="账号权限" dataIndex="age" key="age" />
        <Column
          title="账号密码"
          dataIndex="address"
          key="address"
          render={(_, record) => (
            <Input.Password
              placeholder="Password"
              value={record.address}
              // disabled
              style={{ maxWidth: "200px" }}
            />
          )}
        />
        <Column
          title="账号操作"
          dataIndex="address"
          key="address"
          render={(_, record) => (
            <div style={{ cursor: "pointer" }}>
              <Tag color="#e53e3e" onClick={() => clickbb(record.age)}>
                <DeleteOutlined />
                删除
              </Tag>
              <Tag color="#58c622" onClick={() => clickbb(record.age)}>
                <EditOutlined />
                修改
              </Tag>
              <Tag color="" onClick={() => clickbb(record.age)}>
                <QuestionCircleOutlined />
                详情
              </Tag>
            </div>
          )}
        />
      </Table>
    </>
  );
}

export default Admin;
