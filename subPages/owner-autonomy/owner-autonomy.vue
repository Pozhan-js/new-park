<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-25 11:16:14
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-20 11:31:53
 * @FilePath: /smart-park/subPages/owner-autonomy/owner-autonomy.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="owner-autonomy">
    <view class="owner-autonomy-swiper">
      <u-swiper
        :list="bannerList"
        keyName="url"
        :loading="false"
        height="320rpx"
        indicator
        indicatorMode="line"
        circular
      >
      </u-swiper>
    </view>

    <!-- 社区功能分类 -->
    <view class="owner-autonomy-features-type">
      <view
        class="features-type-item"
        v-for="(item, index) in featuresList"
        :key="index"
        @click="handleClickFeat(item)"
      >
        <view class="image">
          <image :src="item.url" style="width: 100%; height: 100%" />
        </view>
        <view class="docs">{{ item.text }}</view>
      </view>
    </view>

    <!-- 社区公告 -->
    <view class="owner-autonomy-placard">
      <view class="placard-header">
        <view class="placard-header-left">小区公告</view>
        <view class="placard-header-right">
          <view class="right-text" @click="toNoticeList">更多 </view>
          <u-icon size="24rpx" name="arrow-right"></u-icon>
        </view>
      </view>
      <view class="placard-content" @click="toNoticeDetail(newNotice[0])">
        <view class="placard-content-left">
          <view class="placard-content-left-top">
            <view class="left-top-title text-2-hidden">{{
              newNotice[0].title
            }}</view>
          </view>
          <view class="placard-content-left-bottom"
            >公告 {{ $u.timeFrom(newNotice[0].time[0], "yyyy-mm-dd") }}</view
          >
        </view>
        <view class="placard-content-right">
          <image :src="newNotice[0].image" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      bannerList: [],
      featuresList: [
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230825_189b1d916a1d49f6822e514cc6253ff3.png",
          text: "业主决策",
          path: "./decision/decision-list",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230825_91f65613df404e70a33653e6d2428be8.png",
          text: "财务公开",
          path: "./finance/pages/finance",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230825_07a5b407cb7643b493a53cd93ba6bce8.png",
          text: "电梯安全",
          path: "./elevator-safety/elevator-safety",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230825_b3096cad18b24371934c48bf9ac61dad.png",
          text: "故障统计",
          path: "./fault/fault-statistics",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230825_335144715b454953a2eebe3e14b9e08a.png",
          text: "小区公告",
          path: "../main/notice/notice-list",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230825_ff36c3cb031e489cbda258ccd9911f69.png",
          text: "调查问卷",
          path: "./questionnaire/questionnaire-list",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230825_665225c1ff7c46babff07f01b39068a1.png",
          text: "民意投票",
          path: "./vote/vote",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230825_d09277a1e4164d45869b55ec6810d15f.png",
          text: "更多",
          path: "./",
        },
      ],
      decisionList: [],
    };
  },
  computed: {
    ...mapGetters("main", ["newNotice"]),
    // 展示到首页的决策信息
    toDecisionData() {
      return {
        ...this.decisionList[0],
        decision_image: this.$helper.filterCover(
          this.decisionList[0]?.decision_image[0].url
        ),
      };
    },
  },
  methods: {
    // 点击单个应用图标
    handleClickFeat(data) {
      if (data.path == "./") {
        uni.showToast({
          title: "暂未开放",
          icon: "none",
        });
      } else {
        uni.navigateTo({
          url: data.path,
        });
      }
    },
    // 跳转到决策列表页
    handleMoreDecision() {
      uni.navigateTo({
        url: "./decision/decision-list",
      });
    },
    // 跳转到公告列表
    toNoticeList() {
      uni.navigateTo({
        url: `/subPages/main/notice/notice-list`,
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
    // 获取轮播图数据
    async getBannerDataList() {
      const bannerListData = await getModelList("64e84838d85a4b7b32ec5f1d");
      // console.log("列表数据", decisionList);
      this.bannerList = bannerListData?.data.list.map((item) => {
        return {
          ...item.banner_image[0],
          url: this.$helper.filterCover(item.banner_image[0]?.url),
        };
      });
    },
  },
  onLoad() {
    this.getBannerDataList();
  },
};
</script>

<style lang="scss" scoped>
.owner-autonomy {
  width: 100vw;
  height: 100vh;
  padding: 32rpx;
  background-color: #f4f8ff;
  box-sizing: border-box;

  // 轮播图
  &-swiper {
    width: 100%;
    overflow: hidden;
    z-index: 10;
    box-sizing: border-box;
    background: linear-gradient(#fff 0%, #fff 50%, #f3f6fd 51%, #f3f6fd 100%);
  }

  // 社区功能分类
  &-features-type {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10rpx;

    .features-type-item {
      width: 170rpx;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      padding-top: 22rpx;
      .image {
        width: 72rpx;
        height: 72rpx;
      }
      .docs {
        width: 170rpx;
        height: 50rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #252b50;
        line-height: 50rpx;
        text-align: center;
      }
    }
  }

  // 社区公告
  &-placard {
    width: 100%;
    height: 254rpx;
    margin-top: 32rpx;
    background-color: #fff;
    box-sizing: border-box;
    border-radius: 8rpx;
    padding: 16rpx;

    .placard-header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10rpx;

      &-left {
        width: 133rpx;
        height: 50rpx;
        font-size: 33rpx;
        font-weight: 500;
        color: #252b50;
        line-height: 50rpx;
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
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      border-radius: 8rpx;
      // padding: 9rpx;
      display: flex;
      justify-content: space-between;
      flex: 1;

      &-left {
        width: calc(100% - 50rpx - 142rpx);
        margin-right: 32rpx;
        &-top {
          display: flex;
          justify-content: space-between;
          flex: 1;
          // align-items: center;

          .left-top-icon {
            width: 67rpx;
            height: 33rpx;
            background: #fff2f2;
            border-radius: 17rpx;
            font-size: 23rpx;
            font-weight: 500;
            text-align: center;
            color: #ff4f4f;
            box-sizing: border-box;
            line-height: 33rpx;
            margin-right: 10rpx;
          }

          .left-top-title {
            // width: 388rpx;
            height: 83rpx;
            font-size: 29rpx;
            font-weight: 500;
            color: #333333;
            line-height: 42rpx;
          }
        }

        &-bottom {
          // width: 169rpx;
          height: 38rpx;
          font-size: 25rpx;
          font-weight: 400;
          color: #999999;
          line-height: 38rpx;
          // padding-left: 66rpx;
          padding-top: 48rpx;
        }
      }

      &-right > image {
        width: 142rpx;
        height: 142rpx;
        border-radius: 8rpx;
      }
    }
  }
}
</style>
