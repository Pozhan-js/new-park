<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-30 17:21:41
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-17 11:55:07
 * @FilePath: /smart-park/subPages/owner-autonomy/finance/detail/detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="detail">
    <view class="detail-content">
      <view class="detail-content-header">
        <image :src="icon[detailData.consumption_type]" mode="" />
        <view class="type">{{ detailData.consumption_type }}</view>
        <view class="money">¥{{ detailData.money }}</view>
        <u-line dashed></u-line>
      </view>

      <view class="detail-content-body">
        <view class="detail-content-body-item flex-a-center-j-space-between">
          <view>类型</view>
          <view>{{ detailData.is_income }}</view>
        </view>
        <view class="detail-content-body-item flex-a-center-j-space-between">
          <view>日期</view>
          <view>{{
            $u.timeFormat(detailData.lastModifyTime, "yyyy-mm-dd")
          }}</view>
        </view>

        <view class="detail-content-body-item flex-a-center-j-space-between">
          <view>报销人</view>
          <view>{{ detailData.handler }}</view>
        </view>
        <view class="detail-content-body-item flex-a-center-j-space-between">
          <view>备注信息</view>
          <view>{{ detailData.consumption_description }}</view>
        </view>
      </view>

      <image
        class="image"
        :src="imgData"
        mode=""
        v-for="(imgData, _) in imageUrl"
        :key="_"
      />
    </view>

    <!-- <view class="detail-footer flex-a-center-j-space-between">
      <view class="button">
        <u-button
          type="warning"
          :loading="loading"
          text="删除"
          @click="handleDelete(detailData._id)"
        ></u-button>
      </view>
      <view class="button">
        <u-button
          type="primary"
          text="编辑"
          @click="handleEditBill(detailData._id)"
        ></u-button>
      </view>
    </view> -->
  </view>
</template>

<script>
import { message } from "@/common/function";
import { getModelInfo, deleteModel } from "@/api";
export default {
  data() {
    return {
      icon: {},
      detailData: {},
      currentId: "",
      loading: false,
    };
  },
  methods: {
    // 删除账单
    async handleDelete(id) {
      // console.log(id);
      try {
        this.loading = true;
        const result = await deleteModel("64ec4d02d85a4b7b32ec6019", id);
        if (result.code === 200) {
          message("删除成功");
          uni.navigateBack({
            delta: 1,
          });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    // 编辑账单
    handleEditBill(id) {
      uni.navigateTo({
        url: `/subPages/owner-autonomy/finance/detail/edit-add?id=${id}`,
      });
    },
  },
  computed: {
    imageUrl() {
      // return this.$helper.filterCover(this.detailData.bill?.[0]?.url) || "";
      return this.detailData.bill?.map((item) =>
        this.$helper.filterCover(item.url || "")
      );
    },
  },

  async onShow() {
    this.icon = getApp().globalData.icon;
    let { data } = await getModelInfo(
      "64ec4d02d85a4b7b32ec6019",
      this.currentId
    );
    this.detailData = data;
  },
  async onLoad(option) {
    this.currentId = option.id;
    let { data } = await getModelInfo("64ec4d02d85a4b7b32ec6019", option.id);
    this.detailData = data;
    // console.log(this.detailData);
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding: 30rpx;
  box-sizing: border-box;
}
.detail {
  width: 100vw;
  min-height: 100vh;
  background-color: #f8f9fd;
  box-sizing: border-box;
  padding: 50rpx 60rpx;

  .detail-content {
    width: 100%;
    height: 1140rpx;
    background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230831_0acdb636f96847018e477b734e19ad48.png");
    background-position: 0 0;
    background-size: cover;
    text-align: center;

    &-header {
      @extend .box;

      > image {
        width: 120rpx;
        height: 120rpx;
        margin-bottom: 20rpx;
      }
      .type {
        font-size: 28rpx;
        color: #666666;
        margin-bottom: 20rpx;
      }

      .money {
        font-size: 46rpx;
        font-weight: bold;
        color: #6377f5;
        margin-bottom: 30rpx;
      }
    }

    &-body {
      @extend .box;

      &-item {
        font-size: 28rpx;
        color: #666666;
        margin-bottom: 20rpx;
      }
    }

    .image {
      width: 524rpx;
      height: 310rpx;
    }
  }

  .detail-footer {
    margin-top: 30rpx;
    margin-bottom: constant(safe-area-inset-bottom) !important;
    margin-bottom: env(safe-area-inset-bottom) !important;
    .button {
      width: 290rpx;
      height: 96rpx;
    }
  }
}
</style>
