<template>
  <view class="say-some box">
    <u-navbar bgColor="#fff" title="活动发布" :placeholder="true">
      <view slot="left"> </view>
    </u-navbar>

    <!-- ========================== -->
    <u--form
      labelPosition="top"
      :labelStyle="{ 'margin-bottom': '5rpx' }"
      :model="formInfoData"
      :rules="rules"
      ref="activeForm"
      labelWidth="100"
    >
      <u-form-item label="活动标题" prop="activity_title" borderBottom required>
        <u--input
          v-model="formInfoData.activity_title"
          border="none"
          placeholder="请输入内容"
        ></u--input>
      </u-form-item>

      <u-form-item
        label="活动联系人"
        prop="phone_contact"
        borderBottom
        required
      >
        <u--input
          v-model="formInfoData.phone_contact"
          border="none"
          placeholder="请输入内容"
        ></u--input>
      </u-form-item>

      <u-form-item label="联系电话" prop="phone_number" borderBottom required>
        <u--input
          v-model="formInfoData.phone_number"
          border="none"
          placeholder="请输入内容"
        ></u--input>
      </u-form-item>

      <u-form-item label="活动类型" prop="active_type" borderBottom required>
        <u--input
          v-model="formInfoData.active_type"
          border="none"
          placeholder="请输入内容"
        ></u--input>
      </u-form-item>

      <u-form-item
        label="活动地址"
        prop="activity_location"
        borderBottom
        labelPosition="left"
        required
      >
        <u-button
          type="primary"
          text="添加活动位置"
          :plain="true"
          @click="getAddressBtn"
          icon="map"
          size="small"
          shape="circle"
        ></u-button>
        <view v-if="formInfoData.activity_location.address">{{
          formInfoData.activity_location.address
        }}</view>
        <!-- <u-icon slot="right" name="arrow-right" /> -->
      </u-form-item>

      <u-form-item
        label="活动内容"
        prop="activity_content"
        borderBottom
        required
      >
        <u--textarea
          v-model="formInfoData.activity_content"
          count
          height="100"
          maxlength="500"
          border="surround"
          placeholder="请输入内容"
        ></u--textarea>
      </u-form-item>

      <u-form-item label="活动图示" prop="activity_log" borderBottom required>
        <u-upload
          :fileList="fileList1"
          @afterRead="afterRead"
          @delete="deletePic"
          name="1"
          multiple
          :maxCount="1"
        ></u-upload>
      </u-form-item>

      <u-form-item
        label="活动起始时间"
        prop="activity_time"
        borderBottom
        labelPosition="left"
        required
        @click="showCalendar = true"
      >
        <view class="date-range">{{ showDateRange }}</view>
        <u-icon slot="right" name="arrow-right" />
      </u-form-item>

      <u-form-item
        label="举办日期"
        prop="hold_date"
        borderBottom
        labelPosition="left"
        required
        @click="holdDateShow"
      >
        <view>{{
          formInfoData.hold_date
            ? $u.timeFormat(formInfoData.hold_date, "yyyy-mm-dd")
            : ""
        }}</view>
        <u-icon slot="right" name="arrow-right" />
      </u-form-item>

      <u-form-item
        label="举办时间"
        prop="hold_time"
        borderBottom
        labelPosition="left"
        required
        @click="holdTimeShow"
      >
        <view>{{ formInfoData.hold_time }}</view>
        <u-icon slot="right" name="arrow-right" />
      </u-form-item>

      <u-form-item label="活动发起人" prop="launching_person" borderBottom>
        <u--input
          v-model="formInfoData.launching_person"
          border="none"
          placeholder="请输入内容"
        ></u--input>
      </u-form-item>

      <u-form-item label="赞助商" prop="sponsor" borderBottom>
        <u--input
          v-model="formInfoData.sponsor"
          border="none"
          placeholder="请输入内容"
        ></u--input>
      </u-form-item>

      <u-form-item label="活动建议人数" prop="people_num" borderBottom>
        <u-number-box
          min="0"
          integer
          showMinus
          inputWidth="100"
          v-model="formInfoData.people_num"
        ></u-number-box>
      </u-form-item>

      <u-form-item label="活动建议价格" prop="price" borderBottom>
        <u-number-box
          min="0"
          integer
          showMinus
          inputWidth="100"
          v-model="formInfoData.price"
        ></u-number-box>
      </u-form-item>

      <u-form-item label="是否免费" prop="is_free" borderBottom>
        <u-switch
          v-model="formInfoData.is_free"
          :inactiveValue="0"
          :activeValue="1"
        ></u-switch>
      </u-form-item>
    </u--form>

    <button class="qu-btn circle-button" @click="clickForm">提交表单</button>
    <u-toast ref="uToast" />
    <!-- 日历组件 -->
    <u-calendar
      :show="showCalendar"
      mode="range"
      @confirm="confirm"
      @close="close"
    ></u-calendar>
    <!-- 时间选择器 -->
    <u-datetime-picker
      v-if="pickerMode === 'date'"
      :show="showDate"
      @confirm="changeStartDate"
      @cancel="cancelStartDate"
      mode="date"
    ></u-datetime-picker>
    <u-datetime-picker
      v-else
      :show="showDate"
      @confirm="changeStartDate"
      @cancel="cancelStartDate"
      mode="time"
    ></u-datetime-picker>
    <!-- loading加载效果 -->
    <u-loading-icon :show="loading"></u-loading-icon>
    <!-- 底部导航栏 -->
    <u-tabbar
      :value="value6"
      @change="handleClick"
      :fixed="true"
      activeColor="#6377F5"
      zIndex="999"
      :placeholder="true"
      :safeAreaInsetBottom="true"
    >
      <u-tabbar-item
        v-for="item in tabbarList"
        :key="item.text"
        :text="item.text"
        :icon="item.isActive ? item.activeUrl : item.url"
      ></u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script>
