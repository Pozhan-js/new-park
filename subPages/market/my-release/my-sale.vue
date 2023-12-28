<template>
  <view class="my-sale">
    <u-tabs
      :list="list1"
      lineWidth="40"
      :scrollable="false"
      @click="click"
    ></u-tabs>

    <view class="my-sale-content box">
      <view
        class="my-sale-content-item"
        v-for="item in contentList"
        :key="item.id"
      >
        <view class="item-body flex-a-center-j-space-between">
          <view class="item-body-left">
            <image :src="item.url" mode="" />
          </view>
          <view class="item-body-right">
            <view class="text-hidden">
              {{ item.title }}
            </view>
            <view>¥{{ item.price }}</view>
            <view>
              <text>浏览量 {{ item.inlineNum }}</text>
            </view>
          </view>
        </view>

        <view class="item-footer flex-a-center-j-space-between">
          <view class="item-footer-left flex-a-center"> </view>
          <view class="item-footer-right flex-a-center">
            <view class="right-btn">删除</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      contentList: [
        {
          id: 1,
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230704_339809fe4e1c437884bf0dcadb58fa8d.png",
          title: "好孩子婴儿推车，九成新，自体把v好办法飓风v",
          price: 200,
          inlineNum: 12345,
        },
        {
          id: 1,
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230704_339809fe4e1c437884bf0dcadb58fa8d.png",
          title: "好孩子婴儿推车，九成新，自体把v好办法飓风v",
          price: 200,
          inlineNum: 12345,
        },
        {
          id: 1,
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230704_339809fe4e1c437884bf0dcadb58fa8d.png",
          title: "好孩子婴儿推车，九成新，自体把v好办法飓风v",
          price: 200,
          inlineNum: 12345,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.my-sale {
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
