<template>
  <view class="finance">
    <view class="date">
      <ren-calendar
        ref="ren"
        :markDays="markDays"
        :disabledAfter="true"
        :headerBar="false"
        @onDayClick="onDayClick"
      ></ren-calendar>
    </view>

    <view class="chart">
      <view class="chart-title">故障上报历史数据</view>
      <qiun-data-charts
        type="column"
        :opts="opts"
        :chartData="chartFaultReportingData"
      />
    </view>
    <view class="bottom">
      <view class="bottom-item">
        <view class="bottom-item-header">{{ faultReportingDay.length }}</view>
        <view class="bottom-item-footer">今日故障</view>
      </view>
      <view class="bottom-item">
        <view class="bottom-item-header">{{ faultReportingMonth.length }}</view>
        <view class="bottom-item-footer">本月故障合计</view>
      </view>
      <view class="bottom-item">
        <view class="bottom-item-header">{{ faultReportingYear.length }}</view>
        <view class="bottom-item-footer">今年故障合计</view>
      </view>
    </view>
    <!-- 环境卫生 -->
    <view class="chart">
      <view class="chart-title">环境卫生历史数据</view>
      <qiun-data-charts
        type="column"
        :opts="opts"
        :chartData="chartHealthDate"
      />
    </view>
    <view class="bottom">
      <view class="bottom-item">
        <view class="bottom-item-header">{{ healthDay.length }}</view>
        <view class="bottom-item-footer">今日统计</view>
      </view>
      <view class="bottom-item">
        <view class="bottom-item-header">{{ healthMonth.length }}</view>
        <view class="bottom-item-footer">本月统计</view>
      </view>
      <view class="bottom-item">
        <view class="bottom-item-header">{{ healthYear.length }}</view>
        <view class="bottom-item-footer">今年统计</view>
      </view>
    </view>
    <!-- 电梯安全-->
    <view class="chart">
      <view class="chart-title">电梯统计数据</view>
      <qiun-data-charts
        type="column"
        :opts="opts"
        :chartData="chartElevatorDate"
      />
    </view>
    <view class="bottom">
      <view class="bottom-item">
        <view class="bottom-item-header">{{ elevatorDay.length }}</view>
        <view class="bottom-item-footer">今日统计</view>
      </view>
      <view class="bottom-item">
        <view class="bottom-item-header">{{ elevatorMonth.length }}</view>
        <view class="bottom-item-footer">本月统计</view>
      </view>
      <view class="bottom-item">
        <view class="bottom-item-header">{{ elevatorYear.length }}</view>
        <view class="bottom-item-footer">今年统计</view>
      </view>
    </view>
    <!--安全隐患 -->
    <view class="chart">
      <view class="chart-title">安全隐患统计数据</view>
      <qiun-data-charts
        type="column"
        :opts="opts"
        :chartData="chartSafetyDate"
      />
    </view>
    <view class="bottom">
      <view class="bottom-item">
        <view class="bottom-item-header">{{ safetyDay.length }}</view>
        <view class="bottom-item-footer">今日统计</view>
      </view>
      <view class="bottom-item">
        <view class="bottom-item-header">{{ safetyMonth.length }}</view>
        <view class="bottom-item-footer">本月统计</view>
      </view>
      <view class="bottom-item">
        <view class="bottom-item-header">{{ safetyYear.length }}</view>
        <view class="bottom-item-footer">今年统计</view>
      </view>
    </view>
    <!-- 其他 -->
    <view class="chart">
      <view class="chart-title">安全隐患统计数据</view>
      <qiun-data-charts
        type="column"
        :opts="opts"
        :chartData="chartOtherDate"
      />
    </view>
    <view class="bottom">
      <view class="bottom-item">
        <view class="bottom-item-header">{{ otherDay.length }}</view>
        <view class="bottom-item-footer">今日统计</view>
      </view>
      <view class="bottom-item">
        <view class="bottom-item-header">{{ otherMonth.length }}</view>
        <view class="bottom-item-footer">本月统计</view>
      </view>
      <view class="bottom-item">
        <view class="bottom-item-header">{{ otherYear.length }}</view>
        <view class="bottom-item-footer">今年统计</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
