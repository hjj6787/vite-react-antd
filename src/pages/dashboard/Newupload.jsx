import React, { useState } from "react";
import { Card } from "antd";

import Dayup from "./compent/dayup";

const NewUpload = () => {
  return (
    <>
      <Card>每日素材</Card>
      <Card>
        <Dayup />
      </Card>
    </>
  );
};
export default NewUpload;
