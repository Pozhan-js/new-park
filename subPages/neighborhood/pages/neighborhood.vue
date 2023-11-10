<template>
  <view class="neighborhood">
    <!-- 轮播图 -->
    <view class="neighborhood-swiper">
      <u-swiper
        :list="newNeighborhoodSwiper"
        keyName="url"
        :loading="false"
        height="320rpx"
        indicator
        indicatorMode="line"
        circular
      >
      </u-swiper>
    </view>
    <!-- tab-->
    <view class="neighborhood-tab">
      <view class="tab-header">
        <u-tabs :list="tabList" @click="clickTab" :lineWidth="60"></u-tabs>
      </view>

      <view class="tab-list" v-if="activityPagesList.length">
        <view
          class="tab-item"
          v-for="(data, index) in activityPagesList"
          :key="index"
          @click="handleToDetail(data, index)"
        >
          <view class="tab-item-left">
            <image :src="data.activity_log" />
          </view>
          <view class="tab-item-right">
            <view class="title text-hidden">{{ data.activity_title }}</view>
            <view class="content">
              <view
                class="content-btn"
                v-if="data.activity_time[1] > new Date().getTime()"
                >立即报名</view
              >
              <view class="content-item">
                <view class="content-item-icon">
                  <u-icon name="map" size="24rpx"></u-icon>
                </view>
                <view class="content-item-text text-hidden">{{
                  data.activity_locations
                }}</view>
              </view>
              <view class="content-item">
                <view class="content-item-icon">
                  <u-icon name="clock" size="24rpx"></u-icon>
                </view>
                <view class="content-item-text">{{
                  $u.timeFrom(data.activity_time[0], "yyyy-mm-dd hh:MM:ss")
                }}</view>
              </view>
              <view class="content-item">
                <view class="content-item-icon"></view>
                <u-avatar-group
                  :urls="data.activity_avatar"
                  size="18"
                  gap="0.5"
                >
                </u-avatar-group>
                <view class="content-item-text"
                  >{{ data.people_num }} 人已报名</view
                >
              </view>
            </view>
          </view>
        </view>
      </view>

      <view class="empty" v-else>
        <u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/data.png">
        </u-empty>
      </view>
    </view>
    <!-- 底部导航栏 -->
    <u-tabbar
      :value="value6"
      @change="handleClick"
      :fixed="true"
      activeColor="#6377F5"
      :placeholder="true"
      :safeAreaInsetBottom="true"
    >
      <u-tabbar-item
        v-for="item in tabbarList"
        :key="item.text"
        :text="item.text"
        :icon="item.isActive ? item.activeUrl : item.url"
      ></u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      msg: "邻里活动",
      bannerList: [],
      tabList: [
        {
          name: "最新活动",
        },
        {
          name: "往期活动",
        },
      ],
      activityPagesList: [],
      // 底部导航栏数据
      value6: 0,
      tabbarList: [
        {
          url: "/static/image/tabbar/neighborhood/tabbar02.png",
          activeUrl: "/static/image/tabbar/neighborhood/tabbar01.png",
          pageUrl: "./neighborhood",
          text: "首页",
          name: 0,
          isActive: true,
        },
        {
          url: "/static/image/tabbar/neighborhood/tabbar05.png",
          activeUrl: "/static/image/tabbar/neighborhood/tabbar06.png",
          pageUrl: "./neighborhood-release",
          text: "发布",
          name: 1,
          isActive: false,
        },
        {
          url: "/static/image/tabbar/neighborhood/tabbar04.png",
          activeUrl: "/static/image/tabbar/neighborhood/tabbar03.png",
          text: "我的",
          pageUrl: "./neighborhood-my",
          name: 2,
          isActive: false,
        },
      ],
    };
  },
  computed: {
    // ...mapState("neighborhood", ["activityList"]),
    ...mapGetters("neighborhood", ["newNeighborhoodSwiper", "newActivityList"]),
  },
  methods: {
    ...mapActions("neighborhood", ["getBannerList", "getActivityList"]),

    // 点击tab切换
    clickTab(e) {
      switch (e.name) {
        case "最新活动":
          this.activityPagesList = this.newActivityList.filter((item) => {
            return (
              item.activity_time[0] < new Date().getTime() &&
              item.activity_time[1] > new Date().getTime()
            );
          });
          break;
        case "往期活动":
          this.activityPagesList = this.newActivityList.filter((item) => {
            return item.activity_time[1] < new Date().getTime();
          });
          break;
        default:
          break;
      }
    },

    // 活动详情
    handleToDetail(data) {
      uni.navigateTo({
        url: `/subPages/neighborhood/detail/detail?id=${data._id}&collectID=${
          data.collectId || ""
        }&joinID=${data.joinId || ""}`,
      });
    },
    //tabbr点击事件
    handleClick(name) {
      //   console.log(name);
      this.tabbarList.forEach((item) => {
        if (item.name === name) {
          item.isActive = true;
          uni.redirectTo({
            url: item.pageUrl,
          });
        } else {
          item.isActive = false;
        }
      });
      this.value6 = name;
    },
  },
  watch: {
    // 监听活动列表
    newActivityList(val) {
      this.activityPagesList = val.filter((item) => {
        return (
          item.activity_time[0] < new Date().getTime() &&
          item.activity_time[1] > new Date().getTime()
        );
      });
    },
  },
  onShow() {
    // this.getActivityList();
  },
  onLoad() {
    this.getBannerList();
    this.getActivityList();
  },
};
</script>

