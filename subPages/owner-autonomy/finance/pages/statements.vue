<template>
  <view class="financial-statements-container">
    <!-- 内容 -->
    <view class="financial-statements">
      <view class="financial-statements-tabs">
        <u-tabs
          :list="tabList"
          :scrollable="false"
          :itemStyle="{ fontSize: '34rpx', height: '40px' }"
          lineWidth="30"
          @click="handleTabClick"
        ></u-tabs>
      </view>

      <!-- 选择框 -->
      <view class="financial-statements-content">
        <view class="date-check">
          <view class="date-check-left" @click="showDatePick">
            <view class="time-text">
              {{ $u.timeFormat(dateValue, "yyyy-mm") }}
            </view>
            <view class="time-icon">
              <u-icon name="arrow-down" v-if="showDate"></u-icon>
              <u-icon name="arrow-up" v-else></u-icon>
            </view>
          </view>
          <u-datetime-picker
            :show="show"
            v-model="dateValue"
            mode="year-month"
            @confirm="handleConfirm"
            @cancel="handleCancel"
            @close.stop="handleCancel"
            :closeOnClickOverlay="true"
          ></u-datetime-picker>
        </view>

        <!-- 账户信息 -->
        <view class="user-message">
          <view class="user-message-item">
            <view class="user-message-item-title">本月支出</view>
            <view class="user-message-item-number"
              >¥{{ expenditure.toFixed(2) }}</view
            >
          </view>
          <view class="user-message-item">
            <view class="user-message-item-title">本月收入</view>
            <view class="user-message-item-number"
              >¥{{ income.toFixed(2) }}</view
            >
          </view>
          <view class="user-message-item">
            <view class="user-message-item-title"
              >总支出{{ allOutData.length }}笔，合计</view
            >
            <view class="user-message-item-number"
              >¥{{ (expenditure + income).toFixed(2) }}</view
            >
          </view>
        </view>

        <!-- 支出图表 -->
        <view class="expenditure-chart">
          <view class="expenditure-chart-header">
            <view class="expenditure-chart-header-left"
              >{{ moneyType }}对比</view
            >
            <view class="expenditure-chart-header-right">——结余</view>
          </view>

          <view class="charts-box">
            <qiun-data-charts
              type="column"
              :opts="opts"
              :chartData="chartData"
            />
          </view>
        </view>

        <!-- 支出分类图表 -->
        <view class="type-chart">
          <view class="type-chart-header">分类统计</view>
          <!-- canvasId="canvasIdType"   :canvas2d="true" -->
          <view class="pieCharts-box my-index">
            <qiun-data-charts
              style="index: 1"
              type="ring"
              canvasId="canvasIdType"
              :canvas2d="true"
              :opts="pieOpts"
              :chartData="pieChartData"
            />
          </view>
        </view>

        <!-- 支出排行榜 -->
        <view class="expenditure-rank">
          <view class="expenditure-rank-title">支出排行榜</view>
          <view class="expenditure-rank-list">
            <view
              class="expenditure-rank-item"
              v-for="(item, index) in Object.keys(rankDate)"
              :key="index"
            >
              <view class="item-left">
                <image :src="icon[item]" />
              </view>
              <view class="item-right">
                <view class="item-right-top">
                  <view class="item-right-top-title">{{ item }}</view>
                  <view class="item-right-top-money">
                    <view class="number"
                      >{{ moneyType === "支出" ? "-" : "+" }}
                      {{ rankDate[item] }}</view
                    >
                    <u-icon
                      name="arrow-right"
                      color="#2979ff"
                      size="16"
                    ></u-icon>
                  </view>
                </view>
                <view class="item-right-bottom">
                  <u-line-progress
                    :percentage="
                      moneyType === '支出'
                        ? ((rankDate[item] / expenditure) * 100).toFixed(2)
                        : ((rankDate[item] / income) * 100).toFixed(2)
                    "
                    activeColor="#ff0000"
                  ></u-line-progress>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="financial-statements-tabbar">
      <Tabbar :type="tabbarType"></Tabbar>
    </view>
  </view>
