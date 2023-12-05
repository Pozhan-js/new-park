<template>
  <view class="container home box">
    <!-- 导航栏 -->
    <u-navbar bgColor="transparent" @leftClick="tabLeft" placeholder="true">
    </u-navbar>
    <!-- 首页头部 -->
    <view class="home-header">
      <view class="flex-a-center">
        <u-icon name="map" size="18"></u-icon>
        <view class="addr">长沙</view>
      </view>
      <easy-select
        placeholder="请输入关键字"
        :options="selectList"
        @change="selectChangeHandle"
        @close="selectCloseHandle"
        keyName="goods_name"
      />

      <u-icon name="shopping-cart" size="30"></u-icon>
    </view>

    <view class="home-swiper">
      <u-swiper
        :list="list1"
        indicator
        indicatorMode="line"
        circular
      ></u-swiper>
    </view>

    <view class="home-choose">
      <view
        class="home-choose-item flex-a-center-j-space-between box"
        @click="clickRelease"
      >
        <view class="">
          <view class="item-title">发布闲置</view>
          <view>卖闲置 换现金</view>
        </view>
        <image
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_0a514b9fcdb7426f863f1668cee859ef.png"
          mode=""
        />
      </view>
    </view>

    <view class="home-content">
      <view class="home-content-header">
        <view class="left">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230704_8f093bc9ef51482ea13cdfbb42cd098b.png"
          />
          <view>最新发布</view>
        </view>
        <u-icon name="arrow-right"></u-icon>
      </view>
    </view>

    <view class="home-shop">
      <template v-if="listData.length">
        <view
          v-for="(item, index) in listData"
          :key="index"
          class="home-shop-item flex-a-center"
          :style="{ border: index === listData.length - 1 ? 'none' : '' }"
          @click="clickProduct(item._id)"
        >
          <image :src="getImageUrl(item.goods_log[0].url)" class="img" mode="">
          </image>
          <view class="item-right">
            <view class="item-right-content item-title">
              <text class="title">{{ item.goods_name }}</text>
              <text class="price">¥{{ item.goods_price_new }}</text>
            </view>

            <view class="item-right-content flex-a-center">
              <view
                class="item-type"
                v-for="data in item.goods_assure"
                :key="data"
                >{{ data }}
              </view>
            </view>

            <view class="item-right-content flex-a-center">
              <u-icon name="map" size="14"></u-icon>
              <text class="addr">{{ item.blur_address }}</text>
            </view>

            <view class="item-right-content item-title">
              <text class="text-content">{{ item.detail_address }}</text>
              <text class="text-content">
                {{ $u.timeFrom(item.creatorTime, "yyyy-mm-dd") }}</text
              >
            </view>
          </view>
        </view></template
      >
      <u-empty
        v-else
        mode="data"
        icon="http://cdn.uviewui.com/uview/empty/list.png"
      >
      </u-empty>
    </view>

    <TabbarPro :tabIndex="tabIndex"></TabbarPro>
  </view>
</template>

<script>
import { getModelList } from "@/api";
import { getRequestFilter, sleep } from "@/common/function";
import TabbarPro from "../components/tabbar";
import helper from "@/common/helper";
export default {
  components: { TabbarPro },
  data() {
    return {
      keyword: "",
      list1: [
        "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_8c0f35d609794696ac794f74afdcdb5e.png",
        "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230703_8c0f35d609794696ac794f74afdcdb5e.png",
      ],
      tabIndex: 0,
      listData: [],
      // 选择器数据
      selectList: [],
    };
  },

  computed: {},
  methods: {
    // 直接回到首页
    tabLeft() {
      uni.reLaunch({
        url: "/pages/index/index",
      });
    },
    // 点击发布闲置
    clickRelease() {
      uni.redirectTo({
        url: "/subPages/market/pages/release",
      });
      // this.$refs.uToast.success(`点击了发布闲置`);
    },
    clickProduct(id = "") {
      uni.navigateTo({
        url: `/subPages/market/my-release/detail?id=${id}`,
      });
    },
    // 选择器
    selectChangeHandle(data) {
      this.listData = this.selectList.filter(
        (item) => item.goods_name === data.goods_name
      );
    },
    selectCloseHandle(value) {
      if (!value) this.listData = this.selectList;
    },

    // 补全图片路径
    getImageUrl(url) {
      return url
        ? this.$helper.filterCover(url)
        : `/static/image/default-avatar.png`;
    },
    // 获取列表数据
    async getOrderList(rangeWeek) {
      let reqData = getRequestFilter({ creatorTime: rangeWeek }, "range");
      const { data } = await getModelList("65605e75f3ad0c30c038ff96", reqData);
      let reqList = data?.list.sort((a, b) => {
        let timeA = a.creatorTime;
        let timeB = b.creatorTime;
        return timeB - timeA;
      });
      this.listData = reqList;
      this.selectList = [].concat(reqList);
    },
  },
  onLoad() {
    let nowDate = new Date();
    let reqRange = [];

    reqRange = this.$helper.getCurrentMonth(nowDate).map((item) => {
      return Date.parse(item);
      // return new Date(item);
    });
    this.getOrderList(reqRange);
  },
};
</script>

