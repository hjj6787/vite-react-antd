import React, { useState, useEffect, useMemo } from "react";
import {
  Input,
  Select,
  Button,
  Modal,
  Form,
  Upload,
  message,
  Image,
  Flex,
} from "antd";
import { GetfilesImg } from "../../utils/request/api";
import Imgmodel from "./imgmodel";

const ImgForm = (props) => {
  const { open, handopen, imglist } = props;
  const [imgPathList, setimgPathList] = useState([]);
  const staticurl = import.meta.env.VITE_API_IMGURL;
  useEffect(() => {
    console.log(imglist);
    const temp = imglist.map((e) => {
      return {
        ...e, // 展开原来的对象
        imgpath: staticurl + e.imgpath, // 修改 imgpath 属性
      };
    });
    setimgPathList(temp);
  }, [imglist]);

  const handleCancel = () => {
    handopen("close");
    setimgPathList([]);
  };

  return (
    <>
      <Modal open={open} onCancel={handleCancel} footer={[]} width={1000}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
          }}
        >
          {imgPathList.map((e, i) => (
            <div key={i} style={{ flex: "0 0 29%", marginTop: "15px" }}>
              <Imgmodel width={200} src={e.imgpath} name={e.filesname} />
            </div>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default ImgForm;
