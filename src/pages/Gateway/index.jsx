import React, { useEffect } from "react";
import { Card, Table, Tag, Button, AutoComplete, Input, Modal } from "antd";
import { Getiplist, Editiplist } from "../../utils/request/api";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setbip, setip } from "../../store/gateway/gatewaySlices";
import Tebleitem from "./teble/tebleitem";
import moment from "moment";
import { DeleteOutlined, PlusSquareOutlined } from "@ant-design/icons";

const cardstyle = {
  width: "100%",
  margin: "0 15px",
  textAlign: "left",
  paddingLeft: "20px",
};

const Gateway = () => {
  const [reset, setreset] = useState(true);
  const iplist = useSelector((state) => state.gateway.iplist);
  const dispatch = useDispatch();
  useEffect(() => {
    Getiplist().then((res) => {
      console.log(res);
      const tablelist = res.data.map((item) =>
        item.map((e) => ({ ...e, key: e.id }))
      );
      dispatch(setip(tablelist));
    });
  }, [reset]);

  const ipcolumns = [
    {
      title: "IP",
      dataIndex: "ip",
      key: "name",
    },
    {
      title: "用户名",
      dataIndex: "username",
      key: "age",
      render: (_, record) => {
        if (record.username) {
          return record.username;
        } else {
          return "未知";
        }
      },
    },
    {
      title: "用户名",
      key: "age",
      render: (_, record) => {
        if (record.username) {
          return record.username;
        } else {
          return "未知";
        }
      },
    },
    {
      title: "日期",
      key: "age",
      render: (_, record) => {
        const formattedDate = moment(record.datetime).format("YYYY-MM-DD");
        return formattedDate;
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <div style={{ cursor: "pointer" }}>
          <Tag color="#f63a4b" onClick={() => editiplist(record.id, "add")}>
            <PlusSquareOutlined />
            拉黑
          </Tag>
        </div>
      ),
    },
  ];

  const Bipcolumns = [
    {
      title: "ip",
      dataIndex: "ip",
      key: "ip",
    },
    {
      title: "添加日期",
      key: "age",
      render: (_, record) => {
        const formattedDate = moment(record.datetime).format("YYYY-MM-DD");
        return formattedDate;
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <div style={{ cursor: "pointer" }}>
          <Tag color="#c6c939" onClick={() => editiplist(record.id, "del")}>
            <DeleteOutlined />
            移除
          </Tag>
        </div>
      ),
    },
  ];

  const editiplist = (id, type) => {
    Editiplist({ id: id, type: type }).then((res) => {
      console.log(res);
      setreset((e) => !e);
    });
  };

  return (
    <>
      <Card style={cardstyle} size="small">
        <span style={{ fontSize: "20px", fontWeight: "600" }}>网关管理</span>
      </Card>
      <Card
        size="large"
        style={{
          width: "100%",
          margin: "0 15px",
        }}
      >
        <span style={{ fontSize: "16px", fontWeight: "600" }}>历史访问ip</span>
        <Tebleitem columns={ipcolumns} dataSource={iplist[0]} />
      </Card>
      <Card
        size="large"
        style={{
          width: "100%",
          margin: "0 15px",
        }}
      >
        <span style={{ fontSize: "16px", fontWeight: "600" }}>ip黑名单</span>
        <Tebleitem columns={Bipcolumns} dataSource={iplist[1]} />
      </Card>
    </>
  );
};

export default Gateway;
