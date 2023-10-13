/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-12 17:55:57
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-13 16:03:33
 * @FilePath: /smart-park/store/module/role.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getModelList } from "@/api";
const state = {
  roleList: [],
};

const actions = {
  async getMenuRoleList({ commit }) {
    const { data } = await getModelList("645b4093d57a117d31a25195");
    // console.log("role", data);
    commit("GET_ROLE_LIST", data);
  },
};

const mutations = {
  GET_ROLE_LIST(state, data) {
    state.roleList = data?.list || [];
  },
};

const getters = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
