<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-23 16:31:28
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-23 16:54:18
 * @FilePath: /smart-park/subPages/owner-autonomy/owners-committee/ work-report.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="work-report">
    <view class="work-report-item flex-a-center-j-space-between">
      <view class="item-left">
        <view class="item-left-title text-2-hidden">
          小区围墙改造进入施工阶段
        </view>
        <view class="item-left-time flex-a-center">
          <u-icon name="clock" size="14" color="#999"></u-icon>
          <text style="margin-left: 10rpx">2023-04-29</text>
        </view>
      </view>
      <image
        src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231023_6b8ff29c231247029e31502c778228c5.png"
        mode=""
      />
    </view>
    <view class="work-report-item flex-a-center-j-space-between">
      <view class="item-left">
        <view class="item-left-title text-2-hidden">
          小区围墙改造进入施工阶段
        </view>
        <view class="item-left-time flex-a-center">
          <u-icon name="clock" size="14" color="#999"></u-icon>
          <text style="margin-left: 10rpx">2023-04-29</text>
        </view>
      </view>
      <image
        src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231023_6b8ff29c231247029e31502c778228c5.png"
        mode=""
      />
    </view>
    <view class="work-report-item flex-a-center-j-space-between">
      <view class="item-left">
        <view class="item-left-title text-2-hidden">
          小区围墙改造进入施工阶段
        </view>
        <view class="item-left-time flex-a-center">
          <u-icon name="clock" size="14" color="#999"></u-icon>
          <text style="margin-left: 10rpx">2023-04-29</text>
        </view>
      </view>
      <image
        src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231023_6b8ff29c231247029e31502c778228c5.png"
        mode=""
      />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.work-report {
  width: 100vw;
  min-height: 100vh;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
  padding: 26rpx 20rpx;
  box-sizing: border-box;
  background-color: #f8f9fd;

  &-item {
    width: 100%;
    padding: 22rpx 30rpx;
    box-sizing: border-box;
    background: #ffffff;
    border-radius: 20rpx;
    margin-bottom: 30rpx;

    .item-left {
      height: 186rpx;
      position: relative;

      &-title {
        font-size: 28rpx;
        color: #333333;
      }

      &-time {
        position: absolute;
        bottom: 0;
        font-size: 24rpx;
        color: #999999;
      }
    }

    > image {
      width: 186rpx;
      height: 186rpx;
    }
  }
}
</style>
