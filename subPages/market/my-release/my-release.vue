<template>
  <view class="my-release">
    <u-tabs
      :list="list1"
      lineWidth="40"
      :scrollable="false"
      @click="click"
    ></u-tabs>

    <view class="my-release-content box">
      <view
        class="my-release-content-item"
        v-for="item in contentList"
        :key="item._id"
      >
        <view class="item-body flex-a-center-j-space-between">
          <view class="item-body-left" v-if="item.goods_log">
            <image :src="getImageUrl(item.goods_log[0].url)" mode="" />
          </view>
          <view class="item-body-right">
            <view class="text-hidden">
              {{ item.goods_description }}
            </view>
            <view>¥{{ item.goods_price_new }}</view>
            <view>
              <text>浏览量 {{ item.visitors_num }}</text>
            </view>
          </view>
        </view>

        <view class="item-footer flex-a-center-j-space-between">
          <view class="item-footer-left flex-a-center">
            <view class="dot"></view>
            <view class="text">{{
              item.is_approval ? "已审核" : "未审核"
            }}</view>
          </view>
          <view class="item-footer-right flex-a-center">
            <view class="right-btn">删除</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
import { getRequestFilter } from "@/common/function";
export default {
  data() {
    return {
      list1: [
        {
          name: "全部",
        },
        {
          name: "已发布",
        },
        {
          name: "审核中",
        },
      ],
      contentList: [],
    };
  },
  created() {},
  async onLoad() {
    await this.getShopListData();
  },
  methods: {
    async click(item) {
      await this.getShopListData(item.name);
    },
    getImageUrl(url) {
      return this.$helper.filterCover(url);
    },
    async getShopListData(filter = "") {
      let reqData;
      switch (filter) {
        case "已发布":
          reqData = getRequestFilter({ is_approval: 1 });
          break;
        case "审核中":
          reqData = getRequestFilter({ is_approval: 0 });
          break;
        default:
          reqData = {};
          break;
      }

      const result = await getModelList("65605e75f3ad0c30c038ff96", reqData);
      this.contentList = result?.data?.list;
    },
  },
};
</script>

<style lang="scss" scoped>
.my-release {
  background-color: #f1f2f0;

  &-content {
    background-color: #fff;
    border-radius: 20rpx;
    margin-top: 32rpx;
    padding-top: 32rpx;

    &-item {
      border-bottom: 1px solid #eee;
      margin-bottom: 32rpx;

      .item-body {
        &-left {
          margin-right: 25rpx;

          > image {
            width: 166rpx;
            height: 166rpx;
            flex-shrink: 0;
          }
        }

        &-right {
          view {
            width: calc(100vw - 166rpx - 70rpx);
            height: 42rpx;
            font-size: 30rpx;
            color: #333333;
            line-height: 42rpx;
            margin-bottom: 16rpx;

            > text {
              font-size: 25rpx;
              color: #999999;
              margin-right: 32rpx;
            }
          }
        }
      }

      .item-footer {
        padding-bottom: 34rpx;

        &-left {
          .dot {
            width: 13rpx;
            height: 13rpx;
            background: #fb8753;
          }

          .text {
            height: 36rpx;
            font-size: 26rpx;
            color: #999999;
            line-height: 36rpx;
            margin-left: 20rpx;
          }
        }

        &-right {
          .right-btn {
            width: 118rpx;
            height: 42rpx;
            border-radius: 22rpx;
            border: 2rpx solid #dddddd;
            font-size: 26rpx;
            color: #666666;
            line-height: 42rpx;
            text-align: center;
            margin-left: 16rpx;

            &:active {
              color: #ff0b0b !important;
              border-color: #ff0b0b !important;
            }
          }
        }
      }
    }
  }
}
.btn-active {
  color: #ff0b0b !important;
  border-color: #ff0b0b !important;
}
</style>
