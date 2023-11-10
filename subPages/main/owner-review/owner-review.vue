<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-30 14:29:36
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-10 11:44:55
 * @FilePath: /smart-park/subPages/main/owner-review/owner-review.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="owner-review">
    <view class="owner-review-form">
      <view class="owner-review-form-item flex-a-center">
        <view class="owner-review-form-item-label">是否审核通过</view>
        <view class="owner-review-form-item-content">
          <view class="radio-list">
            <u-radio-group v-model="reviewStatus" @change="groupChange">
              <u-radio
                shape="circle"
                :label="item.name"
                :name="item.name"
                v-for="item in radiolist1"
                :key="item"
              ></u-radio>
            </u-radio-group>
          </view>
        </view>
      </view>
      <view class="owner-review-form-item flex-a-center">
        <view class="owner-review-form-item-label">用户楼号</view>
        <view class="owner-review-form-item-content">
          <u--input
            placeholder="请输入内容"
            border="none"
            :disabled="!isParse"
            v-model="buildNumber"
          ></u--input
        ></view>
      </view>
      <view class="owner-review-form-item flex-a-center">
        <u-button
          text="查询"
          @click="getPendingReviewList"
          color="#6377f5"
        ></u-button>
      </view>
    </view>

    <view class="owner-review-content" v-if="isParse">
      <view
        class="owner-review-content-container"
        v-for="pended in pendedReviewList"
        :key="pended"
      >
        <u-swipe-action style="width: 100%; padding: 0rpx 30rpx">
          <u-swipe-action-item
            ref="swipeActionItem"
            :options="options"
            id=""
            @click="removeDetails(pended)"
          >
            <view class="container-item">
              <view class="item-title">{{ pended.roomName }}</view>
              <view class="item-data">
                <view class="item-data-label flex-a-center">
                  <u-icon name="order" color="#2979ff" size="32rpx"></u-icon>
                  <view class="label">用户楼号</view>
                </view>
                <view class="item-data-value">{{ pended.roomName }}</view>
              </view>

              <view class="item-data">
                <view class="item-data-label flex-a-center">
                  <u-icon name="order" color="#2979ff" size="32rpx"></u-icon>
                  <view class="label">是否审核通过</view>
                </view>
                <view class="item-data-value">审核通过</view>
              </view>
              <!-- 
              <view class="item-data">
                <view class="item-data-label flex-a-center">
                  <u-icon name="order" color="#2979ff" size="32rpx"></u-icon>
                  <view class="label">用户id</view>
                </view>
                <view class="item-data-value">{{ pended.formUser }}</view>
              </view> -->

              <view class="item-data">
                <view class="item-data-label flex-a-center">
                  <u-icon name="order" color="#2979ff" size="32rpx"></u-icon>
                  <view class="label">手机号</view>
                </view>
                <view class="item-data-value">{{ pended.phone }}</view>
              </view>

              <!-- <view class="item-data">
                <view class="item-data-label flex-a-center">
                  <u-icon name="order" color="#2979ff" size="32rpx"></u-icon>
                  <view class="label">创建用户</view>
                </view>
                <view class="item-data-value">{{ pended.roomName }}</view>
              </view> -->
              <!-- 
              <view class="item-data">
                <view class="item-data-label flex-a-center">
                  <u-icon name="order" color="#2979ff" size="32rpx"></u-icon>
                  <view class="label">创建时间</view>
                </view>
                <view class="item-data-value">{{ pended.creatorTime }}</view>
              </view> -->

              <!-- <view class="item-data">
                <view class="item-data-label flex-a-center">
                  <u-icon name="order" color="#2979ff" size="32rpx"></u-icon>
                  <view class="label">审核用户</view>
                </view>
                <view class="item-data-value">{{ pended.creatorUserId }}</view>
              </view> -->

              <!-- <view class="item-data">
                <view class="item-data-label flex-a-center">
                  <u-icon name="order" color="#2979ff" size="32rpx"></u-icon>
                  <view class="label">审核时间</view>
                </view>
                <view class="item-data-value">{{ pended.creatorTime }}</view>
              </view> -->
            </view>
          </u-swipe-action-item>
        </u-swipe-action>
      </view>
    </view>

    <!-- 未审批 -->
    <view class="owner-review-content" v-else>
      <view
        class="owner-review-content-container"
        v-for="pend in filterPendingReviewList"
        :key="pend.id"
      >
        <u-swipe-action>
          <u-swipe-action-item
            :options="options2"
            @click="handleActionItem(pend)"
          >
            <view
              class="container-item-not no-parse flex-a-center-j-space-between"
              @click.stop="featuresDetail(pend.id, pend.operatorRecordId)"
            >
              <view class="item-title">{{ pend.fullName }}</view>
              <u-icon name="arrow-right"></u-icon>
            </view>
          </u-swipe-action-item>
        </u-swipe-action>
      </view>
    </view>

    <u-loadmore
      :line="true"
      icon
      :status="status"
      @loadmore="handleLoadmore"
      :loading-text="loadingText"
      :loadmore-text="loadmoreText"
      :nomore-text="nomoreText"
    />
  </view>
</template>

