/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-06-29 15:59:21
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-08-23 15:25:18
 * @FilePath: /smart-park/utils/custom.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import storage from "../common/function/storage";
import helper from "../common/helper";
import constants from "../common/constants";

// u-view
uni.$u.props.loadingIcon.color = constants.THEME_COLOR;

// 全局方法
import {
  message,
  goToPath,
  stringify,
  sendRequestModel,
  openModel,
} from "../common/function";

Vue.prototype.$message = message;
Vue.prototype.$jump = goToPath;
Vue.prototype.$request = sendRequestModel;
Vue.prototype.$storage = storage;
Vue.prototype.$helper = helper;
Vue.prototype.$model = openModel;
Vue.prototype.$photo = helper.filterCover; //图片过滤器
Vue.prototype.$constants = constants;
Vue.prototype.$bus = new Vue();

//兼容structuredClone函数
if (typeof structuredClone !== "function") {
  globalThis.structuredClone = target => JSON.parse(stringify(target));
}
