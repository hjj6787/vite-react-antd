import React, { useState, useEffect } from "react";
import {
  Input,
  Select,
  Button,
  Modal,
  Form,
  Upload,
  message,
  AutoComplete,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import {
  Uploadfiles,
  UploadFileschunk,
  EditFiles,
} from "../../utils/request/api";

const UpdateForm = (prop) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const { open, handopen, formset, Eformdata, celeList, Diseases } = prop;
  useEffect(() => {
    if (Eformdata) {
      form.setFieldsValue({
        filesname: Eformdata.fileAName,
        personname: Eformdata.relatedPerson,
        jiaoduname: Eformdata.relatedAngle,
        LPname: Eformdata.relatedLP,
        filesmessage: Eformdata.fileDescription,
      });
    }
  }, [Eformdata, form]);
  const handleOk = () => {
    setLoading(true);
    const allValues = form.getFieldsValue();
    form
      .validateFields()
      .then(() => {
        EditFiles(
          allValues,
          Eformdata.id,
          Eformdata.fileName,
          Eformdata.fileSize
        )
          .then(() => {
            setLoading(false);
            form.resetFields();
            handleCancel();
            message.success("成功上传");
            formset();
          })
          .catch((e) => {
            setLoading(false);
            console.log(e);
            message.error("上传失败");
          });
      })
      .catch((e) => {
        console.log(e);
        message.error(`请输入必填的字段`);
        setLoading(false);
        // form.resetFields();
      });
  };

  const handleCancel = () => {
    form.resetFields();
    handopen("close");
  };

  const props = {
    beforeUpload: (file) => {
      const isZip =
        file.type === "application/zip" || file.name.endsWith(".zip");
      if (!isZip) {
        message.error("只接受zip文件");
        return Upload.LIST_IGNORE;
      }
      if (fileList.length >= 1) {
        message.error("You can only upload one file!");
        return Upload.LIST_IGNORE;
      }
      setFileList([...fileList, file]);
      return false;
    },
    onRemove: (file) => {
      setFileList(fileList.filter((f) => f.uid !== file.uid));
    },
    fileList,
  };

  const normFile = (e) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onFieldsChange = () => {
    form
      .validateFields()
      .then(() => {})
      .catch(() => {});
  };

  const onSearch1 = (value) => {};

  return (
    <>
      <Modal
        open={open}
        title="文件修改"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        forceRender
      >
        <Form
          name="filesedit"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 17,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          form={form}
          onValuesChange={onFieldsChange}
        >
          <Form.Item
            label="文件名"
            name="filesname"
            rules={[
              {
                required: false,
                message: "请输入文件名",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="文件相关名人"
            name="personname"
            rules={[
              {
                required: false,
                message: "请输入文件名",
              },
            ]}
          >
            <AutoComplete options={celeList} placeholder="相关名人">
              <Input />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            label="文件相关角度"
            name="jiaoduname"
            rules={[
              {
                required: false,
                message: "请输入相关角度名",
              },
            ]}
          >
            <AutoComplete options={Diseases} placeholder="相关角度">
              <Input />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            label="文件相关LP"
            name="LPname"
            rules={[
              {
                required: false,
                message: "请输入LP名",
              },
            ]}
          >
            <Input placeholder="非必填" />
          </Form.Item>
          <Form.Item
            label="文件备注"
            name="filesmessage"
            rules={[
              {
                required: false,
                message: "请输入",
              },
            ]}
          >
            <Input placeholder="非必填" />
          </Form.Item>
          <Form.Item
            label="文件修改"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: false,
                message: "选择文件",
              },
            ]}
          >
            <Upload {...props} multiple={false}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button
              key="back"
              onClick={handleCancel}
              style={{ float: "right" }}
            >
              取消
            </Button>
            <Button
              key="submit"
              type="primary"
              htmlType="submit"
              loading={loading}
              onClick={handleOk}
              style={{ marginRight: "20px", float: "right" }}
            >
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateForm;