import RenCalendar from "@/components/ren-calendar/ren-calendar.vue";
import { getRequestFilter } from "@/common/function";
export default {
  data() {
    return {
      chartData: {},
      chartFaultReportingData: {}, //故障上报配置项
      // 故障上报数组
      faultReportingList: [],
      // 环境卫生数组
      healthList: [],
      chartHealthDate: {}, //环境卫生配置项
      // 电梯
      elevatorList: [],
      chartElevatorDate: {},
      // 隐患
      safetyList: [],
      chartSafetyDate: {},
      // 其他
      otherList: [],
      chartOtherDate: {},
      opts: {
        xAxis: {
          disableGrid: true,
        },
        yAxis: {
          disabled: true,
          data: [
            {
              min: 0,
            },
          ],
        },
        extra: {
          column: {
            type: "group",
          },
        },
      },
      curDate: "",
      markDays: [],
      yearErrorData: [], //今年的数据
      monthErrorData: [], //本月数据
      dayErrorData: [], //今天数据
    };
  },
  onReady() {
    this.getServerData();
    let today = this.$refs.ren.getToday().date;
    this.curDate = today;
    this.markDays.push(today);
  },
  components: {
    RenCalendar,
  },
  computed: {
    // 计算故障上报数据
    faultReportingMonth() {
      return this.monthErrorData.filter(
        (item) => item.questionType === "故障上报"
      );
    },
    faultReportingDay() {
      return this.dayErrorData.filter(
        (item) => item.questionType === "故障上报"
      );
    },
    faultReportingYear() {
      return this.yearErrorData.filter(
        (item) => item.questionType === "故障上报"
      );
    },
    // 环境卫生
    healthMonth() {
      return this.monthErrorData.filter(
        (item) => item.questionType === "环境卫生"
      );
    },
    healthDay() {
      return this.dayErrorData.filter(
        (item) => item.questionType === "环境卫生"
      );
    },
    healthYear() {
      return this.yearErrorData.filter(
        (item) => item.questionType === "环境卫生"
      );
    },
    // 电梯故障
    elevatorMonth() {
      return this.monthErrorData.filter(
        (item) => item.questionType === "电梯故障"
      );
    },
    elevatorDay() {
      return this.dayErrorData.filter(
        (item) => item.questionType === "电梯故障"
      );
    },
    elevatorYear() {
      return this.yearErrorData.filter(
        (item) => item.questionType === "电梯故障"
      );
    },
    // 安全隐患
    safetyMonth() {
      return this.monthErrorData.filter(
        (item) => item.questionType === "安全隐患"
      );
    },
    safetyDay() {
      return this.dayErrorData.filter(
        (item) => item.questionType === "安全隐患"
      );
    },
    safetyYear() {
      return this.yearErrorData.filter(
        (item) => item.questionType === "安全隐患"
      );
    },
    // 其他
    otherMonth() {
      return this.monthErrorData.filter(
        (item) => item.questionType === "其他事项"
      );
    },
    otherDay() {
      return this.dayErrorData.filter(
        (item) => item.questionType === "其他事项"
      );
    },
    otherYear() {
      return this.yearErrorData.filter(
        (item) => item.questionType === "其他事项"
      );
    },
  },

  watch: {
    yearErrorData: {
      handler(val) {
        // 故障上报
        this.faultReportingList = this.getCurrentDataList(val, "故障上报");
        this.chartFaultReportingData = {
          categories: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          series: [
            {
              name: "故障上报",
              data: this.faultReportingList,
            },
          ],
        };

        // 环境卫生
        this.healthList = this.getCurrentDataList(val, "环境卫生");
        this.chartHealthDate = {
          categories: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          series: [
            {
              name: "环境卫生",
              data: this.healthList,
            },
          ],
        };

        // 电梯安全
        this.elevatorList = this.getCurrentDataList(val, "电梯故障");
        this.chartElevatorDate = {
          categories: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          series: [
            {
              name: "电梯故障",
              data: this.elevatorList,
            },
          ],
        };

        // 安全隐患
        this.safetyList = this.getCurrentDataList(val, "安全隐患");
        this.chartSafetyDate = {
          categories: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          series: [
            {
              name: "安全隐患",
              data: this.safetyList,
            },
          ],
        };

        // 其他
        this.otherList = this.getCurrentDataList(val, "其他事项");
        this.chartOtherDate = {
          categories: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          series: [
            {
              name: "安全隐患",
              data: this.otherList,
            },
          ],
        };
      },
      deep: true,
    },
  },

  methods: {
    getServerData() {
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: ["一月", "二月", "三月", "四月", "五月", "六月"],
          series: [
            {
              name: "故障次数",
              data: [35, 36, 31, 33, 13, 34],
            },
          ],
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },

    async onDayClick(time) {
      let start = time.date + " " + "00:00:00";
      let end = time.date + " " + "23:59:59";
      // 查看不同天数的数据
      let range = [Date.parse(start), Date.parse(end)];

      let reqData = getRequestFilter({ creatorTime: range }, "range");
      //现获取时间范围
      const { data } = await getModelList("64d1dcab8b140b0b56b6ed90", reqData);
      this.dayErrorData = data?.list;
    },

    // 获取故障列表信息
    async getErrorListMessage(type) {
      let date = new Date();
      // 先获取当前时间
      let nowTime = Date.now();

      let range = [];
      if (type === "年") {
        // 时间范围年
        // console.log(date.getFullYear(nowTime));
        range = this.$helper.getYearRange(date.getFullYear(nowTime));
        let reqData = getRequestFilter({ creatorTime: range }, "range");
        //现获取时间范围
        const { data } = await getModelList(
          "64d1dcab8b140b0b56b6ed90",
          reqData
        );

        this.yearErrorData = data?.list;
        // 时间范围日
      } else if (type === "月") {
        // 时间范围月
        range = this.$helper
          .getCurrentMonth(nowTime)
          .map((item) => Date.parse(item));
        let reqData = getRequestFilter({ creatorTime: range }, "range");
        //现获取时间范围
        const { data } = await getModelList(
          "64d1dcab8b140b0b56b6ed90",
          reqData
        );
        this.monthErrorData = data?.list;
      } else if (type === "日") {
        // 获取年
        let year = date.getFullYear(nowTime);
        let month = date.getMonth(nowTime) + 1;
        let day = date.getDate(nowTime);

        console.log(year, month, day);

        let start = year + "-" + month + "-" + day + " " + "00:00:00";

        let end = year + "-" + month + "-" + day + " " + "23:59:59";

        range = [Date.parse(start), Date.parse(end)];
        let reqData = getRequestFilter({ creatorTime: range }, "range");
        //现获取时间范围
        const { data } = await getModelList(
          "64d1dcab8b140b0b56b6ed90",
          reqData
        );
        this.dayErrorData = data?.list;
      }
    },

    //整理数据
    getCurrentDataList(arr, type) {
      let date = new Date();
      let dataList = [];
      let obj = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
      };
      let filterList = arr.filter((item) => item.questionType === type);

      // 在不同月份的次数
      filterList.forEach((item) => {
        switch (date.getMonth(item.creatorTime)) {
          case 0:
            obj[date.getMonth(item.creatorTime)] += 1;
            break;
          case 1:
            obj[date.getMonth(item.creatorTime)] += 1;
            break;
          case 2:
            obj[date.getMonth(item.creatorTime)] += 1;
            break;
          case 3:
            obj[date.getMonth(item.creatorTime)] += 1;
            break;
          case 4:
            obj[date.getMonth(item.creatorTime)] += 1;
            break;
          case 5:
            obj[date.getMonth(item.creatorTime)] += 1;
            break;
          case 6:
            obj[date.getMonth(item.creatorTime)] += 1;
            break;
          case 7:
            obj[date.getMonth(item.creatorTime)] += 1;
            break;
          case 8:
            obj[date.getMonth(item.creatorTime)] += 1;
            break;
          case 9:
            obj[date.getMonth(item.creatorTime)] += 1;
            break;
          case 10:
            obj[date.getMonth(item.creatorTime)] += 1;
            break;
          case 11:
            obj[date.getMonth(item.creatorTime)] += 1;
            break;

          default:
            break;
        }
      });

      Object.values(obj).forEach((item) => dataList.push(item));

      return dataList;
    },
  },
  onLoad() {
    this.getErrorListMessage("年");
    this.getErrorListMessage("月");
    this.getErrorListMessage("日");
  },
};
</script>

