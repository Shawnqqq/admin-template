const PREFIX = process.env.VUE_APP_API;

export default {
  // example
  example: `${PREFIX}/api/example`,

  // qiniu
  qiniuUrl: "https://upload.qiniup.com",
  qiniuConfig: `${PREFIX}/api/file/config`,
  qiniuToken: `${PREFIX}/api/file/qiniu-upload-token`,
  qiniuStore: `${PREFIX}/api/file/qiniu-file-store`
};
