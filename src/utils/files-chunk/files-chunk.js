import Api from "../request";

const CHUNK_SIZE = 20 * 1024 * 1024; // 每片大小为 5MB

export const uploadFileInChunks = async (file) => {
  console.log(file);
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  const uploadPromises = [];
  console.log(totalChunks);
  for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
    const start = chunkIndex * CHUNK_SIZE;
    const end = Math.min(start + CHUNK_SIZE, file.size);
    const chunk = file.slice(start, end);
    // console.log(chunk);
    const formData = new FormData();
    formData.append("file", chunk);
    formData.append("fileName", file.name);
    formData.append("chunkIndex", chunkIndex);
    console.log(formData);
    uploadPromises.push(
      Api.post("upload/upload-chunk", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
    );
  }
  // console.log(uploadPromises.length);
  try {
    await Promise.all(uploadPromises);
    // console.log("All chunks uploaded successfully");
  } catch (error) {
    console.error("Error uploading chunks", error);
  }
};

export const mergeChunks = async (postdata) => {
  const file = postdata.file[0].originFileObj;
  const filename = file.name;
  const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
  const pdata = JSON.parse(JSON.stringify(postdata));
  // console.log(postdata);
  delete pdata.file;
  // console.log(postdata);

  try {
    const response = await Api.post("upload/merge-chunks", {
      postdata: postdata,
      filename: filename,
      totalChunks: totalChunks,
    });
    console.log(response.data.message);
  } catch (error) {
    console.error("Error merging chunks", error);
  }
};
