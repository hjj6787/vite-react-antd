import Api from ".";
import { uploadFileInChunks, mergeChunks } from "../files-chunk/files-chunk";
const CHUNK_SIZE = 20 * 1024 * 1024; // 每片大小为 5MB

export const Getuser = async (data) => {
  try {
    const response = await Api.post(`user/Tlogin`, data);
    // console.log(response.data);
    localStorage.setItem("token", response.data.token);
    return response;
  } catch (error) {
    console.error("Failed to fetch resource:", error);
    throw error;
  }
};
export const Getuserlist = async () => {
  try {
    const response = await Api.get(`user/userlist`);
    return response;
  } catch (error) {
    throw error;
  }
};
export const Loginbody = async (postdata, params) => {
  try {
    const response = await Api.post(`user/loginbody`, postdata);
    return response;
  } catch (error) {
    throw error;
  }
};

export const Uploadfiles = async (postdata, params) => {
  try {
    const response = await Api.post(`upload/files`, postdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const UploadFileschunk = async (postdata) => {
  await uploadFileInChunks(postdata.file[0].originFileObj);
  await mergeChunks(postdata);
};

export const Getfilelist = async () => {
  try {
    const response = await Api.get(`upload/filelist`);
    return response;
  } catch (error) {
    throw error;
  }
};

export const Downloadinfo = async (id) => {
  try {
    const response = await Api.get(`upload/Down`, {
      responseType: "blob", // 必须设置 responseType 为 'blob'
      params: {
        id: id,
      },
      headers: {
        "Content-Type": "application/octet-stream",
      },
    });
    const getfilename = await Api.get(`upload/Getfilesname`, {
      params: { id },
    });
    console.log(response, getfilename);
    // 创建一个 Blob 对象来保存文件数据
    const blob = new Blob([response], {
      type: "application/octet-stream",
    });
    console.log(blob);
    // 创建一个 URL 对象
    const downloadUrl = window.URL.createObjectURL(blob);

    // 创建一个 a 标签并点击它来触发下载
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = getfilename.data.filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return { response, getfilename };
  } catch (error) {
    throw error;
  }
};

export const Downstream = async () => {
  try {
    const response = await Api.get(`upload/stream`);
  } catch {}
};

export const DelFiles = (id) => {
  console.log(id);
  try {
    const response = Api.delete("upload/dfiles", { params: { id: id } });
    return response;
  } catch {}
};

export const EditFiles = async (postdata) => {
  try {
    if (postdata.file) {
      await uploadFileInChunks(postdata.file[0].originFileObj);
      const pdata = JSON.parse(JSON.stringify(postdata));
      console.log(postdata);
      delete pdata.file;
      const res = Api.post("upload/Editfiles", {
        postdata: pdata,
        id: pdata.id * 1,
        hasfiles: true,
      });
      return res;
    } else {
      const pdata = JSON.parse(JSON.stringify(postdata));
      console.log(postdata);
      delete pdata.file;
      const res = Api.post("upload/Editfiles", {
        postdata: pdata,
        id: pdata.id * 1,
      });
      return res;
    }

    return res;
  } catch {}
};
