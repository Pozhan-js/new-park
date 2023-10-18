<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-14 10:13:59
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-18 15:20:11
 * @FilePath: /smart-park/subPages/main/say-some/say-some copy.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="say-some">
    <u-navbar
      title="随手拍"
      :autoBack="true"
      :placeholder="true"
      bgColor="#6377F5"
      leftIconColor="#fff"
      titleStyle="color:#fff"
    >
    </u-navbar>
    <view class="some-container">
      <view class="header flex-a-center-j-space-around">
        <view class="header-left">
          <view style="font-size: 40rpx">小区的安全和谐 </view>
          <text decode>{{ myText }}</text>
        </view>
        <view class="header-right">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230919_7b95de229c804b879aeb2e8bf90cb647.png"
            mode=""
          />
        </view>
      </view>
      <view class="body">
        <view class="body-item">
          <view class="body-item-title">隐患位置</view>
          <view class="input flex-a-center-j-space-between"
            ><u--input
              placeholder="请输入内容"
              border="none"
              v-model="model1.userInfo.address"
            ></u--input>
            <u-icon name="arrow-right"></u-icon>
          </view>
          <view class="body-item-btn flex-a-center-j-space-between">
            <view class="text" style="font-size: 32rpx"
              >无法准备描述所在地？请点这</view
            >
            <image
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230919_9fe54eb335a646329cf7042abc1c6596.png"
              mode=""
            />
            <view class="btn">
              <u-button
                type="primary"
                text="自动获取位置"
                :plain="true"
                @click="getAddressBtn"
                icon="map"
                size="small"
                shape="circle"
              ></u-button>
            </view>
          </view>
          <view
            v-if="model1.userInfo.blurAddress"
            class="input flex-a-center-j-space-between"
            ><u--input
              placeholder="请输入内容"
              border="none"
              v-model="model1.userInfo.blurAddress"
            ></u--input>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </view>
        <view class="body-item">
          <view class="body-item-title">隐患类型</view>
          <u-grid :border="false" col="4">
            <u-grid-item
              v-for="(error, index) in errorList"
              @click="clickQuestionType(error, errorList)"
              :key="index"
            >
              <view
                class="error-item"
                :class="error.isActive ? 'active-btn' : ''"
                >{{ error.title }}</view
              >
            </u-grid-item>
          </u-grid>
        </view>
        <view class="body-item">
          <view class="body-item-title">详情描述</view>
          <u--textarea
            placeholder="请输入内容"
            v-model="model1.userInfo.description"
            border="none"
          ></u--textarea>
        </view>
        <view class="body-item">
          <view class="body-item-title">现场照片</view>
          <u-upload
            :fileList="fileList1"
            @afterRead="afterRead"
            @delete="deletePic"
            name="1"
            multiple
            :maxCount="4"
          ></u-upload>
        </view>

        <view class="body-item">
          <view class="body-item-title">是否匿名</view>
          <u-grid :border="false" col="2">
            <u-grid-item
              v-for="(data, index) in showNameList"
              @click="clickIsShowName(data, showNameList)"
              :key="index"
            >
              <view
                class="error-item"
                :class="data.isActive ? 'active-btn' : ''"
                >{{ data.title }}</view
              >
            </u-grid-item>
          </u-grid>
        </view>

        <view class="body-item flex-a-center-j-space-between">
          <view class="body-item-title">联系人</view>
          <u--input
            v-if="!model1.userInfo.showName"
            placeholder="请输入内容"
            v-model="model1.userInfo.roomNum"
            border="none"
          ></u--input>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
    </view>

    <u-button
      :loading="loading"
      type="primary"
      text="提交"
      @click="submit"
    ></u-button>
  </view>
</template>

