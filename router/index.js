/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-06-21 22:32:48
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-03 15:54:12
 * @FilePath: /smart-park/router/index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { RouterMount, createRouter } from "uni-simple-router";
import { verifyUserInfo, verifyLogin } from "@/common/function/project";
const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [...ROUTES],
});

//全局路由前置守卫
router.beforeEach(async (to, _, next) => {
  let { meta } = to;
  // console.log("route", to);
  // console.log('meta', storage.get('parse'));
  try {
    if (meta.verifyLogin) await verifyLogin();
    if (meta.verifyInfo) await verifyUserInfo();
    next();
  } catch (error) {
    error instanceof Function && error(() => (router.$lockStatus = false));
  }
});
export { router, RouterMount };