</template>

<script>
import Tabbar from "../../components/government-tabbar.vue";
import { getModelList } from "@/api";
import { getRequestFilter } from "@/common/function";
export default {
  data() {
    return {
      tabList: [
        {
          name: "支出",
        },
        {
          name: "收入",
        },
      ],
      // 显示时间
      dateValue: Number(new Date()),
      // 总数据
      billList: [],
      icon: {},
      moneyType: "支出",
      // 显示时间图标和选择器
      showDate: true,
      show: false,
      // 柱状图配置对象
      // TODO 当option没有加update: true时,可能会出现图渲染时找不到数据报错restore
      opts: {
        update: true,
        color: [
          "#6377F5",
          "#1890FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc",
        ],
        padding: [15, 15, 0, 5],
        enableScroll: false,
        legend: {},
        xAxis: {
          disableGrid: true,
        },
        yAxis: {
          data: [
            {
              min: 0,
              max: 6000,
            },
          ],
          splitNumber: 6,
        },
        extra: {
          column: {
            type: "group",
            width: 30,
            activeBgColor: "#000000",
            activeBgOpacity: 0.08,
          },
        },
      },
      // 圆环图配置对象
      pieOpts: {
        update: true,
        rotate: false,
        rotateLock: false,
        color: [
          "#FB8753",
          "#757BF2",
          "#F23D4F",
          "#FFD155",
          "#148FFA",
          "#1890FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc",
        ],
        padding: [5, 5, 5, 5],
        dataLabel: true,
        enableScroll: false,
        // 右边悬浮分类配置
        legend: {
          // show: true,
          show: false,
          position: "right",
          lineHeight: 25,
        },
        title: {
          name: "",
          fontSize: 14,
          color: "#666666",
        },
        subtitle: {
          name: "",
          fontSize: 18,
          color: "#7cb5ec",
        },
        extra: {
          ring: {
            ringWidth: 30,
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 10,
            border: false,
            borderWidth: 3,
            borderColor: "#FFFFFF",
            customRadius: 90,
          },
        },
      },
      tabbarType: "统计",
      // 获取总支出数据
      allOutData: 0,
      allInData: 0,
      // 总计算钱
      income: 0,
      expenditure: 0,
    };
  },
  methods: {
    sectionChange(index) {
      this.curNow = index;
    },
    // 显示选择器
    showDatePick() {
      this.show = true;
      this.showDate = !this.showDate;
    },
    handleCancel() {
      this.show = false;
      this.showDate = !this.showDate;
    },

    // 日期选择器确定按钮
    handleConfirm(e) {
      let changeNowDate = new Date(e.value);
      let reqRange = this.$helper
        .getCurrentMonth(Date.parse(changeNowDate))
        .map((item) => {
          return Date.parse(item);
        });
      this.getFinanceBill(reqRange);
      this.show = false;
      this.showDate = !this.showDate;
    },

    // 切换Tab
    handleTabClick({ name }) {
      this.moneyType = name;
    },

    // 获取总收入或支出
    getComputedMoney() {
      let income = 0;
      let expenditure = 0;
      this.billList.forEach((item) => {
        if (item.is_income == "收入") {
          income += item.money;
        } else {
          expenditure += item.money;
        }
      });
      this.income = income;
      this.expenditure = Math.abs(expenditure);
    },

    // 计算百分比值
    getPercent(arr, fixed) {
      let AllData = arr.reduce((prev, curr) => {
        return (prev += curr);
      }, 0);
      return arr.map((item) => ((item / AllData) * 100).toFixed(fixed));
    },

    // 发送请求获取数据
    async getFinanceBill(range) {
      let reqData = getRequestFilter({ creatorTime: range }, "range");
      const { data } = await getModelList("64ec4d02d85a4b7b32ec6019", reqData);
      this.billList = data?.list;
      // 计算总值
      this.getComputedMoney();
    },
  },
  computed: {
    // FIXME 柱状图数据
    chartData() {
      let data;
      let moneyList = new Array(6).fill(0);
      if (this.moneyType === "支出") {
        // 分别计算各个区间的费用
        this.allOutData.forEach((item) => {
          let value = new Date(item.creatorTime).getDate();
          if (value >= 1 && value < 5) {
            moneyList[0] -= item.money;
          } else if (value >= 5 && value < 10) {
            moneyList[1] -= item.money;
          } else if (value >= 10 && value < 15) {
            moneyList[2] -= item.money;
          } else if (value >= 15 && value < 20) {
            moneyList[3] -= item.money;
          } else if (value >= 20 && value < 25) {
            moneyList[4] -= item.money;
          } else if (value >= 25) {
            moneyList[5] -= item.money;
          }
        });
        data = {
          categories: ["1号", "5号", "10号", "15号", "20号", "25号"],
          series: [
            {
              name: "支出对比值",
              data: moneyList,
            },
          ],
        };
      } else {
        this.allInData.forEach((item) => {
          let value = new Date(item.creatorTime).getDate();
          if (value >= 1 && value < 5) {
            moneyList[0] += item.money;
          } else if (value >= 5 && value < 10) {
            moneyList[1] += item.money;
          } else if (value >= 10 && value < 15) {
            moneyList[2] += item.money;
          } else if (value >= 15 && value < 20) {
            moneyList[3] += item.money;
          } else if (value >= 20 && value < 25) {
            moneyList[4] += item.money;
          } else if (value >= 25) {
            moneyList[5] += item.money;
          }
        });
        data = {
          categories: ["1号", "5号", "10号", "15号", "20号", "25号"],
          series: [
            {
              name: "收入对比值",
              data: moneyList,
            },
          ],
        };
      }
      return data;
    },
    // FIXME 饼状图数据
    pieChartData() {
      let pieDate = {};
      let filterData = {
        购物: 0,
        餐饮: 0,
        交通: 0,
        通信: 0,
        娱乐: 0,
      };

      if (this.moneyType === "支出") {
        // 得到每一类消费总额
        this.allOutData.forEach((item) => {
          if (Object.keys(filterData).includes(item.consumption_type)) {
            filterData[item.consumption_type] += Math.abs(item.money);
          }
        });

        // 获取总数
        // {购物: 600, 餐饮: 800, 交通: 500, 通讯: 0, 娱乐: 800}
        // 解决百分比精度问题
        let Proportion = this.getPercent(Object.values(filterData), 2);
        // this.$helper.getPercent(Object.values(filterData), 4) || [];
        pieDate = {
          series: [
            {
              data: Object.keys(filterData).map((item, index) => {
                return {
                  name: item,
                  value: filterData[item],
                  labelText: `${item} ${Proportion[index] || 0}%`,
                  // TODO 当百分比为"0%", "0.01%"时不显示该选项引导线
                  labelShow: Proportion[index] == 0 ? false : true,
                };
              }),
            },
          ],
        };
      } else {
        // 得到每一类收入总额
        this.allInData.forEach((item) => {
          if (Object.keys(filterData).includes(item.consumption_type)) {
            filterData[item.consumption_type] += Math.abs(item.money);
          }
        });
        // 获取总数
        // {购物: 600, 餐饮: 800, 交通: 500, 通讯: 0, 娱乐: 800}
        // 解决百分比精度问题
        let Proportion = this.getPercent(Object.values(filterData), 2);
        // this.$helper.getPercent(Object.values(filterData), 4) || [];
        // console.log(Proportion);
        pieDate = {
          series: [
            {
              data: Object.keys(filterData).map((item, index) => {
                return {
                  name: item,
                  value: filterData[item],
                  labelText: `${item} ${Proportion[index] || 0}%`,
                  labelShow: Proportion[index] == 0 ? false : true,
                };
              }),
            },
          ],
        };
      }

      return pieDate;
    },
    // FIXME 排行榜数据
    rankDate() {
      let filterData = {
        购物: 0,
        餐饮: 0,
        交通: 0,
        通信: 0,
        娱乐: 0,
      };
      if (this.moneyType === "支出") {
        this.allOutData.forEach((item) => {
          if (Object.keys(filterData).includes(item.consumption_type)) {
            filterData[item.consumption_type] += Math.abs(item.money);
          }
        });
      } else {
        this.allInData.forEach((item) => {
          if (Object.keys(filterData).includes(item.consumption_type)) {
            filterData[item.consumption_type] += Math.abs(item.money);
          }
        });
      }
      return filterData;
    },
  },
  watch: {
    billList: {
      handler(val) {
        // 过滤所有支出
        this.allOutData = val.filter((item) => item.is_income == "支出");
        this.allInData = val.filter((item) => item.is_income == "收入");
      },
      deep: true,
      immediate: true,
    },
  },
  components: {
    Tabbar,
  },
  onShow() {
    this.icon = getApp().globalData.icon;
  },
  onLoad() {
    let nowDate = new Date();
    let reqRange = [];

    reqRange = this.$helper.getCurrentMonth(nowDate).map((item) => {
      return Date.parse(item);
    });
    // console.log(reqRange);
    // 获取当月所有账单信息
    this.getFinanceBill(reqRange);
  },
};
</script>

