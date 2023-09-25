<template>
  <view class="say-some box">
    <u-navbar bgColor="transparent" :placeholder="true">
      <view slot="left"> </view>
    </u-navbar>

    <!-- ========================== -->
    <view class="active-one">
      <view class="title">活动名称</view>
      <u--input
        border="surround"
        v-model="formInfoData.activity_title"
      ></u--input>
    </view>

    <view class="active-one">
      <view class="title">活动内容</view>
      <!--  v-if="!regex.test(formInfoData.activity_content)" -->
      <u--textarea
        v-model="formInfoData.activity_content"
        :cursorSpacing="40"
        :showConfirmBar="false"
        placeholder="请输入内容"
      ></u--textarea>
      <!-- <u-parse v-else :content="formInfoData.activity_content"></u-parse> -->
    </view>

    <!-- 时间选择 -->
    <view id="auth-four" @click="handleClickType('start')">
      <view class="flex-a-center-j-space-between">
        <view class="title">活动开始时间</view>
        <u-icon name="arrow-right" size="12"></u-icon>
      </view>
      <view v-show="formInfoData.activity_time[0]">{{
        $u.timeFormat(formInfoData.activity_time[0])
      }}</view>
    </view>

    <view id="auth-four" @click="handleClickType('end')">
      <view class="flex-a-center-j-space-between">
        <view class="title">活动结束时间</view>
        <u-icon name="arrow-right" size="12"></u-icon>
      </view>
      <view v-show="formInfoData.activity_time[1]">{{
        $u.timeFormat(formInfoData.activity_time[1])
      }}</view>
    </view>

    <view class="active-one">
      <view class="title">活动图示</view>
      <u-upload
        :fileList="fileList1"
        @afterRead="afterRead"
        @delete="deletePic"
        name="1"
        multiple
        :maxCount="1"
      ></u-upload>
    </view>

    <view id="auth-three">
      <view class="title">建议人数</view>
      <view class="btn">
        <u-grid :border="false" col="3">
          <u-grid-item
            v-for="(baseListItem, baseListIndex) in baseListType"
            @click="clickQuestionType(baseListItem, baseListType)"
            :key="baseListIndex"
          >
            <view
              class="btn-item"
              :class="baseListItem.isActive ? 'active-btn' : ''"
              >{{ baseListItem.title }}人</view
            >
          </u-grid-item>
        </u-grid>
      </view>
    </view>

    <view id="auth-five">
      <view class="title">活动地点</view>
      <u--input
        border="surround"
        v-model="formInfoData.activity_location.address"
      ></u--input>
    </view>
    <view id="auth-five">
      <view class="title">活动价格</view>
      <u--input
        border="surround"
        type="number"
        v-model="formInfoData.price"
      ></u--input>
    </view>
    <!-- <view id="auth-five">
      <view class="title">联系电话</view>
      <u--input
        border="surround"
        type="number"
        v-model="formInfoData.phone_number"
      ></u--input>
    </view> -->

    <view class="form-footer" @click="clickForm">提交表单</view>
    <u-toast ref="uToast" />
    <u-datetime-picker
      :show="showDate.includes(showPicker)"
      @confirm="changeStartDate"
      @cancel="cancelStartDate"
      mode="date"
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
        price: "",
        people_num: "",
        activity_time: [],
        activity_location: { address: "" },
        activity_content: "",
        activity_log: [],
        is_template: 0,
      },
      // 显示时间选择器
      showDate: ["start", "end"],
      showPicker: "",
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
  methods: {
    // 提交表单
    async clickForm() {
      // 判断用户是否填写表单
      let validate = Object.values(this.formInfoData).map((item) => {
        if (typeof item === "string") {
          return item;
        } else if (Array.isArray(item)) {
          if (item.length === 0) {
            return "";
          }
        } else {
          if (Object.keys(item).length === 0 || item.address === "") {
            return "";
          }
        }
      });

      let isEmpty = validate.every((item) => {
        return item === "";
      });

      if (!this.formInfoData._id) {
        this.loading = true;
        if (!isEmpty) {
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
            this.$refs.uToast.success(error.msg);
          } finally {
            this.loading = false;
          }
        } else {
          this.loading = false;
          this.$refs.uToast.success(`请按规范发表活动`);
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
          this.$refs.uToast.success(error.msg);
        } finally {
          this.loading = false;
        }
      }
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
    // 点击显示时间选择器
    handleClickType(type) {
      this.showPicker = type;
    },
    changeStartDate(e) {
      // console.log(value);
      if (this.showPicker === "start") {
        this.formInfoData.activity_time[0] = e.value;
      } else {
        this.formInfoData.activity_time[1] = e.value;
      }
      this.showPicker = "";
    },
    cancelStartDate() {
      this.showPicker = "";
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
  onShow() {},
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
      font-weight: bold;
      margin-bottom: 20rpx;
    }
  }

  #auth-two {
    margin-bottom: 30rpx;

    .title {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
  }

  #auth-three {
    margin-bottom: 30rpx;

    .title {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
  }

  #auth-four {
    margin-bottom: 30rpx;

    .title {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
  }

  #auth-five {
    margin-bottom: 30rpx;

    .title {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
  }

  .active-one {
    margin-bottom: 30rpx;

    .title {
      font-size: 30rpx;
      font-weight: bold;
      margin-bottom: 20rpx;
    }
  }

  .form-footer {
    height: 100rpx;
    color: #fff;
    font-size: 30rpx;
    line-height: 80rpx;
    text-align: center;
    background-color: #00a0e9;
    z-index: 999;

    &:active {
      color: #666;
      // opacity: 0.5;
    }
  }
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