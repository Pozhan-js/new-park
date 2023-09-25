<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-14 16:05:36
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-18 21:25:46
 * @FilePath: /SmartPark/subPages/function/self-government/another/elevator-safety/device-warning.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="device-warning box-all">
    <!-- 头部 -->
    <view class="device-warning-header flex-a-center-j-space-between">
      <view
        class="device-warning-header-item padding-20"
        v-for="item in headerList"
        :key="item.title"
        :style="{
          backgroundImage: `url(${item.imageUrl})`,
          backgroundSize: '100% 100%',
        }"
      >
        <view class="item-title">{{ item.title }}</view>
        <view class="item-num">{{ item.num }}</view>
      </view>
    </view>

    <!-- 进度条 -->
    <view class="device-warning-progress">
      <view
        class="device-warning-progress-header flex-a-center-j-space-between"
      >
        <view class="title">本月保养进度</view>
        <view class="num"
          >本月保养梯量 <text>{{ warringData.monthNeed }}</text></view
        >
      </view>
      <view class="device-warning-progress-box">
        <view class="box-title"
          >计划进度 <text>已保养{{ warringData.monthHas }}台</text></view
        >
        <u-line-progress
          :percentage="
            ((warringData.monthHas / warringData.monthNeed) * 100).toFixed(2)
          "
          activeColor="#54D8A5"
          height="18"
        ></u-line-progress>
      </view>
      <!-- <view class="device-warning-progress-box">
        <view class="box-title-future">实际进度 <text>已保养48台</text></view>
        <u-line-progress
          :percentage="50"
          activeColor="#F89A48"
          height="18"
        ></u-line-progress>
      </view> -->
    </view>

    <!-- 临近维保期信息 -->
    <view class="device-warning-message">
      <view class="device-warning-message-title">临近维保到期</view>
      <view
        class="device-warning-message-item padding-20"
        v-for="detail in detailAllData"
        :key="detail._id"
      >
        <view class="item-body">
          <view>[长江友邻] - {{ detail.installationLocation }}</view>
          <view class="item-body-detail">保养人员:{{ detail.personnel }}</view>
          <view
            >计划保养时间:
            {{ $u.timeFormat(detail.nextInspection, "yyyy-mm-dd") }}</view
          >
        </view>
        <view class="item-footer flex-a-center-j-space-between">
          <view class="item-footer-time">{{
            lastTime(detail.nextInspection)
          }}</view>
          <view class="item-footer-clock flex-a-center">
            <u-icon name="clock"></u-icon>
            <view>待保养</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 底部图标 -->
    <!-- 底部图表 -->
    <view class="safety-statistics-footer box">
      <view class="safety-statistics-footer-title"> 2022年维保统计 </view>
      <view class="chart-box">
        <view class="chart-box-title flex-a-center-j-space-between">
          <view>维修次数</view>
          <!-- <view>15687 > </view> -->
        </view>
        <qiun-data-charts
          type="line"
          :opts="optsFooter1"
          :chartData="chartDataFooter2"
          :ontouch="true"
        />
      </view>
    </view>

    <!-- 底部图表 -->
    <view class="safety-statistics-footer box">
      <!-- <view class="safety-statistics-footer-title"> 2022年维保统计 </view> -->
      <view class="chart-box">
        <view class="chart-box-title flex-a-center-j-space-between">
          <view>保养次数</view>
          <!-- <view>17 > </view> -->
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
import { getModelList } from "@/api";
// import { getRequestFilter } from "@/common/function";
export default {
  data() {
    return {
      headerList: [
        {
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230712_27c9740ea874472e87058571ff46bc82.png",
          title: "电梯总数",
          num: 0,
        },
        {
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230712_c210d66fcbcf4ab1865a9fe5b7f3d7c2.png",
          title: "临近到期",
          num: 0,
        },
        {
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230712_8b3b33821a9f41b5ba6c8a6de4c2c4e2.png",
          title: "正常维保",
          num: 0,
        },
      ],
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
      warringData: {},
      detailAllData: [],
    };
  },
  methods: {
    getServerFooterData1() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
          series: [
            {
              name: "维修次数",
              data: [0, 3, 5, 7, 4, 3],
            },
          ],
        };
        this.chartDataFooter1 = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    getServerFooterData2() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
          series: [
            {
              name: "保养次数",
              data: [0, 3, 5, 7, 4, 3],
            },
          ],
        };
        this.chartDataFooter2 = JSON.parse(JSON.stringify(res));
      }, 500);
    },

    lastTime(time) {
      if (time - Date.now() > 0) {
        if (Math.floor((time - Date.now()) / 1000 / 60 / 60 / 24) > 30) {
          return "";
        } else if (Math.floor((time - Date.now()) / 1000 / 60 / 60 / 24) < 30) {
          return `临近维保日期还有${Math.floor(
            (time - Date.now()) / 1000 / 60 / 60 / 24
          )}天`;
        }
      } else {
        return `已超过维保日期${Math.floor(
          (Date.now() - time) / 1000 / 60 / 60 / 24
        )}`;
      }
    },

    async getWarringData() {
      const { data } = await getModelList("6506ca690538024e9740e26c");
      console.log(data);
      this.warringData = data?.list[0];
      this.headerList = this.headerList?.map((item) => {
        if (item.title == "电梯总数") {
          item.num = this.warringData?.deviceAll;
        }
        if (item.title == "临近到期") {
          item.num = Math.floor(
            (this.warringData?.dateOut - Date.now()) / 1000 / 60 / 60 / 24
          );
        }
        if (item.title == "正常维保") {
          item.num = this.warringData?.normalNum;
        }
        return item;
      });
    },
    //请求所有电梯详情数据详情
    async getAllDetailList() {
      const { data } = await getModelList("650428760538024e9740e16c");
      this.detailAllData = data?.list.filter((item) => {
        console.log(
          Math.floor((item.nextInspection - Date.now()) / 1000 / 60 / 60 / 24)
        );
        return (
          Math.floor((item.nextInspection - Date.now()) / 1000 / 60 / 60 / 24) <
          30
        );
      });
    },
  },

  onReady() {
    this.getServerFooterData1();

    this.getServerFooterData2();
  },
  onLoad() {
    this.getWarringData();
    this.getAllDetailList();
  },
};
</script>

