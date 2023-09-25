<template>
  <view class="legal-aid">
    <!-- 搜索区 -->
    <view class="legal-aid-header">
      <u-icon
        name="map"
        color="#333"
        class="icon"
        label="长沙"
        size="30rpx"
      ></u-icon>
      <u-search
        :focus="true"
        :showAction="false"
        placeholder="找律师"
        v-model="keyword"
        height="82rpx"
      ></u-search>
    </view>

    <!-- 我的选择 -->
    <view class="legal-aid-choice">
      <view class="choice-left" @click="handleConsultation">
        <view class="content">
          <view class="title">我要咨询</view>
          <view class="desc">咨询律师，解决法律问题</view>
        </view>
      </view>
      <view class="choice-right" @click="handleConsultation">
        <view class="content">
          <view class="title">打官司</view>
          <view class="desc">诉讼案情分析</view>
        </view>
      </view>
    </view>

    <!-- 应用 -->
    <view class="legal-aid-application">
      <view
        class="icon-item"
        v-for="item in featuresList"
        :key="item.url"
        @click="handleToList(item)"
      >
        <image :src="item.url" />
        <view class="text">{{ item.text }}</view>
      </view>
    </view>

    <!-- 热门律师 -->
    <view class="legal-aid-lawyer">
      <view class="lawyer-title">精选律师</view>
      <view class="lawyer-content">
        <view
          class="lawyer-item"
          v-for="(item, _) in lawyerList"
          :key="_"
          @click="handleLawyerDetail(item)"
        >
          <view class="lawyer-img">
            <image :src="item.lawyer_log[0].url" mode="" />
          </view>
          <view class="lawyer-bottom">
            <view class="docs">擅长：{{ item.lawyer_strengths }}</view>
            <view class="buy">
              <view class="price"
                >￥<text>{{ item.lawyer_price }}</text></view
              >
              <view class="btn"
                ><text class="num">{{ item.consult_number }}</text
                >人咨询</view
              >
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getModelList } from "api";
export default {
  data() {
    return {
      featuresList: [
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230625_5ce0c4dd97324a05a6ff5fe763f4b7d3.png",
          text: "家庭婚姻",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230710_fafccc11338b4e9d94a58e88031d5d1b.png",
          text: "劳工公伤",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230625_b72498f728634dd59e8a60512d444012.png",
          text: "债权债务",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230625_cf89d41360ef48108ca5f404963f470a.png",
          text: "交通事故",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230625_78359b5c8839430b8060608975a5a222.png",
          text: "合同纠纷",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230625_920b42de551e4745bb9593fa96cc1bab.png",
          text: "房产纠纷",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230625_4bfe691382654397919b3fd9ca6593ed.png",
          text: "刑事辩护",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230625_4fbb67f198d64710b7d818057a36f5d8.png",
          text: "经济纠纷",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230625_83acd6b959a34fb9bcc390928f015a93.png",
          text: "消费权益",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230625_d13e55d3535d404599b778533ce599e8.png",
          text: "更多",
        },
      ],
      lawyerList: [],
    };
  },
  computed: {},
  methods: {
    leftClick() {
      //   console.log("首页");
      uni.navigateTo({
        url: "/pages/index/index",
      });
    },

    // 咨询
    handleConsultation() {
      uni.navigateTo({
        url: "/subPages/message/chat",
      });
    },
    // 详情
    handleLawyerDetail(item) {
      // console.log("item", item);
      uni.navigateTo({
        url: "/subPages/legal-advice/lawyer-detail/lawyer-detail",
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit("lawyerDetailPageDetail", {
            data: item,
          });
        },
      });
    },
    // 律师列表
    handleToList(data) {
      if (data.text !== "更多") {
        uni.navigateTo({
          url: "/subPages/legal-advice/lawyer-list/lawyer-list",
        });
      } else {
        uni.showToast({
          title: "暂未开放",
          icon: "none",
        });
      }
    },
  },
  async onLoad() {
    // 获取精选律师
    // this.getLawyerInfoDetail()
    const { data } = await getModelList("64d9e2fd5d3fa95536f05292");
    this.lawyerList = data.list.map((item) => {
      item.lawyer_log[0].url = this.$helper.filterCover(item.lawyer_log[0].url);
      return item;
    });

    // this.lawyerList = this.newLawyerInfo
    // console.log("lawyerList", this.lawyerList);
  },
};
</script>

<style lang="scss" scoped>
.legal-aid {
  width: 100vw;
  padding: 32rpx;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
  box-sizing: border-box;

  &-header {
    display: flex;
    justify-content: space-between;
  }

  &-choice {
    display: flex;
    margin-top: 20rpx;
    justify-content: space-between;

    .choice-left {
      width: 332rpx;
      height: 182rpx;
      background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230811_20d3adf3f33a444a933e4fb34db94d2b.png");
      background-size: cover;
      padding: 40rpx 32rpx;
      box-sizing: border-box;
    }

    .choice-right {
      width: 332rpx;
      height: 182rpx;
      background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230811_c3db7a35e81c429b903752d1236bedd0.png");
      background-size: cover;
      padding: 40rpx 32rpx;
      box-sizing: border-box;
    }

    .content {
      width: 100%;
      height: 100%;
      color: #fff;

      .title {
        width: 100%;
        height: 46rpx;
        font-size: 33rpx;
        color: #fff;
        line-height: 46rpx;
        margin-bottom: 16rpx;
      }

      .desc {
        height: 38rpx;
        font-size: 25rpx;
        color: #fff;
        line-height: 38rpx;
      }
    }
  }

  &-application {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10rpx;

    .icon-item {
      // width: 138rpx;
      // text-align: center;
      // margin-bottom: 28rpx;
      width: 136rpx;
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      padding-top: 22rpx;

      > image {
        width: 72rpx;
        height: 72rpx;
      }

      .text {
        width: 136rpx;
        height: 50rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #252b50;
        line-height: 50rpx;
        text-align: center;
      }
    }
  }

  &-lawyer {
    margin-top: 20rpx;
    width: 100%;

    .lawyer-title {
      width: 100%;
      height: 46rpx;
      font-size: 33rpx;
      font-weight: 600;
      color: #333333;
      line-height: 46rpx;
      margin-bottom: 10rpx;
    }

    .lawyer-content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .lawyer-item {
        width: 334rpx;
        height: 396rpx;
        background: #ffffff;
        box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.5);
        border-radius: 17rpx;
        margin-bottom: 30rpx;

        .lawyer-img {
          width: 100%;
          height: 258rpx;

          > image {
            width: 100%;
            height: 100%;
          }
        }

        .lawyer-bottom {
          margin-bottom: 32rpx;

          .docs {
            width: 100%;
            // height: 38rpx;
            font-size: 25rpx;
            color: #333333;
            // line-height: 38rpx;
            box-sizing: border-box;
            padding: 16rpx;
            text-align: center;
          }

          .buy {
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-sizing: border-box;
            padding: 16rpx;

            .price {
              height: 33rpx;
              font-size: 25rpx;
              color: #ff0c0c;
              line-height: 33rpx;
            }

            .btn {
              font-size: 25rpx;
              font-family: PingFangSC-Regular, PingFang SC;
              font-weight: 400;
              color: #999999;
            }
          }
        }
      }
    }
  }
}

::v-deep .u-icon {
  margin-right: 30rpx;
  font-size: 29rpx;
  font-weight: bold;
  color: #333333;
}
</style>
