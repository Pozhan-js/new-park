<template>
  <view class="user-container">
    <view class="user-header">
      <u-navbar title="我的财务" bgColor="transparent" :placeholder="true">
        <view slot="left">
          <view></view>
        </view>
      </u-navbar>

      <view class="user-header-message">
        <view class="user-icon">
          <u-avatar size="140rpx" :src="avatar"></u-avatar>
        </view>
        <view class="user-message">
          <view>{{ realName }}</view>
        </view>
      </view>

      <!-- 具体内容 -->
      <view class="user-content">
        <view class="user-content-title">
          <view class="user-content-title-left">
            <view class="day-num">{{ allDays }}</view>
            <view>记账总天数</view>
          </view>
          <view class="user-content-title-right">
            <view class="day-num">{{ myDataList.length }}</view>
            <view>记账总笔数</view>
          </view>
        </view>
        <view class="user-content-card">
          <view class="user-content-card-title">
            <view class="text">我的账户</view>
            <u-icon name="eye" color="#fff"></u-icon>
          </view>

          <view class="user-content-card-center">
            <view class="center-item">
              <view>总支出</view>
              <view class="center-num">{{
                addCommas(myAllOutOrIn.outMoney.toFixed(2))
              }}</view>
            </view>
            <view class="center-item">
              <view>总收入</view>
              <view class="center-num">{{
                addCommas(myAllOutOrIn.inMoney.toFixed(2))
              }}</view>
            </view>
          </view>

          <view class="user-content-card-bottom">
            <view>结余</view>
            <view>
              <!-- #7587ef -->
              <u-line-progress
                :percentage="
                  (
                    ((myAllOutOrIn.inMoney - myAllOutOrIn.outMoney) * 100) /
                    myAllOutOrIn.inMoney
                  ).toFixed(2)
                "
                height="8"
                inactiveColor="#7587ef"
                activeColor="#59bb73"
              ></u-line-progress>
            </view>
          </view>
        </view>
      </view>

      <!-- 功能列表 -->
      <view class="user-list">
        <view class="user-list-item" @click="handleUserAddRecord">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230901_e38ce62565b14822aa624eafd9fead1d.png"
          />
          <view class="item-context">
            <view>新增费用报销</view>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </view>
        <view class="user-list-item" @click="handleFlow">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230901_c6873333373547f1bc58c24825bdee40.png"
          />
          <view class="item-context">
            <view>我的收支明细清单</view>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </view>
      </view>
    </view>

    <view class="financial-user-tabbar">
      <Tabbar :type="tabbarType"></Tabbar>
    </view>
  </view>
</template>

<script>
import infoMixin from "@/common/mixins/info";
import { getRequestFilter } from "@/common/function";
import { getModelList } from "@/api";
import Tabbar from "../../components/government-tabbar.vue";