import config from "@/common/config";
import { UpdateFilePath } from "@/api/file";
import { createModel, updateModel } from "@/api";
import Storage from "@/common/function/storage";
export default {
  data() {
    // //正则表达式
    // const regex = /<.*?>/;
    return {
      // 底部导航栏数据
      value6: 1,
      tabbarList: [
        {
          url: "/static/image/tabbar/neighborhood/tabbar02.png",
          activeUrl: "/static/image/tabbar/neighborhood/tabbar01.png",
          pageUrl: "./neighborhood",
          text: "首页",
          name: 0,
          isActive: false,
        },
        {
          url: "/static/image/tabbar/neighborhood/tabbar05.png",
          activeUrl: "/static/image/tabbar/neighborhood/tabbar06.png",
          pageUrl: "./neighborhood-release",
          text: "发布",
          name: 1,
          isActive: true,
        },
        {
          url: "/static/image/tabbar/neighborhood/tabbar04.png",
          activeUrl: "/static/image/tabbar/neighborhood/tabbar03.png",
          text: "我的",
          pageUrl: "./neighborhood-my",
          name: 2,
          isActive: false,
        },
      ],
      // 图片数组
      fileList1: [],
      // 选择人数
      baseListType: [
        {
          title: 5,
          isActive: true,
        },
        {
          title: 10,
          isActive: false,
        },
        {
          title: 20,
          isActive: false,
        },
        {
          title: 50,
          isActive: false,
        },
        {
          title: 100,
          isActive: false,
        },
      ],
      // 表单提交对象
      formInfoData: {
        activity_title: "",
        activity_location: {
          address: "",
        },
        activity_content: "",
        activity_log: [],
        activity_time: [],
        active_type: "",
        phone_contact: "",
        phone_number: "",
        people_num: 0,
        hold_time: "",
        hold_date: "",
        price: 0,
        is_free: 1,
        is_template: 0,
      },
      rules: {
        activity_title: [
          // 必填规则
          {
            required: true,
            message: "此为必填字段",
            // blur和change事件触发检验
            trigger: ["blur", "change"],
          },
        ],
        activity_content: [
          // 必填规则
          {
            required: true,
            message: "此为必填字段",
            // blur和change事件触发检验
            trigger: ["blur", "change"],
          },
        ],
        phone_number: [
          // 必填规则
          {
            required: true,
            message: "此为必填字段",
            // blur和change事件触发检验
            trigger: ["blur", "change"],
          },
          {
            // 自定义验证函数，见上说明
            validator: (rule, value, callback) => {
              // 上面有说，返回true表示校验通过，返回false表示不通过
              // uni.$u.test.mobile()就是返回true或者false的
              return uni.$u.test.mobile(value);
            },
            message: "手机号码不正确",
            // 触发器可以同时用blur和change
            trigger: ["change"],
          },
        ],
        active_type: [
          // 必填规则
          {
            required: true,
            message: "此为必填字段",
            // blur和change事件触发检验
            trigger: ["blur", "change"],
          },
        ],
        phone_contact: [
          // 必填规则
          {
            required: true,
            message: "此为必填字段",
            // blur和change事件触发检验
            trigger: ["blur", "change"],
          },
        ],
        activity_time: [
          {
            type: "array",
            min: 2,
            required: true,
            message: "需要选定时间范围",
            trigger: ["change"],
          },
        ],
        activity_log: [
          // 必填规则
          {
            min: 1,
            type: "array",
            required: true,
            message: "需上传至少一张图片",
            // blur和change事件触发检验
            trigger: ["change"],
          },
        ],
        hold_time: [
          // 必填规则
          {
            required: true,
            message: "此为必填字段",
            // blur和change事件触发检验
            trigger: ["change"],
          },
        ],
        hold_date: [
          // 必填规则
          // 必填规则
          {
            required: true,
            message: "此为必填字段",
            // blur和change事件触发检验
            trigger: ["change"],
          },
        ],
      },
      showCalendar: false,
      showStepIcon: false,

      // 显示时间选择器
      showDate: false,
      pickerMode: "date",
      // 加载
      loading: false,
      // 编辑回显数据
      editData: {},
      originData: {},
      // 正则表达式
      regex: /<.*?>/g,
    };
  },
  watch: {
    // 图片数组
    fileList1: {
      handler(val) {
        // console.log(val);
        //获取活动图是
        if (val.length > 0) {
          this.formInfoData.activity_log = val.map((item) => {
            if (typeof item.url !== "string") {
              item = {
                ...item.url,
              };
            }
            return item;
          });
        } else {
          this.formInfoData.activity_log = [];
        }
      },
      deep: true,
    },
  },
  computed: {
    showDateRange() {
      return (
        (this.formInfoData.activity_time[0]
          ? uni.$u.timeFormat(
              this.formInfoData.activity_time[0],
              "yyyy-mm-dd hh:MM:ss"
            )
          : "") +
        " - " +
        (this.formInfoData.activity_time[1]
          ? uni.$u.timeFormat(
              this.formInfoData.activity_time[1],
              "yyyy-mm-dd hh:MM:ss"
            )
          : "")
      );
    },
  },
  methods: {
    // 提交表单
    async clickForm() {
      this.$refs.activeForm
        .validate()
        .then(async (res) => {
          if (!this.formInfoData._id) {
            this.loading = true;
            try {
              const result = await createModel(
                "64dc41e943432c56038f3005",
                this.formInfoData
              );
              if (result.code === 200) {
                uni.navigateTo({
                  url: "/subPages/neighborhood/pages/neighborhood",
                });
                this.$refs.uToast.success(`提交表单完成`);
              }
            } catch (error) {
              this.$refs.uToast.error(error.msg);
            } finally {
              this.loading = false;
            }
          } else {
            // 编辑
            try {
              const result = await updateModel(
                "64dc41e943432c56038f3005",
                this.formInfoData,
                this.formInfoData._id
              );
              if (result.code === 200) {
                this.$refs.uToast.success(`修改表单完成`);
                setTimeout(() => {
                  uni.navigateBack({
                    delta: 1,
                  });
                }, 500);
              }
            } catch (error) {
              this.$refs.uToast.error(error.msg);
            } finally {
              this.loading = false;
            }
          }
          // uni.$u.toast("校验通过");
        })
        .catch((errors) => {
          uni.$u.toast("校验失败");
        });
    },
    // 选择人数
    clickQuestionType(data, list) {
      list = list.map((item) => {
        item.isActive = false;
        return item;
      });
      data.isActive = true;
      // 选择人数
      this.formInfoData.people_num = Number(data.title);
    },
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: "uploading",
          message: "上传中",
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url);
        let item = this[`fileList${event.name}`][fileListLen];
        this[`fileList${event.name}`].splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: "success",
            message: "",
            // 这里可以修改
            url: result,
          })
        );
        fileListLen++;
      }
    },
    // 发送请求
    uploadFilePromise(url) {
      let that = this;
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: `${config.baseURL}` + `${UpdateFilePath}`, // 仅为示例，非真实的接口地址
          filePath: url,
          header: {
            Authorization: Storage.get("Token"),
          },
          name: "file",
          formData: {
            user: "test",
          },
          success: (res) => {
            console.log("上传成功", res, that.fileList1);
            let { data } = JSON.parse(res.data);
            resolve(data);
          },
        });
      });
    },

    // TODO日历
    confirm(data) {
      let start = new Date(`${data[0]} 00:00:00`).getTime();
      let end = new Date(`${data[data.length - 1]} 23:59:59`).getTime();
      this.formInfoData.activity_time = [start, end];
      console.log(this.formInfoData.activity_time);
    },
    close() {
      this.showCalendar = false;
    },

    //时间选择器
    changeStartDate({ value, mode }) {
      if (mode === "time") {
        // 时间
        this.formInfoData.hold_time = `${value}:00`;
      } else {
        // 日期
        this.formInfoData.hold_date = value;
      }
    },
    cancelStartDate() {
      this.showDate = false;
    },
    holdTimeShow() {
      this.showDate = true;
      this.pickerMode = "time";
    },
    holdDateShow() {
      this.showDate = true;
      this.pickerMode = "date";
    },
    // 建议人数
    valChange(e) {
      console.log(e);
    },
    // 获取地址按钮点击
    async getAddressBtn() {
      console.log("1");
      if (this.formInfoData.activity_location.address) {
        console.log("2");
        uni.showModal({
          title: "提示",
          content: "是否重新选择地址，重新选择地址将会覆盖之前的地址",
          success: (res) => {
            if (res.confirm) {
              uni.chooseLocation({
                success: (e) => {
                  console.log("信息", e);
                  this.formInfoData.activity_location = {
                    address: e.address + e.name,
                    point: {
                      lat: e.latitude,
                      lng: e.longitude,
                    },
                  };
                },
              });
            }
          },
        });
      } else {
        console.log("3");
        uni.chooseLocation({
          success: (e) => {
            console.log("信息", e);
            this.formInfoData.activity_location = {
              address: e.address + e.name,
              point: {
                lat: e.latitude,
                lng: e.longitude,
              },
            };
          },
        });
      }
    },
    // 底部tabber切换按钮
    handleClick(name) {
      this.tabbarList.forEach((item) => {
        if (item.name === name) {
          item.isActive = true;
          uni.redirectTo({
            url: item.pageUrl,
          });
        } else {
          item.isActive = false;
        }
      });
      this.value6 = name;
    },
  },
  onReady() {
    //onReady 为uni-app支持的生命周期之一
    this.$refs.activeForm.setRules(this.rules);
  },
  onLoad() {
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    // console.log("发布页面", eventChannel);
    // 监听其他页面传递过来的数据;
    if (eventChannel.on) {
      eventChannel?.on("releaseActivityEdit", function ({ data }) {
        // console.log("活动信息", data);
        that.baseListType = that.baseListType.map((item) => {
          if (data.people_num === item.title) {
            item.isActive = true;
          } else {
            item.isActive = false;
          }

          return item;
        });
        data = {
          ...data,
          activity_log: [
            {
              ...data.activity_log,
              url: that.$helper.filterCover(data.activity_log?.url) || "",
            },
          ],
        };
        if (data.activity_log) {
          that.fileList1 = data.activity_log[0].url ? data.activity_log : [];
        }
        that.formInfoData = data;
      });
    }

    // 刷新数据
  },
};
</script>

