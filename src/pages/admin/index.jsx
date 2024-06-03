import React, { useEffect, useState, useRef } from "react";
import { Table, Space, Tag, Card, Input, Button, message } from "antd";
import {
  DownloadOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Getuserlist, Deluser } from "../../utils/request/api";
import NewAdmin from "./newadminFrom";
import EditAdmin from "./editadminForm";

const { Column, ColumnGroup } = Table;

function Admin() {
  const [userlist, setuserlist] = useState([]);
  const [open, setOpen] = useState(false);
  const [Eopen, setEOpen] = useState(false);
  const [reset, setreset] = useState(true);
  const [choseuser, setchoseuser] = useState({});
  useEffect(() => {
    Getuserlist().then((e) => {
      console.log(e);
      setuserlist(() => {
        const newarr = [...e.data.udata];
        newarr.forEach((e) => (e.key = e.userid));
        return newarr;
      });
    });
  }, [reset]);

  const showModal = () => {
    setOpen(true);
  };

  const handopen = (e) => {
    if (e == "close") {
      setOpen(false);
    }
    if (e == "close1") {
      setEOpen(false);
    }
  };

  const formset = () => {
    setreset((e) => !e);
  };

  const countdel = (e) => {
    console.log(e);
    const postdata = { userid: e };
    Deluser(postdata)
      .then((e) => {
        console.log(e);
        if (e.data.status == 100) {
          message.success("删除成功");
          formset();
        }
      })
      .catch(() => {
        message.error("删除失败");
      });
  };

  const countedit = (e) => {
    setchoseuser((pre) => {
      pre = userlist.find((item) => item.userid == e);
      return pre;
    });
    setEOpen(true);
  };
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
          <Button type="primary" onClick={showModal}>
            <PlusOutlined />
            新增账号
          </Button>
          <NewAdmin open={open} handopen={handopen} formset={formset} />
          <EditAdmin
            open={Eopen}
            handopen={handopen}
            formset={formset}
            choseuser={choseuser}
          />
        </div>
      </Card>
      <Table dataSource={userlist}>
        <Column title="账号名" dataIndex="user" key="user" />
        <Column title="姓名" dataIndex="name" key="name" />
        <Column
          title="账号权限"
          key="level"
          render={(_, record) => {
            if (record.level == "0") {
              return <Tag color="#58c622">管理员</Tag>;
            } else if (record.level == "1") {
              return <Tag>普通用户</Tag>;
            }
          }}
        />
        <Column
          title="账号密码"
          dataIndex="password"
          key="password"
          render={(_, record) => (
            <Input.Password
              placeholder="Password"
              value={record.password}
              // disabled
              style={{ maxWidth: "200px" }}
            />
          )}
        />
        <Column
          title="账号操作"
          key="action"
          render={(_, record) => (
            <div style={{ cursor: "pointer" }}>
              <Tag color="#e53e3e" onClick={() => countdel(record.userid)}>
                <DeleteOutlined />
                删除
              </Tag>
              <Tag color="#58c622" onClick={() => countedit(record.userid)}>
                <EditOutlined />
                修改
              </Tag>
            </div>
          )}
        />
      </Table>
    </>
  );
}

export default Admin;
