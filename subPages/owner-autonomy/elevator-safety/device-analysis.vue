<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-14 12:30:41
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-18 15:44:04
 * @FilePath: /SmartPark/subPages/function/self-government/another/elevator-safety/device-analysis.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="device-analysis">
    <!-- 顶部安全区 -->
    <u-navbar
      bgColor="transparent"
      :placeholder="true"
      title="设备报表"
      :autoBack="true"
    >
    </u-navbar>

    <!-- 头部 -->
    <view class="device-analysis-header flex-a-center-j-space-around">
      <view class="device-analysis-header-left">
        <view class="device-analysis-header-left-score"><text>98</text>分</view>
        <view class="device-analysis-header-left-addr">社区电梯健康指数</view>
        <view>更新于{{ $u.timeFormat(Date.now(), "yyyy-mm-dd") }}</view>
      </view>
      <view class="device-analysis-header-right">
        <qiun-data-charts
          type="radar"
          :opts="optsRadar"
          :chartData="radarChartData"
          :animation="false"
        />
      </view>
    </view>

    <view class="device-analysis-score flex-a-center-j-space-around">
      <view>优秀：80-100分</view>
      <view>良好：60-80分</view>
      <view>一般：小于 60分 </view>
    </view>

    <view class="device-analysis-grid">
      <u-grid :border="false" col="2">
        <u-grid-item
          v-for="(baseListItem, baseListIndex) in baseList"
          :key="baseListIndex"
        >
          <view class="grid-item padding-24">
            <view class="grid-item-header flex-a-center">
              <image :src="baseListItem.imageUrl" mode="" />
              <view>{{ baseListItem.title }}</view>
            </view>
            <!-- <view class="grid-item-body">
              上月累计发生 <text>{{ baseListItem.onNumber }}次</text>
            </view> -->
            <view class="grid-item-footer">
              本月至今发生
              <text>{{ sleepy(baseListItem.title).length }}次</text>
            </view>
          </view>
        </u-grid-item>
      </u-grid>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
import { getRequestFilter } from "@/common/function";
export default {
  data() {
    return {
      // 雷达图数据
      radarChartData: {},
      // 雷达图配置
      optsRadar: {
        timing: "easeOut",
        duration: 1000,
        rotate: false,
        rotateLock: false,
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
        padding: [0, 0, 0, 0],
        fontSize: 10,
        fontColor: "#666666",
        dataLabel: false,
        dataPointShape: true,
        dataPointShapeType: "solid",
        touchMoveLimit: 60,
        enableScroll: false,
        enableMarkLine: false,
        legend: {
          show: false,
          position: "right",
          lineHeight: 25,
          float: "center",
          padding: 5,
          margin: 5,
          backgroundColor: "rgba(251,189,8,1)",
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 0,
          fontSize: 13,
          fontColor: "#666666",
          hiddenColor: "#CECECE",
          itemGap: 10,
        },
        extra: {
          radar: {
            gridType: "radar",
            gridColor: "#fff",
            gridCount: 1,
            opacity: 0.2,
            max: 20,
            labelShow: true,
            gridEval: 1,
            radius: 40,
            axisLabel: false,
            axisLabelTofix: 0,
            labelColor: "#fff",
            labelPointShow: false,
            labelPointRadius: 3,
            labelPointColor: "#CCCCCC",
            border: false,
            borderWidth: 2,
            linearType: "custom",
            customColor: ["#FA7D8D", "#EB88E2"],
          },
          tooltip: {
            showBox: true,
            showArrow: true,
            showCategory: false,
            borderWidth: 0,
            borderRadius: 0,
            borderColor: "#000000",
            borderOpacity: 0.7,
            bgColor: "#000000",
            bgOpacity: 0.7,
            gridType: "solid",
            dashLength: 4,
            gridColor: "#CCCCCC",
            boxPadding: 3,
            fontSize: 13,
            lineHeight: 20,
            fontColor: "#FFFFFF",
            legendShow: true,
            legendShape: "auto",
            splitLine: true,
            horizentalLine: false,
            xAxisLabel: false,
            yAxisLabel: false,
            labelBgColor: "#FFFFFF",
            labelBgOpacity: 0.7,
            labelFontColor: "#666666",
          },
        },
      },
      //  网格布局数据
      baseList: [
        {
          title: "电梯困人",
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230714_1c2c55dcafe048cca3b02cd211cac379.png",
        },
        {
          title: "轿厢异常晃动",
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230714_edab895356bf46f385255d769a40a2b1.png",
        },
        {
          title: "反复开关门",
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230714_2af9655718b84568aeae05bc432d8bcb.png",
        },
        {
          title: "关门超时",
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230714_2af9655718b84568aeae05bc432d8bcb.png",
        },
        {
          title: "电梯冲顶",
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230918_3d852046fc964cde97a5dca059a42adf.png",
        },
        {
          title: "电梯蹲底",
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230918_3d852046fc964cde97a5dca059a42adf.png",
        },
        {
          title: "突发停电",
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230918_75c799c9e8ee4b7f9061c04dbf964365.png",
          onNumber: 0,
          nowNumber: 10,
        },
      ],
      monthData: [],
      // 整理数据获取图标数组
      categories: [],
    };
  },

  methods: {
    sleepy(type) {
      return this.monthData.filter((item) => item.tooltileContent === type);
    },
    // 获取故障次数数组
    getErrorNumList(arr) {
      let a1 = 0;
      let a2 = 0;
      let a3 = 0;
      let a4 = 0;
      let a5 = 0;
      let a6 = 0;
      let a7 = 0;

      arr.forEach((item) => {
        if (item.tooltileContent === "轿厢异常晃动") {
          a1 += 1;
        }
        if (item.tooltileContent === "电梯冲顶") {
          a2 += 1;
        }
        if (item.tooltileContent === "关门超时") {
          a3 += 1;
        }
        if (item.tooltileContent === "电梯蹲底") {
          a4 += 1;
        }
        if (item.tooltileContent === "突发停电") {
          a5 += 1;
        }
        if (item.tooltileContent === "电梯困人") {
          a6 += 1;
        }
        if (item.tooltileContent === "反复开关门") {
          a7 += 1;
        }
      });
      this.categories = [a1, a2, a3, a4, a5, a6, a7];
    },
    // 获取所有故障信息
    async getAllErrorMessage(range) {
      let reqData = getRequestFilter({ creatorTime: range }, "range");
      const { data } = await getModelList("650009584b635d6996a93487", reqData);
      this.monthData = data?.list;
    },
  },
  watch: {
    monthData: {
      handler(val) {
        this.getErrorNumList(val);
        this.radarChartData = {
          categories: [
            "轿厢异常晃动",
            "电梯冲顶",
            "关门超时",
            "电梯蹲底",
            "突发停电",
            "维电梯困人",
            "反复开关门",
          ],
          series: [
            {
              name: "成交量1",
              data: this.categories,
            },
          ],
        };
      },
      deep: true,
    },
  },

  onLoad() {
    let nowDate = new Date();
    let reqRange = [];

    reqRange = this.$helper.getCurrentMonth(nowDate).map((item) => {
      return Date.parse(item);
      // return new Date(item);
    });
    this.getAllErrorMessage(reqRange);
  },
};
</script>