<style lang="scss" scoped>
%display-space {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.grid-text {
  font-size: 15px;
  color: #252b50;
  // color: #909399;
  padding: 10rpx 0 20rpx 0rpx;
  /* #ifndef APP-PLUS */
  box-sizing: border-box;
  /* #endif */
}

.home {
  &-header {
    @extend %display-space;
    // padding: 0 20rpx;
    margin-bottom: 32upx;

    .addr {
      margin-right: 18upx;
    }
  }

  &-swiper {
    margin-bottom: 28rpx;
  }

  &-type-list {
    background: #ffffff;
    border-radius: 8rpx;
    margin-bottom: 32rpx;
  }

  &-choose {
    @extend %display-space;
    margin-bottom: 32rpx;

    &-item {
      @extend %display-space;
      width: 100%;
      height: 150rpx;
      background: linear-gradient(180deg, #ecfff8 0%, #fdfefe 100%);
      border-radius: 14rpx;
      > image {
        width: 80rpx;
        height: 68rpx;
      }

      .item-title {
        height: 50rpx;
        font-size: 34rpx;
        color: #252b50;
        line-height: 50rpx;
      }

      view {
        font-size: 26rpx;
        color: #636676;
      }
    }
  }

  &-content {
    &-header {
      @extend %display-space;
      padding: 0 20rpx;
      margin-bottom: 32upx;
      .left {
        @extend %display-space;
        > image {
          width: 40rpx;
          height: 40rpx;
          margin-right: 10rpx;
        }
      }
    }
  }

  &-shop {
    background: #ffffff;
    border-radius: 8rpx;

    &-item {
      padding: 32rpx;
      box-sizing: border-box;
      border-bottom: 1px solid #ccc;

      > .img {
        width: 167rpx;
        height: 167rpx;
        background: rgba(224, 224, 224, 0.5);
        border-radius: 8rpx;
        flex-shrink: 0;
        margin-right: 16rpx;
      }

      .item-right {
        width: 100%;
        overflow: hidden;

        .item-right-content {
          position: relative;
          margin-bottom: 4rpx;

          .item-btn-type {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            width: 44rpx;
            background: linear-gradient(90deg, transparent, #fff);
          }

          .title {
            height: 42rpx;
            font-size: 30rpx;
            color: #333333;
            line-height: 42rpx;
          }
          .price {
            height: 42rpx;
            font-size: 30rpx;
            font-weight: 600;
            color: #fb8753;
            line-height: 42rpx;
          }

          .item-type {
            // width: 84rpx;
            padding: 0 20rpx;
            height: 42rpx;
            flex-shrink: 0;
            border-radius: 21rpx;
            font-size: 25rpx;
            color: #fba13a;
            border: 2rpx solid #ffd17c;
            line-height: 42rpx;
            text-align: center;
            margin-right: 16rpx;
          }

          .text-content {
            font-size: 25rpx;
            color: #999999;
          }

          .addr {
            font-size: 25rpx;
            color: #333333;
          }
        }
      }
    }
  }
}

.item-title {
  @extend %display-space;
}
</style>
