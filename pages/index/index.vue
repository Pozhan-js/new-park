<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-05-29 16:07:39
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-09 16:46:03
 * @FilePath: /smart-park/pages/index/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="pages">
    <!-- 导航栏 -->
    <u-status-bar bgColor="#FFF"></u-status-bar>

    <view class="top-app flex-a-center-j-space-between">
      <view class="park-name">东原麓·印长江C区</view>
      <view class="time flex-a-center">
        <image
          style="height: 46rpx; width: 46rpx"
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231016_b5c91c3bd7a04b39a3ba483c07882da8.png"
          mode=""
        />
        <view class="time-date">{{ nowDate }}</view>
      </view>
    </view>
    <!-- <u-sticky>
      <u-navbar bgColor="transparent" placeholder="true">
        <view slot="left" class="flex-a-center">
          <view class="nav-left flex-a-center"
            >长江友邻社区.{{ $u.timeFormat(timestamp, "yyyy年mm月dd日") }}</view
          >
        </view>
      </u-navbar>
    </u-sticky> -->
    <!-- 轮播图 -->
    <view class="pages-swiper padding-20">
      <u-swiper
        :list="newBanner"
        keyName="url"
        :loading="false"
        height="320rpx"
        indicator
        indicatorMode="line"
        circular
      >
      </u-swiper>
    </view>

    <view class="pages-content">
      <!-- 功能分之 -->
      <view class="pages-content-business padding-20">
        <template v-if="isShowItem('随手拍')">
          <view
            class="pages-content-business-item box1 padding-30"
            @click="toSayPage"
          >
            <view class="title">随手拍</view>
            <view class="item-content flex-a-center">
              <view class="item-content-left">
                <view>拍隐患，提意见</view>
                <view>家园因你而美丽</view>
              </view>
              <view class="item-content-right">
                <image
                  src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230804_919e03b098064c52a066abd9fefb6723.png"
                  mode=""
                />
              </view>
            </view>
          </view>
        </template>
        <!--  v-if="isShowItem('业主自治')" -->
        <view
          class="pages-content-business-item box2 padding-20 flex-center"
          v-if="isShowItem('业主自治')"
          @click="toOwnerAutonomy"
        >
          <view class="item-content flex-a-center" @click="toSquarePage">
            <view class="title">业主自治</view>
            <image
              style="width: 110rpx; height: 110rpx; margin-left: 16rpx"
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230919_95288166242f4fe5b7a0036890ec4a57.png"
              mode=""
            />
          </view>
        </view>
        <view
          class="pages-content-business-item box3 padding-20 flex-center"
          v-if="isShowItem('便民广场')"
          @click="toSquarePage"
        >
          <view class="item-content flex-a-center">
            <view class="title">便民广场</view>
            <image
              style="width: 110rpx; height: 110rpx; margin-left: 16rpx"
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230919_0056c216bfcc4da99266c9cfd96db2e2.png"
              mode=""
            />
          </view>
        </view>
      </view>
      <!-- 应用   v-if="getRole(item.menueItem, userInfo.id)"-->
      <view
        class="pages-content-feature"
        v-if="baseList.length && roleList.length"
      >
        <u-grid :border="false" col="4">
          <template v-for="(item, index) in baseList">
            <u-grid-item @click="clickGridItem(item)" :key="index">
              <image
                class="grid-image"
                :style="{
                  width: '100rpx',
                  height: '100rpx',
                  marginTop: '20rpx',
                }"
                :src="item.menueIcon"
                mode=""
              />
              <text class="grid-text">{{ item.menueItem }}</text>
            </u-grid-item>
          </template>
        </u-grid>
      </view>
      <!-- 公告 -->
      <view class="pages-content-placard">
        <view class="placard-header">
          <view class="placard-header-left">小区公告</view>
          <view class="placard-header-right">
            <view class="right-text" @click="toNoticeList">更多 </view>
            <u-icon size="24rpx" name="arrow-right"></u-icon>
          </view>
        </view>
        <view
          class="placard-content flex-a-center-j-space-between"
          v-for="item in topFilterDataList"
          :key="item.id"
          @click="toNoticeDetail(item)"
        >
          <view class="placard-content-right">
            <view class="right-header flex-a-center">
              <view class="right-icon" v-show="item.top">置顶</view>
              <view class="right-title text-2-hidden">
                {{ item.title }}
              </view>
            </view>
            <view class="right-footer flex-a-center">
              <u-icon name="clock" size="16" color="#999"></u-icon>
              <!--TODO 时间转换 $u.timeFrom(`${newNotice[0]?.time[0]}`, "yyyy-mm-dd") -->

              <view class="time">{{ noticeTime(item.time) }}</view>
            </view>
          </view>
          <image :src="item.image" mode="" />
        </view>
      </view>

      <!-- 社区活动 -->
      <view class="pages-content-activity">
        <view class="activity-header">
          <view class="activity-header-left">小区活动</view>
          <view class="activity-header-right">
            <view
              class="right-text"
              @click="toActivityListPage(currentPageActivityList)"
              >更多
            </view>
            <u-icon size="24rpx" name="arrow-right"></u-icon>
          </view>
        </view>
        <!-- 活动内容  -->
        <template v-if="currentPageActivityList.length">
          <view
            class="activity-content flex-a-center"
            v-for="item in currentPageActivityList"
            :key="item._id"
            @click="toActivityDetailPage(item)"
          >
            <view class="activity-content-left">
              <image :src="item.activity_log[0]" mode="" />
            </view>
            <view class="activity-content-right">
              <view class="right-title text-1-hidden">
                {{ item.activity_title }}
              </view>
              <view class="right-container">
                <view class="right-container-item flex-a-center">
                  <u-icon name="clock" size="16" color="#999"></u-icon>
                  <view class="item-text">{{
                    $u.timeFormat(item.hold_date, "yyyy-mm-dd") +
                    " " +
                    item.hold_time
                  }}</view>
                </view>
                <view class="right-container-item flex-a-center">
                  <u-icon name="map" size="16" color="#999"></u-icon>
                  <view class="item-text">{{
                    item.activity_locations || "未知"
                  }}</view>
                </view>
                <view class="right-container-item flex-a-center">
                  <view class="item-text"
                    >限定报名人数
                    <text style="font-size: 32rpx; color: #fb8753">
                      {{ item.people_num }} </text
                    >人</view
                  >
                </view>
              </view>
            </view>
            <!-- 按钮 -->
            <!-- <view class="activity-btn">立即报名</view> -->
          </view>
        </template>

        <!-- 内容为空 -->
        <u-empty
          v-else
          mode="data"
          icon="http://cdn.uviewui.com/uview/empty/list.png"
        >
        </u-empty>
      </view>

      <view-tabbar tabIndex="0"></view-tabbar>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
