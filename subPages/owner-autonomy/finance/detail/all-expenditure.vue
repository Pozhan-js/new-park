<template>
  <view class="income-bill container">
    <view class="income-bill-header">
      <view>
        <view class="income-title">支出明细</view>
        <view class="income-user">账户支出</view>
        <view class="income-number">¥ {{ allOut }}</view>
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
            <view
              style="font-size: 34rpx; color: #fb8753; margin-right: 20rpx"
              >{{ currentYear }}</view
            >
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
            <u-col textAlign="center" span="4">
              <view class="demo-layout">日期</view>
            </u-col>

            <u-col textAlign="center" span="4">
              <view class="demo-layout">用途</view>
            </u-col>

            <u-col textAlign="center" span="4">
              <view class="demo-layout">支出</view>
            </u-col>
          </u-row>
        </view>

        <LoadList
          modelId="64ec4d02d85a4b7b32ec6019"
          :paginationData="{ currentPage: 1, pageSize: 10 }"
          :params="reqParams"
        >
          <template v-slot="{ list }">
            <view
              class="table-item"
              :style="{
                'border-bottom': i === list.length - 1 ? 'none' : '',
              }"
              v-for="(data, i) in list"
              :key="i"
              @click="handleToBillDetail(data)"
            >
              <u-row>
                <u-col textAlign="center" span="4">
                  <view class="demo-item flex-center">{{
                    $u.timeFormat(data.creatorTime, "mm月dd日")
                  }}</view>
                </u-col>

                <u-col textAlign="center" span="4">
                  <view class="demo-item flex-center">{{
                    data.consumption_type
                  }}</view>
                </u-col>

                <u-col textAlign="center" span="4">
                  <view class="demo-item flex-center">
                    <view class="number">-{{ data.money.toFixed(2) }}</view>
                    <view class="demo-icon-right">
                      <u-icon name="arrow-right" color="#2979ff" size="16">
                      </u-icon>
                    </view>
                  </view>
                </u-col>
              </u-row>
            </view>
            <u-gap height="50"></u-gap>
          </template>
        </LoadList>

        <!-- <view class="table-list" v-if="viewDataList.length">
          <view
            class="table-item"
            v-for="(data, index) in viewDataList"
            @click="handleToBillDetail(data._id)"
            :key="index"
          >
            <u-row>
              <u-col textAlign="center" span="4">
                <view class="demo-item">{{
                  $u.timeFormat(data.creatorTime, "mm月dd日")
                }}</view>
              </u-col>

              <u-col textAlign="center" span="4">
                <view class="demo-item">{{ data.consumption_type }}</view>
              </u-col>

              <u-col textAlign="center" span="4">
                <view class="demo-item">
                  <view class="number">-{{ data.money.toFixed(2) }}</view>
                  <view class="demo-icon-right">
                    <u-icon name="arrow-right" color="#2979ff" size="16">
                    </u-icon>
                  </view>
                </view>
              </u-col>
            </u-row>
          </view>
        </view>

        <view v-else>
          <u-empty
            mode="data"
            icon="http://cdn.uviewui.com/uview/empty/data.png"
          >
          </u-empty>
        </view> -->
      </view>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
import infoMixin from "@/common/mixins/info";
import LoadList from "@/components/load-list/load-list.vue";
import { getRequestFilter } from "@/common/function"; // 加载 LoadList 组件
export default {
  mixins: [infoMixin],
  components: {
    LoadList, // 注册 LoadList 组件
  },
  data() {
    return {
      date: uni.$u.timeFormat(new Date(), "yyyy-mm-dd"),
      currentYear: new Date().getFullYear(),
      // 接收请求参数
      billList: [],
    };
  },
  methods: {
    // 时间选择器
    bindDateChange(e) {
      this.filterDate(e.detail.value);
      this.currentYear = e.detail.value;
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
        // creatorUserId: this.userInfo.id,
        is_income: "支出",
        status: 1,
      });
      const { data } = await getModelList("64ec4d02d85a4b7b32ec6019", reqData);
      this.billList = data?.list;
    },

    handleToBillDetail({ _id }) {
      uni.navigateTo({
        url: `/subPages/owner-autonomy/finance/detail/detail?id=${_id}`,
      });
    },
  },
  computed: {
    rangeYear() {
      let start = Date.parse(`${this.currentYear}-01-01 00:00:00`);
      let end = Date.parse(`${this.currentYear}-12-31 23:59:59`);
      return [start, end];
    },
    reqParams() {
      return getRequestFilter({
        creatorTime: this.rangeYear,
        is_income: "支出",
        status: 1,
      });
    },

    allOut() {
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
    height: calc(100vh - 230px);
    box-sizing: border-box;
    overflow: hidden;
    background-color: #fff;
    border-radius: 16rpx;

    .table {
      height: 100%;

      &-header {
        padding: 20rpx 0;
        border-bottom: 1px solid #eee;
      }

      &-item {
        border-bottom: 1px solid #eee;

        .demo-item {
          width: 100%;
          height: 42rpx;
          font-size: 30rpx;
          color: #555555;
          line-height: 42rpx;
          padding: 30rpx 0;

          position: relative;

          .demo-icon-right {
            position: absolute;
            right: 10rpx;
          }
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
  padding: 30rpx 0;
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
