<template>
  <view class="vote">
    <!-- <view class="vote-search flex-around">
      <u-search
        placeholder="日照香炉生紫烟"
        :showAction="false"
        v-model="keyword"
      ></u-search>
    </view> -->

    <view class="vote-tabs">
      <u-tabs
        :list="tabList"
        @click="clickTab"
        @change="changeTabIndex"
        :current="tabIndex"
        :scrollable="false"
        lineWidth="30"
      ></u-tabs>
    </view>

    <view class="vote-content">
      <view
        class="vote-content-item"
        v-for="data in decisionDataList"
        @click="handleClickItem(data._id, data.decisionRange[1])"
        :key="data._id"
      >
        <view class="flex-a-center">
          <view class="vote-content-item-left">
            <image :src="imageUrl(data.decisionLog[0].url)" mode="aspectFill" />
          </view>
          <view class="vote-content-item-right">
            <view class="title">{{ data.decisionIssue }}</view>
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
            <view class="num">{{ data.no }}%</view>
          </view>
          <view class="chat-item">
            <view>投票人数</view>
            <view class="num">{{ data.joinNum }}</view>
          </view>
          <view class="chat-item">
            <view>状态</view>
            <view class="num">{{
              Date.now() < data.decisionRange[1] ? "投票中" : "已结束"
            }}</view>
          </view>
        </view>

        <view class="vote-progress">
          <u-line-progress :percentage="data.no">
            <text class="u-percentage-slot">{{ data.no }}%</text>
          </u-line-progress>
        </view>

        <view class="vote-footer flex-a-center-j-space-between">
          <view
            class="vote-footer-item box"
            @click.stop="handleToChat(data._id)"
          >
            查看统计
          </view>
          <view class="vote-footer-item box">{{
            data.isJoin ? "已参加" : "未参加"
          }}</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
import infoMixin from "@/common/mixins/info";
import { getRequestFilter } from "@/common/function";
export default {
  mixins: [infoMixin],
  data() {
    return {
      keyword: "",
      tabList: [
        {
          name: "民意投票",
        },
        {
          name: "已完成",
        },
      ],
      tabIndex: 0,
      decisionDataList: [],
      allPeopleData: [],
    };
  },
  methods: {
    // 切换tab标签
    clickTab(item) {
      // console.log("item", item);
      switch (item.name) {
        case "民意投票":
          this.getAllDecisionDataList();
        case "已完成":
          let filter = getRequestFilter({
            lastTime: [Date.now() - 60 * 24 * 60 * 60 * 1000, Date.now()],
          });
          this.getAllDecisionDataList(filter);
      }
    },

    //当tab标签改变时 将改变的值赋值给变量
    changeTabIndex({ index }) {
      this.tabIndex = index;
    },

    // 点击决策跳转到详请
    handleClickItem(id, time) {
      if (Date.now() > time) {
        uni.showToast({
          title: `该活动已经结束!`,
          icon: "info",
        });
        return;
      } else {
        uni.navigateTo({
          url: `./detail?id=${id}`,
        });
      }
    },

    // 跳转到统计页面
    handleToChat(id) {
      uni.navigateTo({
        url: `./vote-chat?id=${id}`,
      });
    },

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
    //筛选请求
  },
  computed: {
    // 获取图片地址
    imageUrl() {
      return (url) => {
        if (url) {
          return this.$helper.filterCover(url);
        }
      };
    },
  },

  onShow() {
    // 重置tab下标
    this.$nextTick(() => (this.tabIndex = 0));
    this.getAllDecisionDataList();
    // 社区全部人数
    this.getAllPeopleNum();
  },
};
</script>

<style lang="scss" scoped>
.vote {
  width: 100vw;
  height: 100vh;
  padding-top: 1rpx;
  box-sizing: border-box;
  background-color: #f8f9fd;

  &-search {
    width: 80vw;
    margin: 20rpx auto;
  }

  &-content {
    padding: 16rpx;
    box-sizing: border-box;
    background-color: #f8f9fd;

    &-item {
      background-color: #fff;
      box-shadow: 0rpx 6rpx 14rpx 1rpx rgba(190, 190, 190, 0.16);
      border-radius: 20rpx;
      padding: 20rpx;
      box-sizing: border-box;
      margin-bottom: 30rpx;

      &-left {
        width: 155rpx;
        height: 143rpx;
        flex-shrink: 0;
        margin-right: 20rpx;

        > image {
          width: 100%;
          height: 100%;
        }
      }

      &-right {
        width: 100%;

        .icon {
          display: flex;
          justify-content: space-between;
          margin-bottom: 18rpx;
        }

        .title {
          font-size: 32rpx;
          margin-bottom: 18rpx;
          // font-weight: bold;
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

.u-percentage-slot {
  padding: 1px 5px;
  background-color: $u-warning;
  color: #fff;
  border-radius: 100px;
  font-size: 10px;
  margin-right: -5px;
}
</style>
