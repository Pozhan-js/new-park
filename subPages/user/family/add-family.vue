<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-11-03 14:47:30
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-07 09:37:08
 * @FilePath: /smart-park/subPages/user/family/add-family.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="page-box">
    <u--form
      labelPosition="left"
      :model="form"
      :rules="rules"
      ref="addFamilyForm"
      labelWidth="80"
    >
      <u-form-item label="昵称" prop="nickName" borderBottom ref="nickName">
        <u--input
          v-model="form.nickName"
          border="none"
          placeholder="请输入昵称"
        ></u--input>
      </u-form-item>
      <u-form-item label="手机号码" prop="phone" borderBottom ref="phone">
        <u--input
          v-model="form.phone"
          border="none"
          type="number"
          placeholder="请输入手机号"
          maxlength="11"
        ></u--input>
      </u-form-item>
      <u-form-item label="性别" prop="sex" borderBottom>
        <u--input
          v-model="form.sex"
          border="none"
          placeholder="请输入性别"
        ></u--input>
      </u-form-item>
      <u-form-item label="年龄" prop="age" borderBottom>
        <u--input
          v-model="form.age"
          border="none"
          placeholder="请输入年龄"
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
              :focus="focus === 'code'"
              :customStyle="{ background: '#f6f6f6' }"
              v-model="form.smsCode"
            >
            </u--input>
          </view>

          <view class="send-code flex-center" @click="getCode">
            {{ tips }}
          </view>
        </view>
      </u-form-item>
    </u--form>
    <view class="submit" @click="submit">提交审核</view>
    <u-code
      :seconds="seconds"
      @start="start"
      ref="uCodeFamily"
      @change="codeChange"
    ></u-code>
  </view>
</template>

<script>
import { createModel, getModelList } from "@/api";
import { createUser } from "@/api/user";
import storage from "@/common/function/storage";
import { getRequestFilter, sleep } from "@/common/function";
import { sendCode } from "@/api/user";
import userMixin from "@/common/mixins/user";
import infoMixin from "@/common/mixins/info";
export default {
  mixins: [userMixin, infoMixin],
  data() {
    return {
      // start: 0,
      tips: "发送验证码",
      focus: "",
      parentsInfo: {},
      userInfoID: "",
      form: {
        parentsID: "",
        formUser: "",
        phone: "",
        smsCode: "",
        sex: "",
        age: "",
        roomName: "",
        nickName: "",
      },
      // 规则
      rules: {
        phone: [
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
        sex: [
          {
            type: "string",
            required: true,
            message: "请填写性别",
            trigger: ["blur"],
          },
        ],
        age: [
          {
            type: "string",
            required: true,
            message: "请填写年龄",
            trigger: ["blur"],
          },
        ],
      },
    };
  },
  computed: {
    seconds() {
      return this.$constants.CODE_SECONDS;
    },
  },
  methods: {
    // 验证码按钮内容
    codeChange(text) {
      this.tips = text;
    },
    // 获取到倒计时
    getCode() {
      if (this.validateForm("phone")) {
        const { uCodeFamily } = this.$refs;
        if (uCodeFamily.canGetCode) uCodeFamily.start();
      }
    },
    // 发送验证法
    start() {
      this.$request(sendCode, {
        params: this.form.phone,
        msg: "发送",
        request: true,
      }).catch(this.$refs.uCodeFamily.reset);
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

    //获取父用户表信息
    async getParentsUserInfo() {
      let filterData = getRequestFilter({
        formUser: storage.get("UserInfo").id,
      });

      //请求
      let { data } = await getModelList("64f6d064d85a4b7b32ec641d", filterData);
      this.parentsInfo = data?.list[0] || {};
    },

    // 提交用户信息
    async submit() {
      this.form.parentsID = storage.get("UserInfo").id;
      this.form.roomName = this.parentsInfo.roomName;
      try {
        // 需要再系统中创建一位普通用户角色
        let { data } = await createUser({
          account: this.form.phone,
          departmentId: "64ba0158befce8059d0d98f1",
          enabledMark: 1,
          managerId: "",
          mobilePhone: this.form.phone,
          realName: this.form.nickName,
          // 默认为普通用户
          roleId: ["688d94fae4204ef0ae2c17a0ec1aef3b"],
        });

        // console.log("创键用户", data);
        this.userInfoID = data || "";
        // console.log("创键用户", this.userInfoID);
      } catch (error) {
        console.log(error);
        uni.showToast({
          title: "创建角色失败",
          icon: "none",
          duration: 600,
        });

        return;
      }
      // 获取用户id
      this.form.formUser = this.userInfoID;

      // 校验
      this.$refs.addFamilyForm
        .validate()
        .then(async (res) => {
          // 验证码校验
          await this.codeLogin.apply(
            this,
            Object.values({
              smsCode: this.form.smsCode,
              phone: this.form.phone,
            })
          );

          let createData = await createModel(
            "64f6d064d85a4b7b32ec641d",
            this.form
          );
          if (createData.code === 200) {
            uni.showToast({
              title: "添加成员成功",
              icon: "success",
              duration: 600,
            });
            this.tips = "发送验证码";
          } else {
            uni.showToast({
              title: "添加成员失败",
              icon: "none",
              duration: 600,
            });

            return;
          }
          this.form = {
            parentsID: "",
            formUser: "",
            phone: "",
            smsCode: "",
            sex: "",
            age: "",
            roomName: "",
            nickName: "",
          };

          //重置倒计时
          this.$refs.uCodeFamily.reset();

          this.$refs.addFamilyForm.resetFields();
        })
        .catch((errors) => {
          console.log(errors);
          uni.$u.toast("校验失败");
        });
    },
  },
  onLoad() {
    this.getParentsUserInfo();
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