<style lang="scss" scoped>
.device-warning {
  width: 100vw;
  color: #ffffff;
  padding-bottom: 100rpx;

  &-header {
    width: 100%;
    margin-bottom: 36rpx;

    &-item {
      width: 210rpx;
      height: 240rpx;
      //   background: #ffffff;
      border-radius: 20rpx;

      .item-title {
        height: 38rpx;
        font-size: 26rpx;
        line-height: 38rpx;
      }

      .item-num {
        height: 70rpx;
        font-size: 50rpx;
        font-weight: 800;
        line-height: 70rpx;
      }
    }
  }

  &-progress {
    color: #333;
    margin-bottom: 40rpx;

    &-header {
      font-size: 28rpx;
      margin-bottom: 20rpx;

      .title {
        height: 46rpx;
        font-size: 32rpx;
        font-weight: 800;
        line-height: 46rpx;
      }

      .num {
        height: 46rpx;
        font-size: 24rpx;
        line-height: 46rpx;

        > text {
          font-size: 36rpx;
          font-weight: 800;
        }
      }
    }

    &-box {
      margin-bottom: 20rpx;

      .box-title {
        margin-bottom: 8rpx;
        height: 40rpx;
        font-size: 28rpx;
        color: #54d8a5;
        line-height: 40rpx;

        > text {
          color: #333333;
        }
      }

      .box-title-future {
        margin-bottom: 8rpx;
        height: 40rpx;
        font-size: 28rpx;
        color: #f89a48;
        line-height: 40rpx;

        > text {
          color: #333333;
        }
      }
    }
  }

  &-message {
    color: #333333;
    margin-bottom: 32rpx;

    &-title {
      height: 46rpx;
      font-size: 32rpx;
      font-weight: 800;
      color: #333333;
      line-height: 46rpx;
      margin-bottom: 30rpx;
    }

    &-item {
      height: 228rpx;
      background: #ffffff;
      box-shadow: 0rpx 6rpx 16rpx 1rpx rgba(214, 214, 214, 0.41);
      border-radius: 20rpx;

      .item-body {
        > view {
          height: 40rpx;
          font-size: 28rpx;
          font-weight: 800;
          color: #333333;
          line-height: 40rpx;
          margin-bottom: 6rpx;
        }
        .item-body-detail {
          font-size: 24rpx;
          color: #999999;
        }
      }

      .item-footer {
        &-time {
          // width: 120rpx;
          height: 44rpx;
          background: #ff3333;
          border-radius: 25rpx;
          line-height: 44rpx;
          text-align: center;
          font-size: 24rpx;
          color: #ffff;
          padding: 0 20rpx;
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
