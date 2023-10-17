<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-25 11:16:14
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-16 18:00:09
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

    <!-- 投票决策 -->
    <view class="owner-autonomy-decision">
      <view class="decision-title">小区决策</view>
      <view class="vote-content" v-if="newDecision">
        <view
          class="vote-content-item"
          @click="
            handleClickItem(newDecision._id, newDecision.decisionRange[1])
          "
        >
          <view class="new-icon">最新</view>
          <view class="flex-a-center">
            <view class="vote-content-item-left">
              <image
                :src="imageUrl(newDecision.decisionLog[0].url)"
                mode="aspectFill"
              />
            </view>
            <view class="vote-content-item-right">
              <view class="title">{{ newDecision.decisionIssue }}</view>

              <view class="icon">
                <view class="number">请根据自主意见投票</view>
              </view>
              <view class="avatar">
                <!-- <u-avatar-group :urls="urls" size="18" gap="0.4"></u-avatar-group> -->
              </view>
            </view>
          </view>

          <view class="vote-chat flex-a-center-j-space-between">
            <view class="chat-item">
              <view>投票率</view>
              <view class="num">{{ newDecision.no }}%</view>
            </view>
            <view class="chat-item">
              <view>投票人数</view>
              <view class="num">{{ newDecision.joinNum }}</view>
            </view>
            <view class="chat-item">
              <view>状态</view>
              <view class="num">{{
                Date.now() < newDecision.decisionRange[1] ? "投票中" : "已结束"
              }}</view>
            </view>
          </view>

          <view class="vote-progress">
            <u-line-progress :percentage="newDecision.no">
              <text class="u-percentage-slot">{{ newDecision.no }}%</text>
            </u-line-progress>
          </view>

          <view class="vote-footer flex-a-center-j-space-between">
            <view
              class="vote-footer-item box"
              @click.stop="handleToChat(newDecision._id)"
            >
              查看统计
            </view>
            <view class="vote-footer-item box">{{
              newDecision.isJoin ? "已参加" : "未参加"
            }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 调查问卷 -->
    <view class="owner-autonomy-questionnaire">
      <view class="questionnaire-title">调查问卷</view>
      <view class="questionnaire-list" v-if="newQuestion">
        <view
          class="questionnaire-item flex-a-center"
          @click="toDetailPage(newQuestion._id)"
        >
          <view class="image">
            <image :src="getImageUrl(newQuestion.url)" mode="" />
          </view>
          <view class="item-right">
            <view class="right-up">{{ newQuestion.outline }}</view>
            <view class="right-down">{{ newQuestion.toast }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import infoMixin from "@/common/mixins/info";
import { getRequestFilter } from "@/common/function";
import helper from "@/common/helper";
import { getModelList } from "@/api";
export default {
  mixins: [infoMixin],
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
      dataList: [], //公告列表数据
      // 决策数据
      decisionDataList: [],
      allPeopleData: [],
      // 调查问卷
      questionList: [],
    };
  },
  computed: {
    // 展示到首页的决策信息
    toDecisionData() {
      return {
        ...this.decisionList[0],
        decision_image: this.$helper.filterCover(
          this.decisionList[0]?.decision_image[0].url
        ),
      };
    },

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
      return this.filterDataList
        .filter((item) => item.top === "是")
        .slice(0, 2);
    },

    noticeTime() {
      return (time) => {
        if (time) {
          return uni.$u.timeFrom(time, "yyyy-mm-dd hh:MM:ss");
        }
      };
    },

    // 获取图片地址
    imageUrl() {
      return (url) => {
        if (url) {
          return this.$helper.filterCover(url);
        }
      };
    },

    // 获取最新的一个投票决策
    newDecision() {
      return this.decisionDataList.sort((a, b) => {
        return b.creatorTime - a.creatorTime;
      })[0];
    },

    // 获取最新的问卷
    newQuestion() {
      return this.questionList.sort((a, b) => {
        return b.creatorTime - a.creatorTime;
      })[0];
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
    //获取列表数据集
    async getNoticeList() {
      const { data } = await getModelList("64d2f5525d3fa95536f04c02");
      // console.log(data);
      this.dataList = data?.list.map((item) => {
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

      //  this.filterDataList = this.dataList
    },
    // 决策
    // 查询投票结果列表
    async getAllPeopleNum() {
      const { data } = await getModelList("64f6d11ed85a4b7b32ec641e");
      this.allPeopleData = data?.list;
    },

    //获取所有投票
    async getAllDecisionDataList(filterEnd = null) {
      let arr = [];
      let filterArr = [];
      let decisionNum = 0; //单个决策投票数
      const { data } = await getModelList(
        "64f93a574b635d6996a92a95",
        filterEnd
      );
      arr = data?.list;
      // 整理数据
      for (let val of arr) {
        let filterData = getRequestFilter({
          decisionId: val._id,
        });
        // 获取给这个决策投票的人数
        const { data } = await getModelList(
          "64f93b4e4b635d6996a92a97",
          filterData
        );
        decisionNum = data?.list.length;
        // 获取该决策状态
        let filterData1 = getRequestFilter({
          decisionId: val._id,
          decisionPeopleId: this.userInfo.id,
        });
        const myDecisionNum = await getModelList(
          "64f93b4e4b635d6996a92a97",
          filterData1
        );

        filterArr.push({
          ...val,
          no: (decisionNum / this.allPeopleData.length).toFixed(4) * 100,
          isJoin: myDecisionNum?.data.list.length ? true : false,
          joinNum: decisionNum,
        });
      }

      this.decisionDataList = filterArr;
    },
    // 点击进入统计页面
    handleToChat(id) {
      uni.navigateTo({
        url: `./vote/vote-chat?id=${id}`,
      });
    },
    handleClickItem(id, time) {
      if (Date.now() > time) {
        uni.showToast({
          title: `该活动已经结束!`,
          icon: "info",
        });
        return;
      } else {
        uni.navigateTo({
          url: `./vote/detail?id=${id}`,
        });
      }
    },
    //调查问卷
    async getQuestionnaire() {
      const { data } = await getModelList("650a5c8e0538024e9740e342");
      // console.log(data);
      this.questionList = data?.list;
    },
    // 获取图片
    getImageUrl(data) {
      return this.$helper.filterCover(data?.[0].url);
    },
    // 跳转到详情
    toDetailPage(id) {
      uni.navigateTo({
        url: `/subPages/owner-autonomy/questionnaire/questionnaire?id=${id}`,
      });
    },
  },
  async onLoad() {
    this.getBannerDataList();

    this.getNoticeList();

    this.getAllDecisionDataList();
    // 社区全部人数
    this.getAllPeopleNum();
    this.getQuestionnaire();
  },
};
</script>

<style lang="scss" scoped>
%padding-box {
  padding: 20rpx;
  box-sizing: border-box;
}
.owner-autonomy {
  width: 100vw;
  min-height: 100vh;
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
        width: 110rpx;
        height: 110rpx;
      }
      .docs {
        font-size: 18px;
        color: #909399;
        padding: 10rpx 0 20rpx 0rpx;
        /* #ifndef APP-PLUS */
        box-sizing: border-box;
      }
    }
  }

  // 社区公告
  &-placard {
    width: 100%;
    // height: 254rpx;
    margin-top: 32rpx;
    // background-color: #fff;
    box-sizing: border-box;
    border-radius: 8rpx;
    // padding: 16rpx;

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

  // 投票决策
  &-decision {
    .decision-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20rpx;
      margin-top: 32rpx;
    }
    .vote-content {
      box-sizing: border-box;
      background-color: #f8f9fd;

      &-item {
        background-color: #fff;
        box-shadow: 0rpx 6rpx 14rpx 1rpx rgba(190, 190, 190, 0.16);
        border-radius: 20rpx;
        padding: 20rpx;
        box-sizing: border-box;
        margin-bottom: 30rpx;
        position: relative;

        .new-icon {
          position: absolute;
          top: 0;
          right: 0;
          width: 100rpx;
          height: 50rpx;
          border-radius: 10rpx;
          background-color: #6377f5;
          color: #fff;
          font-size: 24rpx;
          line-height: 50rpx;
          text-align: center;
        }

        &-left {
          width: 156rpx;
          height: 144rpx;
          flex-shrink: 0;
          margin-right: 20rpx;

          > image {
            width: 100%;
            height: 100%;
          }
        }

        &-right {
          width: 100%;
          // margin-right: 100rpx;

          .icon {
            display: flex;
            justify-content: space-between;
            margin-bottom: 18rpx;
          }

          .title {
            font-size: 32rpx;
            margin-top: 24rpx;
            font-weight: bold;
            color: #333333;
          }

          .number {
            font-size: 26rpx;
            font-weight: 400;
            color: #666666;
          }
        }

        .vote-chat {
          margin-top: 20rpx;

          &-item {
            .num {
              text-align: center;
            }
          }
        }

        .vote-progress {
          margin-top: 20rpx;
        }

        .vote-footer {
          margin-top: 20rpx;

          &-item {
            height: 58rpx;
            background: #f3f3f3;
            border-radius: 30rpx;
            line-height: 58rpx;
            text-align: center;
          }
        }
      }
    }
  }

  // 问卷
  &-questionnaire {
    .questionnaire-title {
      font-size: 32rpx;
      font-weight: bold;
      color: #333333;
      margin-bottom: 20rpx;
      margin-top: 32rpx;
    }
    .questionnaire-list {
      width: 100%;
      background: #f5f7fb;

      .questionnaire-item {
        background-color: #fff;
        border-radius: 25rpx;
        @extend %padding-box;
        margin-bottom: 20rpx;

        .image {
          width: 156rpx;
          height: 144rpx;
          border-radius: 20rpx;
          overflow: hidden;
          margin-right: 20rpx;

          > image {
            width: 100%;
            height: 100%;
          }
        }

        .item-right {
          .right-up {
            font-size: 30rpx;
            font-weight: bold;
          }

          .right-down {
            font-size: 22rpx;
            color: #666;
            // font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
