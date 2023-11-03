<template>
  <view class="phone-login container">
    <image class="phone-login-bg" mode="widthFix" :src="background.top" />
    <view class="login-form">
      <view class="form-input radius-20 flex items-center">
        <u-icon
          label="+86"
          size="36rpx"
          labelSize="28rpx"
          labelColor="#333"
          space="12rpx"
          :name="icon.phone"
        />
        <u--input
          placeholder="请输入手机号"
          type="number"
          border="none"
          maxlength="11"
          :customStyle="{ background: '#f6f6f6' }"
          v-model="form.phone"
          :focus="focus === 'phone'"
          shape="circle"
        />
      </view>
      <view class="form-input-warp flex items-center">
        <view class="form-input flex-grow radius-20 flex items-center">
          <u-icon size="36rpx" :name="icon.code" />
          <u--input
            placeholder="请输入验证码"
            type="number"
            border="none"
            maxlength="6"
            :customStyle="{ background: '#f6f6f6' }"
            v-model="form.smsCode"
            :focus="focus === 'code'"
            shape="circle"
          />
        </view>
        <view
          class="send-code bg-white radius-25 margin-l-24 flex-shrink-0 text-center"
          @click="getCode"
        >
          {{ tips }}
        </view>
      </view>
      <button class="login-btn circle-button radius-20" @click="login">
        立即登录
      </button>
    </view>
    <Agreement v-model="isAgreement" :text="agreementText" />
    <u-code
      ref="uCode"
      @change="codeChange"
      @start="start"
      :seconds="seconds"
      changeText="X秒"
    />
    <image class="phone-login-bg" mode="widthFix" :src="background.bottom" />
  </view>
</template>

<script>
import { getRequestFilter } from "@/common/function";
import { createModel, getModelList, updateRole } from "@/api";
import { getObjectAssignProperty } from "@/common/function";
import { updateUserInfo } from "@/api/user";
import userMixin from "@/common/mixins/user";
import infoMixin from "@/common/mixins/info";
import Agreement from "./components/Agreement";
import { sleep } from "@/common/function";
import { sendCode } from "@/api/user";
export default {
  mixins: [userMixin, infoMixin],
  components: { Agreement },
  data() {
    const image = this.$helper.getImage;
    return {
      tips: "",
      form: {
        smsCode: "",
        phone: "",
      },
      focus: "",
      isAgreement: false,
      background: {
        top: image("test", "20221107_96c4075c762e480aa27d42b6c9ae63f6"),
        bottom: image("test", "20221107_2b4505308be040c2acdff9bb527f6cd4"),
      },
      icon: {
        phone: image("test", "20221107_f8da3821c5424c3980921512ba7f3fbe"),
        code: image("test", "20221107_8ac6abc12c1943c7a6a4a61dbf4dc9e6"),
      },
      agreementText: "我已阅读并同意#register[注册会员服务条款]",
    };
  },
  computed: {
    seconds() {
      return this.$constants.CODE_SECONDS;
    },
  },
  methods: {
    async login() {
      // if (this.isAnonymous) this.$jump("./phone-login");
      if (this.lock) return;
      if (this.validateForm()) {
        this.lock = true;

        try {
          await this.codeLogin.apply(this, Object.values(this.form));

          // 获取过滤参数
          let filterData = getRequestFilter({
            formUser: this.userInfo.id,
          });
          // 发送请求获取
          let { data } = await getModelList(
            "64f6d064d85a4b7b32ec641d",
            filterData
          );
          // 当在存储流程表中找不到该用户说明该用户没有选择楼栋 也就是🈚没有实名注册
          if (!data?.list.length) {
            // 登陆成功后将角色改为(过滤参数)
            let updateData = { roleId: ["1cd9f3db655243099577ea1c01363ab4"] };
            const params = getObjectAssignProperty(updateData, [
              "roleId|roleId",
            ]);

            const updateInfo = updateUserInfo(this.userInfo.id, params).then(
              () =>
                this.$store.commit("user/SET_USER_INFO", {
                  ...params,
                  $assign: true,
                })
            );

            await Promise.all([updateInfo]).then(async () => {
              try {
                //先查看匿名用户列表有当前账号没 没有就创建 有就不创建
                let filterData = getRequestFilter({
                  phone: this.form.phone,
                });
                let nickName = await getModelList(
                  "6528b923388a8c7a0eb9bb1b",
                  filterData
                );
                // 当在存储流程表中找不到该用户说明该用户没有选择楼栋
                if (!nickName.data?.list.length) {
                  // 6528b923388a8c7a0eb9bb1b
                  // TODO 将匿名登录用户的信息存入表中
                  let { data } = await createModel("6528b923388a8c7a0eb9bb1b", {
                    phone: this.form.phone,
                  });
                  if (data.code === 200) {
                    uni.showToast({
                      title: "匿名登录",
                      icon: "success",
                    });
                  }
                }
              } catch (error) {
                console.log(error);
              }
            });
          }

          setTimeout(() => wx.reLaunch({ url: "/pages/index/index" }), 2000);
        } catch {
          this.lock = false;
        }
      }
    },
    codeChange(text) {
      this.tips = text;
    },
    getCode() {
      if (this.validateForm("phone")) {
        const { uCode } = this.$refs;
        if (uCode.canGetCode) uCode.start();
      }
    },
    start() {
      this.$request(sendCode, {
        params: this.form.phone,
        msg: "发送",
        request: true,
      }).catch(this.$refs.uCode.reset);
    },
    //校验表单
    validateForm(key = "all") {
      this.focus = "";
      const { phone, smsCode } = this.form;
      const validatePhone = () => {
        key = "phone";
        if (!phone) throw "手机号不能为空";
        if (!this.$u.test.mobile(phone)) throw "手机号格式有误";
        return true;
      };
      const validateCode = () => {
        key = "smsCode";
        if (!smsCode) throw "验证码不能为空";
        if (!uni.$u.test.code(smsCode)) throw "验证码格式有误";
        return true;
      };
      try {
        switch (key) {
          case "phone":
            return validatePhone();
          case "smsCode":
            return validateCode();
          default:
            return validatePhone() && validateCode();
        }
      } catch (error) {
        this.$message(error, false);
        sleep(100).then(() => (this.focus = key));
      }
    },
  },
};
</script>

<style scoped lang="scss">
.phone-login {
  background-color: transparent;
  &-bg {
    width: 100%;
    &:last-child {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: -1;
    }
  }
  .login-form {
    padding: 48rpx;
    > view {
      margin-bottom: 32rpx;
    }
    ::v-deep .form-input {
      background: #f6f6f6;
      padding: 20rpx 32rpx;
      .u-icon {
        margin-right: 15rpx;
      }
    }
    .send-code {
      min-width: 120rpx;
      color: #1959f6;
      padding: 16rpx 24rpx;
      border: 1rpx solid #1959f6;
    }
    .login-btn {
      width: 96%;
      margin-top: 50rpx;
      margin-bottom: 0;
      background: #1959f6;
    }
  }
}
</style>
