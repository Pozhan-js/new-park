<template>
  <view class="notice-detail">
    <view class="notice-detail-content">
      <view class="detail-title">{{ allData.title }}</view>
      <view class="detail-author-message">
        <view class="name">发布人：{{ allData.name }}</view>
        <view class="time"
          >时间：
          {{ $u.timeFrom(allData.time[0], "yyyy-mm-dd hh:MM:ss") }}</view
        >
      </view>
      <view class="detail-content-text">
        <u-parse :content="allData.content"></u-parse>
      </view>
      <view class="detail-bottom">
        <view class="address">发表于长江友邻</view>
        <view class="reader-num flex-a-center">
          <view>已阅读</view>
          <u-avatar-group :urls="urls" size="18" gap="0.4"> </u-avatar-group>
          <view>{{ allData.read_num || 0 }}次</view></view
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      msg: "公告详情",
      urls: [
        "https://cdn.uviewui.com/uview/album/1.jpg",
        "https://cdn.uviewui.com/uview/album/2.jpg",
        "https://cdn.uviewui.com/uview/album/3.jpg",
      ],
      allData: {
        time: [""],
      },
    };
  },
  onLoad() {
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    // 监听其他页面传递过来的数据
    eventChannel.on("mainPageDetail", function ({ data }) {
      //   console.log(data);
      that.allData = data;
    });
    eventChannel.on("noticeListPageDetail", function ({ data }) {
      //   console.log(data);
      that.allData = data;
    });
  },
};
</script>

<style lang="scss" scoped>
.notice-detail {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;

  &-content {
    margin-top: 28rpx;
    width: 658rpx;

    .detail-title {
      width: 100%;
      font-size: 38rpx;
      color: #000000;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box; //作为弹性伸缩盒子模型显示。
      -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
      -webkit-line-clamp: 2; //显示的行
    }

    .detail-author-message {
      // display: flex;
      // justify-content: flex-start;
      margin-top: 20rpx;

      .name {
        font-size: 28rpx;
        font-weight: 400;
        color: #000000;
        margin-right: 30rpx;
      }

      .time {
        font-size: 28rpx;
        font-weight: 400;
        color: #999999;
      }
    }
    // TODO: 详情内容
    .detail-content-text {
      margin-top: 20rpx;
      font-size: 29rpx;
      font-weight: 400;
      color: #636676;
      line-height: 50rpx;
    }

    .detail-bottom {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20rpx;

      .address {
        width: 100%;
        font-size: 28rpx;
        font-weight: 400;
        color: #999999;
        line-height: 40rpx;
      }

      .reader-num {
        margin-top: 10rpx;
        margin-bottom: constant(safe-area-inset-bottom) !important;
        margin-bottom: env(safe-area-inset-bottom) !important;
        width: 100%;
        font-size: 28rpx;
        font-weight: 400;
        color: #999999;
        line-height: 40rpx;

        > view {
          margin-right: 20rpx;
        }
      }
    }
  }
}
</style>
