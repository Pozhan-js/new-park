<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-15 09:57:31
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-12 15:01:02
 * @FilePath: /SmartPark/subPages/function/self-government/another/elevator-safety/error-log.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="error-log box-all">
    <view class="error-log-header padding-24">
      <view class="title">长江友邻</view>
      <view class="text">请您及时关注异常通知哦</view>
    </view>

    <view class="error-log-body padding-24">
      <u-steps current="2" dot direction="column">
        <u-steps-item v-for="(item, _) in stepList" :key="_">
          <view class="step-box padding-24" slot="desc">
            <view class="step-box-up flex-a-center-j-space-between">
              <view class="step-box-up-title">{{
                item.elevatorCondition
              }}</view>
              <view class="step-box-up-time">{{
                $u.timeFormat(item.errorTime, "yyyy年mm月dd日")
              }}</view>
            </view>
            <view class="step-box-down flex-a-center-j-space-between">
              <view class="step-box-down-error text-hidden">{{
                item.tooltileContent
              }}</view>
              <view class="step-box-down-addr"
                >反馈人：{{ item.feedbackStaff }}</view
              >
            </view>
          </view>
        </u-steps-item>
      </u-steps>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
export default {
  data() {
    return {
      // 模拟电梯数据
      stepList: [],
    };
  },
  methods: {
    async getErrorData() {
      const { data } = await getModelList("650009584b635d6996a93487");
      this.stepList = data?.list;
    },
  },
  onLoad() {
    this.getErrorData();
  },
};
</script>

<style lang="scss" scoped>
.error-log {
  width: 100vw;

  &-header {
    width: 100%;
    height: 142rpx;
    background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230717_c3faf40b95c2428a8c48c86682b84c74.png");
    background-size: cover;
    color: #fff;

    .title {
      font-size: 32rpx;
    }

    .text {
      font-size: 24rpx;
    }

    > view {
      margin-bottom: 12rpx;
    }
  }
}

.step-box {
  width: 612rpx;
  // height: 133rpx;
  background: #ffffff;
  box-shadow: 0rpx 6rpx 16rpx 1rpx rgba(214, 214, 214, 0.41);
  border-radius: 20rpx;
  margin-bottom: 40rpx;

  &-up {
    margin-bottom: 12rpx;

    &-title {
      font-size: 24rpx;
      font-weight: bold;
      color: #fc0303;
    }

    &-time {
      font-size: 24rpx;
      color: #999999;
    }
  }

  &-down {
    color: #333333;

    &-error {
      font-size: 28rpx;
      font-weight: bold;
      width: 320rpx;
    }

    &-addr {
      font-size: 24rpx;
    }
  }
}
</style>
