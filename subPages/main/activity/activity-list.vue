<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-10 09:58:39
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-16 14:47:57
 * @FilePath: /smart-park/subPages/main/activity/activity-list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="activity-list padding-30">
    <view
      class="activity-item"
      v-for="(item, _) in activityList"
      :key="_"
      @click="toActivityDetailPage(item)"
    >
      <view class="activity-item-image">
        <image :src="item.image" mode="" />
      </view>
      <view class="activity-item-bottom padding-20">
        <view class="activity-item-bottom-title">
          {{ item.activity_title }}
        </view>
        <view class="activity-item-bottom-date flex-a-center">
          <u-icon name="clock" size="16"></u-icon>
          <view class="time"
            >{{ item.activity_hold_date || "" }}
            {{ item.activity_hold_time || "" }}</view
          >
        </view>
        <view class="activity-item-bottom-address flex-a-center">
          <u-icon name="map" size="16"></u-icon>
          <view class="address">{{ item.address || "未知" }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      activityList: [],
    };
  },
  methods: {
    // 跳转到活动详情页
    toActivityDetailPage(item) {
      uni.navigateTo({
        url: "/subPages/main/activity/activity-detail",
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit("mainPageActivityDetail", {
            data: item,
          });
        },
      });
    },
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    // 监听其他页面传递过来的数据
    eventChannel.on("mainPageActivityList", ({ data }) => {
      //   console.log(data);
      this.activityList = data;
    });
  },
};
</script>

<style lang="scss" scoped>
.activity-list {
  width: 100vw;
  min-height: 100vh;
  background-color: #f3f6fd;

  .activity-item {
    width: 100%;
    background: #ffffff;
    box-shadow: 0rpx 3rpx 10rpx 1rpx rgba(174, 174, 174, 0.16);
    border-radius: 20rpx;
    margin-bottom: 40rpx;
    overflow: hidden;

    &-image {
      width: 100%;
      height: 238rpx;

      > image {
        width: 100%;
        height: 100%;
      }
    }

    &-bottom {
      font-size: 22rpx;
      color: #999999;

      &-title {
        height: 40rpx;
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
        line-height: 40rpx;
      }

      > view {
        margin-bottom: 6rpx;

        .time {
          margin-left: 10rpx;
        }

        .address {
          margin-left: 10rpx;
        }
      }
    }
  }
}
</style>
