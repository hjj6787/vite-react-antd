import Api from ".";
import { uploadFileInChunks, mergeChunks } from "../files-chunk/files-chunk";

const CHUNK_SIZE = 20 * 1024 * 1024; // 每片大小为 5MB

export const GetLogin = async (data) => {
  console.log(data);
  try {
    const response = await Api.post(`user/Tlogin`, data);
    console.log(response.data);
    // localStorage.setItem("token", response.data.token);
    return response;
  } catch (error) {
    console.error("Failed to fetch resource:", error);
    throw error;
  }
};

export const Signup = async (data) => {
  try {
    const response = await Api.post("user/signup", data);
    return response;
  } catch {}
};

export const Deluser = async (data) => {
  console.log(data);
  // const obj = { userid: data.postdata.userid };
  try {
    const response = await Api.delete("user/DeleteUser", { data });
    return response;
  } catch {
    (err) => {
      return err;
    };
  }
};

export const Edituser = async (data) => {
  console.log(data);
  try {
    const response = await Api.post("user/updateUser", data);
    return response;
  } catch {}
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

export const EditFiles = async (postdata, id, fileName, fileSize) => {
  console.log(postdata);

  try {
    if (postdata.file) {
      const file = postdata.file[0].originFileObj;
      const filename = file.name;
      const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
      await uploadFileInChunks(postdata.file[0].originFileObj);
      const pdata = JSON.parse(JSON.stringify(postdata));
      console.log(postdata);
      delete pdata.file;
      const res = Api.post("upload/Editfiles", {
        postdata: pdata,
        id: id * 1,
        hasfiles: true,
        filename: filename,
        totalChunks: totalChunks,
      });
      return res;
    } else {
      const pdata = JSON.parse(JSON.stringify(postdata));
      console.log(postdata);
      const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);
      delete pdata.file;
      const res = Api.post("upload/Editfiles", {
        postdata: pdata,
        id: id * 1,
        filename: fileName,
        totalChunks: totalChunks,
      });
      return res;
    }

    return res;
  } catch {}
};

export const Getcele = async () => {
  try {
    const res = Api.get("user/celebrity");
    return res;
  } catch {}
};

export const GetfilesImg = async (id) => {
  try {
    const res = Api.get("upload/filesimg", { params: { id } });
    return res;
  } catch {}
};

export const Getiplist = async (id) => {
  try {
    const res = Api.get("gateway/Alliplist");
    return res;
  } catch {}
};

export const Editiplist = async (data) => {
  try {
    const res = Api.post("gateway/eidtlist", data);
    return res;
  } catch {}
};

export const Verifyip = async () => {
  try {
    const res = Api.get("gateway/verifyip");
    return res;
  } catch {}
};
