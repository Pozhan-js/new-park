/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-18 17:42:05
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-19 10:31:55
 * @FilePath: /smart-park/store/module/socket.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
// import Vue from "vue";
// import Vuex from "vuex";
import { getStorage } from "@/common/config";
import { Ws } from "@/utils/websocket";
// Vue.use(Vuex);

// 状态
const state = {
  socketTask: null,
  userInfo: getStorage("SP_UserInfo") || null,
};
// 请求
const actions = {
  // 开启websocket
  async startWebSocket({ commit }) {
    // 创建一个Ws对象
    if (!state.socketTask) {
      const task = new Ws();
      await task.initWs();
      commit("setSocket", task);
      console.log("task创建", task);
    }
  },

  //发送信息
  sendMessage({ state }, value) {
    if (!state.socketTask) return;
    state.socketTask.sendMessage(value);
  },
};

// 提交
const mutations = {
  setSocket(state, data) {
    state.socketTask = data;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
