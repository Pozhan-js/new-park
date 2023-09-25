/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-02 10:19:15
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-08-17 16:33:00
 * @FilePath: /smart-park/common/function/requset.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { message } from "./index";

/**
 * @description: 发送请求模块(抽出公共部分)
 * @param {function} api 接口
 * @param {object} params 参数
 * @param {string} msg 提示信息
 * @param {boolean} request 是否使用接口msg
 * @return {Promise}
 */
export async function sendRequestModel(
  api,
  { params, msg = "请求", request = false, ...config } = {}
) {
  let state = false;
  let data = null;
  if (config.auto === undefined) config.auto = true;
  try {
    data = (await api(params)) || {};
    state = data?.code === 200;
    if (state) return Promise.resolve(data);
    else throw data;
  } catch (e) {
    //超时文本处理
    if (e.timeout) msg += (config.auto = false) || "超时";
    return Promise.reject(e);
  } finally {
    //request为true时,使用接口返回的msg
    if (request && !["Success"].includes(data?.msg)) config.request = data?.msg;
    if (msg || config.request) message(msg, state, config);
  }
}
