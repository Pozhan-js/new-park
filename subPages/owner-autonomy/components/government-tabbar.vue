<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-06-02 09:56:28
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-08-30 17:01:51
 * @FilePath: /SmartPark/subPages/function/self-government/components/government-tabbar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="government-tabbar">
    <u-tabbar
      :value="value4"
      @change="handleTabbarChange"
      :fixed="false"
      :placeholder="false"
      activeColor="#6377F5"
      :safeAreaInsetBottom="true"
    >
      <u-tabbar-item text="明细" name="明细">
        <image
          class="u-page__item__slot-icon"
          slot="active-icon"
          src="https://kindoucloud.com:8066/api/mongoFile/Image/systemicon/dtghc/20230602_533072ec68704601ba8c2da7bb684ae2.png"
        ></image>
        <image
          class="u-page__item__slot-icon"
          slot="inactive-icon"
          src="https://kindoucloud.com:8066/api/mongoFile/Image/systemicon/dtghc/20230602_5d11eca08fd14e379f39b673ca287403.png"
        ></image>
      </u-tabbar-item>
      <u-tabbar-item text="统计" name="统计">
        <image
          class="u-page__item__slot-icon"
          slot="active-icon"
          src="https://kindoucloud.com:8066/api/mongoFile/Image/systemicon/dtghc/20230602_05574c2e90b6443f9f48c872a6d54c35.png"
        ></image>
        <image
          class="u-page__item__slot-icon"
          slot="inactive-icon"
          src="https://kindoucloud.com:8066/api/mongoFile/Image/systemicon/dtghc/20230602_f6d637827572468992ff0365e6603be2.png"
        ></image>
      </u-tabbar-item>
      <u-tabbar-item text="我的" name="我的">
        <image
          class="u-page__item__slot-icon"
          slot="active-icon"
          src="https://kindoucloud.com:8066/api/mongoFile/Image/systemicon/dtghc/20230602_faf1df3aa2da45d79d00077b86db98e3.png"
        ></image>
        <image
          class="u-page__item__slot-icon"
          slot="inactive-icon"
          src="https://kindoucloud.com:8066/api/mongoFile/Image/systemicon/dtghc/20230602_223db0d34bf14a7c9b16e3ddf9644e6c.png"
        ></image>
      </u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script>
export default {
  props: ["type"],
  data() {
    return {
      value4: "",
    };
  },
  methods: {
    handleTabbarChange(name) {
      this.value4 = name;
      if (name === "统计") {
        uni.redirectTo({
          url: "/subPages/owner-autonomy/finance/pages/statements",
        });
      }
      if (name === "明细") {
        uni.redirectTo({
          url: "/subPages/owner-autonomy/finance/pages/finance",
        });
      }
      if (name === "我的") {
        uni.redirectTo({
          url: "/subPages/owner-autonomy/finance/pages/finance-user",
        });
      }
    },
  },
  mounted() {
    this.value4 = this.type;
  },
};
</script>

<style lang="scss" scoped>
.government-tabbar {
  z-index: 9999;
}
.u-page__item__slot-icon {
  width: 30rpx;
  height: 30rpx;
}
</style> 