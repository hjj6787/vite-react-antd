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
import { Edituser } from "../../utils/request/api";
import { useEffect } from "react";

const EditAdmin = (props) => {
  const { open, handopen, formset, choseuser } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleOk = () => {
    setLoading(true);
    const allValues = form.getFieldsValue();
    console.log(allValues);
    const postdata = {
      userid: choseuser.userid,
      user: allValues.username ? allValues.username : choseuser.user,
      level: allValues.level ? allValues.level : choseuser.level,
      password: allValues.password ? allValues.password : choseuser.password,
    };
    form
      .validateFields()
      .then(() => {
        Edituser(postdata)
          .then((e) => {
            console.log(e);
            setLoading(false);
            form.resetFields();
            handleCancel();
            if (e?.data?.status == 200) {
              message.success("修改成功");
            } else if (e?.data?.status == 333) {
              message.error("用户名已存在，修改失败");
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
    form.resetFields();
    handopen("close1");
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
        title="修改用户"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[]}
      >
        <Form
          name="adminedit"
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
                required: false,
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
                required: false,
                message: "请输入密码",
              },
            ]}
          >
            <Input placeholder="密码" />
          </Form.Item>
          <Form.Item
            label="权限"
            name="level"
            rules={[
              {
                required: false,
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
export default EditAdmin;
