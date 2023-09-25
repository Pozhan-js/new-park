<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-02 10:33:25
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-15 10:32:59
 * @FilePath: /smart-park/pages/garden/garden.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="garden">
    <view class="garden-container">
      <web-view src="https://newai.kindoucloud.com/h5/?7p2m#/"></web-view>
    </view>
    <!-- <view-tabbar tabIndex="2"></view-tabbar> -->
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
};
</script>

<style lang="scss" scoped>
.garden {
  width: 100vw;
  padding: 20rpx;
  box-sizing: border-box;

  &-container {
    &-item {
      width: 100%;
      height: 300rpx;
      background: #ffffff;
      box-shadow: 0rpx 6rpx 10rpx 1rpx rgba(229, 229, 229, 0.1);
      border-radius: 20rpx 20rpx 20rpx 20rpx;
    }
  }
}
</style>
