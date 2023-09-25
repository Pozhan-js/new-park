/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-02 10:19:27
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-19 10:11:47
 * @FilePath: /smart-park/api/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const http = uni.$u.http;
import config from "@/common/config";
import store from "../store";

export const API = {
  visual: "/api/mongoVisualdev/online_dev/",
  open: "/api/mongoVisualdev/OpenApi/", //登录凭证
  system: "/api/mongoSystem/Permission/", //登录认证
  workFlow: "api/mongoWorkflow/FlowTask", //创建流程
  realName:'/api/mongoThird/huawei/certification/' //实名认证
};

//获取公共token
export async function getOpenToken(fn) {
  const { token, openToken } = store.state.user;
  const isOpen = !token;
  if (isOpen && !openToken) {
    const { code, msg } = await http.get(
      `${API.open}getToken/${config.tenantId}`
    );
    uni.setStorageSync("lastLoginTime", Date.now());
    if (code === 200) store.commit("user/SET_OPEN_TOKEN", msg);
  }
  return fn(isOpen);
}

// 新建数据
export const createModel = (modelId, data) =>
  http.post(API.visual + modelId, { data: JSON.stringify(data || {}) });

// 删除数据
export const deleteModel = (modelId, id) =>
  http.delete(API.visual + `delete/${modelId}/${id}`);

// 获取数据列表
export const getModelList = (modeId, data = {}) =>
  http.post(API.visual + modeId + "/list", {
    pageSize: -1,
    ...data,
  });

// 获取开放数据列表
export const getPublicModelList = (modeId, data = {}) => {
  return getOpenToken(isOpen =>
    http.post(API[isOpen ? "open" : "visual"] + modeId + "/list", {
      pageSize: -1,
      ...data,
    })
  );
};

// 修改数据列表
export const updateModel = (modelId, data = {}, id) => {
  return http.put(
    API.visual + `update/${modelId}/${data.id || id || ""}`,
    { data: JSON.stringify(data) });
}

// 获取数据信息详情
export const getModelInfo = (modelId, id) =>
  getOpenToken(() => http.get(API.visual + `${modelId}/${id}`));

// 获取公开数据信息详情
export const getPublicModelInfo = (modelId, id) =>
  getOpenToken(isOpen =>
    http.get(API[isOpen ? "open" : "visual"] + `${modelId}/${id}`)
  );

//定制化接口
export const dataInterface = (id, data) =>
  http.post("api/mongoVisualdev/Datainterface/" + id, data);

// 批量操作
export const batchOperation = (modelId, data) =>
  http.post(API.visual + `batch_insert_update/${modelId}`, data);

// 创建流程
export const createFlow = data => http.post(API.workFlow, data);

// 实名认证
export const realName = (idCard,phoneNumber,realName) => http.get(API.realName+`${idCard}/${phoneNumber}/${realName}`)