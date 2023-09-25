<template>
  <view class="all-bills">
    <!-- 头部信息 -->
    <view class="all-bills-header">
      <view class="all-bills-header-top">
        <view class="user-message">
          <view class="title">我的账户</view>
          <view class="balance">
            <view class="balance-title">账户结余</view>
            <view class="balance-number">{{
              (myAllOutOrIn.outMoney + myAllOutOrIn.inMoney).toFixed(2)
            }}</view>
          </view>
        </view>
        <view class="img">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230905_b1e8aa1495ed4b8dafb80bbe81d80436.png"
            mode=""
          />
        </view>
      </view>
      <view class="all-bills-header-bottom">
        <view class="bottom-item">
          <view class="title">总支出</view>
          <view class="number">¥{{ myAllOutOrIn.outMoney.toFixed(2) }}</view>
        </view>
        <view class="bottom-item">
          <view class="title">总收入</view>
          <view class="number">¥{{ myAllOutOrIn.inMoney.toFixed(2) }}</view>
        </view>
      </view>
    </view>

    <!-- 列表数据 -->
    <view class="all-bills-content">
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
            <view class="flex-a-center">
              <view>{{ date }}</view>
              <u-icon name="arrow-right"></u-icon>
            </view>
          </picker>
        </view>

        <!-- <view class="date-time-right">
          <u-search
            placeholder="请输入关键字"
            :showAction="false"
            v-model="keyword"
          ></u-search>
        </view> -->
      </view>

      <!-- 渲染列表表格 -->
      <view class="table">
        <view class="table-header">
          <u-row>
            <u-col textAlign="center" span="2">
              <view class="demo-layout">月份</view>
            </u-col>
            <u-col textAlign="center" span="3">
              <view class="demo-layout">收入</view>
            </u-col>
            <u-col textAlign="center" span="4">
              <view class="demo-layout">支出</view>
            </u-col>
            <u-col textAlign="center" span="3">
              <view class="demo-layout">结余</view>
            </u-col>
          </u-row>
        </view>

        <!-- 列表 -->
        <view class="table-list">
          <view
            class="table-item"
            v-for="date in monthDataList"
            @click="handleToBillDetail(date.month)"
            :key="date.month"
          >
            <u-row>
              <u-col textAlign="center" span="2">
                <view class="demo-item">{{ date.month }}月</view>
              </u-col>
              <u-col textAlign="center" span="3">
                <view class="demo-item">{{ date.allIn.toFixed(2) }}</view>
              </u-col>
              <u-col textAlign="center" span="4">
                <view class="demo-item">{{ date.allOut.toFixed(2) }}</view>
              </u-col>
              <u-col textAlign="center" span="3">
                <view class="demo-item balance">
                  <view class="number">{{
                    (date.allIn + date.allOut).toFixed(2)
                  }}</view>
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
      keyword: "",
      date: new Date().getFullYear(),
      income: "",
      expenditure: "",
      // 接收请求参数
      billList: [],
    };
  },
  computed: {
    startDate() {
      return this.getDate("start");
    },
    endDate() {
      return this.getDate("end");
    },

    myAllOutOrIn() {
      let ourArr = this.billList.filter((item) => {
        return item.is_income === "支出";
      });
      let inArr = this.billList.filter((item) => {
        return item.is_income === "收入";
      });

      let outMoney = ourArr.reduce((prev, curr) => {
        return (prev += curr.money);
      }, 0);
      let inMoney = inArr.reduce((prev, curr) => {
        return (prev += curr.money);
      }, 0);

      return { outMoney, inMoney };
    },
    monthDataList() {
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
      //   {8:[],9:[]}
      Object.keys(mouthData).forEach((item) => {
        let inMoney = mouthData[item]
          .filter((item) => {
            return item.is_income == "收入";
          })
          .reduce((prev, curr) => {
            return (prev += Number(curr.money));
          }, 0);
        let outMoney = mouthData[item]
          .filter((item) => {
            return item.is_income == "支出";
          })
          .reduce((prev, curr) => {
            return (prev += Number(curr.money));
          }, 0);
        dataList.push({
          month: item,
          allIn: inMoney,
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
  methods: {
    // 日期选择器确定按钮
    bindDateChange(e) {
      this.date = e.detail.value;
      let { start, end } = this.filterDate(this.date);
      start = Date.parse(start);
      end = Date.parse(end);
      // 获取概念数据
      this.getFinanceBill([start, end]);
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
    filterDate(year) {
      return {
        start: `${year}-01-01 00:00:00`,
        end: `${year}-12-31 23:59:59`,
      };
    },
    // 发送请求获取年数据
    async getFinanceBill(range) {
      let reqData = getRequestFilter(
        { creatorTime: range, creatorUserId: this.userInfo.id }
        // "range"
      );
      const { data } = await getModelList("64ec4d02d85a4b7b32ec6019", reqData);
      this.billList = data?.list;
      this.getComputedMoney();
    },
    getComputedMoney() {
      let income = 0;
      let expenditure = 0;
      this.billList.forEach((item) => {
        if (item.is_income == "收入") {
          income += Number(item.money);
        } else {
          expenditure += Math.abs(Number(item.money));
        }
      });
      this.income = income;
      this.expenditure = expenditure;
    },
    // 跳转到详情
    handleToBillDetail(month) {
      uni.navigateTo({
        url: `/subPages/owner-autonomy/finance/detail/my-bill?year=${this.date}&month=${month}`,
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
.all-bills {
  padding: 32rpx;
  box-sizing: border-box;
  min-height: 100vh;
  background-color: #f5f7fb;
  color: #fff;

  &-header {
    height: 334rpx;
    background-color: #5991fa;
    border-radius: 17rpx;
    padding: 16rpx 32rpx;
    box-sizing: border-box;
    margin-bottom: 32rpx;

    &-top {
      display: flex;
      justify-content: space-between;
      margin-bottom: 40rpx;

      .user-message {
        color: #fff;

        .title {
          height: 50rpx;
          font-size: 34rpx;
          line-height: 50rpx;
          margin-bottom: 20rpx;
        }

        .balance {
          .balance-title {
            height: 38rpx;
            font-size: 30rpx;
            line-height: 38rpx;
          }

          .balance-number {
            height: 46rpx;
            font-size: 42rpx;
            font-weight: bold;
            line-height: 46rpx;
          }
        }
      }

      .img {
        width: 168rpx;
        height: 168rpx;

        & > image {
          width: 100%;
          height: 100%;
        }
      }
    }

    &-bottom {
      display: flex;
      justify-content: space-between;
      //   text-align: center;

      .title {
        height: 33rpx;
        font-size: 25rpx;
        line-height: 33rpx;
      }

      .number {
        height: 42rpx;
        font-size: 33rpx;
        line-height: 42rpx;
      }
    }
  }

  &-content {
    padding: 32rpx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 16rpx;

    .date-time {
      display: flex;
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
      &-header {
        margin-bottom: 20rpx;
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
</style>
