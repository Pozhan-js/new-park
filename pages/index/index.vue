<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-05-29 16:07:39
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-17 09:57:53
 * @FilePath: /smart-park/pages/index/index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="pages">
    <!-- 导航栏 -->
    <u-status-bar bgColor="#FFF"></u-status-bar>

    <view class="top-app flex-a-center-j-space-between">
      <view class="park-name">长江友邻社区</view>
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
        <view
          class="pages-content-business-item box2 padding-20 flex-center"
          @click="toOwnerAutonomy"
        >
          <view class="item-content flex-a-center">
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
          @click="toMarket"
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
      <view class="pages-content-feature" v-if="baseList">
        <u-grid :border="false" col="4">
          <template v-for="(item, index) in baseList">
            <u-grid-item @click="clickGridItem(item)" :key="index">
              <image
                :src="item.menueIcon"
                mode=""
                :style="{
                  width: '110rpx',
                  height: '110rpx',
                  marginTop: '20rpx',
                }"
              />
              <text class="grid-text">{{ item.menueItem }}</text>
            </u-grid-item>
          </template>
        </u-grid>
      </view>
      <!-- 公告 -->
      <view class="pages-content-placard">
        <view class="placard-header">
          <view class="placard-header-left">社区公告</view>
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
          <view class="activity-header-left">社区活动</view>
          <view class="activity-header-right">
            <view class="right-text" @click="toActivityListPage(newActivities)"
              >更多
            </view>
            <u-icon size="24rpx" name="arrow-right"></u-icon>
          </view>
        </view>
        <!-- 活动内容 -->
        <view
          class="activity-content flex-a-center"
          v-for="item in newActivities"
          :key="item.id"
          @click="toActivityDetailPage(item)"
        >
          <view class="activity-content-left">
            <image :src="item.image" mode="" />
          </view>
          <view class="activity-content-right">
            <view class="right-title text-1-hidden">
              {{ item.activity_title }}
            </view>
            <view class="right-container">
              <view class="right-container-item flex-a-center">
                <u-icon name="clock" size="16" color="#999"></u-icon>
                <view class="item-text">{{ item.activity_apply_start }}</view>
              </view>
              <view class="right-container-item flex-a-center">
                <u-icon name="map" size="16" color="#999"></u-icon>
                <view class="item-text">{{ item.address }}</view>
              </view>
              <view class="right-container-item flex-a-center">
                <!-- <u-avatar-group :urls="item.avatar" size="18" gap="0.4">
              </u-avatar-group> -->
                <view class="item-text"
                  >{{ item.number_applicants }}人已报名</view
                >
              </view>
            </view>
          </view>
          <!-- 按钮 -->
          <!-- <view class="activity-btn">立即报名</view> -->
        </view>
      </view>

      <view-tabbar tabIndex="0"></view-tabbar>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
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
      // baseList: [
      //   {
      //     imageUrl:
      //       "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230804_015444438cf747d88d58855b2d7e7ff8.png",
      //     title: "小区公告",
      //     path: "/subPages/main/notice/notice-list",
      //   },
      //   {
      //     imageUrl:
      //       "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230804_5451bb83bd8640bead6254247a8835da.png",
      //     title: "邻里活动",
      //     path: "/subPages/neighborhood/pages/neighborhood",
      //   },
      //   {
      //     imageUrl:
      //       "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230804_e36a480215e34879a8187092703a292c.png",
      //     title: "办事指南",
      //     path: "/subPages/guide/guide",
      //   },
      //   {
      //     imageUrl:
      //       "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230804_4f3e5dfa5f1342589c68c1334c69e8b8.png",
      //     title: "友邻市场",
      //     path: "/subPages/market/pages/index",
      //   },
      //   {
      //     imageUrl:
      //       "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230919_4dfe8d5d6246482887157e52811b77ba.png",
      //     title: "民意投票",
      //     path: "/subPages/owner-autonomy/vote/vote",
      //   },
      //   {
      //     imageUrl:
      //       "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230919_0c7c29911816404c865e55878d6d3b97.png",
      //     title: "电梯安全",
      //     path: "/subPages/owner-autonomy/elevator-safety/elevator-safety",
      //   },
      //   {
      //     imageUrl:
      //       "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230919_c6b38442ed5845b68d76b23a4396c18e.png",
      //     title: "故障统计",
      //     path: "/subPages/owner-autonomy/fault/fault-statistics",
      //   },
      //   // {
      //   //   imageUrl:
      //   //     "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230804_61237ba98b914a3d84433946db060337.png",
      //   //   title: "助农特产",
      //   //   path: "./",
      //   // },
      //   // {
      //   //   imageUrl:
      //   //     "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230804_90c53937f86a49ea9141ecc72b79c9a8.png",
      //   //   title: "律师咨询",
      //   //   path: "/subPages/legal-advice/legal-advice",
      //   // },

      //   // {
      //   //   imageUrl:
      //   //     "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230804_49d47bdaf3d2401fb123ceda0db26e35.png",
      //   //   title: "养老健康",
      //   //   path: "./",
      //   // },

      //   {
      //     imageUrl:
      //       "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230804_f80a0105622549db84c8eaaf08b860cb.png",
      //     title: "更多",
      //     path: "/subPages/main/more/more",
      //   },
      // ],
      baseList: [],
      dataList: [], //公告列表数据
      nowDate: "",
    };
  },
  computed: {
    ...mapState("main", ["banner"]),
    ...mapState("role", ["roleList"]),
    ...mapGetters("main", ["newBanner", "newActivities"]),
    // 公告列表数据
    filterDataList() {
      let arrIsTop = [];
      let arrNotTop = [];
      this.dataList.map((item) => {
        if (item.top === "是") {
          arrIsTop.push(item);
        } else {
          arrNotTop.push(item);
        }
      });
      arrIsTop.sort((a, b) => {
        return b.lastModifyTime - a.lastModifyTime;
      });
      arrNotTop.sort((a, b) => {
        return b.lastModifyTime - a.lastModifyTime;
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
          const data = this.roleList.find((item) => item.name === name);
          return data && data.role.split(",").includes(this.userInfo.roleId[0]);
        }
        return false; // 如果 roleList 或 userInfo 未定义，返回默认值或适当的值
      };
    },
  },
  methods: {
    //获取轮播图数据
    ...mapActions("main", ["getBanner", "getActivity"]),
    ...mapActions("role", ["getMenuRoleList"]),
    // 跳转随手拍
    toSayPage() {
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
        uni.navigateTo({
          url: item.menuePath,
        });
      }
    },
    // 跳转去活动列表页
    toActivityListPage(data) {
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
    //点击公告跳转到公告详情
    toNoticeDetail(item) {
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
    //点击公告跳转到公告列表
    toNoticeList() {
      uni.navigateTo({
        url: `/subPages/main/notice/notice-list`,
      });
    },
    // 跳转到业主自治
    toOwnerAutonomy() {
      uni.navigateTo({
        url: "/subPages/owner-autonomy/owner-autonomy",
      });
    },
    // 跳转到又令市场
    toMarket() {
      uni.showToast({
        title: "暂未开放",
        icon: "none",
      });
    },
    //获取列表数据集
    async getNoticeList() {
      //显示加载框
      uni.showLoading({
        title: "加载中",
      });
      const { data } = await getModelList("64d2f5525d3fa95536f04c02");

      // console.log(data);
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

      //  this.filterDataList = this.dataList
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

      this.baseList = result.data?.list[0].tableField103.filter((item) => {
        return this.getRole(item.menueItem);
      });
    },
    getRole(name = "") {
      let data = this.roleList?.find((item) => item.name == name);
      return data.role.split(",").includes(this.userInfo.roleId[0]);
    },
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
  },
  mounted() {
    // 当组件挂载时执行
    this.getBanner({ pageSize: 10 });

    // 获取活动数据
    this.getActivity();
  },
  async created() {},
  async onShow() {
    this.getNowDate();
    // 当组件创建时执行
    this.getMenuRoleList();
    this.getMeuList();
    this.getNoticeList();
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
        margin-top: 18rpx;
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
        padding: 20rpx;
        margin-bottom: 20rpx;

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
  font-size: 18px;
  color: #909399;
  padding: 10rpx 0 20rpx 0rpx;
  /* #ifndef APP-PLUS */
  box-sizing: border-box;
  /* #endif */
}
</style>