<style lang="scss" scoped>
.financial-statements-container {
  position: relative;
  height: 100vh;

  .financial-statements {
    width: 100vw;

    &-tabs {
      width: 100%;
    }

    &-content {
      padding: 32rpx;
      box-sizing: border-box;
      padding-bottom: 100px;
      background-color: #f5f7fb;

      .date-type {
        margin-bottom: 32rpx;
      }

      .date-check {
        margin-bottom: 32rpx;

        .date-check-left {
          display: flex;
          align-items: center;

          .time-text {
            height: 46rpx;
            font-size: 33rpx;
            color: #333;
            line-height: 46rpx;
            margin-right: 20rpx;
          }
        }
      }

      .user-message {
        height: 150rpx;
        background: #5991fa;
        border-radius: 17rpx;
        display: flex;
        justify-content: space-around;
        align-items: center;

        &-item {
          color: #fff;
          text-align: center;

          &-title {
            font-size: 25rpx;
            margin-bottom: 20rpx;
          }
        }
      }

      .expenditure-chart {
        margin: 20rpx 0;
        padding: 16rpx;
        background-color: #fff;
        box-sizing: border-box;
        border-radius: 17rpx;

        &-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16rpx;

          &-left {
            height: 58rpx;
            font-size: 33rpx;
            color: #000000;
            line-height: 58rpx;
          }

          &-right {
            height: 42rpx;
            font-size: 29rpx;
            color: #6377f5;
            line-height: 42rpx;
          }
        }
      }

      .type-chart {
        padding: 16rpx;
        background-color: #fff;
        box-sizing: border-box;
        margin: 20rpx 0;
        z-index: 1;
        border-radius: 17rpx;
      }

      .expenditure-rank {
        padding: 16rpx;
        background-color: #fff;
        box-sizing: border-box;

        &-title {
          margin-bottom: 20rpx;
          height: 46rpx;
          font-size: 33rpx;
          color: #000000;
          line-height: 46rpx;
        }

        &-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20rpx;

          .item-left {
            width: 66rpx;
            height: 66rpx;

            & > image {
              width: 100%;
              height: 100%;
            }
          }

          .item-right {
            width: 100%;
            margin-left: 30rpx;
            &-top {
              display: flex;
              justify-content: space-between;
              margin-bottom: 16rpx;

              &-money {
                display: flex;

                .number {
                  margin-right: 16rpx;
                }
              }
            }

            // &-bottom {
            // }
          }
        }
      }
    }
  }

  .financial-statements-tabbar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    background-color: #ffffff;
    // padding-bottom: 30rpx;
    z-index: 9000;
  }
}

// .charts-box {
//   width: 120rpx;
//   height: 120rpx;
// }

.my-index {
  z-index: 1;
}

::v-deep scroll-view {
  align-items: center !important;
}
</style>