<script>
import config from "@/common/config";
import { createModel, getModelList, getModelInfo } from "@/api";
import infoMixin from "@/common/mixins/info";
import { UpdateFilePath } from "@/api/file";
import { getRequestFilter, sleep } from "@/common/function";
import QQMapWX from "../../../common/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js";
import Storage from "@/common/function/storage";
export default {
  mixins: [infoMixin],
  data() {
    return {
      myText: "&nbsp;&nbsp;&nbsp;&nbsp;大家一起努力",
      typeList: [],
      errorList: [],
      model1: {
        userInfo: {
          image: [], //图片
          questionType: "", //问题类型
          showName: true, //匿名
          roomNum: "", //房号
          description: "", //描述
          address: "", //地址
          blurAddress: "",
          problemStatus: "待处理",
        },
      },
      fileList1: [],
      showNameList: [
        {
          title: "是",
          isActive: true,
        },
        {
          title: "否",
          isActive: false,
        },
      ], //是否匿名
      inputAddress: "", //输入框中的地址
      roomData: {},
      position: "", //详细地址
      loading: false,
    };
  },
  methods: {
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
    // 上传图片
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
            setTimeout(() => {
              console.log("上传成功", res, that.fileList1);
              let { data } = JSON.parse(res.data);
              resolve(data);
            }, 1000);
          },
        });
      });
    },
    // 选择问题类型
    clickQuestionType(data, list) {
      list = list.map((item) => {
        item.isActive = false;
        return item;
      });
      data.isActive = true;
      this.model1.userInfo.questionType = data.title;
    },
    // 是否匿名
    clickIsShowName(data, list) {
      list = list.map((item) => {
        item.isActive = false;
        return item;
      });
      data.isActive = true;

      this.model1.userInfo.showName = data.title === "是" ? true : false;
    },
    // 弹窗
    open() {
      this.showModel = true;
      // console.log('open');
    },

    close() {
      this.showModel = false;
      uni.navigateBack({
        delta: 1,
      });
    },

    // 获取地址按钮点击
    async getAddressBtn() {
      if (this.model1.userInfo.blurAddress) {
        uni.showModal({
          title: "提示",
          content: "是否重新选择地址，重新选择地址将会覆盖之前的地址",
          success: (res) => {
            if (res.confirm) {
              uni.chooseLocation({
                success: (e) => {
                  console.log("信息", e);
                  this.model1.userInfo.blurAddress = e.address + e.name;
                },
              });
            }
          },
        });
      } else {
        uni.chooseLocation({
          success: (e) => {
            console.log("信息", e);
            this.model1.userInfo.blurAddress = e.address + e.name;
          },
        });
      }
    },

    // 获取房号
    async getRoomNumber() {
      // 获取审批用户信息
      let filterData = getRequestFilter({
        formUser: this.userInfo.id,
      });

      const { data } = await getModelList(
        "64f6d064d85a4b7b32ec641d",
        filterData
      );
      // 获取问题类型数据
      let filterTypeData = getRequestFilter({
        key: "问题类型",
      });

      const result = await getModelList(
        "65250f6f388a8c7a0eb9b934",
        filterTypeData
      );

      this.typeList = result.data?.list[0].value;
      this.roomData = data?.list[0];
    },
    // 提交按钮
    async submit() {
      if (!this.model1.userInfo.address && !this.model1.userInfo.questionType)
        return;
      let that = this;

      this.loading = true;
      that.model1.userInfo.userIcon = this.userInfo.headIcon;
      try {
        await createModel(
          "64d1dcab8b140b0b56b6ed90",
          that.model1.userInfo
        ).then((res) => {
          this.fileList1 = [];
          this.model1.userInfo = {
            image: [], //图片
            questionType: "", //问题类型
            showName: true, //匿名
            roomNum: this.model1.userInfo.roomNum || "", //房号
            description: "", //描述
            address: "",
            blurAddress: "",
            // userIcon: this.userInfo.headIcon,
          };
          (this.errorList = [
            {
              title: "故障上报",
              isActive: false,
            },
            {
              title: "环境卫生",
              isActive: false,
            },
            {
              title: "电梯故障",
              isActive: false,
            },
            {
              title: "安全隐患",
              isActive: false,
            },
            {
              title: "其他事项",
              isActive: false,
            },
          ]),
            (that.showModel = true);
        });

        sleep(() => {
          uni.showToast({
            title: "提交成功",
            icon: "success",
          });
        }, 600);
      } catch (error) {
        // console.log(error);
        uni.showToast({
          title: "提交失败",
          icon: "error",
        });
      } finally {
        this.loading = false;
      }
    },
  },

  watch: {
    fileList1: {
      handler(val) {
        this.model1.userInfo.image = val.map((item) => item.url);
      },
      deep: true,
    },

    roomData: {
      handler(data) {
        this.model1.userInfo.roomNum = data?.roomName || "";
      },
      deep: true,
      immediate: true, // 立即执行一次
    },

    typeList: {
      handler(val) {
        this.errorList = val.map((item) => {
          return {
            title: item,
            isActive: false,
          };
        });
      },
      deep: true,
      immediate: true, // 立即执行一次
    },
  },

  async onLoad() {
    this.getRoomNumber();
  },
};
</script>

<style lang="scss">
.say-some {
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;

  .some-container {
    width: 100%;
    background: #f8f9fd;

    .header {
      width: 100%;
      height: 260rpx;
      background-color: #6377f5;

      &-left {
        font-size: 40rpx;
        font-weight: 800;
        color: #fffefe;
      }

      &-right {
        & > image {
          width: 180rpx;
          height: 180rpx;
        }
      }
    }

    .body {
      width: 100%;
      box-sizing: border-box;
      padding: 20rpx;

      &-item {
        width: 100%;
        background: #ffffff;
        box-sizing: border-box;
        padding: 20rpx;
        border-radius: 10rpx;
        margin-bottom: 20rpx;

        &-title {
          // width: 200rpx;
          font-size: 28rpx;
          line-height: 100%;
          height: 100%;
          color: #333333;
          margin-bottom: 12rpx;
          margin-right: 20rpx;
        }

        .input {
          margin-bottom: 12rpx;
        }

        &-btn {
          .text {
            font-size: 20rpx;
            color: #6377f5;
          }

          .btn {
            width: 200rpx;
          }

          > image {
            width: 44rpx;
            height: 20rpx;
          }
        }

        .error-item {
          min-width: 148rpx;
          height: 64rpx;
          margin-bottom: 16rpx;
          border-radius: 32rpx;
          border: 1rpx solid #6377f5;
          line-height: 64rpx;
          text-align: center;
          color: #666666;
        }
      }
    }
  }
}

.active-btn {
  background: rgba(99, 119, 245, 0.3);
  color: #6377f5 !important;
  border: 1rpx solid #6377f5;
}
</style>
