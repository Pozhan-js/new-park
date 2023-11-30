<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-26 11:16:27
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-24 15:18:59
 * @FilePath: /smart-park/subPages/user/user-activity/user-activity.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="user-activity padding-30">
    <u-loading-page
      loading-text="全力加载中..."
      :loading="loadingPage"
    ></u-loading-page>
    <view
      class="activity-item"
      v-for="(item, _) in activityDataList"
      :key="_"
      @click="handleToDetail(item)"
    >
      <view class="activity-item-image">
        <image :src="getImageUrl(item.activity_log[0].url)" mode="" />
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

    <view v-if="!activityDataList.length" style="margin-top: 35vh">
      <u-empty mode="list" text="您暂无参加活动哦~">
        <u-button
          size="small"
          type="primary"
          :style="{ marginTop: 10 + 'px' }"
          text="查看更多活动"
          @click="goActiveList"
        >
        </u-button>
      </u-empty>
    </view>
  </view>
</template>

<script>
import userMixin from "@/common/mixins/user";
import infoMixin from "@/common/mixins/info";
import { getRequestFilter } from "@/common/function";
import { getModelList } from "@/api";
export default {
  mixins: [userMixin, infoMixin],
  data() {
    return {
      activityIdList: [],
      activityDataList: [],
      loadingPage: false,
    };
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

    goActiveList() {
      uni.redirectTo({
        url: "/subPages/main/activity/activity-list",
      });
    },

    // 获取图片路径
    getImageUrl(url) {
      return this.$helper.filterCover(url);
    },

    // 判断活动是否结束
    isActivityEnd(item) {
      let now = new Date().getTime();
      let endTime = item.hold_date;

      return now > endTime;
    },
    //获取该用户报名的活动
    async getUserActivity() {
      this.loadingPage = true;
      const { data } = await getModelList(
        "64e2cb13d85a4b7b32ec579c",
        getRequestFilter({ creatorUserId: this.userInfo.id })
      );
      this.activityIdList = data?.list.map((item) => item.activity_id);
      // 获取所有活动然后进行筛选
      const activityList = await getModelList("64dc41e943432c56038f3005");
      this.activityDataList = activityList.data?.list.filter((item) => {
        return this.activityIdList.includes(item._id);
      });

      this.loadingPage = false;
    },
  },
  onLoad() {
    this.getUserActivity();
  },
};
</script>

<style lang="scss" scoped>
.user-activity {
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
