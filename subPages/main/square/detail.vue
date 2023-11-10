<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-28 14:55:05
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-08 14:53:28
 * @FilePath: /community-square/subPages/home/clear-detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="clear-detail">
    <view class="swiper">
      <image
        src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230728_1de2f564eb2a4a78b95b0130cc63520e.png"
        mode=""
      />
    </view>

    <view class="clear-detail-text box">
      <view class="text-header flex-a-center-j-space-between">
        <view class="text-header-left">
          ¥<text class="timePrice">50</text>/小时起
        </view>
        <view class="text-header-right">随叫随到 最快1小时上门</view>
      </view>
      <view class="text-body">日常保洁</view>
      <view class="text-footer">
        <view class="text-footer-item">满意为止</view>
        <view class="text-footer-item">损坏包赔</view>
      </view>
    </view>

    <u-gap height="20" bgColor="#F9F9F9"></u-gap>

    <view class="clear-detail-evaluate padding-30">
      <view class="evaluate-header flex-center">
        <view class="evaluate-title">评价</view>
        <view class="flex-a-center icon">
          <view @click="toMorePage">更多</view>
          <u-icon name="arrow-right" size="18"></u-icon>
        </view>
      </view>

      <view class="evaluate-body">
        <view class="evaluate-body-item padding-20">
          <view class="item-header flex-a-center-j-space-between">
            <view class="item-header-left flex-a-center">
              <image
                src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230621_542df0fab88647f5b96e92c7e40391ad.png"
                mode=""
              />
              <view class="name">李怡静</view>
              <view class="date">6月4日</view>
            </view>
            <view class="item-header-right flex-a-center">
              <image
                src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230724_3192cd4e2f4546a59c82e5c9ab40f9d1.png"
                mode=""
              />
              <view class="text">好评</view>
            </view>
          </view>

          <view class="item-body text-hidden">
            打扫非常干净，干活麻利，按时上门。
          </view>
        </view>
        <view class="evaluate-body-item padding-20">
          <view class="item-header flex-a-center-j-space-between">
            <view class="item-header-left flex-a-center">
              <image
                src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230621_542df0fab88647f5b96e92c7e40391ad.png"
                mode=""
              />
              <view class="name">李怡静</view>
              <view class="date">6月4日</view>
            </view>
            <view class="item-header-right flex-a-center">
              <image
                src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230724_3192cd4e2f4546a59c82e5c9ab40f9d1.png"
                mode=""
              />
              <view class="text">好评</view>
            </view>
          </view>

          <view class="item-body text-hidden">
            打扫非常干净，干活麻利，按时上门。
          </view>
        </view>
      </view>
    </view>

    <u-gap height="20" bgColor="#F9F9F9"></u-gap>

    <!-- 服务详情展示 -->
    <view class="clear-detail-table padding-30">
      <view class="table-header">服务内容</view>
      <view class="table-body">
        <u-row customStyle="margin-bottom: 10px">
          <u-col span="3">
            <view class="demo-layout bg-purple-light">房屋面积</view>
          </u-col>
          <u-col span="9">
            <view class="demo-layout bg-purple flex-a-center-j-space-between">
              <view>小于50㎡</view>
              <view>51㎡-70㎡</view>
              <view>71㎡-90㎡</view>
            </view>
          </u-col>
        </u-row>

        <u-row customStyle="margin-bottom: 10px">
          <u-col span="3">
            <view class="demo-layout bg-purple-light">参考时长</view>
          </u-col>
          <u-col span="9">
            <view class="demo-layout bg-purple flex-a-center-j-space-between">
              <view>2小时</view>
              <view>3小时</view>
              <view>4小时</view>
            </view>
          </u-col>
        </u-row>

        <u-row customStyle="margin-bottom: 10px">
          <u-col span="3">
            <view class="demo-layout bg-purple-light">服务范围</view>
          </u-col>
          <u-col span="9">
            <view class="demo-layout bg-purple flex-a-center-j-space-between">
              <view>客厅、</view>
              <view>餐厅、</view>
              <view>卧室、</view>
              <view>阳台、</view>
              <view>厨房、</view>
              <view>卫生间</view>
            </view>
          </u-col>
        </u-row>

        <u-row customStyle="margin-bottom: 10px">
          <u-col span="3">
            <view class="demo-layout bg-purple-light">服务项目</view>
          </u-col>
          <u-col span="9">
            <view class="demo-layout bg-purple">
              家具、地面除尘、橱柜、厨电表面除尘沙发、茶几物品整理、马桶除尘祛污
            </view>
          </u-col>
        </u-row>

        <u-row customStyle="margin-bottom: 10px">
          <u-col span="3">
            <view class="demo-layout bg-purple-light">注意事项</view>
          </u-col>
          <u-col span="9">
            <view class="demo-layout bg-purple">
              1.该服务不适用以下场景:学校/办公室/商铺/租房新入住/出租房回收/3个月以上未入住/新居开荒;<br />
              2.该服务不包含:洗衣做饭洗碗，整理衣柜，接送孩子，家用电器内部清洗及拆洗，天花板及灯具清洗，窗帘、地毯、地板打蜡，家具保养等家居洗护和绿植养护:<br />
              3.房屋面积仅供参考，以实际服务时长为准，超出的时长须与保洁师协商后进行线上补款；
            </view>
          </u-col>
        </u-row>
      </view>
    </view>

    <u-gap height="20" bgColor="#F9F9F9"></u-gap>

    <view class="clear-detail-compared padding-30">
      <view class="compared-title">服务前后对比</view>
      <view class="compared-content flex-a-center">
        <view class="compared-content-left">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230731_c49f38d27adb417ea6ae2e0078f44a5a.png"
            mode=""
          />
        </view>
        <view class="compared-content-right">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230731_d3131b76e6884b97b36e60bb4814308d.png"
            mode=""
          />
        </view>
      </view>
      <view class="compared-content flex-a-center">
        <view class="compared-content-left">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230731_b1b081e70a74491ab36a009b7b8ac6ec.png"
            mode=""
          />
        </view>
        <view class="compared-content-right">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230731_5dce3055e92c458e8e4eae818ee945d1.png"
            mode=""
          />
        </view>
      </view>
      <view class="compared-content flex-a-center">
        <view class="compared-content-left">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230731_c1bfd162b9d14d8c9f337d5c50ab43c0.png"
            mode=""
          />
        </view>
        <view class="compared-content-right">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230731_6064cd36ea50415582e33b02ddaaa5c9.png"
            mode=""
          />
        </view>
      </view>
    </view>

    <u-gap height="20" bgColor="#F9F9F9"></u-gap>

    <view class="clear-detail-notice">
      <view class="notice-title"> 服务须知 </view>
      <view class="notice-container">
        <view class="notice-container-item">
          <view class="dot"></view>
          <view class="text">
            请您确保保洁师上门服务期间家里水电正常可使用
          </view>
        </view>
        <view class="notice-container-item">
          <view class="dot"></view>
          <view class="text">
            部分城市实行垃圾分类，非垃圾投放时段无法帮忙处理垃圾，敬请谅解
          </view>
        </view>
        <view class="notice-container-item">
          <view class="dot"></view>
          <view class="text">
            部分城市实行垃圾分类，非垃圾投放时段无法帮忙处理垃圾，敬请谅解
            玻璃及纱窗、百叶窗、防护窗等清洗不在服务范围内
          </view>
        </view>
        <view class="notice-container-item">
          <view class="dot"></view>
          <view class="text">
            与宠物相关的不做任何清理，鱼缸无论大小，只做表面软布擦拭除尘，不做任何专业处理(换水、换鱼、喂鱼)
          </view>
        </view>
        <view class="notice-container-item">
          <view class="dot"></view>
          <view class="text">
            服务时长说明:服务时长最低2小时起，服务时长不足2小时按照2小时计服务时长超出2小时目不超15分钟按照2小时计费服务时长超出2小时且超出15-60分钟按照3小时计费
          </view>
        </view>
        <view class="notice-container-item">
          <view class="dot"></view>
          <view class="text">
            为保证您的合法权益，避免不必要的损失，请您选择线上交易，避免与服务人员线下交易，我们对私下交易无法提供安全和售后保障，感谢配合
          </view>
        </view>
        <view class="notice-container-item">
          <view class="dot"></view>
          <view class="text">
            柜子内部(含内部陈设物品)、窗帘、工艺品、玉器、古董字画、宗教陈设、花草绿植、天花板及附属品(灯具、吊灯等)、厨房重水垢和重油污均不在清洁范围内
          </view>
        </view>
      </view>
    </view>
    <!-- footer -->
    <view class="clear-detail-footer">
      <u-button
        type="primary"
        text="立即预约"
        @click="toHomeReserve"
        size="large"
      ></u-button>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toHomeReserve() {
      uni.navigateTo({
        url: "/subPages/home/home-reserve",
      });
    },
    toMorePage() {
      uni.navigateTo({
        url: "/subPages/home/comment-list",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.clear-detail {
  padding-bottom: 100rpx;

  .swiper {
    width: 100vw;
    height: 360rpx;

    > image {
      width: 100%;
      height: 100%;
    }
  }

  &-text {
    margin-top: 20rpx;
    padding-bottom: 30rpx;

    .text-header {
      &-left {
        height: 84rpx;
        font-size: 28rpx;
        font-weight: bold;
        color: #ff0000;
        line-height: 84rpx;

        > text {
          font-size: 40rpx;
        }
      }

      &-right {
        height: 38rpx;
        font-size: 26rpx;
        color: #999999;
        line-height: 38rpx;
      }
    }

    .text-body {
      height: 50rpx;
      font-size: 36rpx;
      font-weight: bold;
      color: #333333;
      line-height: 50rpx;
      margin-bottom: 12rpx;
    }

    .text-footer {
      display: flex;

      &-item {
        padding: 0 18rpx;
        height: 40rpx;
        border-radius: 7rpx;
        margin-right: 20rpx;
        border: 1rpx solid #999999;
        text-align: center;
        line-height: 40rpx;
        font-size: 24rpx;
        color: #999999;
      }
    }
  }

  &-evaluate {
    position: relative;
    // text-align: center;

    .evaluate-header {
      display: flex;

      .evaluate-title {
        height: 50rpx;
        font-size: 36rpx;
        font-weight: bold;
        color: #333333;
        line-height: 50rpx;
      }

      .icon {
        position: absolute;
        right: 10rpx;
        font-size: 26rpx;
        color: #666666;
      }
    }

    .evaluate-body {
      display: flex;
      width: calc(100vw - 40rpx);
      overflow-x: scroll;
      margin-top: 20rpx;

      &-item {
        width: 580rpx;
        height: 180rpx;
        background: rgba(236, 233, 233, 0.5);
        border-radius: 20rpx;
        margin-right: 20rpx;

        .item-header {
          margin-bottom: 20rpx;

          &-left {
            > image {
              width: 70rpx;
              height: 70rpx;
              margin-right: 18rpx;
            }

            .name {
              height: 38rpx;
              font-size: 26rpx;
              color: #333333;
              line-height: 38rpx;
              margin-right: 18rpx;
            }

            .date {
              font-size: 24rpx;
              color: #999999;
            }
          }

          &-right {
            > image {
              width: 30rpx;
              height: 38rpx;
              margin-right: 18rpx;
            }

            .text {
              font-size: 24rpx;
              color: #4ea4fb;
            }
          }
        }

        .item-body {
          font-size: 26rpx;
          color: #666666;
        }
      }
    }
  }

  &-table {
    .table-header {
      width: 100%;
      height: 50rpx;
      font-size: 36rpx;
      font-weight: bold;
      color: #333333;
      line-height: 50rpx;
      margin-bottom: 40rpx;
      text-align: center;
    }

    .table-body {
    }
  }

  &-compared {
    padding: 40rpx;

    .compared-title {
      width: 100%;
      height: 50rpx;
      font-size: 36rpx;
      font-weight: bold;
      color: #333333;
      line-height: 50rpx;
      margin-bottom: 40rpx;
      text-align: center;
    }

    .compared-content {
      width: 100%;
      height: 164rpx;
      border-radius: 20rpx;
      overflow: hidden;
      margin-bottom: 20rpx;
      position: relative;

      &::before {
        position: absolute;
        content: "VS";
        color: #fff;
        display: block;
        width: 66rpx;
        height: 66rpx;
        line-height: 66rpx;
        text-align: center;
        background: #999999;
        border-radius: 50%;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }

      &-left {
        width: 50%;
        height: 100%;

        > image {
          width: 100%;
          height: 100%;
        }
      }
      &-right {
        width: 50%;
        height: 100%;

        > image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  &-notice {
    padding: 40rpx;

    .notice-title {
      width: 100%;
      height: 50rpx;
      font-size: 36rpx;
      font-weight: bold;
      color: #333333;
      line-height: 50rpx;
      margin-bottom: 40rpx;
      text-align: center;
    }
    .notice-container {
      width: 100%;

      &-item {
        width: 100%;
        display: flex;
        justify-content: space-between;
        // align-items: flex-start;
        position: relative;
        margin-bottom: 20rpx;

        .dot {
          width: 14rpx;
          height: 14rpx;
          background: #4ea4fb;
          opacity: 0.5;
          position: absolute;
          top: 10rpx;
          left: 0;
        }

        .text {
          font-size: 24rpx;
          color: #666666;
          margin-left: 30rpx;
        }
      }
    }
  }

  &-footer {
    width: 100vw;

    /* 添加底部内边距 */
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }
}

.wrap {
  padding: 12px;
}

.demo-layout {
  //   height: 50rpx;
  //   line-height: 50rpx;
  //   padding: 10rpx 20rpx;
  margin: 10rpx 0;

  border-radius: 4px;
}

.bg-purple {
  font-size: 26rpx;
  color: #333333;
  //   background: #ced7e1;
}

.bg-purple-light {
  text-align: center;
  font-size: 26rpx;
  font-weight: bold;
  color: #333333;
  //   background: #e5e9f2;
}
</style>
