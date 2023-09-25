/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-07-03 15:08:06
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-25 12:53:26
 * @FilePath: /smart-park/main.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Vue from "vue";
import uView from "uview-ui";
import App from "./App";
import store from "./store";
import { router, RouterMount } from "./router"; //路径换成自己的
import tabbar from "@/components/tabbar/tabbar.vue";

Vue.use(router);
Vue.use(uView); //先挂载uView,以防下面使用$u.http时找不到方法

Vue.config.productionTip = false;

Vue.component("view-tabbar", tabbar);

require("./utils/custom.js"); //引入自定义方法

const app = new Vue({ ...App, store });

// #ifdef H5
RouterMount(app, router, "#app");
// #endif

// #ifndef H5
app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif

// 引入请求封装，将app参数传递到配置中
require("./utils/request.js")(app);
