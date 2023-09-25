<template>
  <view class="lawyer-detail">
    <view class="bg-image" :style="[{ backgroundImage }]">
      <view class="info flex-a-center-j-space-around">
        <view class="info-name">
          <view>个人职称</view>
          <view
            >{{ detailInfo.profession.split("|")[0] || "" }}
            {{ detailInfo.profession.split("|")[1] || "" }}</view
          >
        </view>
        <view class="info-message flex-a-center">
          <view class="job-time">
            <view>工作年限</view>
            <view>{{ detailInfo.job_time }}</view>
          </view>

          <view class="helper">
            <view>帮助人数</view>
            <view>{{ detailInfo.helper_num }}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="lawyer-content">
      <view class="lawyer-content-title">{{ detailInfo.title }}</view>

      <view class="lawyer-content-message">
        <view class="lawyer-content-docs">
          {{ detailInfo.expertise }}
        </view>
        <view class="buy">
          <view class="price"
            >￥<text class="price-num">{{ detailInfo.new_price }}</text></view
          >
          <view class="btn"
            >律所价格：<text class="num">{{ detailInfo.old_price }}</text></view
          >
        </view>
      </view>

      <view class="lawyer-content-promise">
        <view class="promise-title">服务保障</view>
        <view class="promise-center">
          <view
            class="center-item"
            v-for="(item, _) in detailInfo.service_guarantee"
            :key="_"
          >
            <u-icon name="checkmark-circle" size="14" color="#00C853"></u-icon>
            <view class="text">{{ item }}</view>
          </view>
        </view>
      </view>

      <view class="lawyer-content-service">
        <view class="service-title">选择服务</view>
        <view class="service-list">
          <view
            class="service-item"
            v-for="(item, index) in detailInfo.change_service"
            @click="handleChangeServer(item, index)"
            :key="index"
            :class="currentServeIndex === index ? 'active' : ''"
          >
            <view class="item-content">
              <view class="item-text">{{ item.split(" ")[0] }}</view>
              <view class="item-price">{{ item.split(" ")[1] }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="lawyer-bottom">
      <view class="bottom-left">
        <u-icon
          name="arrow-upward"
          labelPos="bottom"
          labelSize="24rpx"
          label="顶部"
          size="14px"
          @click="goTop"
        ></u-icon>
        <uni-fav
          :checked="isCollect"
          :content-text="contentText"
          @click="favClick"
        />
      </view>
      <view class="bottom-right">
        <u-button
          type="primary"
          @click="handleToChat"
          :plain="true"
          size="small"
          text="私聊"
        ></u-button>
        <u-button
          type="primary"
          size="small"
          @click="handleToPay"
          text="立即购买"
        ></u-button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      detailInfo: {},
      isCollect: false,
      contentText: {
        contentDefault: "收藏",
        contentFav: "已收藏",
      },
      backgroundImage: "",
      currentServeIndex: 0,
    };
  },

  methods: {
    goTop() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
    },
    handleGoBack() {
      uni.navigateBack({
        delta: 1,
      });
    },
    handleToChat() {
      uni.navigateTo({
        url: "/subPages/message/chat",
      });
    },
    handleToPay() {
      uni.navigateTo({
        url: "../pay/pay",
      });
    },
    // 选择服务
    handleChangeServer(item, index) {
      this.currentServeIndex = index;
    },
    // 收藏按钮点击
    favClick() {
      this.isCollect = !this.isCollect;
      this.$forceUpdate();
    },
  },

  onLoad() {
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    // 监听其他页面传递过来的数据
    eventChannel.on("lawyerDetailPageDetail", function ({ data }) {
      // console.log('detaol', data);
      let obj = {
        ...data.tableField108[0],
        change_service: data.tableField108[0].change_service.split("|"),
        title: data.tableField108[0].title,
        service_guarantee: data.tableField108[0].service_guarantee.split("|"),
        imageUrl: that.$helper.filterCover(
          data.tableField108[0].uploadImgField109[0].url
        ),
      };
      that.backgroundImage = `url('${obj.imageUrl}')`;
      that.detailInfo = obj;
      console.log("detailInfo", that.detailInfo);
    });
  },
};
</script>