import storage from "@/common/function/storage";
import helper from "@/common/helper";
import userMixin from "@/common/mixins/user";
import infoMixin from "@/common/mixins/info";
import { mapActions, mapState, mapGetters } from "vuex";
import { getRequestFilter } from "@/common/function";
// import { getRole } from "@/common/function/filter";
export default {
  mixins: [userMixin, infoMixin],
  data() {
    return {
      baseList: [],
      dataList: [], //公告列表数据
      nowDate: "",
    };
  },
  computed: {
    ...mapState("role", ["roleList"]),
    ...mapState("websocket", ["socketTask"]),
    ...mapGetters("main", ["newBanner"]),
    ...mapGetters("neighborhood", ["newActivityList"]),
    // 公告列表数据
    filterDataList() {
      let arrIsTop = [];
      let arrNotTop = [];
      this.dataList?.map((item) => {
        if (item.top === "是") {
          arrIsTop.push(item);
        } else {
          arrNotTop.push(item);
        }
      });
      arrIsTop.sort((a, b) => {
        return b.time[0] - a.time[0];
      });
      arrNotTop.sort((a, b) => {
        return b.time[0] - a.time[0];
      });

      return [...arrIsTop, ...arrNotTop];
    },

    topFilterDataList() {
      return this.filterDataList.filter((item) => item.top === "是");
    },

    noticeTime() {
      //  this.filterDataList[0]?.time[0]
      return (time) => {
        if (time) {
          return uni.$u.timeFrom(time, "yyyy-mm-dd hh:MM:ss");
        }
      };
    },

    isShowItem() {
      return (name) => {
        if (this.roleList && this.userInfo) {
          const data = this.roleList?.find((item) => item.name === name);
          return (
            data &&
            data.role
              .split(",")
              .some((info) => this.userInfo.roleId.includes(info))
          );
        }
        return false; // 如果 roleList 或 userInfo 未定义，返回默认值或适当的值
      };
    },

    currentPageActivityList() {
      return this.newActivityList?.filter((item) => {
        return item.hold_date > new Date().getTime();
      });
    },
  },
  methods: {
    //获取轮播图数据
    ...mapActions("neighborhood", ["getActivityList"]),
    // ...mapActions("websocket", ["startWebSocket"]),
    ...mapActions("main", ["getBanner"]),
    ...mapActions("role", ["getMenuRoleList"]),
    // 跳转随手拍
    toSayPage() {
      if (storage.get("parse") === "未通过") {
        uni.showToast({
          title: "您的账号审批未通过",
          icon: "none",
        });
        return;
      }
      uni.navigateTo({
        url: "/subPages/main/say-some/say-some",
      });
    },
    //应用跳转方法
    clickGridItem(item) {
      if (item.menuePath == "./") {
        uni.showToast({
          title: "暂未开放",
          icon: "none",
        });
      } else {
        if (storage.get("parse") === "未通过") {
          uni.showToast({
            title: "您的账号审批未通过",
            icon: "none",
          });
          return;
        }
        uni.navigateTo({
          url: item.menuePath,
        });
      }
    },
    // 跳转去活动列表页
    toActivityListPage(data) {
      if (storage.get("parse") === "未通过") {
        uni.showToast({
          title: "您的账号审批未通过",
          icon: "none",
        });
        return;
      }
      uni.navigateTo({
        url: "/subPages/main/activity/activity-list",
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit("mainPageActivityList", {
            data,
          });
        },
      });
    },
    // 跳转到活动详情页
    toActivityDetailPage(data) {
      if (storage.get("parse") === "未通过") {
        uni.showToast({
          title: "您的账号审批未通过",
          icon: "none",
        });
        return;
      }
      // 活动详情
      uni.navigateTo({
        url: `/subPages/neighborhood/detail/detail?id=${data._id}&collectID=${
          data.collectId || ""
        }&joinID=${data.joinId || ""}`,
      });
    },
    //点击公告跳转到公告详情
    toNoticeDetail(item) {
      if (storage.get("parse") === "未通过") {
        uni.showToast({
          title: "您的账号审批未通过",
          icon: "none",
        });
        return;
      }
      uni.navigateTo({
        url: `/subPages/main/notice/notice-detail`,
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit("mainPageDetail", {
            data: item,
          });
        },
      });
    },
    // 跳转到广场
    toSquarePage() {
      if (storage.get("parse") === "未通过") {
        uni.showToast({
          title: "您的账号审批未通过",
          icon: "none",
        });
        return;
      }
      uni.navigateTo({
        url: `/subPages/main/square/square`,
      });
    },
    //点击公告跳转到公告列表
    toNoticeList() {
      if (storage.get("parse") === "未通过") {
        uni.showToast({
          title: "您的账号审批未通过",
          icon: "none",
        });
        return;
      }
      uni.navigateTo({
        url: `/subPages/main/notice/notice-list`,
      });
    },
    // 跳转到业主自治
    toOwnerAutonomy() {
      if (storage.get("parse") === "未通过") {
        uni.showToast({
          title: "您的账号审批未通过",
          icon: "none",
        });
        return;
      }
      uni.navigateTo({
        url: "/subPages/owner-autonomy/owner-autonomy",
      });
    },
    // 跳转到又令市场
    // toMarket() {
    //   uni.showToast({
    //     title: "暂未开放",
    //     icon: "none",
    //   });
    // },
    //获取列表数据集
    async getNoticeList() {
      //显示加载框
      uni.showLoading({
        title: "加载中",
      });
      const { data } = await getModelList("64d2f5525d3fa95536f04c02");

      this.dataList = data?.list?.map((item) => {
        return {
          title: item.title,
          image: helper.filterCover(item.cover_picture),
          imageCover: helper.filterCover(
            item["cover_picture_2"] || item["cover_picture"]
          ),
          read_num: item.reade_num,
          content: item.announcement_details,
          id: item._id,
          top: item.is_top,
          name: item.publisher,
          time: item?.activity_time || "",
          createTime: item.creatorTime,
        };
      });

      //隐藏加载框
      uni.hideLoading();
    },
    // 获取首页菜单
    async getMeuList() {
      let filterTypeData = getRequestFilter({
        key: "首页菜单",
      });

      const result = await getModelList(
        "65250f6f388a8c7a0eb9b934",
        filterTypeData
      );

      this.baseList =
        result.data?.list[0].tableField103.filter((item) => {
          return this.getRole(item.menueItem);
        }) || [];
    },
    // 权限判断函数
    getRole(name = "") {
      let data = this.roleList?.find((item) => item.name == name);
      return data?.role
        .split(",")
        .some((data) => this.userInfo.roleId.includes(data));
    },
    // 时间格式化函数
    getNowDate() {
      this.nowDate = `星期${"日一二三四五六".charAt(
        new Date().getDay()
      )}  ${this.$u.timeFormat(new Date(), "hh:MM分")}`;
      setInterval(() => {
        this.nowDate = `星期${"日一二三四五六".charAt(
          new Date().getDay()
        )}  ${this.$u.timeFormat(new Date(), "hh:MM分")}`;
      }, 6000);
    },
    // 监听流程
    // onMessage(res) {
    //   const result = JSON.parse(res?.data || "{}");
    //   console.log("onMessage", result);
    // },
    async getApprove() {
      let filterTypeData = getRequestFilter({
        formUser: this.userInfo.id,
      });

      const { data } = await getModelList(
        "64f6d064d85a4b7b32ec641d",
        filterTypeData
      );
      if (data?.list.length) {
        storage.set("parse", "通过");
      } else {
        uni.showToast({
          title: "您的账号审批未通过",
          icon: "none",
        });
        storage.set("parse", "未通过");
      }
    },
  },
  mounted() {
    // 当组件挂载时执行
    this.getBanner({ pageSize: -1 });
  },
  async onShow() {
    this.getMenuRoleList();
    this.getMeuList();
    this.getNowDate();
    // 当组件创建时执行

    this.getNoticeList();
    // 获取活动
    this.getActivityList();
    // 查找用户是否被审批
    this.getApprove();
  },
};
</script>

