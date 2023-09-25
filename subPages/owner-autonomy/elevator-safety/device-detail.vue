<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-13 16:35:40
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-18 12:34:44
 * @FilePath: /SmartPark/subPages/function/self-government/another/elevator-safety/device-detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="device-detail">
    <!-- 顶部安全区 -->
    <u-navbar
      bgColor="transparent"
      :placeholder="true"
      title="设备详情"
      :autoBack="true"
    >
    </u-navbar>

    <!-- 顶部图表 -->
    <!-- <view class="device-detail-header-chart">
      <view class="charts-box">
        <qiun-data-charts type="arcbar" :opts="opts" :chartData="chartData" />
      </view>
    </view> -->

    <!-- <view class="device-detail-application flex-a-center-j-space-around">
      <view class="application-item">
        <view class="application-item-title">实时监控</view>
        <view>实时梯内监控视频</view>
      </view>
      <view class="application-item">
        <view class="application-item-title">实时监控</view>
        <view>实时梯内监控视频</view>
      </view>
    </view> -->

    <!-- <view class="device-detail-message flex-a-center-j-space-around">
      <view class="device-detail-message-item flex-a-center-j-center">
        <view class="device-detail-message-item-content flex-a-center">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230712_cb238e23087946adb0f398aa5bf0cf55.png"
            mode=""
          />
          <view class="content-right">
            <view class="num">2264</view>
            <view>昨日乘梯人数</view>
          </view>
        </view>
      </view>
      <view class="device-detail-message-item flex-a-center-j-center">
        <view class="device-detail-message-item-content flex-a-center">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230712_467aa3be22224848a99991c76b6b2207.png"
            mode=""
          />
          <view class="content-right">
            <view class="num">2264</view>
            <view>昨日运行次数</view>
          </view>
        </view>
      </view>
    </view> -->

    <!-- <view class="device-detail-type flex-a-center-j-space-around">
      <view class="device-detail-type-item flex-a-center">
        <image
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230717_478c5fca65ba4e9ebfe5e4465797893d.png"
          mode=""
        />
        <view>异常日志</view>
      </view>
      <view class="device-detail-type-item flex-a-center">
        <image
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230717_19c62102406c4c69ba3e95b1291aeaa0.png"
          mode=""
        />
        <view>监控回放</view>
      </view>
    </view> -->

    <view class="device-detail-information padding-42">
      <view class="device-detail-information-item">
        <view class="item-header flex-a-center">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230714_2c9bab62b78e41969ad26ea69b32935c.png "
            mode=""
          />
          <view class="item-header-title">电梯基本信息</view>
        </view>

        <view class="item-content">
          <view class="item-content-data">
            安装位置: {{ detailData.installationLocation }}
          </view>
          <view class="item-content-data">
            电梯品牌: {{ detailData.elevatorBrand }}
          </view>
          <view class="item-content-data">
            电梯型号: {{ detailData.elevatorModel }}
          </view>
          <view class="item-content-data">
            设备种类: {{ detailData.equipmentType }}
          </view>
        </view>
      </view>
      <view class="device-detail-information-item">
        <view class="item-header flex-a-center">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230714_3675584d3d794a7ca198e787d525a319.png"
            mode=""
          />
          <view class="item-header-title">特种设备使用信息</view>
        </view>

        <view class="item-content">
          <view class="item-content-data">
            生产厂家: {{ detailData.manuFacturer }}
          </view>
          <view class="item-content-data">
            设备品种: {{ detailData.equipmentVariety }}
          </view>
          <view class="item-content-data">
            使用单位: {{ detailData.useUnit }}
          </view>
          <view class="item-content-data">
            单位内编号: {{ detailData.unitNumber }}
          </view>
          <view class="item-content-data">
            设备代码: {{ detailData.deviceCode }}
          </view>
          <view class="item-content-data">
            登记机关: {{ detailData.registrationAuthority }}
          </view>
          <view class="item-content-data">
            检验机构: {{ detailData.inspectionAgency }}
          </view>
          <view class="item-content-data">
            登记证编号: {{ detailData.registrationNumber }}
          </view>
          <view class="item-content-data">
            下次检验时间: {{ detailData.nextInspection }}
          </view>
          <view class="item-content-data">
            维保单位: {{ detailData.maintenanceUnit }}
          </view>
          <view class="item-content-data">
            救援电话: {{ detailData.rescueCall }}
          </view>
        </view>
      </view>
    </view>

    <!-- 图表 -->
    <!-- TODO :canvas2d="true" 添加属性解决图标层级过高 -->
    <!-- <view class="safety-footer-chart box">
      <view class="safety-footer-chart-title">昨日运行频率</view>
      <view class="safety-footer-chart-box">
        <qiun-data-charts
          type="area"
          :opts="optsDeviceFooter"
          :chartData="optsDeviceFooterData"
        />
      </view>
    </view> -->

    <!-- 底部图表 -->
    <view class="safety-statistics-footer box">
      <view class="safety-statistics-footer-title"> 年维保统计 </view>
      <view class="chart-box">
        <view class="chart-box-title flex-a-center-j-space-between">
          <view>维保次数</view>
          <view class="flex-a-center">
            <view class="margin-right-40">{{}}</view>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </view>
        <qiun-data-charts
          type="line"
          :opts="optsFooter1"
          :chartData="chartDataFooter1"
          :ontouch="true"
        />
      </view>
    </view>

    <!-- 底部图表 -->
    <view class="safety-statistics-footer box">
      <!-- <view class="safety-statistics-footer-title"> 2022年维保统计 </view> -->
      <view class="chart-box">
        <view class="chart-box-title flex-a-center-j-space-between">
          <view>维修次数</view>
          <view class="margin-right-40">{{}}</view>
          <u-icon name="arrow-right"></u-icon>
        </view>
        <qiun-data-charts
          type="area"
          :opts="optsFooter2"
          :chartData="chartDataFooter2"
          :ontouch="true"
        />
      </view>
    </view>
  </view>
