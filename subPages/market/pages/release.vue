<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-04 16:30:31
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-24 11:53:47
 * @FilePath: /used-idle/pages/release/detail/detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="release-detail container box">
    <view class="form release-detail-content">
      <u--form
        labelPosition="left"
        labelWidth="100"
        :model="releaseForm"
        :rules="rules"
        ref="releaseForm"
      >
        <u-form-item label="商品名" prop="product" borderBottom required>
          <u--input v-model="releaseForm.product" border="none"></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item label="商品原价" prop="oldPrice" borderBottom required>
          <u--input v-model="releaseForm.oldPrice" border="none"></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item label="商品现价" prop="newPrice" borderBottom required>
          <u--input v-model="releaseForm.newPrice" border="none"></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item
          label="商品保障"
          labelPosition="top"
          prop="checkboxValue"
          borderBottom
          required
        >
          <u-checkbox-group
            v-model="releaseForm.checkboxValue"
            shape="circle"
            iconSize="10"
            placement="column"
          >
            <u-checkbox activeColor="red" label="包邮" name="包邮"></u-checkbox>
            <u-checkbox
              activeColor="red"
              label="9成新"
              name="9成新"
            ></u-checkbox>
            <u-checkbox activeColor="red" label="折扣" name="折扣"></u-checkbox>
            <u-checkbox
              activeColor="red"
              label="7天内支持退款"
              name="7天内支持退款"
            ></u-checkbox>
          </u-checkbox-group>
        </u-form-item>

        <u-form-item label="获取地址" prop="blurAddress" borderBottom required>
          <u--input v-model="releaseForm.blurAddress" border="none"></u--input>
          <!-- <u-icon slot="right" name="arrow-right"></u-icon> -->
          <u-button
            slot="right"
            @tap="getAddressBtn"
            :text="addressBtn"
            icon="map"
            type="success"
            size="mini"
            shape="circle"
          ></u-button>
        </u-form-item>

        <u-form-item
          label="商品图片"
          labelPosition="top"
          prop="newPrice"
          borderBottom
          required
        >
          <u-upload
            :fileList="fileList1"
            @afterRead="afterRead"
            @delete="deletePic"
            name="1"
            multiple
            :maxCount="4"
          ></u-upload>
        </u-form-item>

        <!-- <u-form-item label="验证码" prop="code" labelWidth="80" borderBottom>
          <u--input
            v-model="releaseForm.code"
            border="none"
            placeholder="请填写验证码"
          ></u--input>
          <u-button
            slot="right"
            @tap="getCode"
            :text="tips"
            type="success"
            size="mini"
            :disabled="disabled1"
          ></u-button>
        </u-form-item> -->

        <u-form-item prop="description" borderBottom>
          <u--textarea
            v-model="releaseForm.description"
            :height="150"
            :count="true"
            placeholder="商品详情描述。。。"
            :cursorSpacing="20"
            :showConfirmBar="false"
            border="none"
          ></u--textarea>
        </u-form-item>
      </u--form>

      <u-button
        type="primary"
        text="提交"
        customStyle="margin-top: 15px;"
        shape="circle"
        @click="submit"
        >提交</u-button
      >
    </view>
    <!-- <u-code
      ref="uCode"
      @change="codeChange"
      seconds="20"
      @start="disabled1 = true"
      @end="disabled1 = false"
    ></u-code> -->

    <tabbarPro :tabIndex="tabIndex"></tabbarPro>
  </view>
</template>

<script>
import tabbarPro from "../components/tabbar";
import config from "@/common/config";
import Storage from "@/common/function/storage";
import { UpdateFilePath } from "@/api/file";
export default {
  components: { tabbarPro },
  data() {
    // 实例化API核心类
    return {
      fileList1: [],

      color: "#666",
      colorWho: "#666",
      tabIndex: 1,
      disabled1: false,
      tips: "",
      addressBtn: "获取地址",
      // 表单提交数据
      releaseForm: {
        product: "",
        description: "",
        oldPrice: "",
        newPrice: "",
        blurAddress: "",
        code: "",
        checkboxValue: "",
      },
      rules: {
        product: [
          {
            message: "此为必填字段",
            required: true,
            trigger: ["blur", "change"],
          },
        ],
        oldPrice: [
          {
            message: "此为必填字段",
            required: true,
            trigger: ["blur", "change"],
          },
        ],
        newPrice: [
          {
            message: "此为必填字段",
            required: true,
            trigger: ["blur", "change"],
          },
        ],
        code: {
          type: "string",
          required: true,
          len: 4,
          message: "请填写4位验证码",
          trigger: ["blur"],
        },
        blurAddress: {
          message: "请填写地址信息",
          required: true,
          trigger: ["blur", "change"],
        },
        checkboxValue: [
          {
            type: "array",
            min: 2,
            required: true,
            message: "至少选两项",
            trigger: ["change"],
          },
        ],
      },
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
            url: config.baseURL + result.url,
            name: result.name,
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

    codeChange(text) {
      this.tips = text;
    },
    getCode() {
      if (this.$refs.uCode.canGetCode) {
        // 模拟向后端请求验证码
        uni.showLoading({
          title: "正在获取验证码",
        });
        setTimeout(() => {
          uni.hideLoading();
          // 这里此提示会被this.start()方法中的提示覆盖
          uni.$u.toast("验证码已发送");
          // 通知验证码组件内部开始倒计时
          this.$refs.uCode.start();
        }, 2000);
      } else {
        uni.$u.toast("倒计时结束后再发送");
      }
    },

    // 获取地址
    // 获取地址按钮点击
    async getAddressBtn() {
      if (this.releaseForm.blurAddress) {
        uni.showModal({
          title: "提示",
          content: "是否重新选择地址，重新选择地址将会覆盖之前的地址",
          success: (res) => {
            if (res.confirm) {
              uni.chooseLocation({
                success: (e) => {
                  console.log("e", e);
                  this.releaseForm.blurAddress = e.address + e.name;
                },
              });
            }
          },
        });
      } else {
        uni.chooseLocation({
          success: (e) => {
            console.log("e", e);
            this.releaseForm.blurAddress = e.address + e.name;
          },
        });
      }
    },

    submit() {
      this.$refs.releaseForm
        .validate()
        .then((res) => {
          uni.$u.toast("校验通过");
        })
        .catch((errors) => {
          uni.$u.toast("校验失败");
        });
    },
  },
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.releaseForm.setRules(this.rules);
  },
};
</script>

<style lang="scss" scoped>
%flex-j-space {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.release-detail {
  background: #f5f7fb;
  border-top: 1px solid transparent;

  &-content {
    margin: 32rpx 0;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 2px;
    // height: 100%;
    border-radius: 14rpx;
  }
}

::v-deep .u-checkbox__icon-wrap {
  width: 13px !important;
  height: 13px !important;
}

::v-deep .u-icon {
  margin-left: 3rpx !important;
  margin-bottom: 2rpx;
}
::v-deep .u-checkbox {
  margin: 20rpx 0;
}

::v-deep .u-form {
  background-color: #fff;
  border-radius: 10rpx;
  padding: 16rpx 0;

  &-item {
    padding: 0 30rpx;

    &__body {
      padding: 12px 0;
    }

    &__body__left__content__label {
      margin-left: 8rpx;
      margin-bottom: 6rpx;
    }
  }

  // input {
  //   text-align: right !important;
  // }

  .u-icon--right {
    margin-left: 8rpx;
  }
}
</style>
