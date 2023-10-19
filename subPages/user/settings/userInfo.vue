<template>
  <view class="user-info container flex-col">
    <view class="user-info-main flex-grow">
      <u--form
        labelPosition="left"
        :model="formData"
        :rules="rules"
        ref="form"
        labelWidth="70px"
      >
        <u-form-item borderBottom>
          <view class="flex justify-between">
            <u-avatar size="96rpx" :src="avatarUrl"></u-avatar>
            <button
              class="avatar-btn input-color margin-0 flex-center"
              open-type="chooseAvatar"
              @chooseavatar="onChooseAvatar"
            >
              点击上传头像
            </button>
          </view>
        </u-form-item>
        <u-form-item borderBottom label="昵称" prop="name" required>
          <u--input
            v-model="formData.name"
            border="none"
            maxlength="6"
            placeholderStyle="color:#969dab;"
            placeholder="请输入姓名"
          />
          <u-icon slot="right" name="arrow-right" />
        </u-form-item>
        <u-form-item borderBottom label="电话" prop="phone" required>
          <u--input
            v-model="formData.phone"
            border="none"
            maxlength="11"
            :disabled="true"
            placeholderStyle="color:#969dab;"
            placeholder="请输入电话"
          />
          <!-- <u-icon slot="right" name="arrow-right" /> -->
        </u-form-item>
      </u--form>
      <view class="hint-text text-note margin-t-24">
        <text>注：</text>填写用用信息
        <text>且填写后不能修改，请务必填写正确！</text>
      </view>
    </view>
    <button
      class="circle-button flex-shrink-0 btn-active"
      @click="submitUserInfo"
    >
      提交保存
    </button>
  </view>
</template>

<script>
import { getObjectAssignProperty } from "@/common/function";
import { updateUserInfo } from "@/api/user";
import { UpdateFilePath } from "@/api/file";
import infoMixin from "@/common/mixins/info";
export default {
  mixins: [infoMixin],
  data() {
    const KEYS = ["name", "phone"];

    return {
      avatarUrl: "",
      pickerVisible: false,
      formData: getObjectAssignProperty({}, KEYS, ""),

      rules: {
        name: {
          required: true,
          trigger: "blur",
          pattern: this.$helper.verifyRule.name,
          message: "请输入正确的姓名",
        },
        phone: {
          required: true,
          trigger: "blur",
          pattern: this.$helper.verifyRule.phone,
          message: "请输入正确的姓名",
        },
      },
    };
  },
  computed: {},
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.form.setRules(this.rules);
    //回显数据
    this.avatarUrl = this.avatar;
    Object.assign(this.formData);
    this.formData.phone = this.userInfo.mobilePhone;
    this.formData.name = this.userInfo.realName;
    //设置提交接口(修改/新增)
    this.message = "修改信息";
  },
  methods: {
    async onChooseAvatar({ detail: { avatarUrl } }) {
      this.avatarUrl = avatarUrl;
      this.avatarChange = true;
    },
    submitUserInfo() {
      if (this.lock) return;
      this.lock = true;
      this.$refs.form
        .validate()
        .then(this._submitRequest)
        .catch(() => (this.lock = false));
    },
    // 发送请求修改用户信息
    async _submitRequest() {
      let isOk = false;
      const duration = 1000;
      let { message } = this;
      uni.showLoading({ title: "提交中...", mask: true });
      try {
        if (this.avatarChange) {
          const { data: avatar = {} } = await this.$helper.uploadFile(
            UpdateFilePath,
            this.avatarUrl
          );
          if (!avatar.url) throw "上传头像";
          avatar.fileId = Date.now();
          this.formData.avatar = [avatar];
        }

        const params = getObjectAssignProperty(this.formData, [
          "name|realName",
          "avatar.0.url|headIcon",
        ]);
        const updateInfo = updateUserInfo(this.userInfo.id, params).then(() =>
          this.$store.commit("user/SET_USER_INFO", { ...params, $assign: true })
        );
        await Promise.all([updateInfo]).then(() => {
          this.$helper.rollback(duration);
        });
        isOk = true;
      } catch (error) {
        console.log(error);
        if (typeof error == "string") message = error;
        return Promise.reject(error);
      } finally {
        uni.hideLoading();
        this.$message(message, isOk, { auto: true, duration });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 40rpx 32rpx;

  .input-color {
    color: #969dab;
  }

  .avatar-btn {
    background-color: transparent;
    font-size: 28rpx;

    &::after {
      content: none;
    }
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
      }
    }

    input {
      text-align: right !important;
    }

    .u-icon--right {
      margin-left: 8rpx;
    }
  }

  .circle-button {
    width: 90%;
    margin-bottom: 20rpx;
  }
}

.select-input {
  padding-right: 32rpx;
}
</style>
