/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-07-03 15:03:14
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-18 17:52:24
 * @FilePath: /smart-park/store/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import Vuex from "vuex";

//需要时再引入
import user from "./module/user";
import main from "./module/main";
import neighborhood from "./module/neighborhood";
import role from "./module/role";
import websocket from "./module/socket";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { user, main, neighborhood, role, websocket },
  getters: {
    isLogin: (state) => Boolean(state.user.token),
  },
});

export default store;
