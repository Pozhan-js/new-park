/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-02 10:19:15
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-28 11:08:36
 * @FilePath: /smart-park/common/helper.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
//适用本项目的通用方法
import config from "./config";
import { verifyEmpty, fileApi } from "./function";
export default {
  verifyRule: {
    phone:
      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
    password: /^(?=.*[a-zA-Z])(?=.*\d)[^]{8,16}$/,
    name: /^[\u4e00-\u9fa5]{2,4}$/,
  },
  /**
   * @description: 过滤数据(脱壳)
   * @param {Object} data 把请求成功的res数据传入进来,或者直接await 请求接口()
   * @param {Function|Boolean} filterFn 可以再传入一个回调函数对返回的数据进行二次处理
   * @param {String} key 可以控制返回的字段
   * @return {Array|Object} 返回值
   */
  filterData(data, filterFn, key) {
    //filterFn为布尔值true时,仅返回data,不获取list
    data = data?.data;
    let list = data?.[key || "list"] || [];
    if (!Array.isArray(list) || typeof filterFn != "function")
      return filterFn ? data || {} : list || [];
    return list.map((res) => filterFn(res));
  },
  filterCover(data, isUrl = true) {
    if (verifyEmpty(data)) return "";
    else if (typeof data === "string") {
      if (uni.$u.test.url(data)) return data;
      else return config.baseURL + data;
    }
    return config.baseURL + (isUrl ? data[0]?.url : data[0]);
  },
  // 上传文件
  uploadFile: (url, filePath) => fileApi.upload({ url, filePath }),
  getAvatar(url) {
    //获取头像
    return url ? config.baseURL + url : "/static/image/default-avatar.png";
  },
  getImage(tenement = "", fileName = "", port) {
    if (tenement && !fileName) {
      fileName = tenement;
      tenement = "";
    } else if (tenement) {
      tenement += "/";
    }
    const url = port
      ? config.fileURL.replace(/:\d+$/, ":" + port)
      : config.fileURL;
    if (fileName.lastIndexOf(".") === -1) fileName += ".png"; //默认png后缀
    return url + "/api/file/Image/systemicon/" + tenement + fileName;
  },
  rollback(timeout = 0, { home = {}, ...back } = {}) {
    const pages = getCurrentPages();
    let method = "navigateBack";
    if (pages.length <= 1) {
      back = { url: "/pages/index/index", ...home };
      method = "reLaunch";
    }
    return new Promise((resolve) => {
      setTimeout(() => resolve(uni[method](back)), timeout);
    });
  },
  getCurrentMonth(value = null, separate = "-") {
    // 如果为无效时间,则格式化当前时间
    if (!value) value = +new Date();
    // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
    if (String(value).length == 10 && value == Number(value)) value *= 1000;
    value = Number(value);

    const targetTime = new Date(value);
    const year = targetTime.getFullYear();
    let month = targetTime.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }

    const yDate = new Date(year, Number(month), 0);

    const startDateTime = year + separate + month + separate + "01 00:00:00"; //这个月第一天
    // const endDateTime = year + separate + month + separate + yDate.getDate() + ' 00:00:00'; //这个月最后一天
    const endDateTime =
      year + separate + month + separate + yDate.getDate() + " 23:59:59"; //这个月最后一天

    // return {
    //   startDateTime: startDateTime,
    //   endDateTime: endDateTime,
    // };
    return [startDateTime, endDateTime];
  },
  getCurrentWeek(value = null, separate = "-") {
    // 如果为无效时间,则格式化当前时间
    if (!value) value = +new Date();
    // 如果dateTime长度为10或者13，则为秒和毫秒的时间戳，如果超过13位，则为其他的时间格式
    if (String(value).length == 10 && value == Number(value)) value *= 1000;
    value = Number(value);

    const one_day = 86400000; // 24 * 60 * 60 * 1000;
    const weekDate = new Date(value);
    const day = weekDate.getDay() === 0 ? 7 : weekDate.getDay(); // 返回1-7,7表示周日
    // 设置时间为当天的0点
    weekDate.setHours(0, 0, 0, 0);

    //算出本周开始时间结束时间
    const week_start_time = new Date(weekDate.getTime() - (day - 1) * one_day);
    const week_end_time = new Date(weekDate.getTime() + (7 - day) * one_day);

    //格式化日期
    const filters = (n) => {
      return n < 10 ? (n = "0" + n) : n;
    };
    const startmonth = filters(week_start_time.getMonth() + 1);
    const startDay = filters(week_start_time.getDate());
    const endmonth = filters(week_end_time.getMonth() + 1);
    const endDay = filters(week_end_time.getDate());

    const startDateTime =
      week_start_time.getFullYear() +
      separate +
      startmonth +
      separate +
      startDay +
      " 00:00:00";
    const endDateTime =
      week_end_time.getFullYear() +
      separate +
      endmonth +
      separate +
      endDay +
      " 23:59:59";
    return [startDateTime, endDateTime];
  },
  getYearRange(year) {
    var startDate = new Date(year, 0, 1); // 该年的1月1日
    var endDate = new Date(year, 11, 31); // 该年的12月31日

    var startYear = startDate.getFullYear();
    var startMonth = startDate.getMonth() + 1;
    var startDateOfMonth = startDate.getDate();

    var endYear = endDate.getFullYear();
    var endMonth = endDate.getMonth() + 1;
    var endDateOfMonth = endDate.getDate();

    var startTime =
      startYear + "-" + startMonth + "-" + startDateOfMonth + " " + "00:00:00";

    var endTime =
      endYear + "-" + endMonth + "-" + endDateOfMonth + " " + "23:59:59";

    return [Date.parse(startTime), Date.parse(endTime)];
  },

  /**
   * 计算数组中各项的占比，保证百分比和等于1
   * @param arr 需要计算百分比的数组,传入时必须降序排序
   * @param precision  精度 比如 4   0.34567 =》 34.56
   *
   * arr降序排序，避免较小的值因为顺位补值导致大于原本比他大的值，
   * 至于原本相等的值因为顺位补值变得不相等则不考虑，
   * 比如[33,33,33]  => [34,33,33]，将数值精确后势必三个百分比会不相等，
   * 【总和等于1】与【相等的值百分比也相等】在这里只保证第一种情况，
   * 毕竟百分比是看的与1的关系
   *
   * padEnd 属于es6 可能需要自己改写  '0'.padEnd(3,'-') => '0--'
   */
  getPercent(arr, precision) {
    let total = 1, //总和
      percentArr, //每个模块的宽度百分比数组 精确到.00
      percentTotal = 0, //第一次计算百分比后，百分比总和
      dif, //第一次计算百分比总和后与实际和的差值,因为第一次计算百比试向下精确，所以和总会比实际和小
      len = arr.length,
      i = 0,
      result;

    //计算总和
    total = arr.reduce(function (a, b) {
      return a + b;
    });
    //简单过滤总和为零的情况
    if (total == 0) {
      return;
    }
    //计算百分比数组
    percentArr = arr.map(function (d, index) {
      let r = (d / total + "").substring(2, 2 + precision); //0.23456 => 2345
      r = +r.padEnd(precision, "0"); //0.23 => 2300
      percentTotal += r; //累计百分比
      return +r; // 2345
    });
    //计算差值
    dif = Math.pow(10, precision) - percentTotal;

    //分配差值
    while (dif-- > 0) {
      percentArr[i++] += 1;
      i = i % len;
    }
    //转换为百分比字符串
    result = percentArr.map(function (per) {
      per += "";
      per = per.padStart(precision, "0");
      return parseFloat(per.replace(/(\d{2})/, "$1.")) + "%";
    });
    return result;
  },
};
