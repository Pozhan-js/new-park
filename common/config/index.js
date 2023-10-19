/*
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-03 14:51:17
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-18 17:56:48
 * @FilePath: /community-square/common/config/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

const rootPath = "kindoucloud.com:8077";
const config = {
  rootPath,
  tenantId: "SmartPark", //租户id
  SoftName: "智慧园区", //软件全称
  // baseURL: "https://kindoucloud.com:8066",
  baseURL: "https://kindoucloud.com:8077",
  // baseURL: "http://192.168.1.3:30000",
  fileURL: "https://kindoucloud.com:8011",
  storage: "SP_", //本地存储名称
  filePostfix: ["jpg", "jpeg", "png", "gif"],
  // cache: "SP_",
};

export function getStorage(val = "", key) {
  return uni.getStorageSync(getGlobal(key || "storage") + val);
}
export function setStorage(val = "", data, key) {
  uni.setStorageSync(getGlobal(key || "storage") + val, data);
}
export function removeStorage(val = "", key) {
  uni.removeStorageSync(getGlobal(key || "storage") + val);
}
export function getGlobal(key) {
  return key ? config[key] : "";
}
export function getConfig() {
  return config;
}

export default config;