<style lang="scss" scoped>
.neighborhood {
  height: 100vh;
  padding: 32rpx;
  padding-bottom: 96rpx;
  box-sizing: border-box;
  background-color: #f5f8fc;

  &-tab {
    height: calc(100vh - 384rpx);
    background-color: #f5f8fc;
    position: relative;
    overflow-y: auto;

    .tab-header {
      padding-bottom: 20rpx;
      position: sticky;
      top: 0;
      z-index: 99;
      background-color: #f5f8fc;
    }

    .tab-list {
      background: #ffffff;
      border-radius: 17rpx;
      padding: 12rpx 32rpx;
      box-sizing: border-box;

      .tab-item {
        padding: 32rpx 0;
        box-sizing: border-box;
        display: flex;
        border-bottom: 1px solid #d8d8d8;

        &:last-child {
          border-bottom: none;
        }

        &-left {
          width: 250rpx;
          height: 208rpx;
          border-radius: 9rpx;
          margin-right: 24rpx;
          flex-shrink: 0;

          > image {
            width: 100%;
            height: 100%;
          }
        }

        &-right {
          width: 100%;
          height: 100%;
          overflow: hidden;

          .title {
            width: 100%;
            display: inline-block;

            height: 46rpx;
            font-size: 33rpx;
            color: #333333;
            line-height: 46rpx;
            overflow: hidden; //超出的文本隐藏
            text-overflow: ellipsis; //溢出用省略号显示
            white-space: nowrap; //溢出不换行
          }

          .content {
            width: 100%;
            margin-top: 22rpx;
            position: relative;

            &-item {
              width: 100%;
              display: flex;
              margin-top: 10rpx;
              align-items: center;

              &-icon {
                // width: 32rpx;
                margin-right: 10rpx;

                &:last-child {
                  display: flex;
                  flex: 1;
                }

                > image {
                  width: 42rpx;
                  height: 41rpx;
                }
              }

              &-text {
                // width: 150rpx;
                font-size: 25rpx;
                color: #999999;
                line-height: 38rpx;
              }
            }
          }

          .content-btn {
            position: absolute;
            top: 40rpx;
            right: 0;
            display: inline-block;
            font-size: 25rpx;
            color: #ffffff;
            width: 125rpx;
            height: 50rpx;
            text-align: center;
            line-height: 50rpx;
            background: #6377f5;
            border-radius: 8rpx;
          }
        }
      }
    }
  }
}
</style>
