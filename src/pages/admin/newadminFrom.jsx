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
import { Signup } from "../../utils/request/api";

const NewAdmin = (props) => {
  const { open, handopen, formset } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    setLoading(true);
    const allValues = form.getFieldsValue();
    console.log(allValues);
    form
      .validateFields()
      .then(() => {
        Signup(allValues)
          .then((e) => {
            console.log(e);
            setLoading(false);
            form.resetFields();
            handleCancel();
            if (e.data.status == "100") {
              message.success("添加成功");
            } else if (e.data.status == "200") {
              message.error("用户已存在");
            }
            formset();
          })
          .catch((e) => {
            setLoading(false);
            console.log(e);
            message.error("添加失败");
          });
      })
      .catch(() => {
        message.error(`请输入必填的字段`);
        setLoading(false);
        // form.resetFields();
      });
  };
  const handleCancel = () => {
    handopen("close");
  };
  const option = [
    { value: "0", label: "超级管理员" },
    { value: "1", label: "管理员" },
    { value: "2", label: "普通用户" },
  ];
  return (
    <>
      <Modal
        open={open}
        title="添加用户"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          name="adminadd"
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
        >
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: "请输入用户名",
              },
            ]}
          >
            <Input placeholder="用户名" />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                required: true,
                message: "请输入密码",
              },
            ]}
          >
            <Input placeholder="密码" />
          </Form.Item>
          <Form.Item
            label="姓名"
            name="name"
            rules={[
              {
                required: true,
                message: "请输入姓名",
              },
            ]}
          >
            <Input placeholder="姓名" />
          </Form.Item>
          <Form.Item
            label="权限"
            name="level"
            rules={[
              {
                required: true,
                message: "选择权限",
              },
            ]}
          >
            <Select options={option} />
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
export default NewAdmin;
