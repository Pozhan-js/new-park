<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-23 17:40:25
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-24 11:44:32
 * @FilePath: /smart-park/subPages/owner-autonomy/owners-committee/user-message-detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="user-detail">
    <u-navbar
      title="个人名片"
      :autoBack="true"
      titleStyle="color: #fff; font-size: 18px;"
      bgColor="transparent"
      :placeholder="true"
    >
      <view slot="left">
        <u-icon name="arrow-left" color="#fff" size="20"></u-icon>
      </view>
    </u-navbar>

    <!-- 个人头像信息 -->
    <view class="user-detail-info flex-a-center">
      <view class="user-detail-info-avatar">
        <u-avatar :size="50" :src="require('@/static/logo.png')"></u-avatar>
      </view>
      <view class="right">
        <view class="right-name">张三</view>
        <view class="right-message flex-a-center">
          <view class="message-group flex-a-center">
            <view class="message-group-item">36岁</view>
            <view class="message-group-item">党员</view>
            <view class="message-group-item">主席</view>
          </view>
          <view class="message-phone flex-a-center">
            <u-icon name="phone-fill" color="#fff"></u-icon>
            <view>16497520321</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 擅长 -->
    <view class="user-detail-goods">
      <view class="goods-title flex-a-center">
        <image
          style="width: 24rpx; height: 20rpx; margin-right: 10rpx"
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231024_51d37a27d63f446d938c3c678f06f2a1.png"
          mode=""
        />
        <view>擅长</view>
      </view>
      <view class="goods-list">
        <view class="goods-item">协调指导</view>
      </view>
    </view>

    <!-- 职能 -->
    <view class="user-detail-function">
      <view class="function-title flex-a-center">
        <image
          style="width: 24rpx; height: 20rpx; margin-right: 10rpx"
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231024_3456b080d7f64900aa14d64ca82b7b90.png"
          mode=""
        />
        <view>工作职能</view>
      </view>
      <view class="function-content">
        主席是整个业委会的核心和灵魂，他/她负责召集和主持每次会议，并对其他成员进行协调和指导。此外，主席还需要代表业委会与物业公司或政府部门进行沟通和协商
      </view>
    </view>

    <!-- 进度 -->
    <view class="user-detail-schedule">
      <view class="schedule-title flex-a-center">
        <image
          style="width: 24rpx; height: 20rpx; margin-right: 10rpx"
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231024_5fad43e4edcb4a34869a16001fe85a2f.png"
          mode=""
        />
        <view>工作进度列表</view>
      </view>

      <view class="schedule-content">
        <u-steps current="1" dot direction="column">
          <u-steps-item>
            <template slot="desc">
              <view class="step-box flex-a-center-j-space-between">
                <view class="step-box-left">
                  <view class="step-box-left-title">张三提交了工作计划</view>
                  <view class="step-box-left-time">2021-10-24</view>
                </view>
                <view class="step-box-right">
                  <image
                    style="width: 142rpx; height: 142rpx"
                    src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231024_8ba955c4090244b2b39fc32a04255be9.png"
                    mode=""
                  />
                </view>
              </view>
            </template>
          </u-steps-item>

          <u-steps-item error>
            <view class="step-box flex-a-center-j-space-between" slot="desc">
              <view class="step-box-left">
                <view class="step-box-left-title">张三提交了工作计划</view>
                <view class="step-box-left-time">2021-10-24</view>
              </view>
              <view class="step-box-right">
                <image
                  style="width: 142rpx; height: 142rpx"
                  src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231024_8ba955c4090244b2b39fc32a04255be9.png"
                  mode=""
                />
              </view>
            </view>
          </u-steps-item>

          <u-steps-item>
            <view class="step-box flex-a-center-j-space-between" slot="desc">
              <view class="step-box-left">
                <view class="step-box-left-title">张三提交了工作计划</view>
                <view class="step-box-left-time">2021-10-24</view>
              </view>
              <view class="step-box-right">
                <image
                  style="width: 142rpx; height: 142rpx"
                  src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231024_8ba955c4090244b2b39fc32a04255be9.png"
                  mode=""
                />
              </view>
            </view>
          </u-steps-item>
        </u-steps>
        <!-- 
        <u-steps :current="1" direction="column">
          <u-steps-item title="已下单" desc="10:30"> </u-steps-item>
          <u-steps-item title="已出库" desc="10:35"> </u-steps-item>
          <u-steps-item title="运输中" desc="11:40"></u-steps-item>
        </u-steps> -->
      </view>
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
.user-detail {
  min-height: 100vh;
  width: 100vw;
  background: linear-gradient(180deg, #6377f5 0%, #ffffff 100%);
  padding: 20rpx;
  box-sizing: border-box;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;

  &-info {
    font-size: 24rpx;
    color: #ffffff;

    &-avatar {
      margin-left: 30rpx;
    }

    .right {
      margin-left: 20rpx;

      &-name {
        font-size: 32rpx;
        font-weight: bold;
        color: #ffffff;
        height: 45rpx;
        line-height: 45rpx;
        margin-bottom: 20rpx;
      }

      &-message {
        .message-group {
          flex-wrap: wrap;
          margin-right: 60rpx;

          .message-group-item {
            border-right: 1px solid #ffffff;
            text-align: center;
            padding: 0 10rpx;

            &:last-child {
              border-right: none;
            }
          }
        }
      }
    }
  }

  &-goods {
    margin-top: 40rpx;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 30rpx 40rpx;
    box-sizing: border-box;

    .goods-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20rpx;
    }

    .goods-list {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 20rpx;

      .goods-item {
        padding: 4rpx 16rpx;
        background: rgba(99, 119, 245, 0.3);
        color: #6377f5;
        border-radius: 4rpx;
        margin-right: 20rpx;
      }
    }
  }

  &-function {
    margin-top: 30rpx;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 30rpx 40rpx;
    box-sizing: border-box;

    .function-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20rpx;
    }
  }

  &-schedule {
    margin-top: 30rpx;
    background: #ffffff;
    border-radius: 20rpx;
    padding: 30rpx 40rpx;
    box-sizing: border-box;

    .schedule-title {
      font-size: 28rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20rpx;
    }

    .step-box {
      height: 142rpx;
      padding-left: 24rpx;
      margin-bottom: 40rpx;

      &-left {
        height: 100%;

        &-title {
          margin-bottom: 40rpx;
          font-size: 28rpx;
          color: #333333;
        }

        &-time {
          font-size: 24rpx;
          color: #999999;
        }
      }
    }
  }
}
</style>
