<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-10 09:58:30
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-17 15:15:48
 * @FilePath: /smart-park/subPages/main/activity/activity-detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="detail container">
    <!-- 轮播图 -->
    <view class="u-demo-block">
      <u-swiper
        :list="imageList"
        height="280"
        @change="(e) => (currentNum = e.current)"
        :autoplay="true"
        indicatorStyle="right: 20px"
      >
        <view slot="indicator" class="indicator-num">
          <text class="indicator-num__text"
            >{{ currentNum + 1 }}/{{ imageList.length }}</text
          >
        </view>
      </u-swiper>
    </view>

    <view class="detail-content">
      <view class="detail-content-title">
        <view class="title-icon"></view>
        <view class="title-text">{{ detailData.activity_title }}</view>
      </view>
      <view class="detail-content-list">
        <view class="item">
          <view class="item-title">活动项目</view>
          <view class="item-content">{{ detailData.activity_type }}</view>
        </view>
        <view class="item">
          <view class="item-title">发起人</view>
          <view class="item-content">{{ detailData.activity_sponsor }}</view>
        </view>
        <view class="item">
          <view class="item-title">活动截止时间</view>
          <view class="item-content">{{ startTime }}/{{ endTime }}</view>
        </view>
        <view class="item">
          <view class="item-title">建议人数</view>
          <view class="item-content">{{ detailData.number_applicants }}</view>
        </view>
        <view class="item">
          <view class="item-title">活动地点</view>
          <view class="item-content">{{
            detailData.activity_address.address
          }}</view>
        </view>
        <view class="item">
          <view class="item-title">活动内容</view>
          <view class="item-content">
            <u-parse :content="detailData.activity_content"></u-parse>
          </view>
        </view>

        <view class="item">
          <view class="item-title">报名成员</view>
          <view class="item-content flex-a-center">
            <image
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230707_7b18b9def9ca448291140589ae46c575.png"
              mode=""
            />
            <image
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230707_7b18b9def9ca448291140589ae46c575.png"
              mode=""
            />
            <image
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230707_7b18b9def9ca448291140589ae46c575.png"
              mode=""
            />
            <image
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230707_7b18b9def9ca448291140589ae46c575.png"
              mode=""
            />
            <image
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230707_7b18b9def9ca448291140589ae46c575.png"
              mode=""
            />
            <image
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230707_7b18b9def9ca448291140589ae46c575.png"
              mode=""
            />
            <image
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230707_7b18b9def9ca448291140589ae46c575.png"
              mode=""
            />
            <image
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230707_7b18b9def9ca448291140589ae46c575.png"
              mode=""
            />
            <image
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230707_7b18b9def9ca448291140589ae46c575.png"
              mode=""
            />
          </view>
        </view>
      </view>
    </view>

    <!-- 提交按钮 -->
    <view class="submit-btn">
      <u-button color="#6377F5" text="参加活动"></u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list6: [
        "https://cdn.uviewui.com/uview/swiper/swiper2.png",
        "https://cdn.uviewui.com/uview/swiper/swiper3.png",
        "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      ],
      currentNum: 0,
      detailData: {},
    };
  },
  computed: {
    imageList() {
      return (
        this.detailData.activity_image?.map((item) => {
          return this.$helper.filterCover(item.url);
        }) || []
      );
    },

    startTime() {
      return uni.$u.date(this.detailData.activity_apply_start, "yyyy-mm-dd");
    },
    endTime() {
      return uni.$u.date(this.detailData.activity_apply_end, "yyyy-mm-dd");
    },
  },
  onLoad() {
    let that = this;
    const eventChannel = this.getOpenerEventChannel();
    // 监听其他页面传递过来的数据
    eventChannel.on("mainPageActivityDetail", function ({ data }) {
      console.log(data);
      that.detailData = data;
    });
  },
};
</script>

<style lang="scss">
.detail {
  width: 100vw;

  &-content {
    padding: 14rpx 32rpx;
    background-color: #ffffff;
    padding-bottom: 120rpx;

    &-title {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      // overflow: hidden;

      .title-icon {
        width: 8rpx;
        height: 33rpx;
        // padding: 5rpx;
        margin-right: 20rpx;
        background-color: #6377f5;
      }

      .title-text {
        width: 90%;
        display: inline-block;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }
    }

    &-list {
      .item {
        margin-bottom: 20rpx;
        padding-bottom: 20rpx;
        // border-bottom: 1px solid #d8d8d8;

        .item-title {
          height: 50rpx;
          font-size: 29rpx;
          color: #333333;
          line-height: 50rpx;
        }

        .item-content {
          // height: 50rpx;
          font-size: 29rpx;
          color: #999999;
          line-height: 50rpx;

          > image {
            width: 50rpx;
            height: 50rpx;
            margin-right: 18rpx;
          }
        }
      }
    }
  }

  .submit-btn {
    margin: 0 auto;
    position: fixed;
    bottom: 0rpx;
    width: 100%;
    padding: 32rpx;
    box-sizing: border-box;
    padding-bottom: constant(safe-area-inset-bottom) !important;
    padding-bottom: env(safe-area-inset-bottom) !important;
    background-color: #fff;
    z-index: 1;
  }
}

.indicator {
  @include flex(row);
  justify-content: center;

  &__dot {
    height: 6px;
    width: 6px;
    border-radius: 100px;
    background-color: rgba(255, 255, 255, 0.35);
    margin: 0 5px;
    transition: background-color 0.3s;

    &--active {
      background-color: #ffffff;
    }
  }
}

.indicator-num {
  padding: 2px 0;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 100px;
  width: 35px;
  @include flex;
  justify-content: center;

  &__text {
    color: #ffffff;
    font-size: 12px;
  }
}
</style>
