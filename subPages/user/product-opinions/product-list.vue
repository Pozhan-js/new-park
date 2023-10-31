<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-25 10:36:02
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-30 10:18:55
 * @FilePath: /smart-park/subPages/user/product-opinions/product-list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="product-list container">
    <!-- 分类S -->
    <view class="product-item flex-a-center-j-space-between">
      <view
        :class="{ 'select-item ': !selectIndex }"
        @click="changeStatus(0)"
        style="margin-right: 24rpx"
        class="product-item-content-item flex-center flex-1"
      >
        全部
      </view>
      <view
        :class="{ 'select-item ': selectIndex }"
        @click="changeStatus(1)"
        style="margin-left: 24rpx"
        class="product-item-content-item flex-center flex-1"
      >
        已回复
      </view>
    </view>

    <!-- 内容区 -->
    <view class="product-data">
      <view
        class="data-item"
        v-for="item in dataList"
        :key="item._id"
        @click="goDetail(item)"
      >
        <image :src="item.reply ? replyIcon : notReplyIcon" class="reply-bg">
        </image>
        <view class="title"> {{ item.f_title }} </view>
        <view class="cooment">
          <u--text type="info" :line="2" :text="item.f_description"></u--text>
        </view>

        <view class="item-footer flex-a-center-j-space-between">
          <view class="flex-a-center">
            <u-icon name="account" v-if="!item.f_anonymity"></u-icon>
            <!-- item.build_number  -->
            <view
              class="name"
              style="margin-left: 16rpx"
              v-if="!item.f_anonymity"
            >
              <u--text
                type="info"
                size="26rpx"
                :text="item.build_number"
              ></u--text
            ></view>
          </view>
          <view class="flex-a-center">
            <u-icon name="clock"></u-icon>
            <view class="time" style="margin-left: 16rpx">
              <u--text
                type="info"
                size="26rpx"
                :text="
                  $u.timeFormat(item.creatorTime, 'yyyy年mm月dd日  hh时MM分')
                "
              ></u--text
            ></view>
          </view>
        </view>
      </view>
    </view>

    <!-- <u-loadmore v-if="dataList.length" :status="status" @loadmore="loadMore" /> -->

    <view :style="{ height: block + 'px' }"> </view>
    <!-- 提意见S -->
    <view class="fixed-bottom flex-center" @click="goFeedBck">
      <view class="btn flex-center">
        <image
          style="width: 40rpx; height: 40rpx"
          src="https://kindoucloud.com:8011/api/file/Image/systemicon/ycj/20221216_3600eda2e7c044d6b9d2f5432f355fe8.png"
        >
        </image>

        <view class="btn-words">我要提意见</view>
      </view>
    </view>
    <!-- 提意见E -->
  </view>
</template>

<script>
import { getModelList } from "@/api";
import { getRequestFilter } from "@/common/function";
import infoMixin from "@/common/mixins/info";
export default {
  mixins: [infoMixin],
  data() {
    return {
      block: 0,
      selectIndex: 0,
      dataList: [],
      notReplyIcon:
        "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231026_6559ee4430ad47d7827a51f4fa010bd9.png",
      replyIcon:
        "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231026_fdfd1826bc774652bf71ca49fb47de66.png",
      approvalInfo: "",
      status: "loading",
      filterData: {},
    };
  },
  methods: {
    // 跳转到详情页面
    goDetail(item) {
      uni.navigateTo({
        url: `/subPages/user/product-opinions/product-detail?id=${item._id}`,
      });
    },

    async getAllData() {
      const result = await getModelList(
        "6538b911388a8c7a0eb9c5dc",
        this.filterData
      );
      this.dataList = result.data?.list;

      // if (this.dataList.length < result.data.pagination.total) {
      //   this.dataList = this.dataList.concat(result.data?.list);
      //   this.filterData = {
      //     currentPage: result.data?.pagination.currentPage++,
      //     ...this.filterData,
      //   };
      // }

      // this.status =
      //   this.dataList.length == result.data?.pagination.total
      //     ? "nomore"
      //     : "loadmore";
    },

    /**
     *  去意见反馈
     */
    goFeedBck() {
      if (this.approvalInfo) {
        uni.navigateTo({
          url: "/subPages/user/product-opinions/product-opinions",
        });
      } else {
        uni.showToast({
          title: "认证为业主才能上报哦~",
          icon: "none",
        });
      }
    },

    /**
     *    切换状态
     * @param {下标} index
     */
    async changeStatus(index) {
      // 如果下标相同，不做处理
      if (this.selectIndex == index) return;
      // 如果是全部，去除筛选参数，否则添加筛选参数
      if (index == 0) {
        this.filterData = {};
      } else {
        this.filterData = getRequestFilter({ reply: 1 });
      }
      this.selectIndex = index;
      this.dataList = [];
      this.getAllData();
    },

    /**
     *
     * 获取注册信息
     *
     */
    // 获取审批信息
    async getApprovalInfo() {
      const { data: res } = await getModelList(
        "64f6d064d85a4b7b32ec641d",
        getRequestFilter({
          formUser: this.userInfo.id,
        })
      );
      this.approvalInfo = res?.list[0] || {};
    },

    /**
     * 下拉加载
     */
    loadMore() {
      if (this.status == "loading" || this.status == "nomore") return;
      this.status = "loading";
      this.getAllData();
    },
  },

  async onReady() {
    let rectInfo = await this.$u.getRect(".fixed-bottom");
    this.block = rectInfo.height;
    console.log("onReady", rectInfo);
  },

  onReachBottom() {
    this.loadMore();
  },

  onShow() {
    this.getApprovalInfo();
    this.getAllData();
  },
};
</script>

<style lang="scss" scoped>
.product-list {
  width: 100vw;
  background: #f5f7fb;
  padding: 32rpx;
  box-sizing: border-box;

  .product-item {
    display: flex;

    justify-content: space-between;
    align-items: center;
    padding: 0 20rpx;

    &-content-item {
      background: #ffffff;
      border-radius: 8rpx;
      font-size: 36rpx;
      padding: 10rpx 20rpx;
      color: #6377f5;
    }

    .select-item {
      background: #6377f5;
      color: #ffffff;
    }
  }

  .product-data {
    width: 100%;

    .data-item {
      background: #ffffff;
      border-radius: 8rpx;
      margin: 20rpx;
      margin-top: 30rpx;
      padding: 20rpx;
      box-sizing: border-box;
      position: relative;

      .title {
        font-size: 34rpx;
        font-weight: bold;
        color: #333333;
        margin-bottom: 12rpx;
      }

      .reply-bg {
        position: absolute;
        top: 0;
        right: 0;
        width: 100rpx;
        height: 100rpx;
      }

      .item-footer {
        margin-top: 20rpx;
      }
    }
  }

  .fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    .btn {
      text-align: center;
      color: #ffffff;
      background: #6377f5;
      padding: 10rpx 30rpx;
      border-radius: 50rpx;

      .btn-words {
        margin-left: 15rpx;
        font-size: 36rpx;
      }
    }
  }
}
</style>
