<template>
  <view class="income-bill">
    <view class="income-bill-header">
      <view>
        <view class="income-title">支出明细</view>
        <view class="income-user">账户支出</view>
        <view class="income-number">{{ allIn.toFixed(2) }}</view>
      </view>
      <image
        src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230905_b1e8aa1495ed4b8dafb80bbe81d80436.png"
        mode=""
      />
    </view>

    <view class="income-bill-list">
      <!-- 时间 -->
      <view class="date-time">
        <!-- TODO 这个时间可以封装组件 -->
        <view class="date-time-title flex-a-center">
          <!-- <view class="label" style="width: 100rpx;">选择:</view> -->
          <picker
            mode="date"
            :value="date"
            fields="year"
            :start="startDate"
            :end="endDate"
            @change="bindDateChange"
          >
            <!-- <u--input
              placeholder="请选择时间"
              border="none"
              v-model="date"
            ></u--input> -->
            <view class="flex-a-center">
              <view>{{ date }}</view>
              <u-icon name="arrow-right"></u-icon>
            </view>
          </picker>
        </view>
      </view>
      <!-- TODO 列表也可以封装成组件 -->
      <!-- 渲染列表表格 -->
      <view class="table">
        <view class="table-header">
          <u-row>
            <u-col textAlign="center" span="6">
              <view class="demo-layout">月份</view>
            </u-col>
            <!-- <u-col textAlign="center" span="3">
              <view class="demo-layout">收入</view>
            </u-col>
            <u-col textAlign="center" span="4">
              <view class="demo-layout">来源</view>
            </u-col> -->
            <u-col textAlign="center" span="6">
              <view class="demo-layout">支出</view>
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
                <view class="demo-item">{{ data.month }}月</view>
              </u-col>
              <!-- <u-col textAlign="center" span="3">
                <view class="demo-item">5000.00</view>
              </u-col>
              <u-col textAlign="center" span="4">
                <view class="demo-item text-hidden">业主捐款</view>
              </u-col> -->
              <u-col textAlign="center" span="6">
                <view class="demo-item">
                  <view class="number">{{ data.allOut.toFixed(2) }}</view>
                  <u-icon name="arrow-right" color="#2979ff" size="16"></u-icon
                ></view>
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
      showDate: true,
      show: false,
      date: new Date().getFullYear(),
      // 接收请求参数
      billList: [],
    };
  },
  methods: {
    showDatePick() {
      this.show = true;
      this.showDate = !this.showDate;
    },
    handleCancel() {
      this.show = false;
      this.showDate = !this.showDate;
    },

    // 日期选择器确定按钮
    handleConfirm(value) {
      console.log(value);
    },

    handleToDetail() {
      uni.navigateTo({
        url: "../billing-details/billing-details",
      });
    },
    // 设置年范围
    filterDate(year) {
      return {
        start: `${year}-01-01 00:00:00`,
        end: `${year}-12-31 23:59:59`,
      };
    },
    getDate(type) {
      const date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();

      if (type === "start") {
        year = year - 60;
      } else if (type === "end") {
        year = year + 2;
      }
      month = month > 9 ? month : "0" + month;
      day = day > 9 ? day : "0" + day;
      return `${year}-${month}-${day}`;
    },
    // 发送请求获取年数据
    async getFinanceBill(range) {
      let reqData = getRequestFilter({
        creatorTime: range,
        creatorUserId: this.userInfo.id,
      });
      const { data } = await getModelList("64ec4d02d85a4b7b32ec6019", reqData);
      this.billList = data?.list.filter((item) => item.is_income === "支出");
    },
    handleToBillDetail(month) {
      uni.navigateTo({
        url: `/subPages/owner-autonomy/finance/detail/my-bill?year=${this.date}&month=${month}`,
      });
    },
  },
  computed: {
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    },
    allIn() {
      return this.billList.reduce((prev, curr) => {
        return (prev += curr.money);
      }, 0);
    },
    viewDataList() {
      let mouthData = {};
      let dataList = [];
      this.billList.forEach((item) => {
        mouthData[new Date(item.creatorTime).getMonth() + 1] = [];
      });
      this.billList.forEach((item) => {
        if (mouthData[new Date(item.creatorTime).getMonth() + 1]) {
          mouthData[new Date(item.creatorTime).getMonth() + 1].push(item);
        }
      });

      Object.keys(mouthData).forEach((item) => {
        let outMoney = mouthData[item]
          .filter((item) => {
            return item.is_income == "支出";
          })
          .reduce((prev, curr) => {
            return (prev += Number(curr.money));
          }, 0);

        dataList.push({
          month: item,
          allOut: outMoney,
        });
      });
      return dataList.sort((a, b) => {
        let dataA = a.mouth;
        let dataB = b.mouth;
        return dataB - dataA;
      });
    },
  },
  onLoad() {
    let { start, end } = this.filterDate(this.date);
    start = Date.parse(start);
    end = Date.parse(end);
    // 获取概念数据
    this.getFinanceBill([start, end]);
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

  &-list {
    margin: 32rpx;

    box-sizing: border-box;
    background-color: #fff;
    border-radius: 16rpx;

    .date-time {
      display: flex;
      padding: 32rpx 0 0 32rpx;

      justify-content: space-between;
      margin-bottom: 20rpx;
      color: #333333;

      &-title {
        width: 150rpx;
        display: flex;
        align-items: center;
      }
    }

    .table {
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