<script>
import {
  getFlowList,
  getModelList,
  rejectFlow,
  getFlowFormData,
  deleteModel,
} from "@/api";
import { getRequestFilter } from "@/common/function";
export default {
  data() {
    return {
      reviewStatus: "",
      buildNumber: "",
      options: [
        {
          text: "删除",
          style: {
            backgroundColor: "#dd524d",
          },
        },
      ],

      options2: [
        {
          text: "拒绝",
          style: {
            backgroundColor: "#f56c6c",
          },
        },
      ],

      status: "nomore",
      loadingText: "努力加载中",
      loadmoreText: "点击加载更多",
      nomoreText: "实在没有了",
      pageIndex: 1,
      pageSize: 10,
      total: 0,

      radiolist1: [
        {
          name: "待审核",
        },
        {
          name: "审核通过",
        },
      ],
      // 表单数据
      formData: {},
      reqFormData: {},
      // 获取所有待审核用户
      pendingReviewList: [],
      // 获取所有以审核用户
      pendedReviewList: [],
      // 控制显示内容变量
      isParse: false,
    };
  },
  methods: {
    groupChange(name) {
      if (name === "待审核") {
        this.isParse = false;
      } else {
        this.isParse = true;
      }
      this.reviewStatus = name;
    },

    async removeDetails(remove) {
      const result = await deleteModel("64f6d064d85a4b7b32ec641d", remove._id);
      this.getPendingReviewList();
      uni.showToast({
        title: result.msg,
        duration: 600,
      });
    },

    featuresDetail(id, operatorRecordId) {
      if (this.isParse) return;
      uni.navigateTo({
        url: `/subPages/main/owner-review/review-detail?id=${id}&recordId=${operatorRecordId}`,
      });
    },

    // 获取待审核人员
    async getPendingReviewList() {
      let that = this;
      if (!this.isParse) {
        // 未审批数量    // 该接口后台会进行token判断
        const { data } = await getFlowList();
        this.pendingReviewList = data?.list || [];
        this.pendedReviewList = [];

        this.total = data?.pagination.total;
      } else {
        let filterData = this.buildNumber
          ? getRequestFilter({
              roomName: this.buildNumber,
            })
          : { currentPage: this.pageIndex, pageSize: this.pageSize };
        // 已审批数量
        const { data } = await getModelList(
          "64f6d064d85a4b7b32ec641d",
          filterData
        );
        this.pageIndex++;
        this.total = data?.pagination.total;

        this.pendedReviewList = [...that.pendedReviewList, ...data?.list];
        this.pendingReviewList = [];
      }
    },

    async handleActionItem(itemData) {
      let { data } = await getFlowFormData(
        itemData.id,
        itemData.operatorRecordId
      );
      // console.log(data);
      this.reqFormData = JSON.parse(data.task.taskOperatorRecord[1].nodeData);
      // console.log(index);
      // 直接发送
      const result = await rejectFlow(
        itemData.id,
        itemData.operatorRecordId,
        JSON.stringify(this.reqFormData),
        ""
      );

      this.getPendingReviewList();

      uni.showToast({
        title: result.msg,
        duration: 600,
      });
    },

    // 点击底部
    handleLoadmore() {
      this.status = "loading";
      this.getPendingReviewList();
      setTimeout(() => {
        if (this.total - this.pageSize > this.pageSize) {
          this.status = "loadmore";
        } else {
          this.status = "nomore";
        }
      }, 400);
    },
  },
  computed: {
    filterPendingReviewList() {
      return this.pendingReviewList?.filter((item) => {
        return item.status === 1;
      });
    },
  },
  onShow() {
    if (this.reviewStatus) {
      this.getPendingReviewList();
    }
  },
  onReachBottom() {
    // console.log("底部", this.total);
    let listLength;
    if (this.isParse) {
      listLength = this.total;
      // 通过审核
      if (listLength < this.pageSize) {
        this.status = "nomore";
      }
      if (listLength > this.pageSize) {
        this.status = "loadmore";
        this.pageIndex++;
      }
    } else {
      listLength = this.total;
      //待通过审核
      if (listLength < this.pageSize) {
        this.status = "nomore";
      }
      if (listLength > this.pageSize) {
        this.status = "loadmore";
      }

      console.log("状态", this.status);
    }
  },
};
</script>

<style lang="scss" scoped>
.owner-review {
  width: 100vw;
  min-height: 100vh;
  background-color: #f0f2f6;
  box-sizing: border-box;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;

  &-form {
    background-color: #fff;
    padding-bottom: 20rpx;
    position: sticky;
    top: 0;
    z-index: 99;

    &-item {
      font-size: 28rpx;
      color: #333;
      padding: 20rpx;
      border-bottom: 1px solid #f0f2f6;

      &:last-child {
        border-bottom: none;
      }

      &-label {
        width: 200rpx;
        flex-shrink: 0;
      }
      &-content {
        flex-shrink: 0;
        width: calc(100% - 200rpx);
        overflow: auto;
      }
    }
  }

  &-content {
    margin-top: 20rpx;
    padding: 20rpx;
    box-sizing: border-box;

    &-container {
      background-color: #fff;
      padding: 20rpx;
      margin-bottom: 20rpx;
      box-sizing: border-box;

      &:last-child {
        margin-bottom: 0rpx;
      }

      .container-item-not {
        width: 100%;

        .item-title {
          font-size: 28rpx;
          color: #333333;
          font-weight: bold;
        }
      }

      .container-item {
        width: 100%;
        margin-bottom: 40rpx;

        .item-title {
          font-size: 32rpx;
          color: #333333;
          font-weight: bold;
        }

        .item-data {
          padding: 20rpx 0;
          border-bottom: 1rpx solid #f1f1f1;

          &:last-child {
            border-bottom: none;
          }

          &-label {
            color: #666666;
            margin-bottom: 10rpx;

            .label {
              font-size: 24rpx;
              margin-left: 10rpx;
            }
          }

          &-value {
            font-size: 28rpx;
            color: #333333;
          }
        }
      }
    }
  }
}

.no-parse {
  padding: 20rpx 0;
  margin-bottom: 0rpx;
  border-bottom: 1px solid #f0f2f6;

  &:last-child {
    border-bottom: none;
    // padding-bottom: 0;
  }
}

::v-deep .u-radio {
  margin-right: 40rpx;
}
</style>
