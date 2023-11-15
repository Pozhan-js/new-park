<template>
  <view class="add-record">
    <!-- <u-navbar :title="currentTitle" :placeholder="true" :autoBack="true"> -->
    <u-navbar title="新增账单" :placeholder="true" :autoBack="true"> </u-navbar>
    <view class="add-record-icon">
      <u-grid :border="false">
        <u-grid-item
          v-for="(baseListItem, baseListIndex) in Object.keys(icon)"
          :key="baseListIndex"
          @click="handleClickIcon(baseListItem)"
        >
          <u-icon
            :customStyle="{ paddingTop: 20 + 'rpx' }"
            :name="icon[baseListItem]"
            :size="30"
          ></u-icon>
          <text class="grid-text">{{ baseListItem }}</text>
        </u-grid-item>
      </u-grid>
    </view>
    <!-- 底部弹出层 -->
    <!-- :overlay="false" -->
    <u-popup
      :show="dialogIsShow"
      mode="bottom"
      @close="close"
      @confirm="handleConfirm"
    >
      <view class="dialogBottom">
        <!-- d弹出层设置上传照片 -->
        <view class="dialogBottom-image">
          <view class="image-title">票据上传</view>
          <u-upload
            :fileList="fileList1"
            @afterRead="afterRead"
            @delete="deletePic"
            name="1"
            multiple
          ></u-upload>
        </view>

        <!-- 弹出层输入框 -->
        <view class="dialogBottom-input">
          <view class="dialogBottom-input-header">
            <view class="title">金额</view>
            <view class="header-input flex-a-center">
              <u--input
                placeholder="请输入金额"
                type="digit"
                border="none"
                v-model="formData.money"
              />
              <u-icon name="arrow-right" size="20"></u-icon>
            </view>
          </view>
          <view class="dialogBottom-input-header">
            <view class="title">消费对象</view>
            <view class="header-input flex-a-center">
              <u--input
                placeholder="请输入消费对象"
                border="none"
                v-model="formData.consumption_info"
              ></u--input>
              <u-icon name="arrow-right" size="20"></u-icon>
            </view>
          </view>
          <view class="dialogBottom-input-header">
            <view class="title">消费内容</view>
            <view class="header-input flex-a-center">
              <u--input
                placeholder="请输入消费内容"
                border="none"
                v-model="formData.consumption_content"
              ></u--input>
              <u-icon name="arrow-right" size="20"></u-icon>
            </view>
          </view>

          <!-- 支付方式 -->
          <view class="dialogBottom-input-type">
            <view class="type-title">选择支付方式:</view>
            <view class="type-container flex-a-center">
              <view
                class="type-item"
                :class="formData.pay_type === input ? 'active' : ''"
                @click="handleClickType(input)"
                v-for="input in inputTypeList"
                :key="input"
                >{{ input }}</view
              >
            </view>
          </view>

          <view class="dialogBottom-input-type">
            <view class="type-title">是否为支出:</view>
            <view class="type-container flex-a-center">
              <view
                class="type-item"
                :class="formData.is_income === item ? 'active' : ''"
                @click="handleClickTitle(item)"
                v-for="(item, _) in isIncomeList"
                :key="_"
                >{{ item }}</view
              >
            </view>
          </view>

          <!-- 备注 -->
          <view class="dialogBottom-input-remark">
            <text>描述 ：</text>
            <view class="remark-input">
              <u--input
                placeholder="请输入内容"
                border="none"
                v-model="formData.consumption_descripte"
              ></u--input>
            </view>
          </view>
        </view>

        <view class="dialogBottom-button">
          <u-button
            type="primary"
            :loading="btnLoading"
            loadingText="加载中"
            @click="submitClick"
            >提交</u-button
          >
        </view>
      </view>
    </u-popup>
  </view>
</template>

