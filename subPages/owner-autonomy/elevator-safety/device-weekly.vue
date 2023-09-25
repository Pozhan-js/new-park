<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-14 17:13:42
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-12 14:55:07
 * @FilePath: /SmartPark/subPages/function/self-government/another/elevator-safety/device-weekly.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE 
-->
<template>
  <view class="device-weekly">
    <view class="device-weekly-box1 padding-32">
      <view class="title">基本信息</view>
      <view class="score flex-a-center-j-space-between">
        <view>电梯总数： <text>60台</text> </view>
        <view>健康指数： <text>98分</text></view>
      </view>
      <view class="analysis">智能分析</view>
      <view>健康指标：优秀 超过了全国 <text class="fit">87%</text>的社区</view>
    </view>

    <view class="device-weekly-box2 padding-32">
      <!-- 故障排行统计 -->
      <view class="safety-statistics-ranking">
        <view class="safety-statistics-ranking-title">异常及故障统计</view>
        <view class="safety-statistics-ranking-chart padding-32">
          <qiun-data-charts type="bar" :opts="opts" :chartData="chartData" />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      chartData: {},
      //这里的 opts 是图表类型 type="bar" 的全部配置参数，您可以将此配置复制到 config-ucharts.js 文件中下标为 ['bar'] 的节点中来覆盖全局默认参数。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
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
        padding: [15, 30, 0, 5],
        fontSize: 13,
        fontColor: "#666666",
        dataLabel: true,
        dataPointShape: true,
        dataPointShapeType: "solid",
        touchMoveLimit: 60,
        enableScroll: false,
        enableMarkLine: false,
        legend: {
          show: false,
          position: "bottom",
          float: "center",
          padding: 5,
          margin: 5,
          backgroundColor: "rgba(0,0,0,0)",
          borderColor: "rgba(0,0,0,0)",
          borderWidth: 0,
          fontSize: 13,
          fontColor: "#666666",
          lineHeight: 11,
          hiddenColor: "#CECECE",
          itemGap: 10,
        },
        xAxis: {
          boundaryGap: "justify",
          disableGrid: true,
          min: 0,
          axisLine: true,
          disabled: true,
          axisLineColor: "#CCCCCC",
          calibration: true,
          fontColor: "#666666",
          fontSize: 13,
          lineHeight: 20,
          marginTop: 0,
          rotateLabel: false,
          rotateAngle: 45,
          itemCount: 5,
          splitNumber: 5,
          gridColor: "#CCCCCC",
          gridType: "solid",
          dashLength: 4,
          gridEval: 1,
          scrollShow: false,
          scrollAlign: "left",
          scrollColor: "#A6A6A6",
          scrollBackgroundColor: "#EFEBEF",
          title: "",
          titleFontSize: 13,
          titleOffsetY: 0,
          titleOffsetX: 0,
          titleFontColor: "#666666",
          format: "",
        },
        yAxis: {
          disabled: false,
          disableGrid: false,
          splitNumber: 5,
          gridType: "solid",
          dashLength: 8,
          gridColor: "#CCCCCC",
          padding: 30,
          showTitle: false,
          data: [
            // {
            //   // axisLine: false,
            //   calibration: true,
            // },
          ],
        },
        extra: {
          bar: {
            type: "group",
            width: 30,
            meterBorde: 1,
            meterFillColor: "#FFFFFF",
            activeBgColor: "#000000",
            activeBgOpacity: 0.08,
            seriesGap: 2,
            categoryGap: 3,
            barBorderCircle: true,
            linearType: "custom",
            linearOpacity: 1,
            colorStop: 0,
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
          markLine: {
            type: "solid",
            dashLength: 4,
            data: [],
          },
        },
      },
    };
  },
  onReady() {
    this.getServerData();
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: [
            "电梯困人",
            "电梯冲顶",
            "电梯蹲底",
            "轿厢异常晃动",
            "突发停电",
            "反复开关门",
            "关门超时",
          ],
          series: [
            {
              name: "统计值",
              data: [23, 62, 19, 23, 49, 34, 86],
            },
          ],
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.device-weekly {
  width: 100vw;
  min-height: 100vh;
  background-color: #7cd3a8;

  &::after {
    position: absolute;
    content: "";
    top: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230714_63b0496da60344f68f01d4c1e30be017.png");
    // box-shadow: 0rpx 8rpx 6rpx 1rpx rgba(178, 178, 178, 0.16);
    background-size: cover;
    z-index: -1;
  }

  &-box1 {
    margin: 0 32rpx;
    margin-top: 600rpx;
    height: 363rpx;
    background: #ffffff;
    box-shadow: 6rpx 0rpx 20rpx 0rpx #075a3a;
    border-radius: 20rpx;

    .title {
      height: 36rpx;
      font-size: 48rpx;
      font-weight: bold;
      color: #333333;
      line-height: 48rpx;
      text-align: center;
      margin-bottom: 32rpx;
    }

    .score {
      height: 48rpx;
      font-size: 28rpx;
      color: #333333;
      line-height: 48rpx;
      margin-bottom: 40rpx;

      > view {
        text {
          font-size: 38rpx;
          font-weight: bold;
        }
      }
    }

    .analysis {
      height: 48rpx;
      font-size: 26rpx;
      color: #f6492c;
      line-height: 48rpx;
    }

    .fit {
      font-size: 36rpx;
      padding: 0 20rpx;
    }
  }

  &-box2 {
    margin: 32rpx;
    background: #ffffff;
    box-shadow: 6rpx 0rpx 20rpx 0rpx #075a3a;
    border-radius: 20rpx;
  }
}
</style>
