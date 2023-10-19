/*
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-18 17:22:05
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-19 11:12:55
 * @FilePath: /smart-park/utils/websocket.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import config from "@/common/config";
import { toPromise } from "@/common/function/index";
export class Ws {
  /**
   * 构造方法
   * @url https://uniapp.dcloud.net.cn/uni-app-x/api/websocket.html#connectsocketfail
   * @param {options} 参数
   */
  constructor(
    options = {
      url: `wss://${config.rootPath}/api/mongoSystem/Message/websocket`,
      timeout: 30000,
      reconnectTime: 5000,
    }
  ) {
    this.options = options;
    this.socketTask = null;
    this.callback = null;
    this.reconnectTimeOut = null;
    this.joinRoomState = false;
  }

  /**
   * 初始化连接
   */
  async initWs() {
    console.log("初始化连接");
    return new Promise((resolve) => {
      this.socketTask = uni.connectSocket({
        ...this.options,
        success() {
          console.log("正准备建立websocket中");
        },
      });
      this.socketTask.onOpen(() => {
        this.closeLoading();
        // 连接打开
        console.info("连接成功");
        // 开启心跳
        this.startHeartbeat();
        this.sendMessage({ method: "OnConnection" });
        resolve("连接成功");
      });

      this.socketTask.onClose(() => {
        console.log("连接关闭");
        this.closeLoading();
        this.reconnect();
      });
    });
  }
  //关闭重连提示
  closeLoading() {
    // if (this.joinRoomState) {
    this.joinRoomState = false;
    uni.hideLoading();
    // }
  }

  // 关闭心跳
  closeHeartbeatInter(serverClose = false) {
    clearInterval(this.heartbeatInterval);
    this.isManualClosed = serverClose;
  }
  /**
   * 关闭连接
   */
  closeWebSocket(callback) {
    this.socketTask.close({
      complete(msg) {
        this.closeHeartbeatInter(true);
        callback(msg);
      },
    });
  }

  /**
   * 重新连接
   */
  reconnect() {
    // 停止发送心跳
    clearInterval(this.heartbeatInterval);
    const isExistPrev = this.reconnectTimeOut != null; //如果原来没有重连,则马上重连
    if (this.reconnectTimeOut) {
      clearTimeout(this.reconnectTimeOut);
      this.reconnectTimeOut = null;
    }
    // 如果不是人为关闭的话，进行重连
    if (!this.isManualClosed) {
      // if (this.joinRoomState)
      //   uni.showLoading({
      //     title: "同步中断重连中",
      //     mask: true,
      //   });
      console.log("开始重连");
      if (isExistPrev) {
        const time = this.options.reconnectTime;
        this.reconnectTimeOut = setTimeout(() => this.initWs, time);
      } else {
        this.initWs();
        this.reconnectTimeOut = false;
      }
    }
  }

  startHeartbeat() {
    this.closeHeartbeatInter();
    this.heartbeatInterval = setInterval(() => {
      this.sendMessage({ method: "ping" });
    }, this.options.timeout);
  }

  /**
   * 发送消息
   * @param value 消息参数
   */
  sendMessage(value = {}) {
    // 注：只有连接正常打开中 ，才能正常成功发送消息
    return toPromise(this.socketTask.send, {
      data: JSON.stringify({
        token: uni.getStorageSync("SP_Token"),
        ...value,
      }),
    }).then(() => {
      console.log("消息发送成功", value);
      this.startHeartbeat(); // 发送成功重置心跳
    });
  }

  /* 
  外部获取消息
   */
  getMessage(callback) {
    if (!this.callback) {
      this.socketTask.onMessage((res) => {
        // this.joinRoomState = Boolean(res.roomId);
        this.callback(res);
      });
    }
    this.callback = callback;
  }

  /**
   * 获取SocketTask
   */
  getWs() {
    return this.socketTask;
  }
}