<script>
import config from "@/common/config";
import { message } from "@/common/function";
import Storage from "@/common/function/storage";
import { UpdateFilePath } from "@/api/file";
import { createModel, getModelInfo, updateModel } from "@/api";
export default {
  data() {
    return {
      icon: {},
      currentTitle: "",
      dialogIsShow: false,
      fileList1: [],
      value: "",
      // 当前支付类型
      btnLoading: false,
      inputTypeList: ["现金", "微信", "支付宝", "银行卡"],
      isIncomeList: ["支出", "收入"],
      // typeList: ["购物", "交通", "餐饮", "通信", "娱乐"],
      // 是否为编辑
      editId: "",
      show: false,
      title: "标题",
      formData: {
        is_income: "",
        consumption_type: "",
        consumption_content: "",
        consumption_info: "",
        money: 0,
        pay_type: "",
        consumption_descripte: "",
        bill: [],
      },
    };
  },
  methods: {
    handleClickIcon(item) {
      this.formData.consumption_type = item;
      this.dialogIsShow = true;
    },

    close() {
      this.formData = {
        is_income: "",
        consumption_type: "",
        consumption_content: "",
        consumption_info: "",
        money: "",
        pay_type: "",
        consumption_descripte: "",
        bill: [],
      };

      this.dialogIsShow = false;
    },

    handleClickType(data) {
      this.formData.pay_type = data;
    },
    handleClickTitle(data) {
      this.formData.is_income = data;
    },
    handleClickBranch(data) {
      this.formData.consumption_type = data;
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

    // 输入框函数
    inputValue(e) {
      const { value } = e.detail;
      this.formData.money = +String(value).replace(/[^\d\.]/g, "");
    },

    async submitClick() {
      return console.log("this.formData.money", this.formData.money);
      try {
        this.btnLoading = true;
        if (!this.editId) {
          // 添加账单
          const result = await createModel(
            "64ec4d02d85a4b7b32ec6019",
            this.formData
          );

          if (result.code == 200) {
            message("添加成功");
          }
        } else {
          const result = await updateModel(
            "64ec4d02d85a4b7b32ec6019",
            this.formData,
            this.formData._id
          );

          if (result.code == 200) {
            message("修改成功");
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.btnLoading = false;
        this.dialogIsShow = false;

        this.formData = {
          is_income: "",
          consumption_type: "",
          consumption_content: "",
          consumption_info: "",
          money: "",
          pay_type: "",
          consumption_descripte: "",
          bill: [],
        };

        this.fileList1 = [];
      }
    },
  },
  watch: {
    fileList1: {
      handler(val) {
        // console.log(val);
        if (typeof val[0]?.url === "object") {
          this.formData.bill = val.map((item) => item.url);
        } else {
          this.formData.bill = val;
        }
      },
      deep: true,
    },
  },
  onShow() {
    this.icon = getApp().globalData.icon;
  },
  async onLoad(option) {
    this.currentTitle = option.title;
    this.editId = option.id;
    if (option.id) {
      try {
        const result = await getModelInfo(
          "64ec4d02d85a4b7b32ec6019",
          option.id
        );
        if (result.code === 200) {
          this.dialogIsShow = true;

          this.formData = result?.data;
          this.fileList1 = [
            {
              ...result?.data.bill[0],
              url: this.$helper.filterCover(result?.data.bill[0].url) || "",
            },
          ];
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.add-record {
  width: 100vw;

  &-icon {
    width: 100%;
    padding: 50rpx 0;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;

    &-item {
      display: flex;
      justify-content: center;
      width: 100rpx;
      height: 100rpx;
      flex-wrap: wrap;

      & > image {
        width: 100%;
        height: 100%;
      }

      .item-text {
        width: 100%;
        height: 40rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #666666;
        line-height: 40rpx;
        text-align: center;
      }
    }
  }
}

.dialogBottom {
  width: 100vw;
  height: 80vh;
  background-color: #fff;
  border-radius: 40rpx 40rpx 0 0;
  box-shadow: 0rpx -6rpx 20rpx 1rpx rgba(220, 221, 226, 0.65);
  box-sizing: border-box;
  padding: 20rpx;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;

  &-image {
    padding: 20rpx 0;
    border-bottom: 1px solid #eee;

    .image-title {
      margin-bottom: 16rpx;
      height: 45rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: #333333;
      line-height: 45rpx;
    }
  }

  &-input {
    padding: 20rpx 0;
    border-bottom: 1px solid #eee;

    &-header {
      display: flex;
      justify-content: space-between;

      .title {
        margin-bottom: 16rpx;
        height: 45rpx;
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        line-height: 45rpx;
      }

      // .header-input {
      //   width: 200rpx;
      // }
    }

    &-type {
      padding-bottom: 30rpx;

      .type-title {
        margin-bottom: 16rpx;
        height: 45rpx;
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        line-height: 45rpx;
      }

      .type-container {
        flex-wrap: wrap;
      }

      .type-item {
        padding: 0 30rpx;
        height: 60rpx;
        line-height: 60rpx;
        text-align: center;
        font-size: 26rpx;
        color: #6d6d6d;
        border-radius: 34rpx;
        opacity: 1;
        margin-right: 30rpx;
        margin-bottom: 20rpx;
        border: 1rpx solid #b1b1b1;
      }
    }

    &-remark {
      font-size: 22rpx;
      font-weight: 400;
      color: #b1b1b1;

      text {
        margin-bottom: 16rpx;
        height: 45rpx;
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
        line-height: 45rpx;
      }
    }
  }
}

// 模态框
.dialog-content {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  &-image {
    width: 100%;
    text-align: center;
  }
}

.active {
  // color: #ffffff;
  background: #6377f5;
  color: #ffffff !important;
}

.grid-text {
  font-size: 14px;
  color: #909399;
  padding: 10rpx 0 20rpx 0rpx;
  /* #ifndef APP-PLUS */
  box-sizing: border-box;
  /* #endif */
}
</style>
