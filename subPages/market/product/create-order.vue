<!--
 * @Author: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @Date: 2023-12-04 14:30:43
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-12-21 18:08:04
 * @FilePath: /smart-park/subPages/market/product/order.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="create-order">
    <view class="address-wrap flex-a-center-j-space-between">
      <template v-if="defaultAddress.length">
        <view
          class="address-wrap-content"
          @click="goToAddressDetail(defaultAddress[0]._id)"
        >
          <view class="name">
            <text>{{ defaultAddress[0].name }}</text>
            <text style="margin-left: 20rpx; color: #6377f5">{{
              defaultAddress[0].phone
            }}</text>
          </view>
          <view class="address">{{
            defaultAddress[0].address + defaultAddress[0].moreAddres
          }}</view>
        </view>
        <u-icon class="arrow-right" name="arrow-right" />
      </template>
      <view class="empty-address flex-center" v-else>
        <text style="margin-right: 20rpx">请设置地址~~~</text>
        <u-tag
          text="点击去设置"
          size="mini"
          type="primary"
          @click="clickTag"
        ></u-tag>
      </view>
    </view>
    <view class="good">
      <view class="good-item">
        <view class="good-img">
          <image :src="getImageUrl(detailData.goods_log)" />
        </view>
        <view class="good-desc">
          <view class="good-title">
            <text></text>
            <text>{{ detailData.goods_name }}</text>
          </view>
          <view class="good-btn">
            <view class="price">¥{{ detailData.goods_price_new }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="pay-wrap">
      <view class="price">
        <text>商品金额</text>
        <text>¥{{ detailData.goods_price_new }}</text>
      </view>
      <view style="padding: 0 20rpx; box-sizing: border-box">
        <u-button
          class="pay-btn"
          color="#6377f5"
          type="primary"
          :loading="createLoading"
          block
          @click="clickToOrderPage"
        >
          生成订单
        </u-button>
      </view>
    </view>
  </view>
</template>

<script>
import { getModelList, getModelInfo, createModel } from "@/api";
// import { getRequestFilter } from "@/common/function";
export default {
  data() {
    return {
      defaultAddress: [],
      detailData: {},
      reqOrderData: {},
      createLoading: false,
    };
  },
  methods: {
    // 获取默认地址
    async getDefaultAddress() {
      let sortData = {
        currentPage: 1,
        pageSize: -1,
        sort: {
          new_time: "desc",
        },
      };
      const { data } = await getModelList("656c2230262fbe2d9d06756d", sortData);
      this.defaultAddress = data?.list;
    },
    // 补全图片路径
    getImageUrl(data) {
      return this.$helper.filterCover(data?.[0]?.url);
    },
    clickTag() {
      uni.navigateTo({
        url: "/subPages/market/product/shop-address",
      });
    },
    goToAddressDetail() {
      uni.navigateTo({
        url: `/subPages/market/product/shop-address`,
      });
    },
    // 查询订单详情
    async getDetailOrderData(id) {
      const { data } = await getModelInfo("65605e75f3ad0c30c038ff96", id);
      this.detailData = data;
    },
    // 去支付
    async clickToOrderPage() {
      let reqData = {
        order_address: this.defaultAddress[0].address,
        order_detail_address: this.defaultAddress[0].moreAddres,
        order_goods_id: this.detailData._id,
        order_price: this.detailData.goods_price_new,
        user_name: this.defaultAddress[0].name,
        user_phone: this.defaultAddress[0].phone,
        seller_name: this.detailData.username,
        seller_phone: this.detailData.phone_number,
      };
      let { code, data } = await createModel(
        "65680708f3ad0c30c03e1e45",
        reqData
      );
      if (code === 200) {
        this.$jump("/subPages/market/product/order", {
          query: data,
        });
      }
    },
  },
  onShow() {
    this.getDefaultAddress();
  },
  onLoad(options) {
    let { id } = options;
    this.getDetailOrderData(id);
  },
};
</script>

<style lang="scss" scoped>
.create-order {
  background: #f9f9f9;
  .address-wrap {
    margin-bottom: 20rpx;
    background: #fff;
    position: relative;
    font-size: 14rpx;
    padding: 15rpx;
    color: #222333;

    &-content {
      width: 100%;
    }

    .empty-address {
      width: 100%;
      height: 100px;
      margin: auto;
    }
    .name,
    .address {
      margin: 10rpx 0;
    }
    .arrow {
      position: absolute;
      right: 10rpx;
      top: 50%;
      transform: translateY(-50%);
      font-size: 20rpx;
    }
    &::before {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 2rpx;
      background: -webkit-repeating-linear-gradient(
        135deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background: repeating-linear-gradient(
        -45deg,
        #ff6c6c 0,
        #ff6c6c 20%,
        transparent 0,
        transparent 25%,
        #1989fa 0,
        #1989fa 45%,
        transparent 0,
        transparent 50%
      );
      background-size: 80rpx;
      content: "";
    }
  }
  .good {
    margin-bottom: 120rpx;
  }
  .good-item {
    padding: 10px;
    background: #fff;
    display: flex;
    .good-img {
      image {
        width: 200rpx;
        height: 200rpx;
        border-radius: 20rpx;
      }
    }
    .good-desc {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      flex: 1;
      padding: 20px;
      .good-title {
        display: flex;
        justify-content: space-between;
      }
      .good-btn {
        display: flex;
        justify-content: flex-end;
        .price {
          font-size: 16px;
          color: red;
          line-height: 28px;
        }
        .van-icon-delete {
          font-size: 20px;
          margin-top: 4px;
        }
      }
    }
  }
  .pay-wrap {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    padding: 10rpx 0;
    padding-bottom: 100rpx;
    border-top: 1px solid #e9e9e9;
    > view {
      display: flex;
      justify-content: space-between;
      padding: 0 5%;
      margin: 20rpx 0;
      font-size: 28rpx;
      text:nth-child(2) {
        color: red;
        font-size: 36rpx;
      }
    }
    .pay-btn {
      position: fixed;
      bottom: 14rpx;
      right: 0;
      left: 0;
      width: 90%;
      margin: 0 auto;
    }
  }
}
</style>
