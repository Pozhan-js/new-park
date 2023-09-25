<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-24 15:36:32
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-08-24 17:17:50
 * @FilePath: /smart-park/subPages/guide/guide.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="guide">
    <view class="guide-header">
      <view class="guide-header-content flex-a-center">
        <image
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230824_348e4e58df114379818f88d415f7b141.png"
          mode=""
        />
        <view class="content">
          <view class="content-title">办事指南</view>
          <view class="content-text">数据多跑路 群众少跑腿</view>
        </view>
      </view>
    </view>
    <view class="guide-container">
      <view
        class="guide-container-item flex-a-center"
        @click="handleToDetail(data)"
        v-for="data in guideListData"
        :key="data._id"
      >
        <image
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230824_fe86359dd66e42699d386ccf4a79e962.png"
          mode=""
        />
        <view class="item-content-left">
          <view class="title">{{ data.guide_title }}</view>
          <view class="text">{{ data.guide_description }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
export default {
  data() {
    return {
      guideListData: [],
    };
  },
  methods: {
    // 跳转到详情页
    handleToDetail(data) {
      uni.navigateTo({
        url: `/subPages/guide/detail/detail`,
        success: (res) => {
          res.eventChannel.emit("guidePagesData", { data });
        },
      });
    },
    // 获取数据
    async getGuideListData() {
      const resGuideData = await getModelList("64e719ced85a4b7b32ec5d5c");
      this.guideListData = resGuideData.data?.list;
      //   console.log(res);
    },
  },
  onLoad() {
    this.getGuideListData();
  },
};
</script>

<style lang="scss" scoped>
.guide {
  width: 100vw;
  min-height: 100vh;

  &-header {
    height: 380rpx;
    background: #6377f5;
    position: relative;

    &-content {
      position: absolute;
      left: 45rpx;
      bottom: 0;
      //   text-align: center;

      > image {
        width: 286rpx;
        height: 254rpx;
      }

      .content {
        margin-left: 30rpx;
        color: #fff;

        .content-title {
          font-size: 36rpx;
          font-weight: bold;
        }

        .content-text {
          font-size: 24rpx;
          margin-top: 10rpx;
        }
      }
    }
  }

  &-container {
    box-sizing: border-box;
    padding: 20rpx;

    margin-bottom: constant(safe-area-inset-bottom) !important;
    margin-bottom: env(safe-area-inset-bottom) !important;

    &-item {
      width: 100%;
      height: 160rpx;
      background: #f2f9ff;
      box-shadow: 0rpx 3rpx 14rpx 1rpx rgba(143, 143, 143, 0.2);
      border-radius: 20rpx;
      margin-bottom: 30rpx;

      > image {
        width: 50rpx;
        height: 72rpx;
        margin-left: 40rpx;
      }

      .item-content-left {
        margin-left: 20rpx;
        .title {
          font-size: 32rpx;
          font-weight: bold;
          color: #333333;
        }

        .text {
          font-size: 24rpx;
          color: #969dab;
          margin-top: 10rpx;
        }
      }
    }
  }
}
</style>