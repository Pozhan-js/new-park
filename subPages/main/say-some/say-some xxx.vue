<template>
  <view class="say-some padding-20">
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u--form
      labelPosition="left"
      labelWidth="40"
      :model="model1"
      :rules="rules"
      ref="uForm"
    >
      <u-form-item prop="userInfo.image" borderBottom ref="item1">
        <view class="title" style="margin-bottom: 16rpx">上传图片</view>
        <view class="item-container flex-a-center-j-center">
          <view class="item-container-upload">
            <u-upload
              :fileList="fileList1"
              @afterRead="afterRead"
              @delete="deletePic"
              name="1"
              multiple
              :maxCount="4"
            ></u-upload>
          </view>
        </view>
      </u-form-item>

      <u-form-item label="地址" prop="userInfo.address" borderBottom>
        <!-- <view class="title">地址</view> -->
        <view class="address">
          <u-input
            border="none"
            placeholder="请输入内容"
            v-model="inputAddress"
          />
        </view>
      </u-form-item>

      <u-form-item prop="userInfo.questionType" borderBottom>
        <view id="auth-three">
          <view class="title">反馈问题类型</view>
          <view class="btn">
            <u-grid :border="false" col="2">
              <u-grid-item
                v-for="(baseListItem, baseListIndex) in actions"
                @click="clickQuestionType(baseListItem, actions)"
                :key="baseListIndex"
              >
                <view
                  class="btn-item"
                  :class="baseListItem.isActive ? 'active-btn' : ''"
                  >{{ baseListItem.title }}</view
                >
              </u-grid-item>
            </u-grid>
          </view>
        </view>
      </u-form-item>

      <!-- 是否匿名 -->
      <u-form-item label="匿名" prop="userInfo.showName" borderBottom>
        <view id="auth-four">
          <view class="btn">
            <u-grid :border="false" col="2">
              <u-grid-item
                v-for="(baseListItem, baseListIndex) in showName"
                :key="baseListIndex"
              >
                <view
                  class="btn-item"
                  @click="clickIsShowName(baseListItem, showName)"
                  :class="baseListItem.isActive ? 'active-btn' : ''"
                  >{{ baseListItem.title }}</view
                >
                <!-- <text class="grid-text">长沙</text> -->
              </u-grid-item>
            </u-grid>
          </view>
        </view>
      </u-form-item>

      <!-- 房号 -->
      <u-form-item label="房号" prop="userInfo.roomNum" borderBottom>
        <u-input
          border="none"
          placeholder="请输入房号"
          v-model="model1.userInfo.roomNum"
        />
      </u-form-item>

      <!-- 描述 -->
      <u-form-item label="描述" borderBottom labelPosition>
        <u--textarea
          v-model="model1.userInfo.description"
          placeholder="请输入内容"
        ></u--textarea>
      </u-form-item>
    </u--form>
    <u-button @click="submit" type="primary">提交</u-button>

    <u-popup
      :show="showModel"
      mode="center"
      @close="close"
      :closeable="true"
      @open="open"
    >
      <view class="popup">
        <view class="popup-top"></view>
        <view class="popup-image">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230814_43ec64da1f95414a982ba63686d448b0.png"
            mode=""
          />
          <view class="popup-image-title">提交成功</view>
          <view class="popup-image-text">感谢您的反馈，小区有你更精彩</view>
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import config from "@/common/config";
import { createModel, getModelList, getModelInfo } from "@/api";
import infoMixin from "@/common/mixins/info";
import { UpdateFilePath } from "@/api/file";
import { getRequestFilter } from "@/common/function";
import QQMapWX from "../../../common/qqmap-wx-jssdk1.2/qqmap-wx-jssdk.js";
import Storage from "@/common/function/storage";
export default {
  mixins: [infoMixin],
  data() {
    return {
      model1: {
        userInfo: {
          image: [], //图片
          questionType: "", //问题类型
          showName: true, //匿名
          roomNum: "", //房号
          description: "", //描述
          address: "", //地址
        },
      },
      showModel: false,
      fileList1: [], //上传图片数组
      actions: [
        {
          title: "家庭问题",
          isActive: true,
        },
        {
          title: "社区问题",
          isActive: false,
        },
        {
          title: "活动问题",
          isActive: false,
        },
        {
          title: "其他问题",
          isActive: false,
        },
      ], //问题类型数据
      showName: [
        {
          title: "是",
          isActive: true,
        },
        {
          title: "否",
          isActive: false,
        },
      ], //是否匿名
      rules: {
        "userInfo.image": {
          type: "array",
          min: 1,
          max: 4,
          required: true,
          message: "请上传图片",
          trigger: ["change"],
        },
        "userInfo.questionType": {
          type: "string",
          required: true,
          message: "请选择问题类型",
          trigger: ["change"],
        },
        "userInfo.roomNum": {
          type: "string",
          required: true,
          message: "请输入房号",
          trigger: ["blur", "change"],
        },
        "userInfo.address": {
          type: "string",
          required: true,
          message: "请输入地址",
          trigger: ["blur", "change"],
        },
      }, //校验规则
      position: "", //详细地址
      inputAddress: "", //输入框中的地址
      roomData: {},
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
    // 提交按钮
    submit() {
      let that = this;
      this.$refs.uForm
        .validate()
        .then((res) => {
          createModel("64d1dcab8b140b0b56b6ed90", that.model1.userInfo).then(
            (res) => {
              this.fileList1 = [];
              this.model1.userInfo = {
                image: [], //图片
                questionType: "", //问题类型
                showName: true, //匿名
                roomNum: "", //房号
                description: "", //描述
                address: "",
              };
              that.showModel = true;
            }
          );
        })
        .catch((errors) => {
          uni.$u.toast("校验失败");
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
      this.model1.userInfo.showName = !this.model1.userInfo.showName;
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
    //获取位置信息
    async getLocationInfo() {
      return new Promise((resolve) => {
        //位置信息默认数据
        let location = {
          longitude: 0,
          latitude: 0,
          province: "",
          city: "",
          area: "",
          street: "",
          address: "",
        };
        uni.getLocation({
          type: "gcj02",
          success(res) {
            location.longitude = res.longitude;
            location.latitude = res.latitude;
            // 腾讯地图Api
            const qqmapsdk = new QQMapWX({
              key: "7O2BZ-FHICB-V2CU6-NPPUT-DCXP3-6RFRS", //这里填写自己申请的key
            });
            qqmapsdk.reverseGeocoder({
              location,
              success(response) {
                let info = response.result;
                console.log(info);
                location.province = info.address_component.province;
                location.city = info.address_component.city;
                location.area = info.address_component.district;
                location.street = info.address_component.street;
                location.address = info.address;
                resolve(location);
              },
            });
          },
          fail(err) {
            console.log(err);
            resolve(location);
          },
        });
      });
    },
    // 获取房号
    async getRoomNumber() {
      let filterData = getRequestFilter({
        phone: this.userInfo.account,
      });
      const { data } = await getModelList(
        "64f6d064d85a4b7b32ec641d",
        filterData
      );

      // console.log(data);
      let { roomId } = data?.list[0];

      console.log(roomId);
      this.roomData = await getModelInfo("64f6d11ed85a4b7b32ec641e", roomId);
    },
  },
  watch: {
    fileList1: {
      handler(val) {
        console.log(val);
        this.model1.userInfo.image = val.map((item) => item.url);
      },
      deep: true,
    },
    // 拼接地址
    inputAddress: {
      handler(val) {
        this.model1.userInfo.address = this.position + val;
      },
    },
    roomData: {
      handler({ data }) {
        this.model1.userInfo.roomNum =
          data?.buildingNumber + "/" + data?.roomNumber;
      },
      deep: true,
      immediate: true, // 立即执行一次
    },
  },
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.uForm.setRules(this.rules);
  },
  async onLoad() {
    // TODO获取地址
    // const location = await this.getLocationInfo();
    // this.position = location.address;

    this.getRoomNumber();
  },
};
</script>
<style lang="scss" scoped>
.say-some {
  width: 100vw;

  .popup {
    width: 568rpx;
    height: 540rpx;
    background: #ffffff;
    position: relative;

    &-top {
      width: 568rpx;
      height: 240rpx;
      background: #6377f5;
    }

    &-image {
      width: 568rpx;
      height: 300rpx;
      text-align: center;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      > image {
        width: 250rpx;
        height: 250rpx;
      }

      &-title {
        margin: 20rpx 0;
        font-size: 40rpx;
        color: #333333;
      }
      &-text {
        font-size: 26rpx;
        color: #999999;
      }
    }
  }
}

.btn-item {
  width: 200rpx;
  height: 80rpx;
  border-radius: 20rpx;
  line-height: 80rpx;
  background-color: #eee;
  text-align: center;
  margin: 20rpx;
}

.active-btn {
  background-color: #e5f5f7;
  color: #00a0e9;
  border: 1px solid #00a0e9;
}

.item-container {
  width: 100%;

  &-upload {
    margin: 0 auto;
  }
}
</style>