<style lang="scss" scoped>
$borderSize: 25rpx;
.pages {
  width: 100vw;
  position: relative;

  &::after {
    content: "";
    width: 100vw;
    height: 365rpx;
    background: linear-gradient(180deg, #6377f5 0%, #ffffff 100%);
    position: absolute;
    top: 0;
    z-index: -1;
  }

  .top-app {
    z-index: 1;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
    padding: 90rpx $borderSize 40rpx $borderSize;

    .park-name {
      margin-right: 15rpx;
      font-weight: bold;
      font-size: 36rpx;
      color: #1f2329;
    }

    .time {
      margin-right: 15rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #636676;
    }
  }

  // 轮播图
  &-swiper {
    width: 100%;
    z-index: 10;
    box-sizing: border-box;
  }

  &-content {
    background-color: $u-bg-color;
    padding-bottom: 200rpx;
    // 功能分支
    &-business {
      display: grid;
      grid-template-columns: 1fr 0.8fr;
      grid-auto-rows: 140rpx;
      gap: 16rpx;

      .box1 {
        grid-column-start: 1;
        grid-row-start: 1;
        grid-row-end: 3;
        background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230804_98232c2424674b6ea8d2c30beaa93bfd.png");
        background-size: 100% 100%;

        .title {
          font-size: 46rpx;
          font-weight: bold;
          color: #6377f5;
          margin-top: 30rpx;
        }

        .item-content {
          &-left {
            font-size: 34rpx;
            color: #6377f5;
            > view {
              margin-bottom: 10rpx;
            }
          }

          &-right {
            width: 110rpx;
            height: 110rpx;
            > image {
              width: 100%;
              height: 100%;
              margin-left: 16rpx;
            }
          }
        }
      }
      .box2 {
        background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230804_adb34187463e49c2b44dc62c67d81e06.png");
        background-size: 100% 100%;

        .item-content {
          // font-size: 50rpx;
          font-weight: bold;
          color: #ff8903;
          .title {
            font-size: 32rpx;
            font-weight: bold;
            color: #ff8903;
          }
        }
      }
      .box3 {
        background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230804_93d2a19b39184efa9c414d692eee0282.png");
        background-size: 100% 100%;

        .item-content {
          // font-size: 50rpx;
          font-weight: bold;
          color: #4ce9c7;

          .title {
            font-size: 32rpx;
            font-weight: bold;
            color: #4ce9c7;
          }
        }
      }

      &-item {
        background-color: #6377f5;
      }
    }

    &-feature {
      margin: 20rpx;
      background: #ffffff;
      box-shadow: 0rpx 6rpx 10rpx 1rpx rgba(229, 229, 229, 0.1);
      border-radius: 20rpx;
    }

    // 公告
    &-placard {
      border-radius: 8rpx;
      margin: 20rpx;
      padding-top: 20rpx;
      margin-top: 20rpx;

      .placard-header {
        display: flex;
        justify-content: space-between;

        &-left {
          height: 50rpx;
          font-size: 34rpx;
          font-weight: 500;
          color: #252b50;
        }

        &-right {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .right-text {
            width: 58rpx;
            height: 42rpx;
            font-size: 29rpx;
            font-weight: 500;
            color: #999999;
            line-height: 42rpx;
            padding: 0 10rpx;
          }
        }
      }
      .placard-content {
        background-color: #fff;
        padding: 20rpx;
        margin-top: 30rpx;
        box-shadow: 0rpx 3rpx 10rpx 1rpx rgba(174, 174, 174, 0.16);
        border-radius: 16rpx;

        > image {
          width: 210rpx;
          height: 184rpx;
          margin-right: 18rpx;
          flex-shrink: 0;
          border-radius: 16rpx;
        }

        &-right {
          height: 184rpx;
          position: relative;

          .right-header {
            font-size: 28rpx;
            font-weight: bold;
            color: #333333;
            display: flex;
            justify-content: space-between;
            align-items: flex-start;

            .right-icon {
              flex-shrink: 0;
              width: 60rpx;
              height: 36rpx;
              background: rgba(255, 0, 0, 0.1);
              border-radius: 8rpx;
              font-size: 24rpx;
              color: #ff0000;
              text-align: center;
              line-height: 36rpx;
              padding: 4rpx 6rpx;
            }

            .right-title {
              font-size: 32rpx;
              margin-left: 10rpx;
            }
          }

          .right-footer {
            position: absolute;
            bottom: 0;
            font-size: 26rpx;
            color: #999999;
            margin-top: 18rpx;
            margin-left: 70rpx;

            .time {
              white-space: nowrap;
              margin-left: 10rpx;
            }
          }
        }
      }
    }

    // 活动
    &-activity {
      border-radius: 8rpx;
      padding-top: 20rpx;
      margin: 20rpx;

      .activity-header {
        display: flex;
        justify-content: space-between;

        &-left {
          // width: 133rpx;
          font-size: 34rpx;
          font-weight: 500;
          color: #252b50;
          flex-shrink: 0;
        }

        &-right {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .right-text {
            width: 58rpx;
            height: 42rpx;
            font-size: 29rpx;
            font-weight: 500;
            color: #999999;
            line-height: 42rpx;
            padding: 0 10rpx;
          }
        }
      }

      .activity-content {
        background-color: #fff;
        margin-top: 18rpx;
        position: relative;
        border-radius: 16rpx;
        box-shadow: 0rpx 3rpx 10rpx 1rpx rgba(174, 174, 174, 0.16);
        padding: 20rpx;
        margin-bottom: 30rpx;

        &-left {
          width: 210rpx;
          height: 184rpx;
          margin-right: 18rpx;
          flex-shrink: 0;

          > image {
            width: 100%;
            height: 100%;
            border-radius: 16rpx;
          }
        }

        &-right {
          font-size: 22rpx;
          color: #999999;

          .right-title {
            // height: 40rpx;
            font-size: 32rpx;
            font-weight: bold;
            color: #333333;
            line-height: 40rpx;
          }

          .right-container {
            &-item {
              margin-top: 16rpx;

              .item-text {
                margin-left: 8rpx;
              }
            }
          }
        }

        .activity-btn {
          position: absolute;
          right: 0;
          top: 80rpx;
          width: 138rpx;
          height: 46rpx;
          background: #6377f5;
          border-radius: 23rpx 0rpx 0rpx 23rpx;
          font-size: 24rpx;
          line-height: 46rpx;
          text-align: center;
          color: #ffffff;
        }
      }
    }
  }
}

.grid-text {
  font-size: 16px;
  color: #909399;
  padding: 10rpx 0 20rpx 0rpx;
  /* #ifndef APP-PLUS */
  box-sizing: border-box;
  /* #endif */
}
</style>