<style lang="scss" scoped>
.finance {
  width: 100vw;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
  background-color: #f5f7fb;

  .change {
    text-align: center;
    padding-bottom: 30rpx;
    color: #fff;
  }

  .date {
    padding: 0 16rpx;
    padding-bottom: 30rpx;
    margin-bottom: 30rpx;
    box-sizing: border-box;
    background-color: #6377f5;
  }

  .chart {
    width: 100%;
    height: 400rpx;
    padding-bottom: 60rpx;

    &-title {
      text-align: right;
      margin-right: 20rpx;
      height: 50rpx;
      font-size: 33rpx;
      color: #6377f5;
      line-height: 50rpx;
    }
  }
  .bottom {
    margin: 30rpx 16rpx;
    height: 138rpx;
    background: #fcfcff;
    border-radius: 8rpx;
    border: 2rpx solid #6377f5;

    display: flex;
    justify-content: space-around;
    align-items: center;

    &-item {
      &-header {
        color: #6377f5;
        text-align: center;
      }
      &-footer {
        font-size: 32rpx;
        color: #777;
      }
    }
  }
}

/* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */

::v-deep .pre {
  background-color: #fff;
  color: #fff;
}

::v-deep .next {
  background-color: #fff;
  color: #fff;
}

::v-deep .calendar-wrapper .header {
  color: #fff;
  background-color: #6377f5;
}
</style>
