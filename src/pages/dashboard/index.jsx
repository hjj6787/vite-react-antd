import React, { useState } from "react";
import {
  Space,
  Card,
  Table,
  Tag,
  Input,
  Select,
  Popover,
  Button,
  Modal,
  Form,
  Upload,
} from "antd";
import {
  DownloadOutlined,
  QuestionCircleOutlined,
  PlusOutlined,
  UploadOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import style from "./index.module.css";
import UploadForm from "./uploadForm";
import { useMemo } from "react";
import { Getfilelist, Downloadinfo, DelFiles } from "../../utils/request/api";
import { useEffect } from "react";

const { Column, ColumnGroup } = Table;
const { Search } = Input;

const selectOption = [
  {
    value: "jack",
    label: "Jack",
  },
  {
    value: "lucy",
    label: "Lucy",
  },
  {
    value: "tom",
    label: "Tom",
  },
];

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitisok, setsubmitisok] = useState(false);
  const [filelist, setfilelist] = useState([]);
  const [reset, setreset] = useState(true);
  useEffect(() => {
    Getfilelist().then((res) => {
      console.log(res);
      let listdata = res.data;
      console.log(listdata);
      listdata.forEach((e) => {
        e.key = e.id;
      });
      setfilelist(listdata);
    });
  }, [reset]);

  const clickbb = (e) => {
    setsubmitisok(true);
    console.log(e);
    Downloadinfo(e).then((res) => {
      setreset((e) => !e);
      console.log(res);
    });
  };

  const delfiles = (e) => {
    console.log(111);
    DelFiles(e).then((res) => {
      setreset((e) => !e);
      console.log(res);
    });
  };

  const formset = () => {
    setreset((e) => !e);
  };

  const onSearch = (value, _e, info) => console.log(info?.source, value);

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch1 = (value) => {};

  const showModal = () => {
    setOpen(true);
  };

  const props = {
    name: "file",
    action: "",
    headers: {
      authorization: "authorization-text",
    },
    beforeUpload: () => {
      return false;
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
        addformdata(info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
        addformdata(() => info.fileList);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const handopen = (e) => {
    // console.log(e);
    if (e == "close") {
      setOpen(false);
    }
  };
  const UploadSetup = {};
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
          <span style={{ fontSize: "20px", fontWeight: "600" }}>文件管理</span>
          <div>
            <Button type="primary" onClick={showModal}>
              <PlusOutlined />
              上传
            </Button>
            {/* 提交文件 */}
            <UploadForm
              open={open}
              handopen={handopen}
              formset={formset}
              setup={UploadSetup}
            />
          </div>
        </div>
      </Card>
      <Card
        size="large"
        style={{
          width: "100%",
          margin: "0 15px",
        }}
      >
        <div
          style={{
            display: "flex",
            marginBottom: "10px",
          }}
          className={style.searchsan}
        >
          <Search
            placeholder="文件名字"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
          <Select
            showSearch
            placeholder="相关名人"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch1}
            filterOption={filterOption}
            options={selectOption}
          />
          <Search
            placeholder="相关LP"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
          <Search
            placeholder="相关角度"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </div>
        <Table
          dataSource={filelist}
          rowClassName={(resword, index) => {
            let className = "";
            className = index % 2 == 0 ? style.ou : style.ji;
            return className;
          }}
          pagination={{
            pageSize: 20,
          }}
        >
          <Column title="文件名" dataIndex="fileAName" key="firstName" />
          <Column title="创建时间" dataIndex="uploadTime" key="uploadTime" />
          <Column
            title="相关名人"
            dataIndex="relatedPerson"
            key="relatedPerson"
          />
          <Column title="相关lp" dataIndex="relatedLP" key="relatedLP" />
          <Column
            title="相关角度"
            dataIndex="relatedAngle"
            key="relatedAngle"
          />
          <Column
            title="操作"
            key="action"
            render={(_, record) => (
              <div style={{ cursor: "pointer" }}>
                <Tag color="#8bc0d8" onClick={() => clickbb(record.id)}>
                  <DownloadOutlined />
                  下载
                </Tag>
                <Tag color="#58c622">
                  <EditOutlined />
                  修改
                </Tag>
                <Tag color="#f63a4b" onClick={() => delfiles(record.id)}>
                  <DeleteOutlined />
                  删除
                </Tag>
                <Tag color="">
                  <QuestionCircleOutlined />
                  详情
                </Tag>
              </div>
            )}
          />
        </Table>
      </Card>
    </>
  );
}

export default Dashboard;
