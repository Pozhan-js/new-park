/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-11-29 17:06:47
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-30 10:49:04
 * @FilePath: /smart-park/store/module/shopCar.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { getModelList, createModel } from "@/api/index";

const state = {
  // productNumber: 0,
  shopCarData: [],
};

const actions = {
  // 创建一个购物车商品订单
  async createShopCarItem({ state }, reqData = {}) {
    const res = await createModel("6566d939f3ad0c30c03d2e57", reqData);
    if (res.code === 200) {
      // state.productNumber++;
      uni.showToast({
        title: "添加成功",
        icon: "success",
        duration: 600,
      });
    }
  },
  // 查询该用户的购物车总订单数
  async getAllShopCarNumber({ commit }, reqData = {}) {
    const allData = await getModelList("6566d939f3ad0c30c03d2e57", reqData);
    if (allData.code === 200) {
      commit("ALL_SHOP_CAR_DATA", allData);
    }
  },
};

const mutations = {
  ALL_SHOP_CAR_DATA(state, shopData) {
    state.shopCarData = shopData.data?.list;
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
