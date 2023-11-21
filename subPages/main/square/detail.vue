<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-28 14:55:05
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-21 10:54:36
 * @FilePath: /community-square/subPages/home/clear-detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="clear-detail container">
    <view class="swiper">
      <image :src="imageUrl(detailData.detail_log)" mode="" />
    </view>

    <view class="clear-detail-text box">
      <view class="text-header flex-a-center-j-space-between">
        <view class="text-header-left">
          ¥<text class="timePrice">{{ detailData.product_price }}</text
          >/小时起
        </view>
        <view class="text-header-right">{{ detailData.serve_arrive }}</view>
      </view>
      <view class="text-body">{{ detailData.product_title }}</view>
      <view class="text-footer">
        <view
          class="text-footer-item"
          v-for="assure in detailData.serve_assure"
          :key="assure"
          >{{ assure }}</view
        >
      </view>
    </view>

    <u-gap height="20" bgColor="#F9F9F9"></u-gap>

    <!-- <view class="clear-detail-evaluate padding-30">
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
    </view> -->

    <!-- <u-gap height="20" bgColor="#F9F9F9"></u-gap> -->

    <!-- 服务详情展示 -->
    <view class="clear-detail-table padding-30">
      <view class="table-header">服务内容</view>
      <view class="table-body">
        <!-- <u-row customStyle="margin-bottom: 10px">
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
        </u-row> -->

        <u-row customStyle="margin-bottom: 10px">
          <u-col span="3">
            <view class="demo-layout bg-purple-light">服务范围</view>
          </u-col>
          <u-col span="9">
            <view class="demo-layout bg-purple flex-a-center-j-space-between">
              <text>客厅、餐厅、卧室、阳台、厨房、卫生间</text>
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
        <!-- 表格 -->
        <view class="assure-table">
          <u-row>
            <u-col span="4">
              <view class="table-1">服务规格</view>
            </u-col>
            <u-col span="4">
              <view class="table-1">服务人数</view>
            </u-col>
            <u-col span="4">
              <view class="table-1">所需时长</view>
            </u-col>
          </u-row>
          <u-row
            v-for="(table, index) in detailData.tableField111"
            :key="index"
          >
            <u-col span="4">
              <view class="table-2">{{ table.grade }}</view>
            </u-col>
            <u-col span="4">
              <view class="table-2">{{ table.num }}</view>
            </u-col>
            <u-col span="4">
              <view class="table-2">{{ table.time }}/小时</view>
            </u-col>
          </u-row>
        </view>

        <view class="table-footer flex-a-center">
          <view class="dot"></view>
          <text class="table-footer-text" style="margin-left: 30rpx">{{
            detailData.serve_content_notice
          }}</text>
        </view>
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
        <view
          class="notice-container-item"
          v-for="(instructions, _) in detailData.service_instructions"
          :key="_"
        >
          <view class="dot"></view>
          <view class="text">
            {{ instructions }}
          </view>
        </view>
      </view>
    </view>
    <!-- footer -->
    <view class="clear-detail-footer">
      <u-button
        :type="orderData.length ? 'warning' : 'primary'"
        :text="orderData.length ? '取消预约' : '立即预约'"
        @click="createOrder"
        size="large"
      ></u-button>
    </view>

    <u-modal
      :show="show"
      :content="content"
      @confirm="confirm"
      :showCancelButton="true"
      @cancel="clickCancel"
    ></u-modal>
  </view>
</template>

<script>
import { getModelInfo, createModel, getModelList, deleteModel } from "@/api";
import { getRequestFilter } from "@/common/function";
import userMixin from "@/common/mixins/user";
import infoMixin from "@/common/mixins/info";
export default {
  mixins: [userMixin, infoMixin],
  data() {
    return {
      detailData: {},
      projectId: "",
      orderData: [],
      show: false,
      content: "该服务已经预约是否取消该服务订单?",
    };
  },

  methods: {
    imageUrl(data) {
      // console.log(this.$helper.filterCover(data?.[0].url));
      return this.$helper.filterCover(data?.[0].url);
    },
    toMorePage() {
      console.log("预约成功");
    },
    async getDetailData(id) {
      try {
        const { data } = await getModelInfo("655ad0b63245131f7b1e0e44", id);
        this.detailData = data;
      } catch (error) {
        console.log(error);
      }
    },
    // 创建订单
    async createOrder() {
      if (!this.orderData.length) {
        try {
          await createModel("655c0eca3245131f7b1e0e6e", {
            serve_id: this.projectId,
          });
          uni.showToast({
            title: "预约成功",
            duration: 400,
          });
        } catch (error) {
          console.log(error);
        }
      } else {
        this.show = true;
      }
    },
    // 查询订单
    async selectOrder() {
      const filterData = getRequestFilter({
        serve_id: this.projectId,
        creatorUserId: this.userInfo.id,
      });

      try {
        const { data } = await getModelList(
          "655c0eca3245131f7b1e0e6e",
          filterData
        );
        this.orderData = data?.list;
      } catch (error) {
        console.log(error);
      }
    },
    // 模态窗
    async confirm() {
      try {
        await deleteModel("655c0eca3245131f7b1e0e6e", this.orderData[0]._id);
        this.show = false;
      } catch (error) {
        console.log(error);
      }
    },
    clickCancel() {
      this.show = false;
    },
  },

  async onLoad(options) {
    this.projectId = options.id;
    await this.getDetailData(options.id);
    this.selectOrder();
  },
};
</script>

<style lang="scss" scoped>
.clear-detail {
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

    .table-footer {
      margin-top: 30rpx;
      height: 73rpx;
      font-size: 24rpx;
      color: #666666;
      line-height: 40rpx;
      position: relative;

      .dot {
        width: 14rpx;
        height: 14rpx;
        border-radius: 7px;
        background: #4ea4fb;
        opacity: 0.5;
        position: absolute;
        top: 10rpx;
        left: 0;
      }
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
          border-radius: 7px;
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
  margin: 10rpx 0;
  // border-radius: 4px;
}

.bg-purple {
  font-size: 26rpx;
  color: #333333;
}

.bg-purple-light {
  text-align: center;
  font-size: 26rpx;
  font-weight: bold;
  color: #333333;
  //   background: #e5e9f2;
}

.table-1 {
  background: #e9f3fe;
  padding: 10rpx 0;
  text-align: center;
}
.table-2 {
  background: #f9fcff;
  padding: 10rpx 0;
  text-align: center;
  font-size: 24rpx;
}
</style>
