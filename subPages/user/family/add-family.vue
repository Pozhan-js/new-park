<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-11-03 14:47:30
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-03 15:40:15
 * @FilePath: /smart-park/subPages/user/family/add-family.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="page-box">
    <u--form
      labelPosition="left"
      :model="form"
      :rules="rules"
      ref="form"
      labelWidth="80"
    >
      <u-form-item label="昵称" prop="nickname" borderBottom ref="nickname">
        <u--input
          v-model="nickname"
          border="none"
          placeholder="请输入昵称"
        ></u--input>
      </u-form-item>
      <u-form-item
        label="手机号码"
        prop="f_mobilephone"
        borderBottom
        ref="f_mobilephone"
      >
        <u--input
          v-model="form.f_mobilephone"
          border="none"
          type="number"
          placeholder="请输入手机号"
          maxlength="11"
        ></u--input>
      </u-form-item>

      <u-form-item label="验证码" prop="code" borderBottom ref="code">
        <view class="code flex-a-center">
          <view class="input-code flex-a-center flex-1">
            <u--input
              placeholder="请输入验证码"
              type="number"
              border="none"
              maxlength="6"
              v-model="code"
            >
            </u--input>
          </view>

          <view class="send-code flex-center" @click="getCode">
            {{ tips }}
          </view>
        </view>
      </u-form-item>
      <u-form-item label="身份" prop="" borderBottom ref="">
        <u--input
          value="家属"
          border="none"
          disabled
          disabledColor="#FFF"
        ></u--input>
      </u-form-item>
    </u--form>
    <view class="submit" @click="submit">提交审核</view>
    <u-code
      :seconds="seconds"
      @start="start"
      ref="uCode"
      @change="codeChange"
    ></u-code>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tips: "发送验证码",
      form: {
        f_userbuildingno: "",
        f_buildingmanageid: "",
        f_creatoruserid: "",
        f_status: "0",
        f_creatortime: "",
        f_mobilephone: "",
        f_userid: "",
      },
      rules: {
        f_mobilephone: [
          {
            type: "string",
            required: true,
            message: "请填写手机号",
            trigger: ["blur"],
          },
          {
            validator: (rule, value, callback) => {
              return uni.$u.test.mobile(value);
            },
            message: "手机号码不正确",
            trigger: ["blur"],
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.code {
  width: 90%;
  .input-code {
    padding: 20rpx;
    padding-left: 0;
  }

  .send-code {
    margin-left: 15rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #1959f6;
    padding: 10rpx;
    background: #ffffff;
    border-radius: 50rpx;
    border: 1rpx solid #1959f6;
  }
}
.submit {
  width: 100%;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  font-size: 32rpx;
  color: #ffffff;
  width: 50%;
  margin: 0 auto;
  background: #376efa;
  border-radius: 50rpx;
  margin-top: 50rpx;
}
</style>
