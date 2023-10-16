<template>
  <view class="login container">
    <view class="login-wrap relative flex-col justify-center">
      <view class="login-header">
        <image :src="loginImage" mode="widthFix" />
      </view>
      <view class="login-body">
        <view class="login-buttons margin-t-24">
          <button
            v-if="isAgreement"
            class="login-wx circle-button"
            open-type="getPhoneNumber"
            @getphonenumber="wxLogin"
          >
            业主手机号快捷登录
          </button>
          <button v-else class="login-wx circle-button" @click="loginPrompt">
            业主手机号快捷登录
          </button>
          <!-- 短信验证信息 -->
          <button class="login-phone circle-button" @click="goPhoneLogin">
            访客短信验证登录
          </button>
        </view>
      </view>
      <view class="login-footer">
        <Agreement v-model="isAgreement" :text="agreementText" />
      </view>
    </view>
  </view>
</template>

<script>
import { getObjectAssignProperty } from "@/common/function";
import Agreement from "./components/Agreement";
import userMixin from "@/common/mixins/user";
import infoMixin from "@/common/mixins/info";
import { getRequestFilter } from "@/common/function";
import { getModelList, updateRole } from "@/api";
import { updateUserInfo } from "@/api/user";
export default {
  mixins: [userMixin, infoMixin],
  components: { Agreement },
  data() {
    return {
      isAgreement: false,
      errText: "",
      agreementText: "我已阅读并同意#user[用户协议]、#privacy[隐私政策]",
    };
  },
  computed: {
    loginImage() {
      return this.$helper.getImage(
        "test",
        "20221107_7ef67bb0a178480aaaf3b4e8a0104c86"
      );
    },
  },
  methods: {
    handleChangeAgreement() {
      this.isAgreement = !this.isAgreement;
    },
    loginPrompt() {
      this.$message("请先阅读并同意下方协议", false);
    },
    goPhoneLogin() {
      if (!this.isAgreement) return this.loginPrompt();
      this.$jump("./phone-login");
    },
    wxLogin(e) {
      const { code } = e.detail;
      if (code) {
        // this.phoneLogin(e).then(() => this.$helper.rollback(1200));
        this.phoneLogin(e).then(async () => {
          // 登陆成功后将角色改为(过滤参数)

          let updateData = { roleId: ["688d94fae4204ef0ae2c17a0ec1aef3b"] };
          const params = getObjectAssignProperty(updateData, ["roleId|roleId"]);

          const updateInfo = updateUserInfo(this.userInfo.id, params).then(() =>
            this.$store.commit("user/SET_USER_INFO", {
              ...params,
              $assign: true,
            })
          );

          await Promise.all([updateInfo]).then(async () => {
            // 获取过滤参数
            let filterData = getRequestFilter({
              formUser: this.userInfo.id,
            });
            // 发送请求获取
            let { data } = await getModelList(
              "64f6d064d85a4b7b32ec641d",
              filterData
            );
            // 当在存储流程表中找不到该用户说明该用户没有选择楼栋
            if (!data?.list.length) {
              // 跳转到选取楼栋号页面
              uni.reLaunch({
                url: "/subPages/user/select-room/select-room",
              });
            } else {
              this.$helper.rollback(1200);
            }
          });
        });
      }
    },
  },
};
</script>

<style scoped lang="scss">
.login {
  background: #f5f7fb;
  &-wrap {
    height: 100%;
  }
  &-header > image {
    margin-top: -120rpx;
    width: 100%;
  }
  &-buttons {
    margin-top: 64rpx;
    > button {
      width: 80%;
      padding: 4rpx 0;
    }
    .login-phone {
      margin-top: 48rpx;
      margin-bottom: 48rpx;
      background: #1959f6;
    }
    .login-wx {
      background: #5dba70;
    }
  }
  ::v-deep .agreement-box {
    position: absolute;
    bottom: 32rpx;
  }
}
</style>
