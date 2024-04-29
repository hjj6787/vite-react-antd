import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Getuser, Getuserlist, Loginbody } from "../../utils/request/api";

const onFinish = async (values) => {
  console.log("Success:", values);
  const userdata = await Getuser({
    username: values.username,
    password: values.password,
  });
  console.log(userdata);
};
const onFinishFailed = (errorInfo) => {
  console.log("Failed:", errorInfo);
};
const GetuserList = async () => {
  const postData = {
    key1: "value1",
    key2: "value2",
  };

  // 设置 URL 参数
  const params = {
    param1: "value1",
    param2: "value2",
  };
  // const list = Getuserlist();

  const body = await Loginbody(postData, params);
  console.log(body);
};
function InventoryAudit() {
  return (
    <>
      <h1>inventory-audit</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Button type="primary" onClick={GetuserList}>
        get userlist
      </Button>
    </>
  );
}

export default InventoryAudit;
