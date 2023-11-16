<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-11-16 16:10:40
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-16 17:40:38
 * @FilePath: /smart-park/subPages/owner-autonomy/finance/detail/mouth-bill.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="mouth-bill container">
    <view class="mouth-bill-item" v-for="data in billList" :key="data._id">
      <view class="item-title flex-a-center-j-space-between">
        <view class="item-title-left">
          <text style="font-size: 40rpx; font-weight: bold"
            >¥{{ data.money.toFixed(2) }}</text
          >
        </view>
        <view class="item-title-right">2022/12/20 17:50</view>
      </view>
      <view class="item-cell flex-a-center-j-space-between">
        <view class="item-cell-left"> 消费类型 </view>
        <view class="item-cell-right flex-a-center">
          <text
            style="font-size: 36rpx; font-weight: bold; margin-right: 20rpx"
          >
            购物
          </text>
          <image :src="icon['娱乐']" mode="" />
        </view>
      </view>
      <view class="item-cell flex-a-center-j-space-between">
        <view class="item-cell-left"> 内容 </view>
        <view class="item-cell-right">
          <text style="font-size: 28rpx; color: #b3b3b3">
            {{ data.consumption_content }}
          </text>
        </view>
      </view>
      <view class="item-cell flex-a-center-j-space-between">
        <view class="item-cell-left"> 收支方式 </view>
        <view class="item-cell-right">
          <text style="font-size: 36rpx; font-weight: bold">微信</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
import { getRequestFilter } from "@/common/function";
export default {
  data() {
    return {
      icon: {},
      billList: [],
    };
  },
  methods: {
    async getFinanceBill(range) {
      let reqData = getRequestFilter({ creatorTime: range }, "range");
      const { data } = await getModelList("64ec4d02d85a4b7b32ec6019", reqData);
      this.billList = data?.list.sort((a, b) => {
        let itemA = a.creatorTime;
        let itemB = b.creatorTime;
        return itemA - itemB;
      });
    },
  },
  onShow() {
    this.icon = getApp().globalData.icon;
  },
  async onLoad(option) {
    let reqRange = [];
    // 转换为时间戳
    let timestamp = Date.parse(option.year);

    reqRange = this.$helper.getCurrentMonth(timestamp).map((item) => {
      return Date.parse(item);
    });
    console.log("reqRange", reqRange);
    await this.getFinanceBill(reqRange);
  },
};
</script>

<style lang="scss" scoped>
.mouth-bill {
  padding: 30rpx 30rpx 0 30rpx;
  box-sizing: border-box;
  background: #f5f7fb;

  &-item {
    width: 100%;
    padding: 30rpx;
    box-sizing: border-box;
    background: #fff;
    border-radius: 12rpx;
    margin-bottom: 30rpx;

    mask: radial-gradient(
        circle at 0 50%,
        transparent 0,
        transparent 12px,
        #2179f5 13px
      ),
      radial-gradient(
        circle at 100% 50%,
        transparent 0,
        transparent 12px,
        #2179f5 13px
      );

    mask-repeat: no-repeat;
    mask-position: left top, right top;
    mask-size: 70% 100%;

    .item-title {
      &-right {
        font-size: 32rpx;
        color: #b3b3b3;
      }
    }

    .item-cell {
      padding: 20rpx 0;
      border-bottom: 1px dashed #b3b3b3;

      &-left {
        flex-shrink: 0;
        font-size: 32rpx;
        color: #b3b3b3;
        width: 140rpx;
        margin-right: 20rpx;
      }

      &-right {
        > image {
          width: 60rpx;
          height: 60rpx;
          border-radius: 50%;
        }
      }

      &:last-child {
        border: none;
      }
    }
  }
}
</style>
