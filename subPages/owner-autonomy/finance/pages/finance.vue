<template>
  <view class="finance-container">
    <view class="finance">
      <view class="finance-date">
        <u-datetime-picker
          :show="show"
          v-model="dateValue"
          mode="year-month"
          @confirm="handleDateConfirm"
          @cancel="handleDateCancel"
          :closeOnClickOverlay="true"
        ></u-datetime-picker>
        <!-- <uni-datetime-picker
          v-model="range"
          type="datetimerange"
          rangeSeparator="至"
          @maskClick="dateValueChange"
          @change="dateValueChange"
          @clear="handleValueClear"
        /> -->
        <view class="finance-date-time" @click="showDatePick">
          <view class="time-text">{{
            $u.timeFormat(dateValue, "yyyy-mm")
          }}</view>
          <view class="time-icon">
            <u-icon name="arrow-down" v-if="!show"></u-icon>
            <u-icon name="arrow-up" v-else></u-icon>
          </view>
        </view>
      </view>

      <view class="finance-message">
        <view class="finance-message-left">
          <view class="finance-message-left-header">
            <view class="title">账户余额</view>
            <view>{{ income - expenditure }}</view>
          </view>
          <view class="finance-message-left-footer">
            <view class="item">
              <view class="item-title">本月收入</view>
              <view class="item-number">¥{{ income }}</view>
            </view>
            <view class="item">
              <view class="item-title">本月支出</view>
              <view class="item-number">¥{{ expenditure }}</view>
            </view>
          </view>
        </view>
        <view class="finance-message-right">
          <view class="charts-box">
            <qiun-data-charts
              type="arcbar"
              :opts="opts"
              :chartData="chartData"
              width="60"
              height="60"
            />
          </view>

          <view class="all-btn" @click="handleAllBills">全部账单</view>
        </view>
      </view>

      <view class="finance-type">
        <view class="type-left" @click="handleIncome">
          <view class="type-text">收入明细</view>
        </view>
        <view class="type-right" @click="handleToExpenditure">
          <view class="type-text">支出汇总</view>
        </view>
      </view>

      <view class="finance-list">
        <view class="tabs">
          <u-tabs :list="tabList" @click="handleClickTab"></u-tabs>
        </view>
        <view class="finance-details">
          <!-- TODO 可封装成组件 -->
          <view
            class="finance-details-item"
            v-for="(item, _) in viewData"
            :key="_"
          >
            <view class="finance-details-item-header">
              <!-- <text class="date-nickName">{{ item.time.title }}</text> -->
              <text class="date">{{ item.time }}</text>
              <text class="expenditure">支出 {{ item.allIn }}</text>
              <text class="income">收入 {{ item.allOut }}</text>
            </view>
            <view class="finance-details-item-body">
              <view
                class="body-content"
                v-for="data in item.details"
                @click="handleToBillDetail(data._id)"
                :key="data._id"
              >
                <view class="body-content-left">
                  <view class="content-left-icon">
                    <image :src="icon[data.consumption_type]" />
                  </view>
                  <view class="content-left-message">
                    <view class="content-left-message-header">
                      {{ data.consumption_type }}
                      <!-- <text>{{ data.consumptionTime }}</text> -->
                    </view>
                    <view class="content-left-message-bottom"
                      ><text> {{ data.consumption_info }}</text></view
                    >
                  </view>
                </view>
                <view class="body-content-right">
                  <view class="content-right-number">{{
                    Number(data.money).toFixed(2)
                  }}</view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部tabbar -->
    <view class="finance-tabbar">
      <Tabbar :type="tabbarType"></Tabbar>
    </view>
  </view>
</template>

<script>
import Tabbar from "../../components/government-tabbar";
import { getModelList } from "@/api";
import { getRequestFilter } from "@/common/function";

