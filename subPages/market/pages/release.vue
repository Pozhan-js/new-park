<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-04 16:30:31
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-29 15:30:52
 * @FilePath: /used-idle/pages/release/detail/detail.vue
 * @goods_description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="release-detail container box">
    <view class="form release-detail-content">
      <u--form
        labelPosition="left"
        labelWidth="110"
        :model="releaseForm"
        :rules="rules"
        ref="releaseForm"
      >
        <u-form-item label="商品名" prop="goods_name" borderBottom required>
          <u--input v-model="releaseForm.goods_name" border="none"></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item label="商品Log" labelPosition="top" borderBottom>
          <u-upload
            :fileList="fileList2"
            @afterRead="afterRead"
            @delete="deletePic"
            name="2"
            multiple
            :maxCount="4"
          ></u-upload>
        </u-form-item>

        <u-form-item
          label="商品原价"
          prop="goods_price_old"
          borderBottom
          required
        >
          <u--input
            v-model="releaseForm.goods_price_old"
            border="none"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item
          label="商品现价"
          prop="goods_price_new"
          borderBottom
          required
        >
          <u--input
            v-model="releaseForm.goods_price_new"
            border="none"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item
          label="商家联系电话"
          prop="phone_number"
          borderBottom
          required
        >
          <u--input v-model="releaseForm.phone_number" border="none"></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item label="商品属性" labelPosition="top" borderBottom>
          <view class="u-page">
            <!-- 头部 -->
            <u-row customStyle="margin-bottom: 10px">
              <u-col span="6">
                <view class="demo-layout bg-purple-light">
                  <view>属性</view>
                </view>
              </u-col>
              <u-col span="6">
                <view class="demo-layout bg-purple">
                  <view>属性值</view>
                </view>
              </u-col>
            </u-row>
            <!-- content -->
            <u-row
              customStyle="margin-bottom: 10px"
              v-for="(item, index) in releaseForm.tableField112"
              :key="index"
            >
              <u-col span="6">
                <view class="demo-layout bg-purple-light">
                  <u--input
                    inputAlign="center"
                    v-model="item.good_parameters"
                    border="none"
                  ></u--input>
                </view>
              </u-col>
              <u-col span="6">
                <view class="demo-layout bg-purple">
                  <u--input
                    inputAlign="center"
                    v-model="item.parameters_value"
                    border="none"
                  ></u--input>
                </view>
              </u-col>
            </u-row>
            <!-- footer -->
            <u-row customStyle="margin-top: 10px" @click="clickRowPlus">
              <u-col span="12">
                <view
                  class="demo-layout demo-footer bg-purple-light flex-center"
                >
                  <u-icon name="plus" size="12"></u-icon>
                  <text> 添加属性</text>
                </view>
              </u-col>
            </u-row>
          </view>
        </u-form-item>

        <u-form-item
          label="商品保障"
          labelPosition="top"
          prop="goods_assure"
          borderBottom
          required
        >
          <u-checkbox-group
            v-model="releaseForm.goods_assure"
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

        <u-form-item
          label="获取地址"
          labelPosition="top"
          prop="blur_address"
          borderBottom
          required
        >
          <u--input v-model="releaseForm.blur_address" border="none"></u--input>
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
          label="详细地址"
          prop="detail_address"
          borderBottom
          required
        >
          <u--input
            v-model="releaseForm.detail_address"
            border="none"
          ></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>

        <u-form-item
          label="商品展示图片"
          labelPosition="top"
          prop="goods_image"
          borderBottom
          required
        >
          <u-upload
            :fileList="fileList1"
            @afterRead="afterRead"
            @delete="deletePic"
            name="1"
            multiple
            :maxCount="3"
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

        <u-form-item prop="goods_description" borderBottom>
          <u--textarea
            v-model="releaseForm.goods_description"
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
import { createModel, getModelList } from "@/api";
import { getRequestFilter, sleep } from "@/common/function";
import infoMixin from "@/common/mixins/info";
import { UpdateFilePath } from "@/api/file";
export default {
  mixins: [infoMixin],
  components: { tabbarPro },
  data() {
    // 实例化API核心类
    return {
      fileList1: [],
      fileList2: [],
      color: "#666",
      colorWho: "#666",
      tabIndex: 1,
      disabled1: false,
      tips: "",
      addressBtn: "获取地址",
      // 表单提交数据
      releaseForm: this.createFormData(),
      // 表格

      rules: {
        goods_name: [
          {
            message: "此为必填字段",
            required: true,
            trigger: ["blur", "change"],
          },
        ],
        goods_price_old: [
          {
            message: "此为必填字段",
            required: true,
            trigger: ["blur", "change"],
          },
        ],
        goods_price_new: [
          {
            message: "此为必填字段",
            required: true,
            trigger: ["blur", "change"],
          },
        ],
        phone_number: [
          {
            required: true,
            message: "请输入手机号",
            trigger: ["change", "blur"],
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
            trigger: ["change", "blur"],
          },
        ],
        code: {
          type: "string",
          required: true,
          len: 4,
          message: "请填写4位验证码",
          trigger: ["blur"],
        },
        blur_address: {
          message: "请填写地址信息",
          required: true,
          trigger: ["blur", "change"],
        },
        detail_address: {
          message: "请填写详细地址信息",
          required: true,
          trigger: ["blur", "change"],
        },
        goods_assure: [
          {
            type: "array",
            min: 2,
            required: true,
            message: "至少选两项",
            trigger: ["change"],
          },
        ],
        goods_assure: [
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
  watch: {
    fileList1: {
      handler(val) {
        this.releaseForm.goods_image = val.map((item) => ({
          url: item.url.replace(config.baseURL, ""),
          name: item.name,
          fileId: Date.now(),
        }));
      },
      deep: true,
    },
    fileList2: {
      handler(val) {
        this.releaseForm.goods_log = val.map((item) => ({
          url: item.url.replace(config.baseURL, ""),
          name: item.name,
          fileId: Date.now(),
        }));
      },
      deep: true,
    },
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
              // console.log("上传成功", res, that.fileList1);
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

    createFormData() {
      return {
        goods_name: "",
        goods_description: "",
        goods_price_old: "",
        goods_price_new: "",
        goods_image: [],
        goods_log: [],
        blur_address: "",
        detail_address: "",
        // code: "",
        goods_assure: [],
        phone_number: "",
        visitors_num: 0,
        tableField112: [],
        username: "",
        header_icon: "",
      };
    },

    //点击整行添加table行
    clickRowPlus() {
      this.releaseForm.tableField112.push({
        good_parameters: "",
        parameters_value: "",
      });
    },

    // 获取地址按钮点击
    async getAddressBtn() {
      if (this.releaseForm.blur_address) {
        uni.showModal({
          title: "提示",
          content: "是否重新选择地址，重新选择地址将会覆盖之前的地址",
          success: (res) => {
            if (res.confirm) {
              uni.chooseLocation({
                success: (e) => {
                  console.log("e", e);
                  this.releaseForm.blur_address = e.address + e.name;
                },
              });
            }
          },
        });
      } else {
        uni.chooseLocation({
          success: (e) => {
            console.log("e", e);
            this.releaseForm.blur_address = e.address + e.name;
          },
        });
      }
    },

    submit() {
      this.releaseForm.username = this.userInfo.realName;
      this.releaseForm.header_icon = this.userInfo.headIcon;
      this.$refs.releaseForm
        .validate()
        .then(async (res) => {
          // uni.$u.toast("校验通过");
          const reqFormData = await createModel(
            "65605e75f3ad0c30c038ff96",
            this.releaseForm
          );

          if (reqFormData.code !== 200) {
            uni.$u.toast(`${reqFormData.msg}`);
          } else {
            uni.showToast({
              title: "创建成功",
              duration: 600,
            });

            this.releaseForm = this.createFormData();
            this.fileList1 = [];
            this.fileList2 = [];
          }
        })
        .catch((errors) => {
          uni.$u.toast("失败");
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
  // text-align: right !important;
  // }

  .u-icon--right {
    margin-left: 8rpx;
  }
}

.wrap {
  padding: 12px;
}

.demo-layout {
  height: 25px;
  line-height: 25px;
  text-align: center;
  // border-radius: 4px;
}

.bg-purple {
  background: #ced7e1;
}

.bg-purple-light {
  background: #e5e9f2;
}

.bg-purple-dark {
  background: #99a9bf;
}
</style>