export default {
  mixins: [infoMixin],

  data() {
    return {
      tabbarType: "我的",
      myDataList: [],
    };
  },
  computed: {
    // 总记账天数
    allDays() {
      return Math.floor(
        (this.myDataList[this.myDataList.length - 1]?.creatorTime -
          this.myDataList[0]?.creatorTime) /
          (1000 * 60 * 60 * 24)
      );
    },
    // 我的总支出
    myAllOutOrIn() {
      let ourArr = this.myDataList.filter((item) => {
        return item.is_income === "支出";
      });
      let inArr = this.myDataList.filter((item) => {
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
    // 总收入
  },
  components: {
    Tabbar,
  },
  methods: {
    handleUserAddRecord() {
      uni.navigateTo({
        url: `/subPages/owner-autonomy/finance/detail/edit-add`,
      });
    },
    handleToAllBill() {
      uni.navigateTo({
        url: "/subPages/function/self-government/finance/all-bills/all-bills",
      });
    },
    handleFlow() {
      uni.navigateTo({
        url: "/subPages/owner-autonomy/finance/detail/my-bill",
      });
    },
    addCommas(number) {
      let parts = number.toString().split(".");
      let left = parts[0];
      if (left.length <= 3) {
        return parts.length > 1 ? left + "." + parts[1] : left;
      }
      let result = "";
      while (left.length > 3) {
        result = "," + left.slice(-3) + result;
        left = left.slice(0, -3);
      }
      result = left + result;
      return parts.length > 1 ? result + "." + parts[1] : result;
    },
  },
  async onShow() {
    // 请求所有自己创建的清单
    try {
      // 获取过滤参数
      let filterData = getRequestFilter({
        creatorUserId: this.userInfo.id,
        status: 1,
      });
      const { data } = await getModelList(
        "64ec4d02d85a4b7b32ec6019",
        filterData
      );
      this.myDataList = data?.list.sort((a, b) => {
        return a.creatorTime - b.creatorTime;
      });
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style lang="scss" scoped>
.user-container {
  position: relative;
  width: 100vw;

  .user-header {
    width: 100%;
    height: 500rpx;
    background: linear-gradient(
      180deg,
      rgba(165, 177, 255, 0.6) 0%,
      rgba(177, 188, 255, 0.01) 100%
    );
    border-radius: 0rpx 0rpx 0rpx 0rpx;
    opacity: 1;

    &-message {
      display: flex;
      align-items: center;
      padding-left: 52rpx;
      box-sizing: border-box;
      margin: 30rpx 0;

      .user-icon {
        margin-right: 20rpx;
      }

      .user-message {
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;

        .user-day {
          font-size: 20rpx;
          color: #666;
        }
      }
    }
  }

  .user-content {
    overflow: hidden;
    color: #fff;

    &-title {
      display: flex;
      justify-content: space-around;
      text-align: center;
      margin-bottom: 22rpx;

      > view {
        font-size: 22rpx;
        font-weight: 400;
        color: #333333;
      }

      .day-num {
        font-size: 30rpx;
        font-weight: bold;
        color: #333333;
      }
    }

    &-card {
      padding: 22rpx 32rpx;
      box-sizing: border-box;
      margin: 20rpx;
      // height: 274rpx;
      background-color: #6377f5;
      box-shadow: 0rpx 6rpx 18rpx 1rpx rgba(44, 65, 194, 0.38);
      border-radius: 15rpx;
      margin-bottom: 28rpx;

      &-title {
        display: flex;
        align-items: center;
        margin-bottom: 20rpx;

        .text {
          font-size: 32rpx;
          font-weight: bold;
          color: #ffffff;
          margin-right: 20rpx;
        }
      }

      &-center {
        display: flex;
        justify-content: space-between;
        margin-bottom: 20rpx;
        // text-align: center;

        .center-item {
          margin-right: 50rpx;
          font-size: 22rpx;

          .center-num {
            font-size: 42rpx;
            font-weight: bold;
          }
        }
      }

      &-bottom {
        margin-bottom: 20rpx;
      }
    }
  }

  .user-list {
    height: 421rpx;
    background: #ffffff;
    border-radius: 20rpx;
    opacity: 1;
    margin: 20rpx;

    box-sizing: border-box;

    &-item {
      display: flex;
      align-items: center;
      padding: 30rpx 0;
      margin: 0 30rpx;
      border-bottom: 1rpx solid #eeeeee;

      > image {
        width: 36rpx;
        height: 30rpx;
        margin-right: 20rpx;
      }

      .item-context {
        display: flex;
        width: 100%;
        justify-content: space-between;

        > view {
          height: 45rpx;
          font-size: 32rpx;
          font-weight: bold;
          color: #333333;
          line-height: 45rpx;
        }
      }

      &:last-child {
        border: none;
      }
    }
  }

  .financial-user-tabbar {
    position: fixed;
    bottom: 0;
    width: 100vw;
    background-color: #ffffff;
    // padding-bottom: 30rpx;
    z-index: 9000;
  }
}
</style>
