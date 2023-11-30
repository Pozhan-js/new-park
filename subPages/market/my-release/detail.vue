<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-05 16:56:57
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-30 17:29:09
 * @FilePath: /used-idle/subPages/my-release/detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="release-detail box">
    <view class="release-detail-body">
      <view class="user-info flex-a-center-j-space-between">
        <view class="user-info-left flex-a-center">
          <image :src="getImageUrl(detailData.header_icon)" mode="" />
          <view class="user-info-left-text">
            <view class="user-info-left-text-name">
              <text class="name">{{ detailData.username }}</text>
              <text class="icon"> 信誉极好 </text>
            </view>
            <view class="user-info-left-text-time text-hidden">
              {{ $u.timeFrom(detailData.creatorTime, "yyyy-mm-dd") }}｜发布于{{
                detailData.blur_address
              }}
            </view>
          </view>
        </view>
        <!-- <view class="user-info-right"> + 关注 </view> -->
      </view>

      <view class="shop-price flex-a-center">
        <view class="price-delete">￥{{ detailData.goods_price_new }}</view>
        <view class="price">{{ detailData.goods_price_old }}</view>
        <view class="price-btn">
          购入价{{
            (
              (detailData.goods_price_new / detailData.goods_price_old) *
              10
            ).toFixed(1)
          }}折
        </view>
      </view>

      <view class="product-information">
        <view class="product-information-content flex-a-center">
          <view
            class="product-information-content-item"
            v-for="item in detailData.tableField112"
            :key="item.good_parameters"
          >
            <view class="item-title">{{ item.good_parameters }}</view>
            <view class="item-text">{{ item.parameters_value }}</view>
          </view>
        </view>
      </view>

      <view class="describe">
        {{ detailData.goods_description }}
      </view>

      <image :src="log_image" mode="" style="width: 100%; height: 490rpx" />

      <view class="img-gird flex-a-center">
        <view
          class="img-gird-left"
          :style="{
            backgroundImage: `url(${image_1})`,
          }"
        >
        </view>
        <view class="img-gird-right">
          <view
            class="top"
            :style="{
              backgroundImage: `url(${image_2})`,
            }"
          ></view>
          <view
            class="bottom"
            :style="{
              backgroundImage: `url(${image_3})`,
            }"
          ></view>
        </view>
      </view>

      <view class="hope-people">
        8人想买｜{{ detailData.visitors_num }}人浏览
      </view>
      <view class="release-address">
        {{ $u.timeFrom(detailData.creatorTime, "yyyy-mm-dd") }}发布于{{
          getResAddress(detailData.blur_address)
        }}
      </view>
    </view>
    <!-- flex-a-center-j-space-between box -->
    <view class="release-detail-footer">
      <uni-goods-nav
        :fill="true"
        :options="options"
        :button-group="customButtonGroup"
        @click="onClick"
        @buttonClick="buttonClick"
      />
      <!-- <view class="footer-left flex-a-center-j-space-between">
        <u-icon
          :name="collectStatus ? 'star-fill' : 'star'"
          label="收藏"
          size="24"
          :color="collectStatus ? '#fef8ac' : ''"
          labelPos="bottom"
          labelSize="10"
          style="margin-right: '60rpx'"
          @click="clickCollectBtn(detailData._id)"
        ></u-icon>
        <u-icon
          name="chat"
          labelSize="10"
          label="留言"
          size="24"
          labelPos="bottom"
        ></u-icon>
      </view>
      <view class="footer-right flex-a-center">
        <view class="footer-btn box">加入购物车</view>
        <view class="footer-btn active-btn box" @click="toPay">去付款</view>
      </view> -->
    </view>
  </view>
</template>

