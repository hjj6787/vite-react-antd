import React from "react";
import { Card, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Uploadfiles } from "../../utils/request/api";

function Media() {
  const [infos, setinfo] = useState([]);
  function addformdata(data) {
    console.log(data);
    setinfo(data);
  }
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
  function onupload() {
    console.log(infos);
    const formdata = new FormData();
    formdata.append("file", infos[0].originFileObj);
    formdata.append("zz", "aaass");
    Uploadfiles(formdata).then((res) => {
      console.log(res);
    });
  }
  return (
    <>
      <h1>Media</h1>
      <div style={{ width: "300px" }}>
        <Card title="上传" style={{ with: 300 }}>
          <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
          <Button icon={<UploadOutlined />} onClick={() => onupload()}>
            Upload
          </Button>
        </Card>
      </div>
    </>
  );
}

export default Media;
