<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-12-21 11:49:08
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-12-21 19:13:43
 * @FilePath: /smart-park/subPages/market/product/order.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="order container">
    <view class="order-title"> 请您尽快付款 </view>
    <view class="order-address">
      <view class="flex-a-center">
        <u-icon name="map" size="20"></u-icon>
        <view class="user-name">{{ addressData.user_name }}</view>
        <view class="phone">{{ addressData.user_phone }}</view>
      </view>
      <view class="address-detail">{{
        addressData.order_address + addressData.order_detail_address
      }}</view>
    </view>
    <view class="goods-detail">
      <view class="goods-detail-header flex-a-center-j-space-between">
        <image
          :src="$helper.filterCover(goodsData.goods_log[0].url)"
          mode=""
          v-if="goodsData.goods_log"
        />
        <view class="header-message text-2-hidden">
          {{ goodsData.goods_description }}
        </view>
        <view class="price">￥{{ goodsData.goods_price_old }}</view>
      </view>
      <view class="goods-detail-body">
        <view class="body-item flex-a-center-j-space-between">
          <view class="body-item-label">商品总价</view>
          <view class="body-item-text">￥{{goodsData.goods_price_new}}</view>
        </view>
        <view class="body-item flex-a-center-j-space-between">
          <view class="body-item-label">订单编号</view>
          <view class="body-item-text">{{addressData._id}}</view>
        </view>
        <view class="body-item flex-a-center-j-space-between">
          <view class="body-item-label">卖家昵称</view>
          <view class="body-item-text">{{goodsData.username}}</view>
        </view>
        <view class="body-item flex-a-center-j-space-between">
          <view class="body-item-label">下单时间</view>
          <view class="body-item-text">{{$u.timeFormat(addressData.creatorTime, 'yyyy-mm-dd hh:MM:ss')}}</view>
        </view>
      </view>
    </view>
    <view class="goods-nave">
      <view class="goods-nave-item" @click="handleCancel">取消订单</view>
      <view class="goods-nave-item buy-button" @click="handleBuy">去付款</view>
    </view>
  </view>
</template>

<script>
import { getModelInfo } from "@/api";
export default {
  data() {
    return {
      addressData: {},
      goodsData: {},
    };
  },
  methods:{
    handleBuy(){
      uni.navigateTo({
        url: "/subPages/market/product/product-order",
      });
    },
    handleCancel(){
      uni.navigateBack({
         delta: 1
      });
    }
  },
  async onLoad(options) {
    let { query } = options;
    let { data } = await getModelInfo("65680708f3ad0c30c03e1e45", query);
    this.addressData = data;
    if (data) {
      let goodsResult = await getModelInfo(
        "65605e75f3ad0c30c038ff96",
        data.order_goods_id
      );
      this.goodsData = goodsResult.data;
    }
  },
};
</script>

<style lang="scss" scoped>
//
.order {
  position: relative;
  padding: 20rpx;

  &-title {
    font-size: 36rpx;
    font-weight: 800;
    color: #222;
    margin-bottom: 30rpx;
  }

  &-address {
    border-radius: 20rpx;
    padding: 30rpx 20rpx;
    box-sizing: border-box;
    background: linear-gradient(to left, #fdfae7, #fff);
    margin-bottom: 20rpx;

    .user-name {
      padding: 0 12rpx;
      font-size: 30rpx;
      font-weight: 600;
    }

    .address-detail {
      color: #a3a3a3;
    }
  }

  .goods-detail {
    background-color: #fff;
    padding: 20rpx;
    border-radius: 20rpx;
    box-sizing: border-box;

    &-header {
      margin-bottom: 20rpx;

      > image {
        width: 160rpx;
        height: 160rpx;
        border-radius: 12rpx;
        flex-shrink: 0;
      }

      .header-message {
        height: 100%;
      }

      .price {
        height: 100%;
        font-weight: 600;
        color: #1a1a1a;
      }
    }

    &-body {
      margin-top: 30rpx;
     
    .body-item{
      margin-bottom: 30rpx;
     &-text{
      color: #9F9F9F;
     }
    }
    }
  }

  .goods-nave{
    display: flex;
    width: 80%;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    padding: 20rpx;
    box-sizing: border-box;
    // background-color: #fff;
    border-radius: 20rpx;
    padding-bottom: constant(safe-area-inset-bottom) !important;
    padding-bottom: env(safe-area-inset-bottom) !important;
    // margin: 0 auto;
    &-item{
      width: 45%;
      height: 80rpx;
      line-height: 80rpx;
      text-align: center;
      border-radius: 20rpx;
      background-color: #fff;
      // background-color: #F5F5F5;
      color: #9F9F9F;
    }

    .buy-button{
      background-color: #EB5428;
      color: #fff;
    }
  }
}
</style>