<style lang="scss" scoped>
.say-some {
  position: relative;
  padding: 40rpx;
  padding-bottom: 100rpx;
  background-color: #fff;

  #auth-one {
    margin-bottom: 30rpx;

    .title {
      font-size: 30rpx;
      // font-weight: bold;
      margin-bottom: 20rpx;
    }
  }

  #auth-two {
    margin-bottom: 30rpx;

    .title {
      font-size: 30rpx;
      // font-weight: bold;
      margin-bottom: 20rpx;
    }
  }

  #auth-three {
    margin-bottom: 30rpx;

    .title {
      font-size: 30rpx;
      // font-weight: bold;
      margin-bottom: 20rpx;
    }
  }

  #auth-four {
    margin-bottom: 30rpx;

    .title {
      font-size: 30rpx;
      // font-weight: bold;
      margin-bottom: 20rpx;
    }
  }

  #auth-five {
    margin-bottom: 30rpx;

    .title {
      font-size: 30rpx;
      // font-weight: bold;
      margin-bottom: 20rpx;
    }
  }

  .active-one {
    margin-bottom: 30rpx;

    .title {
      font-size: 30rpx;
      // font-weight: bold;
      margin-bottom: 20rpx;
    }
  }

  // .form-footer {
  //   height: 100rpx;
  //   color: #fff;
  //   font-size: 30rpx;
  //   line-height: 80rpx;
  //   text-align: center;
  //   background-color: #00a0e9;
  //   z-index: 999;

  //   &:active {
  //     color: #666;
  //     // opacity: 0.5;
  //   }
  // }
}

.btn-item {
  width: 200rpx;
  height: 80rpx;
  border-radius: 20rpx;
  line-height: 80rpx;
  background-color: #eee;
  // background-color: #e5f5f7;
  // border: 1px solid greenyellow;
  text-align: center;
  margin: 20rpx;
}
.qu-btn {
  // position: absolute;
  // bottom: 0;
  width: 90%;
  margin: 100rpx auto;
  margin-bottom: constant(safe-area-inset-bottom) !important;
  margin-bottom: env(safe-area-inset-bottom) !important;

  &:active {
    transform: scale(0.98);
  }
}

.active-btn {
  background-color: #e5f5f7;
  color: #00a0e9;
  border: 1px solid #00a0e9;
}

.home-number {
  width: 100%;
  height: 80rpx;
  border-radius: 20rpx;
  line-height: 80rpx;
  text-align: center;
  color: #fff;
  background: linear-gradient(45deg, #5fddcc, #ff004d);
  animation: hueRotate 5s infinite alternate;
  margin: 20rpx;
}
</style>
