import React, { useState, useEffect, useMemo } from "react";
import style from "./dayup.module.css";
import Imgmodel from "./imgmodel";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { VerticalAlignBottomOutlined } from "@ant-design/icons";
import moment from "moment";
import { Downloadinfo } from "../../../utils/request/api";

const Dayup = (props) => {
  const filesdata = useSelector((state) => state.files.fileslist);
  const imglistR = useSelector((state) => state.files.imglist);
  const [imgPathList, setimgPathList] = useState([]);
  const staticurl = import.meta.env.VITE_API_IMGURL;
  const [imglistindex, setimglistindex] = useState(1);
  const [imgAarr, setimgAarr] = useState([]);
  useEffect(() => {
    let temp = [];
    imglistR.forEach((item) => {
      const imgtemp = item.imgdata
        .filter((e) => {
          // 检查文件名是否包含图片扩展名
          const imageExtensions = ["jpg", "jpeg", "png", "webp"];
          const fileExtension = e.filesname.toLowerCase().split(".").pop();
          return imageExtensions.includes(fileExtension);
        })
        .map((e) => {
          return {
            ...e,
            imgpath: staticurl + e.imgpath, // 修改 imgpath 属性
          };
        });
      const imgobj = {
        filesid: item.filesid,
        imgarr: imgtemp,
      };
      temp.push(imgobj);
    });

    setimgPathList(temp);
    console.log(imglistR);
  }, [imglistR]);

  // useEffect(() => {
  //   imgPathList.forEach((e) => {
  //     console.log(e);
  //     const finddata = listdata.filter((E) => E.id == e.filesid);
  //     console.log(finddata);
  //   });
  // }, [imgPathList]);
  useEffect(() => {
    const temparr = imgPathList.slice((imglistindex - 1) * 3, imglistindex * 3);
    setimgAarr(temparr);
  }, [imglistindex, imgPathList, imglistR]);

  const clickdowninfo = (e) => {
    Downloadinfo(e);
  };

  return (
    <>
      <div className={style.conflex}>
        {imgAarr.map((e, i) => (
          <div key={`${i}-789`} className={style.conflexItem}>
            <div className={style.useritem}>
              <div style={{ display: "flex" }}>
                <div className={style.namehead}>
                  {filesdata.filter((E) => E.id == e.filesid)[0].Uploader[0]}
                </div>
                <span className={style.username}>
                  {filesdata.filter((E) => E.id == e.filesid)[0].Uploader}
                </span>
              </div>
              <div style={{ float: "right" }}>
                <span
                  style={{
                    fontSize: "16px",
                    fontWeight: "bolder",
                    marginRight: "20px",
                  }}
                >
                  下载完整文件
                </span>
                <Button
                  type="primary"
                  shape="circle"
                  onClick={() => clickdowninfo(e.filesid)}
                  icon={<VerticalAlignBottomOutlined />}
                />
              </div>
            </div>
            <div className={style.usertext}>
              角度：{filesdata.filter((E) => E.id == e.filesid)[0].relatedAngle}
              &nbsp; 上传日期：
              {moment(
                filesdata.filter((E) => E.id == e.filesid)[0].uploadTime
              ).format("YYYY-MM-DD")}
              &nbsp; 人物名：
              {filesdata.filter((E) => E.id == e.filesid)[0].relatedPerson
                ? filesdata.filter((E) => E.id == e.filesid)[0].relatedPerson
                : "无"}
            </div>
            <div className={style.usertext}>
              描述:
              {filesdata.filter((E) => E.id == e.filesid)[0].fileDescription
                ? filesdata.filter((E) => E.id == e.filesid)[0].fileDescription
                : "无"}
            </div>
            <div className={style.imglistitem}>
              {e.imgarr.slice(0, 9).map((item, index) => {
                return (
                  <div key={`${i}-${index}`} className={style.imgitem}>
                    <Imgmodel
                      height={100}
                      src={item.imgpath}
                      name={item.filesname}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dayup;