<style lang="scss" scoped>
%item {
  font-size: 28rpx;
  font-weight: bold;
  color: #333333;

  > text {
    font-size: 24rpx;
    margin-left: 10rpx;
  }
}

.device-analysis {
  position: relative;
  width: 100vw;
  color: #fff;

  &::after {
    position: absolute;
    content: "";
    top: 0;
    display: block;
    width: 100%;
    height: 690rpx;
    background: linear-gradient(
      180deg,
      #54d8a5 0%,
      rgba(125, 236, 194, 0.79) 92%,
      rgba(162, 255, 220, 0) 100%
    );
    // box-shadow: 0rpx 8rpx 6rpx 1rpx rgba(178, 178, 178, 0.16);
    z-index: -1;
  }

  &-header {
    height: 400rpx;
    margin: 0 auto;

    &-left {
      text-align: center;
      font-size: 24rpx;
      color: #ffffff;

      &-score {
        font-size: 32rpx;
        margin-bottom: 18rpx;

        > text {
          height: 124rpx;
          font-size: 110rpx;
          font-weight: bold;
          line-height: 124rpx;
        }
      }

      &-addr {
        height: 40rpx;
        font-size: 28rpx;

        line-height: 40rpx;
      }
    }

    &-right {
      width: 50vw;
      height: 400rpx;
    }
  }

  &-score {
    margin-bottom: 30rpx;
  }

  &-grid {
    .grid-item {
      width: 320rpx;
      height: 200rpx;
      background: #ffffff;
      box-shadow: 0rpx 6rpx 16rpx 1rpx rgba(214, 214, 214, 0.41);
      border-radius: 20rpx;
      margin-top: 20rpx;

      &-header {
        font-size: 32rpx;
        font-weight: bold;
        color: #35a584;
        margin-bottom: 18rpx;

        > image {
          width: 44rpx;
          height: 48rpx;
          margin-right: 18rpx;
        }
      }

      &-body {
        @extend %item;
      }

      &-footer {
        @extend %item;
      }
    }
  }
}
</style>
