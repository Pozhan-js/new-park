<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-10 09:58:39
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-17 17:11:29
 * @FilePath: /smart-park/subPages/main/activity/activity-list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="activity-list padding-30">
    <view
      class="activity-item"
      v-for="(item, _) in newActivityList"
      :key="_"
      @click="handleToDetail(item)"
    >
      <view class="activity-item-image">
        <image :src="item.activity_log[0]" mode="" />
      </view>
      <view class="activity-item-bottom padding-20">
        <view class="activity-item-bottom-title">
          {{ item.activity_title }}
        </view>
        <view class="activity-item-bottom-date flex-a-center">
          <u-icon name="clock" size="16"></u-icon>
          <view class="time">{{
            $u.timeFormat(item.hold_date, "yyyy-mm-dd") ||
            "" + " " + item.hold_time ||
            ""
          }}</view>
        </view>
        <view class="activity-item-bottom-address flex-a-center">
          <u-icon name="map" size="16"></u-icon>
          <view class="address">{{ item.activity_locations || "未知" }}</view>
        </view>
      </view>
      <!-- 图标 -->
      <view class="activity-item-icon flex-a-center" v-if="isActivityEnd(item)">
        <image
          :src="imgMap['活动已结束']"
          style="width: 25rpx; height: 25rpx"
        ></image>
        <view>活动已结束</view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      activityList: [],
      imgMap: {
        已参与活动:
          "https://kindoucloud.com:8011/api/file/Image/systemicon/ycj/20221129_82aedfb821f64f02a1c776255fc0676a.png",
        活动已结束:
          "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231017_e1788b1b1dde43269b596fd59d9496cb.png",
        待参与活动:
          "https://kindoucloud.com:8011/api/file/Image/systemicon/ycj/20221127_f923f1f7ddcd40579c42477ac84d8502.png",
      },
      // 活动状态
      // activeStatus: "",
    };
  },
  computed: {
    ...mapGetters("neighborhood", ["newActivityList"]),
  },
  methods: {
    // 跳转到活动详情页
    // 活动详情
    handleToDetail(data) {
      uni.navigateTo({
        url: `/subPages/neighborhood/detail/detail?id=${data._id}&collectID=${
          data.collectId || ""
        }&joinID=${data.joinId || ""}`,
      });
    },

    // 判断活动是否结束
    isActivityEnd(item) {
      let now = new Date().getTime();
      let endTime = item.hold_date;

      return now > endTime;
    },
  },
  onShow() {},
  onLoad() {
    // const eventChannel = this.getOpenerEventChannel();
    // // 监听其他页面传递过来的数据
    // eventChannel.on("mainPageActivityList", ({ data }) => {
    //   this.activityList = data;
    // });
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
    position: relative;

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

    &-icon {
      background-color: #cccccc;

      padding: 10rpx 30rpx;
      border-radius: 0rpx 15rpx 0rpx 15rpx;
      position: absolute;
      z-index: 10;
      top: 0;
      right: 0;

      > view {
        color: #fff;
        font-size: 24rpx;
        margin-left: 10rpx;
      }
    }
  }
}
</style>
