import React from "react";
import { Button, Checkbox, Form, Input, Card, message } from "antd";
import style from "./login.module.css";
import { GetLogin } from "../../utils/request/api";
import { loginfu, adduserdata } from "../../store/user/userSlices";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispath = useDispatch();
  const navgate = useNavigate();
  const onFinish = (values) => {
    console.log("Success:", values);
    GetLogin({ ...values }).then((e) => {
      // console.log(e);
      if (e.data.code === 200) {
        message.success("登录成功");
        dispath(loginfu({ token: e.data.data.token }));
        dispath(adduserdata({ userdata: e.data.data.payload }));
        const loginTime = new Date().getTime();
        localStorage.setItem("loginTime", loginTime);
        navgate("/main");
      } else {
        message.error("登陆失败");
      }
    });
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      {/* <h3>Login</h3> */}
      <div className={style.main}>
        <h2
          style={{
            marginBottom: "20px",
          }}
        >
          素材库
        </h2>
        <Form
          name="basic"
          labelCol={{
            span: 0,
          }}
          wrapperCol={{
            span: 24,
          }}
          style={{
            maxWidth: 200,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
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
              offset: 0,
              span: 24,
            }}
          >
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default Login;
