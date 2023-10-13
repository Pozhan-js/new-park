<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-24 15:36:47
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-11 14:56:52
 * @FilePath: /smart-park/subPages/guide/detail/detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="guide-detail">
    <!-- :title="detailData.guide_title" -->
    <u-navbar
      :title="detailData.guide_title"
      :placeholder="true"
      color="#000"
      :autoBack="true"
    ></u-navbar>
    <view class="guide-detail-container">
      <view
        class="container-item"
        v-for="(data, index) in detailData.tableField103"
        :key="data.step_title"
      >
        <view class="container-item-header">
          {{ "step." + `${index + 1}`.padStart(2, "0") }}
          {{ data.step_title }}</view
        >
        <view class="container-item-body">
          <text :user-select="true">{{ data.step_content }}</text>
        </view>
        <image :src="imageUrlList[index]" mode="" />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      detailData: {},
    };
  },
  computed: {
    dataList() {
      return this.detailData.tableField103 || [];
    },
    imageUrlList() {
      return (
        this.detailData?.imageUrl?.map((item) => {
          return this.$helper.filterCover(item.url);
        }) || []
      );
    },
  },
  onLoad() {
    const EventChannel = this.getOpenerEventChannel();
    EventChannel.on("guidePagesData", ({ data }) => {
      this.detailData = data;
    });
  },
};
</script>

<style lang="scss" scoped>
.guide-detail {
  min-height: 100vh;
  background: #fafafa;
  padding: 30rpx;
  box-sizing: border-box;

  &-container {
    .container-item {
      margin-bottom: 30rpx;
      background: #ffffff;

      &-header {
        padding-left: 30rpx;
        box-sizing: border-box;
        line-height: 96rpx;
        height: 96rpx;
        font-size: 32rpx;
        font-weight: bold;
        color: #ffffff;
        background: #6377f5;
        box-shadow: 0rpx 3rpx 14rpx 1rpx rgba(143, 143, 143, 0.1);
        border-radius: 10rpx 10rpx 0rpx 0rpx;
      }

      &-body {
        padding: 20rpx 30rpx;
        box-sizing: border-box;
        // background: #ffffff;
        font-size: 26rpx;
        color: #333333;
        border-radius: 0rpx 0rpx 10rpx 10rpx;
      }
    }
  }
}
</style>
