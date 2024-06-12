import React from "react";
import { Card, Table, Tag, Button, AutoComplete, Input, Modal } from "antd";

const cardstyle = {
  width: "100%",
  margin: "0 15px",
  textAlign: "left",
  paddingLeft: "20px",
};
const Gateway = () => {
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
      </Card>
      <Card
        size="large"
        style={{
          width: "100%",
          margin: "0 15px",
        }}
      >
        <span style={{ fontSize: "16px", fontWeight: "600" }}>ip黑名单</span>
      </Card>
    </>
  );
};

export default Gateway;