<style lang="scss" scoped>
.lawyer-detail {
  width: 100vw;
  height: 100vh;
  position: relative;

  .bg-image {
    width: 100%;
    height: 738rpx;
    // TODO: 从后端获取图片
    // background: url("https://kindoucloud.com:8066/api/mongoFile/Image/systemicon/dtghc/20230525_b2ba7d86796442c7b9388afefd5bbf1c.jpg");
    background-color: #ccc;
    background-size: cover;
    position: relative;

    .info {
      width: 100%;
      position: absolute;
      bottom: 0;
      background-color: transparent;
      color: #fff;
      padding-bottom: 20rpx;

      &-name {
        text-align: center;
      }

      &-message {
        text-align: center;
        .job-time {
          margin-right: 32rpx;
        }
      }
    }
  }

  .lawyer-content {
    width: 100%;
    // height: 702rpx;
    padding-bottom: 200rpx;
    padding: 32rpx;
    box-sizing: border-box;
    background: #ffffff;

    &-message {
      padding-bottom: 50rpx;
      border-bottom: 2rpx solid #eee;
    }

    &-title {
      height: 35rpx;
      font-size: 33rpx;
      color: #333333;
      line-height: 38rpx;
      margin-bottom: 16rpx;
    }

    &-docs {
      width: 100%;
      font-size: 29rpx;
      color: #333333;
      line-height: 42rpx;
      margin-bottom: 12rpx;
    }

    &-promise {
      width: 100%;
      padding: 32rpx 0;
      border-bottom: 2rpx solid #eee;

      .promise-title {
        width: 100%;
        height: 42rpx;
        font-size: 30rpx;
        color: #999999;
        line-height: 42rpx;
        margin-bottom: 16rpx;
      }

      .promise-center {
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .center-item {
          height: 42rpx;
          display: flex;
          align-items: center;
          font-size: 24rpx;
          color: #999999;
          line-height: 42rpx;
          margin-right: 30rpx;

          .text {
            margin-left: 10rpx;
          }
        }
      }
    }

    &-service {
      width: 100%;
      padding: 32rpx 0;
      box-sizing: border-box;
      font-size: 29rpx;
      color: #999999;

      .service-list {
        margin-top: 16rpx;
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 200rpx;

        .service-item {
          width: 150rpx;
          height: 118rpx;
          margin-right: 16rpx;
          margin-bottom: 20rpx;
          border-radius: 2rpx;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 2rpx solid #cccccc;

          .item-content {
            width: 90%;
            text-align: center;

            .item-text {
              width: 100%;
              text-align: center;
              overflow: hidden; //超出的文本隐藏
              text-overflow: ellipsis; //溢出用省略号显示
              white-space: nowrap; //溢出不换行
            }
          }
        }
      }
    }

    .buy {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      padding: 16rpx 0;

      .price {
        height: 33rpx;
        font-size: 25rpx;
        color: #ff0c0c;
        line-height: 33rpx;
        margin-right: 32rpx;

        .price-num {
          font-size: 42rpx;
        }
      }

      .btn {
        font-size: 25rpx;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #999999;

        .num {
          text-decoration: line-through;
        }
      }
    }
  }

  .lawyer-bottom {
    position: fixed;
    bottom: 0;
    display: flex;
    padding-bottom: constant(safe-area-inset-bottom) !important;
    padding-bottom: env(safe-area-inset-bottom) !important;

    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 108rpx;
    background-color: #fff;

    .bottom-left {
      display: flex;
    }

    .bottom-right {
      display: flex;
      width: 436rpx;
      justify-content: space-between;
    }
  }
}

.active {
  color: #ff0606 !important;
}

::v-deep .bottom-left .u-icon {
  margin-right: 30rpx;
}

::v-deep .u-button {
  margin-right: 20rpx;
}
</style>
