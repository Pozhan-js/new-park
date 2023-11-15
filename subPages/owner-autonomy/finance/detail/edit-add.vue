<template>
  <view class="add-record">
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
    <u-popup
      :show="dialogIsShow"
      mode="bottom"
      safeAreaInsetBottom
      @close="close"
      round="10"
      @confirm="handleConfirm"
    >
      <view class="dialogBottom">
        <view class="form-title">票据提交</view>
        <u--form
          labelPosition="left"
          labelWidth="80"
          :model="formData"
          :rules="rules"
          ref="editBillForm"
        >
          <u-form-item
            label="票据上传"
            labelPosition="top"
            prop="bill"
            borderBottom
            required
          >
            <u-upload
              :fileList="fileList1"
              @afterRead="afterRead"
              @delete="deletePic"
              :maxCount="2"
              name="1"
              multiple
            ></u-upload>
          </u-form-item>

          <u-form-item label="金额" prop="money" borderBottom required>
            <u--input
              v-model="formData.money"
              type="digit"
              border="none"
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>

          <u-form-item
            label="消费对象"
            prop="consumption_info"
            borderBottom
            required
          >
            <u--input
              v-model="formData.consumption_info"
              border="none"
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>

          <u-form-item
            label="消费内容"
            prop="consumption_content"
            borderBottom
            required
          >
            <u--textarea
              maxlength="150"
              :cursorSpacing="20"
              count
              v-model="formData.consumption_content"
              border="surround"
            ></u--textarea>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>

          <u-form-item
            label="消费描述"
            prop="consumption_description"
            borderBottom
          >
            <u--textarea
              maxlength="150"
              :cursorSpacing="40"
              count
              v-model="formData.consumption_description"
              border="surround"
            ></u--textarea>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item>

          <u-form-item label="支付方式" prop="pay_type" borderBottom required>
            <u-radio-group v-model="formData.pay_type" placement="row">
              <u-radio
                activeColor="#6377f5"
                v-for="(item, index) in inputTypeList"
                :key="index"
                shape="circle"
                :name="item.name"
                :label="item.name"
              ></u-radio>
            </u-radio-group>
          </u-form-item>

          <u-form-item
            label="是否为收入"
            prop="is_income"
            borderBottom
            required
          >
            <u-radio-group v-model="formData.is_income" placement="row">
              <u-radio
                activeColor="#6377f5"
                v-for="(item, index) in isIncomeList"
                :key="index"
                shape="circle"
                :name="item.name"
                :label="item.name"
              ></u-radio>
            </u-radio-group>
          </u-form-item>
        </u--form>

        <button
          class="circle-button qu-btn"
          :loading="btnLoading"
          @click="submitClick"
        >
          提交
        </button>
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
      // inputTypeList: ["现金", "微信", "支付宝", "银行卡"],
      inputTypeList: [
        {
          name: "现金",
        },
        {
          name: "微信",
        },
        {
          name: "支付宝",
        },
        {
          name: "银行卡",
        },
      ],
      isIncomeList: [
        {
          name: "支出",
        },
        {
          name: "收入",
        },
      ],
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
        consumption_description: "",
        bill: [],
      },

      // 最新
      rules: {
        bill: [
          {
            type: "array",
            max: 2,
            required: true,
            message: "最多上传两张",
            trigger: ["change"],
          },
        ],
        money: [
          {
            type: "number",
            required: true,
            message: "请输入金额",
            trigger: ["blur", "change"],
          },
        ],
        consumption_info: [
          {
            type: "string",
            required: true,
            message: "请输入消费对象",
            trigger: ["blur", "change"],
          },
        ],
        pay_type: [
          {
            type: "string",
            required: true,
            message: "请选择消费类型",
            trigger: ["change"],
          },
        ],
        is_income: [
          {
            type: "string",
            required: true,
            message: "请选择是收入还是支出",
            trigger: ["change"],
          },
        ],
        consumption_content: [
          {
            type: "string",
            required: true,
            message: "请输入消费内容",
            trigger: ["blur", "change"],
          },
        ],
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
      this.fileList1 = [];

      this.dialogIsShow = false;
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

    async submitClick() {
      this.formData.money = Number(this.formData.money);
      this.$refs.editBillForm
        .validate()
        .then(async (res) => {
          // uni.$u.toast("校验通过");
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
            this.fileList1 = [];

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

            this.$refs.editBillForm.resetFields();
          }
        })
        .catch((errors) => {
          uni.$u.toast("校验失败");
        });
      // return console.log("this.formData.money", this.formData.money);
    },
  },
  watch: {
    fileList1: {
      handler(val) {
        if (typeof val[0]?.url === "object") {
          this.formData.bill = val.map((item) => item.url);
        }
      },
      deep: true,
    },
  },
  onShow() {
    this.icon = getApp().globalData.icon;
  },
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.editBillForm.setRules(this.rules);
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
  overflow: scroll;
  border-radius: 40rpx 40rpx 0 0;
  box-shadow: 0rpx -6rpx 20rpx 1rpx rgba(220, 221, 226, 0.65);
  box-sizing: border-box;
  padding: 20rpx;
  // padding-bottom: constant(safe-area-inset-bottom) !important;
  // padding-bottom: env(safe-area-inset-bottom) !important;

  .form-title {
    font-size: 36rpx;
    text-align: center;
    color: #666;
    margin-bottom: 30rpx;
  }

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

.qu-btn {
  // position: absolute;
  // bottom: 0;
  width: 90%;
  margin: 50rpx auto;
  margin-bottom: constant(safe-area-inset-bottom) !important;
  margin-bottom: env(safe-area-inset-bottom) !important;

  &:active {
    transform: scale(0.98);
  }
}

::v-deep .u-radio {
  margin-right: 20rpx;
}
</style>
