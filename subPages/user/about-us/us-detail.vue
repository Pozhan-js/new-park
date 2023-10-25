<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-24 16:42:26
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-24 17:13:19
 * @FilePath: /smart-park/subPages/user/about-us/us-detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE 
-->
<template>
  <view class="us-detail">
    <u-loading-page
      loading-text="全力加载中..."
      :loading="loadingPage"
    ></u-loading-page>

    <view class="detail-title">{{ detailData.title }}</view>
    <view class="detail-time">{{
      $u.timeFrom(detailData.creatorTime, "yyyy-mm-dd")
    }}</view>

    <view class="detail-content">
      <u-parse :content="detailData['rich-content']"></u-parse>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      loadingPage: true,
      detailData: {},
    };
  },
  onLoad() {
    this.loadingPage = true;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on("usPageDetail", ({ data }) => {
      console.log(data);
      this.detailData = data;

      this.$nextTick(() => (this.loadingPage = false));
    });
  },
};
</script>

<style lang="scss" scoped>
.us-detail {
  width: 100vw;
  height: fit-content;
  min-height: 100vh;
  background: #f4f5f7;
  padding: 30rpx;
  box-sizing: border-box;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;

  .detail-title {
    font-size: 36rpx;
    font-weight: bold;
    color: #333333;
    margin-bottom: 20rpx;
  }

  .detail-time {
    font-size: 24rpx;
    color: #666;
    margin-bottom: 20rpx;
  }
}
</style>
