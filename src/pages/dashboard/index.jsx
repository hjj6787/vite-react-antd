import React, { useState } from "react";
import axios from "axios";

function Dashboard() {
  const [contimg, setcontimg] = useState(null);
  const [filename, setfilename] = useState("");
  const export1 = () => {
    axios({
      url: "http://localhost:3000/upload/export",
      method: "GET",
      responseType: "blob", //划重点了，这个很重要
    }).then((res, rb) => {
      console.log(
        res.headers.get("Content-Disposition"),
        rb.headers.get("Content-Disposition")
      );
      let blob = new Blob([res.data], { type: "image/jpeg" });
      setcontimg(window.URL.createObjectURL(blob));
      console.log(contimg.slice(5));
      // setfilename(contimg.slice(50));
      let link = document.createElement("a"); //生成一个a标签
      link.download = filename || "defaultName";
      link.href = contimg;
      link.click();
      // 移除
    });
  };
  return (
    <h1>
      <button onClick={export1}>export</button>
    </h1>
  );
}

export default Dashboard;