<script>
import {
  getModelInfo,
  updateModel,
  createModel,
  getModelList,
  deleteModel,
} from "@/api";
import infoMixin from "@/common/mixins/info";
import { mapActions, mapState } from "vuex";
import { getRequestFilter, sleep } from "@/common/function";
export default {
  mixins: [infoMixin],
  data() {
    return {
      detailData: {},
      // 收藏按钮状态
      collectStatus: false,
      orderId: "",
      collectOrderId: "",
      options: [
        {
          icon: "cart",
          text: "购物车",
          info: 2,
        },
        {
          icon: "chat",
          text: "留言",
          info: 2,
          infoBackgroundColor: "#007aff",
          infoColor: "#f5f5f5",
        },
        {
          icon: "star",
          text: "收藏",
        },
      ],
      customButtonGroup: [
        {
          text: "加入购物车",
          backgroundColor: "linear-gradient(90deg, #1E83FF, #0053B8)",
          color: "#fff",
        },
        {
          text: "立即购买",
          backgroundColor: "linear-gradient(90deg, #60F3FF, #088FEB)",
          color: "#fff",
        },
      ],
      carNumber: 0,
    };
  },
  onLoad(options) {
    this.orderId = options.id;
    this.getDetailOrderData(options.id);
    this.checkCollectData(options.id);
    //获取购物车数据
    this.getAllShopCarNumber(
      getRequestFilter({
        creatorUserId: this.userInfo.id,
      })
    );
  },
  computed: {
    ...mapState("shopCar", ["shopCarData"]),
    log_image() {
      return this.$helper.filterCover(this.detailData?.goods_log?.[0]?.url);
    },
    image_1() {
      return this.$helper.filterCover(this.detailData?.goods_image?.[0]?.url);
    },
    image_2() {
      return this.$helper.filterCover(this.detailData?.goods_image?.[1]?.url);
    },
    image_3() {
      return this.$helper.filterCover(this.detailData?.goods_image?.[2]?.url);
    },
    // carNumber() {
    //   return this.shopCarData.length;
    // },
  },
  watch: {
    shopCarData: {
      handler(val) {
        this.$nextTick(() => {
          this.options[0].info = val.length;
        });
      },
      deep: true,
    },
  },

  methods: {
    ...mapActions("shopCar", ["createShopCarItem", "getAllShopCarNumber"]),
    toPay() {
      uni.navigateTo({
        url: "/subPages/market/product/product-order",
      });
    },
    // 提取省市字符
    getResAddress(str) {
      // 查找省份和城市信息的起始位置
      let provinceStartIndex = str?.indexOf("省");
      let cityStartIndex = str?.indexOf("市");

      // 提取省份和城市信息
      let province = str?.substring(0, provinceStartIndex + 1); // 包含"省"字
      let city = str?.substring(provinceStartIndex + 1, cityStartIndex + 1); // 从"省"字之后到"市"字之间的内容
      return province + city;
    },
    async clickCollectBtn() {
      if (!this.collectStatus || !this.collectOrderId) {
        try {
          const collectData = await createModel("6565ab81f3ad0c30c03c4b0e", {
            order_id: this.orderId,
          });

          if (collectData.code === 200) {
            this.collectOrderId = collectData.data;
            this.collectStatus = true;
            this.options = this.options.map((item) => {
              if (item.text === "收藏") {
                item.color = "#EF1224";
                item.icon = "star-filled";
              }
              return item;
            });
            uni.showToast({
              title: "收藏成功",
              duration: 600,
            });
          }
          this.checkCollectData(this.collectOrderId);
        } catch (error) {
          uni.showToast({
            title: error,
            duration: 600,
          });
        }
      } else {
        console.log("函数删除执行");
        try {
          const collectData = await deleteModel(
            "6565ab81f3ad0c30c03c4b0e",
            this.collectOrderId
          );
          this.collectStatus = false;
          this.collectOrderId = "";
          this.options = this.options.map((item) => {
            if (item.text === "收藏") {
              item.color = "#646566";
              item.icon = "star";
            }
            return item;
          });
          if (collectData.code === 200) {
            uni.showToast({
              title: "取消收藏成功",
              duration: 600,
            });
          }
          this.checkCollectData(this.collectOrderId);
        } catch (error) {
          uni.showToast({
            title: error,
            duration: 600,
          });
        }
      }
    },
    // 补全图片路径
    getImageUrl(url) {
      return this.$helper.filterCover(url);
    },
    // 查询收藏列表
    async checkCollectData(id = "") {
      const { data } = await getModelList(
        "6565ab81f3ad0c30c03c4b0e",
        getRequestFilter({ order_id: id })
      );
      let oid = data?.list[0]?._id;
      // console.log("收藏表数据", data?.list[0]);
      if (oid) {
        this.collectOrderId = oid;
        this.collectStatus = true;
        this.options = this.options.map((item) => {
          if (item.text === "收藏") {
            item.color = "#EF1224";
            item.icon = "star-filled";
          }
          return item;
        });
      }
    },
    // 查询订单详情
    async getDetailOrderData(id) {
      const { data } = await getModelInfo("65605e75f3ad0c30c038ff96", id);
      this.detailData = data;
      this.detailData.visitors_num++;
      let addUpdate = this.detailData;
      await updateModel("65605e75f3ad0c30c038ff96", addUpdate, id);
      // console.log("data", data);
    },

    // 购物数据添加
    async addShopCar() {
      const { _id, goods_name, goods_price_new, tableField112, goods_log } =
        this.detailData;
      let reqData = {
        product_ID: _id,
        order_status: "待支付",
        goods_log,
        goods_name,
        price: goods_price_new,
        tableField106: tableField112,
      };
      // 创建购物车数据
      await this.createShopCarItem(reqData);
      // 刷新购物车数据
      await this.getAllShopCarNumber(
        getRequestFilter({
          creatorUserId: this.userInfo.id,
        })
      );
    },

    // 购物车查询

    onClick(e) {
      switch (e.content.text) {
        case "收藏":
          console.log(e.content.text);
          this.clickCollectBtn();
          break;
        case "留言":
          console.log(e.content.text);
          uni.navigateTo({
            url: "./",
          });
          break;
        case "购物车":
          console.log(e.content.text);
          uni.navigateTo({
            url: "./shop-car",
          });
          break;
      }
    },
    buttonClick(e) {
      console.log(e);
      if (e.content.text === "加入购物车") {
        let currentCar = this.shopCarData.find(
          (item) => item.product_ID === this.orderId
        );
        if (currentCar) return;
        this.addShopCar();
      } else {
        uni.navigateTo({
          url: `../product/product-order`,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
%display-space {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.release-detail {
  position: relative;

  &-header {
    padding-bottom: 30rpx;
    border-bottom: 1px solid #eee;

    @extend %display-space;
    // padding: 0 20rpx;
    margin-bottom: 32upx;

    .addr {
      margin-right: 18upx;
    }
  }

  &-body {
    padding-bottom: 300rpx;

    .user-info {
      margin-bottom: 38rpx;

      &-left {
        > image {
          width: 100rpx;
          height: 100rpx;
          margin-right: 26rpx;
        }

        &-text {
          .user-info-left-text-name {
            margin-bottom: 28rpx;

            .name {
              height: 46rpx;
              font-size: 30rpx;
              color: #333333;
              line-height: 46rpx;
              margin-right: 32rpx;
            }
            .icon {
              width: 120rpx;
              height: 38rpx;
              padding: 6rpx;
              background: #fef8ac;
              border-radius: 8rpx;
              font-size: 24rpx;
              color: #333333;
              line-height: 38rpx;
              text-align: center;
            }
          }

          .user-info-left-text-time {
            width: 500rpx;
            font-size: 24rpx;
            color: #999;
          }
        }
      }

      &-right {
        width: 126rpx;
        height: 58rpx;
        background: #f3f3f3;
        border-radius: 30rpx;
        font-size: 26rpx;
        color: #333333;
        line-height: 58rpx;
        text-align: center;

        &:active {
          background: #fef8ac;
          color: #fff;
        }
      }
    }

    .shop-price {
      margin-bottom: 20rpx;

      view {
        margin-right: 20rpx;
      }

      .price-delete {
        height: 60rpx;
        font-size: 44rpx;
        font-weight: 600;
        color: #fb8753;
        line-height: 60rpx;
      }

      .price {
        height: 38rpx;
        font-size: 30rpx;
        color: #999999;
        line-height: 38rpx;
        text-decoration: line-through;
      }

      .price-btn {
        width: 168rpx;
        height: 42rpx;
        border-radius: 22rpx;
        border: 2rpx solid #ffd17c;
        font-size: 26rpx;
        color: #fba13a;
        line-height: 42rpx;
        text-align: center;

        &:active {
          background: #ffd17c;
          color: #fff;
        }
      }
    }

    .product-information {
      position: relative;

      &::after {
        content: "";
        display: block;
        width: 80rpx;
        background: #eee;
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        background: linear-gradient(90deg, transparent, #fff);
      }

      &-content {
        overflow-x: scroll;

        &-item {
          border-right: 1px solid #eee;
          padding-right: 20rpx;
          margin-right: 20rpx;
          flex-shrink: 0;

          .item-title {
            height: 38rpx;
            font-size: 26rpx;
            color: #999999;
            line-height: 38rpx;
            margin-bottom: 20rpx;
          }

          .item-text {
            height: 38rpx;
            font-size: 29rpx;
            font-family: AppleSystemUIFont;
            color: #333333;
            line-height: 38rpx;
          }
        }
      }
    }

    .describe {
      margin: 36rpx 0;
      font-size: 30rpx;
      color: #666;
    }

    .img-gird {
      margin-top: 16rpx;

      &-left {
        width: 450rpx;
        height: 450rpx;
        // background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230706_eb136b6cc9374eeab451637b4fd9bef7.png");
        background-size: cover;
        margin-right: 18rpx;
      }
      &-right {
        .top {
          width: 214rpx;
          height: 214rpx;
          // background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230706_eb136b6cc9374eeab451637b4fd9bef7.png");
          background-size: cover;
          margin-bottom: 16rpx;
        }
        .bottom {
          width: 214rpx;
          height: 214rpx;
          // background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230706_eb136b6cc9374eeab451637b4fd9bef7.png");
          background-size: cover;
        }
      }
    }

    .hope-people {
      height: 35rpx;
      font-size: 25rpx;
      color: #999999;
      line-height: 35rpx;
      margin-top: 12rpx;
      float: right;
      margin-top: 18rpx;
    }

    .release-address {
      height: 42rpx;
      font-size: 28rpx;
      color: #999;
      line-height: 42rpx;
      clear: both;
      float: right;
      margin-top: 18rpx;
    }
  }

  &-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 134rpx;
    background: #fff;
    padding-bottom: 40rpx;
    padding-top: 20rpx;

    .footer-left {
      width: 130rpx;
    }

    .footer-right {
      .footer-btn {
        // width: 142rpx;
        // min-width: 142rpx;
        height: 67rpx;
        background: #efefef;
        border-radius: 33rpx;
        line-height: 67rpx;
        text-align: center;
        margin-left: 20rpx;
      }
    }
  }
}

.active-btn {
  background: #f6f931 !important;
}

.example-body {
  padding: 0;
  /* #ifndef APP-NVUE */
  display: block;
  /* #endif */
}

.goods-carts {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  position: fixed;
  left: 0;
  right: 0;
  /* #ifdef H5 */
  left: var(--window-left);
  right: var(--window-right);
  /* #endif */
  bottom: 0;
}
</style>
