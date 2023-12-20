<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-12-03 17:27:04
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-12-20 14:15:20
 * @FilePath: /smart-park/subPages/market/product/add-aderess.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE

-->
<template>
  <view class="add-address">
    <u-navbar :title="title" :autoBack="true" :placeholder="true"> </u-navbar>
    <view class="address-form">
      <u--form
        labelPosition="left"
        required
        labelWidth="120"
        :model="addressInfo"
        :rules="rules"
        ref="shopAddressForm"
      >
        <u-form-item label="姓名" prop="name" required borderBottom>
          <u--input v-model="addressInfo.name" border="none"></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="电话" required prop="phone" borderBottom>
          <u--input v-model="addressInfo.phone" border="none"></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="地址" required prop="address" borderBottom>
          <u--input v-model="addressInfo.address" border="none"></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <u-form-item label="详细地址" required prop="moreAddres" borderBottom>
          <u--input v-model="addressInfo.moreAddres" border="none"></u--input>
          <u-icon slot="right" name="arrow-right"></u-icon>
        </u-form-item>
        <!-- <u-form-item label="设置为默认地址" borderBottom>
          <u-switch v-model="value" @change="change"></u-switch>
        </u-form-item> -->
      </u--form>
    </view>

    <button
      class="circle-button qu-btn"
      :loading="loading"
      @click="createOrUpdateAddress"
    >
      提交
    </button>
  </view>
</template>

<script>
import { updateModel, createModel, getModelInfo } from "@/api";
export default {
  data() {
    return {
      title: "添加地址",
      // 判断是否为首次添加地址
      isFirst: false,
      addressInfo: {
        name: "",
        phone: "",
        moreAddres: "",
        address: "",
        new_time: 0,
      },
      // 需要修改的数据id
      updateId: "",
      loading: false,
      rules: {
        name: [
          // 必填规则
          {
            required: true,
            message: "请输入姓名",
            // blur和change事件触发检验
            trigger: ["blur", "change"],
          },
        ],
        moreAddres: [
          // 必填规则
          {
            required: true,
            message: "请输入详细地址",
            // blur和change事件触发检验
            trigger: ["blur", "change"],
          },
        ],
        address: [
          // 必填规则
          {
            required: true,
            message: "请输入地址",
            // blur和change事件触发检验
            trigger: ["blur", "change"],
          },
        ],
        // 字段名称
        phone: [
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
      },
    };
  },
  methods: {
    // 获取该用户
    // 创建或者修改地址
    createOrUpdateAddress() {
      this.$refs.shopAddressForm
        .validate()
        .then(async (res) => {
          this.loading = true;
          try {
            if (!this.updateId) {
              this.creatOrUpdate(createModel, this.addressInfo);
            } else {
              // 修改地址
              this.creatOrUpdate(updateModel, this.addressInfo, this.updateId);
            }
          } catch (error) {
          } finally {
            this.loading = false;
            setTimeout(() => {
              uni.navigateBack({
                delta: 1,
              });
            }, 1000);
          }
        })
        .catch((errors) => {
          uni.$u.toast("校验失败");
        });
    },

    // 创建或者修改地址
    async creatOrUpdate(reqFn, data, id) {
      if (!id) {
        let { code } = await reqFn("656c2230262fbe2d9d06756d", data);
        if (code === 200) {
          uni.showToast({
            title: "添加成功",
            duration: 600,
          });
        }
      } else {
        let { code } = await reqFn("656c2230262fbe2d9d06756d", data, id);
        if (code === 200) {
          uni.showToast({
            title: "修改成功",
            duration: 600,
          });
        }
      }
    },

    async getCurrentAddress(id) {
      const { data } = await getModelInfo("656c2230262fbe2d9d06756d", id);
      Object.keys(this.addressInfo).forEach((item) => {
        this.addressInfo[item] = data[item];
      });
    },
  },
  onLoad(options) {
    let { id, length } = options;
    if (id) {
      this.title = "修改地址";
      this.getCurrentAddress(id);
      this.updateId = id;
    } else {
      this.title = "添加地址";
    }
  },
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.shopAddressForm.setRules(this.rules);
  },
};
</script>

<style lang="scss" scoped>
::v-deep .u-form-item__body__left {
  margin-left: 30rpx;
}

.qu-btn {
  // position: absolute;
  // bottom: 0;
  width: 80%;
  margin: 100rpx auto;
  margin-bottom: constant(safe-area-inset-bottom) !important;
  margin-bottom: env(safe-area-inset-bottom) !important;

  &:active {
    transform: scale(0.98);
  }
}

.active-btn {
  background: rgba(99, 119, 245, 0.3);
  color: #6377f5 !important;
  border: 1rpx solid #6377f5;
}
</style>
