<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-09-25 12:53:54
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-23 11:19:03
 * @FilePath: /smart-park/subPages/market/components/tabbar.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="tabbar">
    <u-tabbar
      :value="value4"
      @change="handleTabbarChange"
      :fixed="true"
      :placeholder="true"
      activeColor="#6377F5"
      :safeAreaInsetBottom="true"
    >
      <u-tabbar-item
        :text="item.text"
        :name="index"
        v-for="(item, index) in dataList"
        :key="item"
      >
        <image
          class="u-page__item__slot-icon"
          slot="active-icon"
          :src="item.active"
        ></image>
        <image
          class="u-page__item__slot-icon"
          slot="inactive-icon"
          :src="item.normal"
        ></image>
      </u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script>
export default {
  props: ["tabIndex"],
  data() {
    return {
      value4: 0,
      dataList: [
        {
          text: "首页",
          active: "/static/image/tabbar/home-active.png",
          normal: "/static/image/tabbar/home.png",
        },
        {
          text: "发布",
          active: "/static/image/tabbar/release-active.png",
          normal: "/static/image/tabbar/release.png",
        },
        {
          text: "我的",
          active: "/static/image/tabbar/my-active.png",
          normal: "/static/image/tabbar/my.png",
        },
      ],
    };
  },
  methods: {
    handleTabbarChange(name) {
      this.value4 = name;
      if (name === 0) {
        uni.redirectTo({
          url: "/subPages/market/pages/index",
        });
      }
      if (name === 1) {
        uni.redirectTo({
          url: "/subPages/market/pages/release",
        });
      }
      if (name === 2) {
        uni.redirectTo({
          url: "/subPages/market/pages/user",
        });
      }
    },
  },
  mounted() {
    this.value4 = this.tabIndex;
  },

  //   watch: {
  //     tabIndex(val) {
  //       this.value4 = val;
  //     },
  //   },
};
</script>

<style lang="scss" scoped>
// .tabbar {
//   z-index: 9999;
// }
.u-page__item__slot-icon {
  width: 40rpx;
  height: 40rpx;
}
</style>
