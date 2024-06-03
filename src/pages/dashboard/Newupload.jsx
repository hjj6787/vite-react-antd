import React, { useState } from "react";
import { Card } from "antd";
import { useEffect } from "react";
import { Getfilelist, GetfilesImg } from "../../utils/request/api";

const NewUpload = () => {
  const [listdata, setlistdata] = useState([]);
  const [imglist, setimglist] = useState([]);
  const staticurl = import.meta.env.VITE_API_IMGURL;
  useEffect(() => {
    (async function dayinit() {
      const resdata = await Getfilelist();
      setlistdata([...resdata.data].reverse());
    })();
  }, []);

  useEffect(() => {
    (async function fetchImgData() {
      const newImgList = [];
      listdata.forEach(async (item) => {
        const imgdatalist = await GetfilesImg(item.id);
        newImgList.push(imgdatalist.data);
      });
      newImgList.forEach((item) => {
        console.log(123);
        item.imgpath = staticurl + item.imgpath;
      });
      setimglist(newImgList);
    })();
  }, [listdata]);

  return (
    <>
      <Card>每日素材</Card>
      <Card>每日素材</Card>
    </>
  );
};
export default NewUpload;
