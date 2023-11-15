<template>
  <view class="income-bill container">
    <view class="income-bill-header">
      <view>
        <view class="income-title">收入明细</view>
        <view class="income-user">账户收入</view>
        <view class="income-number">¥{{ allIn }}</view>
      </view>
      <image
        src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230905_b1e8aa1495ed4b8dafb80bbe81d80436.png"
        mode=""
      />
    </view>

    <!-- 时间 -->
    <view class="date-time">
      <!-- TODO 这个时间可以封装组件 -->
      <view class="date-time-title flex-a-center">
        <picker
          mode="date"
          :value="date"
          fields="year"
          @change="bindDateChange"
        >
          <view class="flex-a-center">
            <view style="font-size: 34rpx; color: #fb8753">{{
              date.split("-")[0]
            }}</view>
            <u-icon name="arrow-down" color="#fb8753"></u-icon>
          </view>
        </picker>
      </view>
    </view>

    <view class="income-bill-list">
      <!-- TODO 列表也可以封装成组件 -->
      <!-- 渲染列表表格 -->
      <view class="table">
        <view class="table-header">
          <u-row>
            <u-col textAlign="center" span="6">
              <view class="demo-layout">月份</view>
            </u-col>

            <u-col textAlign="center" span="6">
              <view class="demo-layout">收入</view>
            </u-col>
          </u-row>
        </view>

        <!-- 列表 -->
        <view class="table-list">
          <view
            class="table-item"
            v-for="(data, index) in viewDataList"
            @click="handleToBillDetail(data.month)"
            :key="index"
          >
            <u-row>
              <u-col textAlign="center" span="6">
                <view class="demo-item">{{ data.month + 1 }}月</view>
              </u-col>
              <u-col textAlign="center" span="6">
                <view class="demo-item">
                  <view class="number">+{{ data.money.toFixed(2) }}</view>
                  <view class="demo-icon-right">
                    <u-icon name="arrow-right" color="#2979ff" size="16">
                    </u-icon>
                  </view>
                </view>
              </u-col>
            </u-row>
          </view>
        </view>
      </view>
    </view>
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
      date: uni.$u.timeFormat(new Date(), "yyyy-mm-dd"),
      currentYear: new Date().getFullYear(),
      // 接收请求参数
      billList: [],
    };
  },
  methods: {
    bindDateChange(e) {
      this.this.filterDate(e.detail.value);
    },
    // 设置年范围
    async filterDate(year) {
      let start = Date.parse(`${year}-01-01 00:00:00`);
      let end = Date.parse(`${year}-12-31 23:59:59`);

      // 获取概念数据
      await this.getFinanceBill([start, end]);
    },

    // 发送请求获取年数据
    async getFinanceBill(range) {
      let reqData = getRequestFilter({
        creatorTime: range,
        creatorUserId: this.userInfo.id,
        is_income: "收入",
      });
      const { data } = await getModelList("64ec4d02d85a4b7b32ec6019", reqData);
      this.billList = data?.list;
    },
    handleToBillDetail(month) {
      uni.navigateTo({
        url: `/subPages/owner-autonomy/finance/detail/my-bill?year=${this.date}&month=${month}`,
      });
    },
  },
  computed: {
    allIn() {
      return this.billList?.reduce((prev, curr) => (prev += curr.money), 0);
    },
    viewDataList() {
      let mouthData = {};
      let dataList = [];
      this.billList.forEach((item) => {
        mouthData[`${new Date(item.creatorTime).getMonth() + 1}-${item._id}`] =
          {
            month: new Date(item.creatorTime).getMonth(),
            ...item,
          };
      });

      Object.keys(mouthData).forEach((item) => {
        dataList.push(mouthData[item]);
      });
      return dataList.sort((a, b) => {
        let dataA = a.creatorTime;
        let dataB = b.creatorTime;
        return dataB - dataA;
      });
    },
  },
  async onLoad() {
    await this.filterDate(this.currentYear);
  },
};
</script>

<style lang="scss" scoped>
.income-bill {
  width: 100vw;
  min-height: 100vh;
  background-color: #f5f7fb;

  &-header {
    margin: 34rpx;
    background-color: #5991fa;
    border-radius: 16rpx;
    padding: 32rpx;
    box-sizing: border-box;
    color: #fff;
    display: flex;
    justify-content: space-between;

    > image {
      width: 166rpx;
      height: 166rpx;
      margin-right: 30rpx;
    }

    .income-title {
      height: 50rpx;
      font-size: 34rpx;
      font-weight: 500;
      line-height: 50rpx;
      margin-bottom: 30rpx;
    }

    .income-user {
      height: 38rpx;
      font-size: 30rpx;
      line-height: 38rpx;
      margin-bottom: 16rpx;
    }

    .income-number {
      height: 46rpx;
      font-size: 42rpx;
      font-weight: bold;
      line-height: 46rpx;
    }
  }

  .date-time {
    display: flex;
    padding: 32rpx 0 0 32rpx;

    justify-content: space-between;
    margin-bottom: 20rpx;
    color: #333333;

    &-title {
      // width: 150rpx;
      display: flex;
      align-items: center;
    }
  }

  &-list {
    margin: 32rpx;
    min-height: calc(100vh - 220px);
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 16rpx;

    .table {
      &-header {
        padding: 20rpx 0;
        border-bottom: 1px solid #eee;
      }
      &-list {
        .table-item {
          padding: 20rpx 0;
          border-bottom: 1px solid #eee;
        }
      }
    }
  }
}

.demo-layout {
  font-size: 30rpx;
  color: #333333;
  height: 50rpx;
  line-height: 50rpx;
  border-radius: 8rpx;
}

.demo-item {
  width: 100%;
  height: 42rpx;
  font-size: 30rpx;
  color: #555555;
  line-height: 42rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  .demo-icon-right {
    position: absolute;
    right: 10rpx;
  }
}

.balance {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

// ::v-deep .u-cion {
//   margin-left: 16rpx;
// }
</style>
