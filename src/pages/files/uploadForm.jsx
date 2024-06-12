import React, { useState } from "react";
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
import { useEffect } from "react";
import { Uploadfiles, UploadFileschunk } from "../../utils/request/api";
import { useSelector } from "react-redux";

const UploadForm = (prop) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);
  const [infos, setinfo] = useState([]);
  const [formdata, setformdata] = useState({});
  const [fileList, setFileList] = React.useState([]);

  const { open, handopen, formset, celeList, Diseases } = prop;

  useEffect(() => {
    // console.log(open);
  }, [open]);

  const user = useSelector((state) => state.user.userdata.name);

  const handleOk = () => {
    setLoading(true);
    const allValues = form.getFieldsValue();
    allValues.Uploader = user;

    form
      .validateFields()
      .then(() => {
        UploadFileschunk(allValues)
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
      .catch(() => {
        message.error(`请输入必填的字段`);
        setLoading(false);
        // form.resetFields();
      });
  };

  const handleCancel = () => {
    form.resetFields();
    handopen("close");
  };

  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const filterOption = (input, option) =>
    (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

  const props = {
    beforeUpload: (file) => {
      const isZip =
        file.type === "application/zip" || file.name.endsWith(".zip");
      if (!isZip) {
        message.error("只接受zip文件");
        return Upload.LIST_IGNORE;
      }
      if (fileList.length > 1) {
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

  const onFinish = (values) => {
    // console.log("Form values:", values);
    setformdata(values);
  };

  const onSearch1 = (value) => {};

  return (
    <>
      <Modal
        open={open}
        title="文件上传"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
        forceRender
      >
        <Form
          name="filessub"
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
          onFinish={onFinish}
        >
          <Form.Item
            label="文件名"
            name="filesname"
            rules={[
              {
                required: true,
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
                required: true,
                message: "请输入文件名",
              },
            ]}
          >
            {/* <Select
              showSearch
              placeholder="相关名人"
              optionFilterProp="children"
              onChange={onChange}
              onSearch={onSearch1}
              filterOption={filterOption}
              options={celeList}
            /> */}
            <AutoComplete options={celeList} placeholder="相关名人">
              <Input />
            </AutoComplete>
          </Form.Item>
          <Form.Item
            label="文件相关角度"
            name="jiaoduname"
            rules={[
              {
                required: true,
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
            label="文件上传"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[
              {
                required: true,
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

export default UploadForm;