</template>

<script>
import { getModelInfo } from "@/api";
export default {
  data() {
    return {
      //这里的 opts 是图表类型 type="arcbar" 的全部配置参数，您可以将此配置复制到 config-ucharts.js 文件中下标为 ['arcbar'] 的节点中来覆盖全局默认参数。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
        timing: "easeOut",
        duration: 1000,
        rotate: false,
        rotateLock: false,
        color: ["#1890FF"],
        padding: undefined,
        fontSize: 13,
        fontColor: "#666666",
        dataLabel: true,
        dataPointShape: true,
        dataPointShapeType: "solid",
        touchMoveLimit: 60,
        enableScroll: false,
        enableMarkLine: false,
        title: {
          name: "90",
          fontSize: 25,
          color: "#fff",
          offsetX: 0,
          offsetY: 0,
        },
        subtitle: {
          name: "分",
          fontSize: 12,
          color: "#fff",
          offsetX: 0,
          offsetY: 0,
        },
        extra: {
          arcbar: {
            type: "circle",
            width: 10,
            backgroundColor: "#ccc",
            startAngle: 1.5,
            // endAngle: 1,
            gap: 1,
            direction: "cw",
            lineCap: "round",
            centerX: 0,
            centerY: 0,
            linearType: "none",
          },
        },
      },
      // chartData: {},

      // // 底部
      // optsDeviceFooterData: {},

      // 底部图标折线图
      optsFooter1: {
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
        padding: [15, 10, 0, 15],
        fontSize: 13,
        fontColor: "#666666",
        dataLabel: true,
        dataPointShape: true,
        dataPointShapeType: "solid",
        touchMoveLimit: 60,
        enableScroll: false,
        enableMarkLine: false,
        legend: {
          show: true,
          position: "top",
          float: "right",
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
          disableGrid: true,
          disabled: false,
          axisLine: true,
          axisLineColor: "#CCCCCC",
          calibration: false,
          fontColor: "#666666",
          fontSize: 13,
          lineHeight: 20,
          marginTop: 0,
          rotateLabel: false,
          rotateAngle: 45,
          itemCount: 5,
          boundaryGap: "center",
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
          gridType: "dash",
          dashLength: 2,
          disabled: false,
          disableGrid: false,
          splitNumber: 3,
          gridColor: "#CCCCCC",
          padding: 10,
          showTitle: false,
          data: [
            {
              type: "value",
              position: "left",
              disabled: false,
              axisLine: true,
              axisLineColor: "#CCCCCC",
              calibration: false,
              fontColor: "#666666",
              fontSize: 13,
              textAlign: "right",
              title: "",
              titleFontSize: 13,
              titleOffsetY: 0,
              titleOffsetX: 0,
              titleFontColor: "#666666",
              min: 0,
              max: 9,
              tofix: 0,
              unit: "次",
              format: "",
            },
          ],
        },
        extra: {
          line: {
            type: "straight",
            width: 2,
            activeType: "hollow",
            linearType: "none",
            onShadow: true,
            animation: "vertical",
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
      chartDataFooter1: {},
      // 维修图标曲线图
      optsFooter2: {
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
        padding: [15, 15, 0, 15],
        fontSize: 13,
        fontColor: "#666666",
        dataLabel: true,
        dataPointShape: true,
        dataPointShapeType: "solid",
        touchMoveLimit: 60,
        enableScroll: false,
        enableMarkLine: false,
        legend: {
          show: true,
          position: "top",
          float: "right",
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
          disableGrid: true,
          disabled: false,
          axisLine: true,
          axisLineColor: "#CCCCCC",
          calibration: false,
          fontColor: "#666666",
          fontSize: 13,
          lineHeight: 20,
          marginTop: 0,
          rotateLabel: false,
          rotateAngle: 45,
          labelCount: 30,
          itemCount: 5,
          boundaryGap: "center",
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
          gridType: "dash",
          dashLength: 2,
          disabled: false,
          disableGrid: false,
          splitNumber: 3,
          gridColor: "#CCCCCC",
          padding: 10,
          showTitle: false,
          data: [
            {
              type: "value",
              position: "left",
              disabled: false,
              axisLine: true,
              axisLineColor: "#CCCCCC",
              calibration: false,
              fontColor: "#666666",
              fontSize: 13,
              textAlign: "right",
              title: "",
              titleFontSize: 13,
              titleOffsetY: 0,
              titleOffsetX: 0,
              titleFontColor: "#666666",
              min: 0,
              max: 9,
              tofix: null,
              unit: "次",
              format: "",
            },
          ],
        },
        extra: {
          area: {
            type: "curve",
            opacity: 0.2,
            addLine: true,
            width: 2,
            gradient: false,
            activeType: "hollow",
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
      chartDataFooter2: {},
      // 详情信息
      detailData: {},
    };
  },

  methods: {
    // 获取电梯详情信息
    async getDeviceDetailData(id) {
      const { data } = await getModelInfo("650428760538024e9740e16c", id);
      this.detailData = data;
      // 获取维修数据
      this.chartDataFooter1 = {
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
            name: "维修次数",
            data:
              this.detailData.yearMaintainance?.map((item) => Number(item)) ||
              [],
          },
        ],
      };
      // 获取保养次数
      this.chartDataFooter2 = {
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
            name: "维修次数",
            data:
              this.detailData.yearRepairs?.map((item) => Number(item)) || [],
          },
        ],
      };
    },
  },
  onReady() {},
  async onLoad(option) {
    this.getDeviceDetailData(option.id);
  },
};
</script>

<style lang="scss" scoped>
.device-detail {
  position: relative;
  width: 100vw;

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
      rgba(125, 236, 194, 0.79) 82%,
      rgba(162, 255, 220, 0) 100%
    );
    box-shadow: 0rpx 8rpx 6rpx 1rpx rgba(178, 178, 178, 0.16);
    z-index: -1;
  }

  &-header-chart {
    margin: 32rpx auto;
    display: flex;
    justify-content: center;

    .charts-box {
      width: 232rpx;
      height: 232rpx;
    }
  }

  &-application {
    font-size: 24rpx;
    color: #ffffff;
    margin-bottom: 40rpx;

    .application-item {
      &-title {
        font-size: 32rpx;
        text-align: center;
      }
    }
  }

  &-message {
    &-item {
      width: 320rpx;
      height: 143rpx;
      background: #ffffff;
      box-shadow: 0rpx 6rpx 16rpx 1rpx rgba(214, 214, 214, 0.41);
      border-radius: 20rpx;

      &-content {
        > image {
          width: 52rpx;
          height: 56rpx;
          margin-right: 20rpx;
        }

        .content-right {
          > view {
            font-size: 24rpx;
            color: #666666;
          }

          .num {
            font-size: 32rpx;
            color: #333333;
          }
        }
      }
    }
  }

  &-type {
    margin-top: 32rpx;

    &-item {
      font-size: 28rpx;
      color: #333333;

      > image {
        width: 74rpx;
        height: 68rpx;
        margin-right: 20rpx;
      }
    }
  }

  &-information {
    margin: 32rpx;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 16rpx 1rpx rgba(214, 214, 214, 0.41);
    border-radius: 20rpx 20rpx 20rpx 20rpx;

    &-item {
      padding: 26rpx 0;
      border-bottom: 1px solid #eee;

      .item-header {
        > view {
          font-size: 32rpx;
          font-weight: 800;
          color: #333333;
        }

        > image {
          width: 46rpx;
          height: 46rpx;
          margin-right: 20rpx;
        }
      }

      .item-content {
        margin-top: 20rpx;
        font-size: 28rpx;
        color: #666666;
        &-data {
          margin-top: 10rpx;
        }
      }
    }
  }

  .safety-footer-chart {
    margin-bottom: 100rpx;

    &-title {
      margin-bottom: 30rpx;
      height: 46rpx;
      font-size: 32rpx;
      font-weight: 800;
      color: #333333;
      line-height: 46rpx;
    }

    &-box {
    }
  }

  .safety-statistics-footer {
    color: #333333;
    margin-top: 96rpx;

    &-title {
      height: 45rpx;
      font-size: 32rpx;
      font-weight: 800;
      color: #333333;
      line-height: 45rpx;
      margin-bottom: 30rpx;
    }

    .chart-box {
      &-title {
        > view {
          height: 40rpx;
          font-size: 28rpx;
          font-weight: bold;
          color: #333333;
          line-height: 40rpx;
        }
      }
    }
  }
}
</style>
