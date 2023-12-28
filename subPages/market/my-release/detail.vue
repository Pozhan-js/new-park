<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-05 16:56:57
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-12-21 14:03:59
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
              <text class="name">{{ detailData.username || "匿名用户" }}</text>
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

      <image
        :src="log_image"
        mode=""
        style="width: 100%; height: 490rpx; border-radius: 20rpx"
        v-if="log_image"
      />

      <view class="img-gird" v-if="detailData.goods_image">
        <view
          :class="'img-gird-item-' + index"
          style="border-radius: 20rpx"
          v-for="(logUrl, index) in detailData.goods_image"
          :key="index"
        >
          <image
            :src="$helper.filterCover(logUrl.url)"
            mode=""
            style="width: 100%; height: 100%"
          />
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

    <u-gap height="10" bgColor="#f0f0f0"></u-gap>
    <!-- 留言 -->
    <view class="message">
      <view class="message-title">留言</view>
      <!-- <view class="message-number">3</view> -->
      <view class="message-container">
        <hb-comment
          ref="hbComment"
          @add="add"
          @del="del"
          :deleteTip="'确认删除？'"
          :cmData="commentData"
          v-if="commentData"
        ></hb-comment>
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
import { getRequestFilter } from "@/common/function";
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
        // {
        //   icon: "person",
        //   text: "客服",
        // },
        {
          icon: "chat",
          text: "留言",
          infoColor: "#f5f5f5",
          info: 0,
        },
        {
          icon: "star",
          text: "收藏",
        },
      ],
      customButtonGroup: [
        {
          text: "我想要",
          backgroundColor: "linear-gradient(90deg, #FE6035, #EF1224)",
          color: "#fff",
        },
      ],
      reqFlag: false, // 请求标志，防止重复操作，true表示请求中
      carNumber: 0,
      reqMessageList: [], //接受请求恢复数据
    };
  },
  async onLoad(options) {
    this.orderId = options.id;
    await this.getDetailOrderData(options.id);
    this.checkCollectData(options.id);
    //获取购物车数据
    this.getAllShopCarNumber(
      getRequestFilter({
        creatorUserId: this.userInfo.id,
      })
    );
    this.getCurrentMessage();
  },
  computed: {
    ...mapState("shopCar", ["shopCarData"]),
    commentData() {
      return {
        commentSize: this.reqMessageList.length,
        comment: this.getTree(this.reqMessageList),
      };
    },
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
  },
  watch: {
    reqMessageList: {
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
    // 点击商品图标事件
    async clickCollectBtn() {
      let collectData = {};
      if (!this.collectStatus || !this.collectOrderId) {
        try {
          collectData = await this.collectSuccess(this.orderId);
        } catch (error) {
          uni.showToast({
            title: error,
            duration: 600,
          });
        }
      } else {
        try {
          collectData = await this.cancelSuccess(this.collectOrderId);
        } catch (error) {
          uni.showToast({
            title: error,
            duration: 600,
          });
        }
      }
      let { status, data, color, icon, msg } = collectData;

      this.collectStatus = status;
      this.collectOrderId = data;
      this.options = this.options.map((item) => {
        if (item.text === "收藏") {
          item.color = color;
          item.icon = icon;
        }
        return item;
      });
      uni.showToast({
        title: msg,
        duration: 600,
      });
      // 刷新数据
      this.checkCollectData(this.collectOrderId);
    },
    // 点击收藏成功
    async collectSuccess(id) {
      const collectData = await createModel("6565ab81f3ad0c30c03c4b0e", {
        order_id: id,
      });
      if (collectData.code === 200) {
        return {
          color: "#EF1224",
          icon: "star-filled",
          data: collectData?.data,
          status: true,
          msg: "收藏成功",
        };
      }
    },
    // 取消收藏成功
    async cancelSuccess(id) {
      const collectData = await deleteModel("6565ab81f3ad0c30c03c4b0e", id);
      if (collectData.code === 200) {
        return {
          color: "#646566",
          icon: "star",
          data: "",
          status: false,
          msg: "取消成功",
        };
      }
    },
    // 补全图片路径
    getImageUrl(url) {
      if (url) {
        return this.$helper.filterCover(url);
      } else {
        return `/static/image/default-avatar.png`;
      }
    },
    // 查询收藏列表
    async checkCollectData(id = "") {
      const { data } = await getModelList(
        "6565ab81f3ad0c30c03c4b0e",
        getRequestFilter({ order_id: id })
      );
      let oid = data?.list[0]?._id;
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
    },
    // 购物车查询
    onClick(e) {
      switch (e.content.text) {
        case "收藏":
          this.clickCollectBtn();
          break;
        case "留言":
          this.getElementScollTop(".message");
          break;
      }
    },
    //获取元素离页面顶部的距离
    getElementScollTop(name = "") {
      const query = uni.createSelectorQuery();
      query
        .select(name)
        .boundingClientRect((data) => {
          let pageScrollTop = Math.round(data.top);
          uni.pageScrollTo({
            scrollTop: pageScrollTop, //滚动的距离
            duration: 400, //过渡时间
          });
        })
        .exec();
    },
    // 点击商品按钮
    buttonClick(e) {
      if (e.content.text === "加入购物车") {
        let currentCar = this.shopCarData.find(
          (item) => item.product_ID === this.orderId
        );
        if (currentCar) return;
      } else {
        uni.navigateTo({
          url: `/subPages/market/product/create-order?id=${this.detailData._id}`,
        });
      }
    },
    // 获取评论信息
    async getCurrentMessage() {
      const { data } = await getModelList(
        "656955d4f3ad0c30c03fccc1",
        getRequestFilter({
          goods_detail_id: this.detailData._id,
        })
      );
      this.reqMessageList = data?.list;
    },
    // 新增评论
    add(req) {
      if (this.reqFlag) {
        uni.showToast({
          title: "操作频繁",
          duration: 1000,
        });
        return;
      }
      this.reqFlag = true;
      // TODO 接入真实接口
      let params = {
        goods_detail_id: this.detailData._id,
        parentId: req.pId,
        content: req.content,
        nickName: this.userInfo.realName,
        avatarUrl: this.$helper.filterCover(this.userInfo.headIcon),
        likeNum: 0,
        owner: this.userInfo.id === this.detailData.creatorUserId ? 1 : 0,
        hasLike: 0,
      };
      createModel("656955d4f3ad0c30c03fccc1", params)
        .then((res) => {
          uni.showToast({
            title: "操作成功！",
            duration: 3000,
          });
          this.$refs.hbComment.addComplete();
          this.getCurrentMessage();
          this.reqFlag = false;
        })
        .catch((res) => {
          this.reqFlag = false;
        });
    },
    // 删除评论
    del(commentId) {
      if (this.reqFlag) {
        uni.showToast({
          title: "操作频繁",
          duration: 1000,
        });
        return;
      }
      this.reqFlag = true;
      // TODO 接入真实接口
      deleteModel("656955d4f3ad0c30c03fccc1", commentId)
        .then((res) => {
          this.reqFlag = false;
          this.$refs.hbComment.deleteComplete(commentId);
        })
        .catch((res) => {
          this.reqFlag = false;
        });
    },
    // 列表按照父子转换成树
    getTree(data) {
      let result = [];
      let map = {};
      data.forEach((item) => {
        map[item._id] = item;
      });
      data.forEach((item) => {
        let parent = map[item.parentId];
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          result.push(item);
        }
      });
      return result;
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
  padding-bottom: 300rpx;

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
    padding: 20rpx 0;

    .user-info {
      margin-bottom: 38rpx;

      &-left {
        > image {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
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
      display: grid;
      grid-template-columns: 1fr 1fr; /* 将父元素分为两列 */
      grid-template-rows: 1fr 1fr; /* 分为两行 */
      height: 300px; /* 设置父元素的高度 */
      width: 100%;
      gap: 10px; /* 设置子元素之间的间隔 */

      .img-gird-item-0 {
        grid-column: 1 / 2; /* 第一个子元素占据第一列 */
        grid-row: 1 / 3; /* 第一个子元素占据整个高度（两行） */
      }

      .img-gird-item-1 {
        grid-column: 2 / 3; /* 另外两个子元素占据第二列 */
        grid-row: 1 / 2; /* 第二个子元素占据第一行 */
      }

      .img-gird-item-2 {
        grid-column: 2 / 3; /* 另外两个子元素占据第二列 */
        grid-row: 2 / 3; /* 第三个子元素占据第二行 */
      }
    }

    .hope-people {
      height: 35rpx;
      font-size: 25rpx;
      color: #999999;
      line-height: 35rpx;
      // float: right;
      text-align: right;
      margin-top: 18rpx;
    }

    .release-address {
      height: 42rpx;
      font-size: 28rpx;
      color: #999;
      line-height: 42rpx;
      text-align: right;
      margin-top: 18rpx;
    }
  }

  .message {
    margin-top: 20rpx;

    &-title {
      margin-bottom: 10rpx;
      font-size: 36rpx;
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
