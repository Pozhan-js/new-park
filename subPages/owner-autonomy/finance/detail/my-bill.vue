<template>
  <view class="flow-details">
    <view class="flow-details-tab">
      <u-tabs
        :list="list1"
        :scrollable="false"
        :itemStyle="{ fontSize: '34rpx', height: '40px' }"
        @click="handleClickTab"
        lineWidth="30"
      ></u-tabs>
    </view>

    <view class="flow-details-container">
      <view
        class="flow-details-container-box"
        v-for="(item, _) in viewData"
        :key="_"
      >
        <view class="flow-details-container-item" v-if="item.details.length">
          <view class="item-header">
            <view class="item-header-date">
              <text class="day">{{ item.time }}</text>
              <!-- <text class="day-time">{{ data.time.timeDate }}</text> -->
            </view>
            <view class="item-header-money">
              <text>支出 ¥{{ item.allIn }}</text>
              <text>收入 ¥{{ item.allOut }}</text>
            </view>
          </view>
          <view class="item-content">
            <view
              class="item-content-data"
              v-for="data in item.details"
              @click="handleToBillDetail(data._id)"
              :key="data._id"
            >
              <view class="item-content-data-left">
                <image :src="icon[data.consumption_type]" mode="" />
                <view class="left-message">
                  <view>
                    <text class="title">{{ data.consumption_type }}</text>
                  </view>
                  <view>
                    <text>{{ data.consumption_info }}</text>
                  </view>
                </view>
              </view>
              <view class="item-content-data-right">{{
                (data.is_income === "收入" ? "+" : "-") +
                Number(data.money).toFixed(2)
              }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import infoMixin from "@/common/mixins/info";
import { getRequestFilter } from "@/common/function";
import { getModelList } from "@/api";
export default {
  mixins: [infoMixin],
  data() {
    return {
      list1: [
        {
          name: "所有",
        },
        {
          name: "收入",
        },
        {
          name: "支出",
        },
      ],
      detailList: [],
      // 获取过滤参数
      filterData: [],
      viewData: [],
      icon: {},
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
    // 跳转到账单详情
    handleToBillDetail(id) {
      uni.navigateTo({
        url: `/subPages/owner-autonomy/finance/detail/detail?id=${id}`,
      });
    },
  },
  watch: {
    detailList: {
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
          // 获取当前时间
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
        this.viewData = this.filterData?.sort((a, b) => {
          const dateA = new Date(a.creatorTime).getTime();
          const dateB = new Date(b.creatorTime).getTime();
          return dateB - dateA;
        });
      },
      deep: true,
      immediate: true,
    },
  },
  onShow() {
    this.icon = getApp().globalData.icon;
  },
  async onLoad(option) {
    // 请求所有自己创建的清单
    let filterData = {};
    if (!option.month) {
      filterData = getRequestFilter({ creatorUserId: this.userInfo.id });
    } else {
      let date = new Date(option.year, option.month);
      date.setDate(1); // 设置为1号
      let timestamp = date.getTime();
      // 获取时间范围
      let range = this.$helper.getCurrentMonth(timestamp).map((item) => {
        return Date.parse(item);
      });
      filterData = getRequestFilter({
        creatorUserId: this.userInfo.id,
        creatorTime: range,
      });
    }
    try {
      // 获取过滤参数
      const { data } = await getModelList(
        "64ec4d02d85a4b7b32ec6019",
        filterData
      );
      this.detailList = data?.list;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.flow-details {
  width: 100vw;
  height: 100vh;
  background: #f8f9fd;
  overflow: hidden;

  &-tab {
    margin-bottom: 28rpx;
  }

  &-container {
    width: 100vw;
    height: calc(100vh - 108rpx);
    overflow: auto;
    background: #f8f9fd;
    padding: 0 26rpx;
    box-sizing: border-box;

    &-item {
      width: 100%;
      background: #ffffff;
      border-radius: 10rpx;
      padding: 28rpx;
      box-sizing: border-box;
      margin-bottom: 20rpx;

      .item-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 28rpx;

        .item-header-date {
          display: flex;
          align-items: center;

          .day {
            font-size: 32rpx;
            color: #333333;
            font-weight: 500;
            margin-right: 40rpx;
          }

          .day-time {
            font-size: 24rpx;
            color: #999999;
            margin-left: 10rpx;
          }
        }

        .item-header-money {
          display: flex;
          align-items: center;

          text {
            font-size: 24rpx;
            color: #999999;
            margin-left: 22rpx;
          }
        }
      }

      .item-content {
        &-data {
          padding: 24rpx 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #eee;

          &-left {
            display: flex;
            justify-content: space-between;
            align-items: center;

            > image {
              width: 69rpx;
              height: 69rpx;
              margin-right: 28rpx;
            }

            .left-message {
              .title {
                height: 40rpx;
                font-size: 30rpx;
                color: #333333;
                line-height: 40rpx;
              }

              .pay-time {
                color: #999999;
              }

              text {
                height: 32rpx;
                font-size: 24rpx;
                color: #666666;
                line-height: 32rpx;
                margin-right: 24rpx;
              }
            }
          }

          &-right {
            height: 50rpx;
            font-size: 36rpx;
            font-weight: bold;
            color: #333333;
            line-height: 50rpx;
          }
        }
      }
    }
  }
}
</style>
