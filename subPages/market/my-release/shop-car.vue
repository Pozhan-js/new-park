<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-11-29 11:48:12
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-12-01 09:35:00
 * @FilePath: /smart-park/subPages/market/my-release/shop-car.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="shop-car container">
    <checkbox-group @change="radioChange">
      <label
        class="uni-list-cell uni-list-cell-pd"
        v-for="(item, index) in items"
        :key="index"
      >
        <view>
          <view class="shop-car-item" style="padding: 20rpx 10rpx">
            <view class="item-header flex-a-center">
              <checkbox
                style="transform: scale(0.7)"
                :value="item.goods_name"
                :checked="true"
              />
              <view>{{ item.goods_name }}</view>
            </view>
            <view class="item-body flex-a-center">
              <view class="item-body-left">
                <image :src="getImageUrl(item.goods_log[0].url)" mode="" />
              </view>
              <view class="item-body-right flex-a-center">
                <!-- 属性 -->
                <view
                  class="right-item"
                  v-for="(data, index) in item.tableField106"
                  :key="index"
                >
                  {{ data.good_parameters }}: {{ data.parameters_value }}
                </view>
              </view>
            </view>
            <view class="item-footer">
              <view class="price">
                ¥<text style="font-weight: 600">{{
                  toStringPrice(item.price).split(".")[0]
                }}</text
                >.<text style="font-size: 22rpx">{{
                  toStringPrice(item.price).split(".")[1]
                }}</text>
              </view>
            </view>
          </view>
        </view>
      </label>
    </checkbox-group>

    <view class="shop-car-footer">
      <checkbox-group @change="radioChange">
        <view class="flex-a-center">
          <label>
            <view class="footer-content">
              <checkbox
                style="transform: scale(0.7)"
                value="全选"
                :checked="true"
              />全选
            </view>
          </label>
          <view class="footer-right flex-a-center-j-space-between">
            <view class="all-price">
              合计:
              <text style="font-size: 34rpx; font-weight: 600">¥ 968</text
              >.<text style="font-size: 22rpx">00</text>
            </view>
            <view class="footer-right-btn">
              <u-button type="primary" size="normal" shape="circle" color="red">
                点击结算({{ 1 }})
              </u-button>
            </view>
          </view>
        </view>
      </checkbox-group>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          creatorTime: 1701312156392,
          creatorUserId: "6549df79c7af825b70926349",
          goods_log: [
            {
              fileId: 1701242839182,
              name: "ILWhFDLBWetDf543c1071be6cc6c3d51bb7cf1a2218b.png",
              url: "/api/mongoFile/previewImage/SmartPark/65682e6c3d898d40580441f4",
            },
          ],
          goods_name: "好孩子婴儿车",
          order_status: "待支付",
          price: "400.2",
          product_ID: "6566e896f3ad0c30c03d556f",
          tableField106: [
            { good_parameters: "款式", parameters_value: "可折叠式" },
            { good_parameters: "款式", parameters_value: "可折叠式" },
            { good_parameters: "成色", parameters_value: "明显使用痕迹" },
            { good_parameters: "颜色", parameters_value: "苍青色" },
            { good_parameters: "承重", parameters_value: "100kg" },
            { good_parameters: "材质", parameters_value: "聚丙乙烯" },
            { good_parameters: "手托", parameters_value: "不配备手托" },
          ],
          _id: "6567f69cf3ad0c30c03e02ab",
        },
        {
          creatorTime: 1701312156392,
          creatorUserId: "6549df79c7af825b70926349",
          goods_log: [
            {
              fileId: 1701242839182,
              name: "ILWhFDLBWetDf543c1071be6cc6c3d51bb7cf1a2218b.png",
              url: "/api/mongoFile/previewImage/SmartPark/65682e6c3d898d40580441f4",
            },
          ],
          goods_name: "好孩子婴儿车",
          order_status: "待支付",
          price: "400",
          product_ID: "6566e896f3ad0c30c03d556f",
          tableField106: [
            { good_parameters: "款式", parameters_value: "可折叠式" },
            { good_parameters: "款式", parameters_value: "可折叠式" },
            { good_parameters: "成色", parameters_value: "明显使用痕迹" },
            { good_parameters: "颜色", parameters_value: "苍青色" },
            { good_parameters: "承重", parameters_value: "100kg" },
            { good_parameters: "材质", parameters_value: "聚丙乙烯" },
            { good_parameters: "手托", parameters_value: "不配备手托" },
          ],
          _id: "6567f69cf3ad0c30c03e02ab",
        },
      ],
    };
  },
  methods: {
    getImageUrl(url) {
      if (url) {
        console.log("url", url);
        return this.$helper.filterCover(url);
      }
    },
    toStringPrice(data) {
      if (data.includes(".")) {
        // 判断是否为浮点数
        let float_num = data.split(".")[1].padEnd(2, "0");

        return data.split(".")[0] + "." + float_num;
      } else {
        // 非浮点数
        return data + ".00";
      }
      // return data.padEnd(4, "0");
    },
    // 复选框
    radioChange(e) {
      console.log("e", e);
    },
    // 全选按钮
    allCheckBtn() {},
  },
};
</script>

<style lang="scss" scoped>
.shop-car {
  background-color: #f0f0f0;
  padding: 20rpx;
  position: relative;

  &-item {
    width: 100%;
    background-color: #fff;
    border-radius: 18rpx;
    box-sizing: border-box;
    margin-bottom: 30rpx;

    .item-header {
      margin-bottom: 20rpx;
    }

    .item-body {
      margin-bottom: 20rpx;

      &-left {
        > image {
          width: 200rpx;
          height: 180rpx;
          margin: 0rpx 20rpx 0rpx 50rpx;
          border-radius: 10rpx;
        }
      }

      &-right {
        flex-wrap: wrap;

        .right-item {
          background-color: #f0f0f0;
          color: #999;
          padding: 4rpx 16rpx;
          border-radius: 10rpx;
          margin-right: 10rpx;
          margin-bottom: 10rpx;
          font-size: 24rpx;
        }
      }
    }

    .item-footer {
      display: flex;
      justify-content: flex-end;
      .price {
        font-size: 24rpx;
        color: red;
        margin-right: 50rpx;

        text {
          font-size: 34rpx;
        }
      }
    }
  }

  &-footer {
    background-color: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: constant(safe-area-inset-bottom) !important;
    padding-bottom: env(safe-area-inset-bottom) !important;

    .footer-content {
      flex: 1;
      padding: 20rpx;
      box-sizing: border-box;
    }

    .footer-right {
      flex: 1;
      padding: 20rpx;
      box-sizing: border-box;
      width: 100%;
    }
  }
}
</style>
