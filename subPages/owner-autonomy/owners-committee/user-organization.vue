<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-23 16:57:35
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-23 17:47:09
 * @FilePath: /smart-park/subPages/owner-autonomy/owners-committee/organization.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="user-organization">
    <view class="user-organization-item flex-a-center" @click="goDetail">
      <image
        src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231023_80da2bd735364aec9cea8a94ddcad5c5.png"
        mode=""
      />
      <view class="user-message">
        <view class="name">里奥</view>
        <view>年龄：36岁 </view>
        <view>职位：主席</view>
        <view>政治面貌：党员</view>
        <view class="good flex-a-center">
          <view>擅长:</view>
          <view class="good-list flex-a-center">
            <view class="good-list-item">协调指导</view>
            <view class="good-list-item">协调指导</view>
          </view>
        </view>
      </view>
    </view>

    <view class="user-organization-item flex-a-center">
      <image
        src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231023_80da2bd735364aec9cea8a94ddcad5c5.png"
        mode=""
      />
      <view class="user-message">
        <view class="name">里奥</view>
        <view>年龄：36岁 </view>
        <view>职位：主席</view>
        <view>政治面貌：党员</view>
        <view class="good flex-a-center">
          <view>擅长:</view>
          <view class="good-list flex-a-center">
            <view class="good-list-item">协调指导</view>
            <view class="good-list-item">协调指导</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goDetail() {
      uni.navigateTo({
        url: "./user-detail",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.user-organization {
  width: 100vw;
  min-height: 100vh;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
  padding: 36rpx 40rpx;
  box-sizing: border-box;
  background-color: #f8f9fd;

  &-item {
    margin-bottom: 30rpx;
    padding-bottom: 30rpx;
    border-bottom: 1px dotted #333333;
    > image {
      width: 166rpx;
      height: 225rpx;
      border-radius: 10rpx;
    }
    .user-message {
      padding-left: 20rpx;

      > view {
        font-size: 26rpx;
        color: #333333;
      }

      .name {
        height: 50rpx;
        font-size: 36rpx;
        font-weight: bold;
        color: #333333;
        line-height: 50rpx;
      }

      .good {
        height: 50rpx;

        &-list {
          color: #6377f5;
          flex-wrap: wrap;

          &-item {
            // height: 40rpx;
            margin-left: 20rpx;
            font-size: 24rpx;
            text-align: center;
            padding: 4rpx 12rpx;
            background: rgba(99, 119, 245, 0.3);
            border-radius: 4rpx;
          }
        }
      }
    }
  }
}
</style>
