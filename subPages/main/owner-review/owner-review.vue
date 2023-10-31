<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-30 14:29:36
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-31 15:53:47
 * @FilePath: /smart-park/subPages/main/owner-review/owner-review.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="owner-review">
    <view class="owner-review-form">
      <view class="owner-review-form-item flex-a-center">
        <view class="owner-review-form-item-label">是否审核通过</view>
        <view class="owner-review-form-item-content">
          <view class="radio-list">
            <u-radio-group v-model="reviewStatus">
              <u-radio shape="circle" label="待审核"></u-radio>
              <u-radio shape="circle" label="审核通过"></u-radio>
              <u-radio shape="circle" label="审核不通过"></u-radio>
            </u-radio-group>
          </view>
        </view>
      </view>
      <view class="owner-review-form-item flex-a-center">
        <view class="owner-review-form-item-label">用户楼号</view>
        <view class="owner-review-form-item-content">
          <u--input
            placeholder="请输入内容"
            border="none"
            v-model="buildNumber"
          ></u--input
        ></view>
      </view>
      <view class="owner-review-form-item flex-a-center">
        <u-button text="查询" color="#6377f5"></u-button>
      </view>
    </view>

    <view class="owner-review-content">
      <view class="owner-review-content-container">
        <view class="container-item">
          <view class="item-title">C13栋108号</view>
          <view class="item-data">
            <view class="item-data-label flex-a-center">
              <u-icon name="order" color="#2979ff" size="32rpx"></u-icon>
              <view class="label">用户楼号</view>
            </view>
            <view class="item-data-value">C13栋108号</view>
          </view>
        </view>
      </view>
    </view>

    <u-loadmore
      v-if="false"
      :status="status"
      :loading-text="loadingText"
      :loadmore-text="loadmoreText"
      :nomore-text="nomoreText"
    />
  </view>
</template>

<script>
export default {
  data() {
    return {
      reviewStatus: "",
      buildNumber: "",

      status: "nomore",
      loadingText: "努力加载中",
      loadmoreText: "轻轻上拉",
      nomoreText: "实在没有了",
    };
  },
};
</script>

<style lang="scss" scoped>
.owner-review {
  width: 100vw;
  min-height: 100vh;
  background-color: #f0f2f6;

  &-form {
    background-color: #fff;
    padding-bottom: 20rpx;

    &-item {
      font-size: 28rpx;
      color: #333;
      padding: 20rpx;
      border-bottom: 1px solid #f0f2f6;

      &:last-child {
        border-bottom: none;
      }

      &-label {
        width: 200rpx;
        flex-shrink: 0;
      }
      &-content {
        flex-shrink: 0;
        width: calc(100% - 200rpx);
        overflow: auto;
      }
    }
  }

  &-content {
    margin-top: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;

    &-container {
      background-color: #fff;
      padding: 20rpx;
      box-sizing: border-box;

      .container-item {
        width: 100%;

        .item-title {
          font-size: 32rpx;
          color: #333333;
          font-weight: bold;
        }

        .item-data {
          margin-top: 20rpx;

          &-label {
            font-size: 24rpx;
            color: #666666;
            margin-bottom: 10rpx;

            .label {
              margin-left: 10rpx;
            }
          }

          &-value {
            font-size: 28rpx;
            color: #333333;
          }
        }
      }
    }
  }
}

::v-deep .u-radio {
  margin-right: 40rpx;
}
</style>
