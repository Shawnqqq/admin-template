import request from "@/global/request/axios";
import API from "@/global/request/api";

export default {
  /*
   ** upload(params, progressHandle)
   **
   ** @params platform        {string}       平台
   ** @params scene           {string}       场景
   ** @params space           {string}       空间
   ** @params folder          {string}       文件夹
   ** @params progressHandle  {function}   上传事件回调
   */
  async upload(
    { platform, scene, bucket, space, file, title, folder, from },
    progressHandle
  ) {
    // 获取平台
    const config = await this.config({
      platform: platform || process.env.VUE_APP_PLATFORM,
      scene: scene || process.env.VUE_APP_SCENE,
      from: from || "web"
    });
    // 七牛平台
    if (config.driver === "qiniu") {
      const targetBucket = bucket || config.bucket || "";
      const fileName = file.name;
      // 获取 token

      const tokenInfo = await this.fetchQiNiuToken({
        fileName,
        bucket: targetBucket,
        space: space || "default",
        folder: folder || "default"
      });
      // 上传七牛
      const qiniuRes = await this.uploadFileToQiNiu(
        {
          key: tokenInfo.key,
          token: tokenInfo.token,
          file
        },
        progressHandle
      );
      // 上报信息
      return await this.sendQiNiuRes({
        bucket: targetBucket,
        path: tokenInfo.key,
        name: qiniuRes.fname,
        title: title || ""
      });
    }
    const error = new Error("本地上传没写");
    return Promise.reject(error);
  },
  /* 获取平台类型
   ** @params platform        {string}       平台
   ** @params scene           {string}       场景
   */
  config({ platform, scene, from }) {
    return request.get(API.qiniuConfig, {
      platform,
      scene,
      from
    });
  },
  /* 获取七牛的token和key
   ** @params bucket           {string}       桶
   ** @params fileName         {string}       文件名
   ** @params space            {string}       空间
   ** @params folder           {string}       文件夹
   */
  fetchQiNiuToken({ bucket, fileName, space, folder }) {
    return request.post(API.qiniuToken, {
      bucket,
      space,
      folder,
      file_name: fileName
    });
  },
  /* 发送文件到七牛上
   ** @params key               {string}       文件名
   ** @params token             {string}       空间
   ** @params file              {string}       文件夹
   ** @params onUploadProgress  {function}     上传回调
   */
  uploadFileToQiNiu({ key, token, file }, onUploadProgress) {
    const formData = new FormData();
    formData.append("key", key);
    formData.append("token", token);
    formData.append("file", file);
    const headers = { "Content-type": "multipart/form-data;" };
    return request.post(API.qiniuUrl, formData, {
      withCredentials: false,
      timeout: 60000,
      headers,
      onUploadProgress
    });
  },
  /* 向服务器发送七牛的响应
   ** @params bucket           {string}       桶
   ** @params path             {string}       地址
   ** @params name             {string}       文件名
   ** @params title            {string}       重命名
   */
  sendQiNiuRes({ bucket, path, name, title }) {
    return request.post(API.qiniuStore, {
      bucket,
      path,
      name,
      title
    });
  }
};