export default {
  data() {
    return {
      //您可以通过修改 config-ucharts.js 文件中下标为 ['arcbar'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        update: true,
        color: [
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
        padding: undefined,
        title: {
          name: "0",
          fontSize: 9,
          // color: "#2fc25b",
          color: "#fff",
        },
        subtitle: {
          name: "结余",
          fontSize: 9,
          color: "#666666",
        },
        extra: {
          arcbar: {
            type: "circle",
            // backgroundColor: "#E9E9E9",
            backgroundColor: "#E5EEFF",
            startAngle: 1.5,
            // endAngle: 2.5,
            gap: 1,
            width: 6,
          },
        },
      },

      tabList: [
        {
          name: "所有",
        },
        {
          name: "支出",
        },
        {
          name: "收入",
        },
      ],
      income: 0,
      expenditure: 0,

      // 控制底部导航栏的显示
      tabbarType: "明细",

      show: false,
      dateValue: Number(new Date()),
      icon: {},

      userMoney: {},
      billList: [],
      // 接收过滤后的数据
      filterData: [],
      viewData: [],
    };
  },

  methods: {
    // 切换tab
    async handleClickTab(item) {
      switch (item.name) {
        case "收入":
          this.viewData = this.filterData.map((item) => {
            return {
              ...item,
              details: item.details.filter((data) => {
                return data.is_income == "收入";
              }),
            };
          });
          break;
        case "支出":
          this.viewData = this.filterData.map((item) => {
            return {
              ...item,
              details: item.details.filter((data) => {
                return data.is_income == "支出";
              }),
            };
          });
          break;
        case "所有":
          this.viewData = this.filterData;
          break;
      }
    },
    // 选择时间仅仅支持选择一个月)
    showDatePick() {
      this.show = true;
    },
    //TODO 确认按钮  查找时间范围内的账单都是数组
    handleDateConfirm(e) {
      let changeNowDate = new Date(e.value);
      let reqRange = this.$helper
        .getCurrentMonth(Date.parse(changeNowDate))
        .map((item) => {
          return Date.parse(item);
        });
      this.getFinanceBill(reqRange);
      this.show = false;
    },
    // 获取总收入或支出
    getComputedMoney() {
      let income = 0;
      let expenditure = 0;
      this.billList?.forEach((item) => {
        if (item.is_income == "收入") {
          income += Number(item.money);
        } else {
          expenditure += Math.abs(Number(item.money));
        }
      });
      this.income = income;
      this.expenditure = expenditure;
    },
    // 取消按钮
    handleDateCancel() {
      this.show = false;
    },
    // 全部账单
    handleAllBills() {
      uni.navigateTo({
        url: "/subPages/owner-autonomy/finance/detail/all-bill",
      });
    },
    // 全部收入
    handleIncome() {
      uni.navigateTo({
        url: "/subPages/owner-autonomy/finance/detail/all-income",
      });
    },

    // 跳转到支出账单
    handleToExpenditure() {
      uni.navigateTo({
        url: "/subPages/owner-autonomy/finance/detail/all-expenditure",
      });
    },
    // 跳转到账单详情
    handleToBillDetail(id) {
      uni.navigateTo({
        url: `/subPages/owner-autonomy/finance/detail/detail?id=${id}`,
      });
    },

    //TODO 获取账单信息
    async getFinanceBill(range) {
      let reqData = getRequestFilter({ creatorTime: range }, "range");
      const { data } = await getModelList("64ec4d02d85a4b7b32ec6019", reqData);
      this.billList = data?.list;
      this.getComputedMoney();
    },
  },
  components: {
    Tabbar,
  },
  watch: {
    billList: {
      handler(val) {
        let filterObj = {};
        val?.forEach((item) => {
          let time = new Date(item.creatorTime).getDate();
          filterObj[time] = [];
          val?.forEach((data) => {
            if (time == new Date(data.creatorTime).getDate()) {
              filterObj[time].push(data);
            }
          });
        });

        this.filterData = Object.values(filterObj).map((item) => {
          //   // 获取当前时间
          return {
            creatorTime: item[0].creatorTime,
            time: this.$u.timeFrom(item[0].creatorTime, "yyyy-mm-dd"),
            allIn: item?.reduce((prev, next) => {
              return next.is_income === "收入"
                ? prev + 0
                : prev + Number(next.money);
            }, 0),
            allOut: item?.reduce((prev, next) => {
              return next.is_income === "支出"
                ? prev + 0
                : prev + Number(next.money);
            }, 0),
            details: item,
          };
        });
        // 按照时间排序
        this.viewData = this.filterData.sort((a, b) => {
          const dateA = new Date(a.creatorTime).getTime();
          const dateB = new Date(b.creatorTime).getTime();
          return dateB - dateA;
        });
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    chartData() {
      let chartData = {
        series: [
          {
            name: "余额",
            color: "#2fc25b",
            data:
              this.income - this.expenditure > 0
                ? ((this.income - this.expenditure) / this.income).toFixed(2)
                : 0,
          },
        ],
      };

      this.opts.title.name = Math.round(chartData.series[0].data * 100) + "%";
      return chartData;
    },
  },
  onShow() {
    this.icon = getApp().globalData.icon;
    let nowDate = new Date();
    let reqRange = [];

    reqRange = this.$helper.getCurrentMonth(nowDate).map((item) => {
      return Date.parse(item);
    });

    // 获取当月所有账单信息
    this.getFinanceBill(reqRange);
  },
  onLoad() {
    let nowDate = new Date();
    let reqRange = [];

    reqRange = this.$helper.getCurrentMonth(nowDate).map((item) => {
      return Date.parse(item);
      // return new Date(item);
    });

    // 获取当月所有账单信息
    this.getFinanceBill(reqRange);
  },
  onReady() {},
};
</script>

<style lang="scss" scoped>
.finance-container {
  position: relative;
}
.finance {
  padding: 32rpx;
  min-height: 100vh;
  background-color: #f5f7fb;
  box-sizing: border-box;

  &-date {
    width: 100%;
    margin-bottom: 16rpx;

    &-time {
      display: flex;
      align-items: center;

      .time-icon {
        margin-left: 20rpx;
      }
    }
  }

  &-message {
    width: 100%;
    padding: 18rpx 32rpx;
    background: #5991fa;
    border-radius: 17rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    margin-bottom: 32rpx;

    &-left {
      &-header {
        margin-bottom: 16rpx;
        .title {
          height: 38rpx;
          font-size: 29rpx;
          line-height: 38rpx;
        }

        .number {
          height: 46rpx;
          font-size: 42rpx;
          font-weight: bold;
          line-height: 46rpx;
        }
      }

      &-footer {
        display: flex;

        .item {
          margin-right: 90rpx;

          &-title {
            height: 33rpx;
            font-size: 25rpx;
            line-height: 33rpx;
          }

          &-number {
            height: 42rpx;
            font-size: 33rpx;
            line-height: 42rpx;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    &-right {
      /* 请根据实际需求修改父元素尺寸，组件自动识别宽高 */
      .charts-box {
        width: 120rpx;
        height: 120rpx;
      }

      .all-btn {
        width: 129rpx;
        height: 46rpx;
        background: #ffffff;
        font-size: 25rpx;
        color: #5991fa;
        line-height: 46rpx;
        text-align: center;
        border-radius: 23rpx;

        &:active {
          background-color: #ccc;
        }
      }
    }
  }

  &-type {
    display: flex;
    justify-content: space-between;

    .type-left {
      width: 336rpx;
      height: 158rpx;
      position: relative;
      background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230828_9edf33521148483bbd48149554cb53e3.png");
      background-size: cover;
      display: flex;
      align-items: center;
    }

    .type-right {
      width: 336rpx;
      height: 158rpx;
      position: relative;
      background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230828_1208dacdbaf44bb79151d67c0a054adc.png");
      background-size: cover;
      display: flex;
      align-items: center;
    }

    .type-text {
      height: 50rpx;
      font-size: 33rpx;
      font-family: SourceHanSansCNVF-Bold, SourceHanSansCNVF;
      font-weight: bold;
      color: #ffffff;
      line-height: 50rpx;
      margin-left: 48rpx;
    }
  }

  &-list {
    width: 100%;
    padding-bottom: 80px;

    .tabs {
      margin-bottom: 22rpx;
    }

    .finance-details {
      width: 100%;

      &-item {
        padding: 16rpx;
        background-color: #fff;
        border-radius: 13rpx;
        margin-bottom: 20rpx;

        &-header {
          text {
            font-size: 25rpx;
            color: #999999;
            margin-left: 16rpx;

            &:first-child {
              margin-left: 0;
            }
          }

          .date-nickName {
            height: 58rpx;
            font-size: 33rpx;
            color: #000000;
            line-height: 58rpx;
          }
        }

        &-body {
          .body-content {
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #eee;
            padding: 22rpx 0;

            &:last-child {
              border: none;
            }

            &-left {
              display: flex;
              align-items: center;

              .content-left-icon {
                width: 66rpx;
                height: 66rpx;
                margin-right: 20rpx;

                & > image {
                  width: 100%;
                  height: 100%;
                }
              }

              .content-left-message {
                font-size: 29rpx;
                color: #333333;

                &-header {
                  > text {
                    margin-left: 16rpx;
                  }
                }

                text {
                  font-size: 25rpx;
                  color: #666666;
                }
              }
            }

            &-right {
              font-size: 38rpx;
              color: #333333;
            }
          }
        }
      }
    }
  }
}
.finance-tabbar {
  position: fixed;
  bottom: 0;
  width: 100vw;
  background-color: #ffffff;
  // padding-bottom: 30rpx;
  z-index: 10;
}
</style>
