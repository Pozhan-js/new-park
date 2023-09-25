<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-12 15:28:44
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-18 17:16:11
 * @FilePath: /SmartPark/subPages/function/self-government/another/elevator-safety/safety-statistics.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="safety-statistics">
    <!-- 顶部导航 -->
    <u-navbar bgColor="#fff" :placeholder="true" title="统计">
      <view slot="left"></view>
    </u-navbar>

    <view
      class="safety-statistics-header flex-a-center-j-space-between padding-20"
    >
      <view
        class="safety-statistics-header-item padding-20"
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

    <!-- 故障排行统计 -->
    <view class="safety-statistics-ranking">
      <view class="safety-statistics-ranking-title">异常及故障统计</view>
      <view class="safety-statistics-ranking-chart padding-32">
        <qiun-data-charts type="bar" :opts="opts" :chartData="chartData" />
      </view>
    </view>

    <!-- 年度记录统计 -->
    <!-- <view class="safety-statistics-yesterday">
      <view
        class="safety-statistics-yesterday-item flex-a-center-j-space-between padding-26"
      >
        <image
          style="width: 66rpx; height: 72rpx"
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230712_cb238e23087946adb0f398aa5bf0cf55.png"
        ></image>
        <view class="item-message">
          <view class="item-message-num">14534</view>
          <view>2023年总乘梯人数</view>
        </view>
        <view class="item-chart">
          <view class="item-chart-box">
            <qiun-data-charts
              type="area"
              :opts="optsChart2"
              :chartData="minChartData"
            />
          </view>
          <view>每月乘梯人数涨幅</view>
        </view>
      </view>
      <view
        style="background: #fff0e9"
        class="safety-statistics-yesterday-item flex-a-center-j-space-between padding-26"
      >
        <image
          style="width: 66rpx; height: 72rpx"
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230712_467aa3be22224848a99991c76b6b2207.png"
        ></image>
        <view class="item-message">
          <view class="item-message-num">14534</view>
          <view>2023年总运行次数</view>
        </view>
        <view class="item-chart">
          <view class="item-chart-box">
            <qiun-data-charts
              type="area"
              :opts="optsChart1"
              :chartData="minChartData"
            />
          </view>
          <view>每月运行次数涨幅</view>
        </view>
      </view>
    </view> -->

    <!-- 底部图表 -->
    <view class="safety-statistics-footer box">
      <view class="safety-statistics-footer-title"> 年总电梯维保统计 </view>
      <view class="chart-box">
        <view class="chart-box-title flex-a-center-j-space-between">
          <view>维修次数</view>
          <!-- <view>15687 > </view> -->
        </view>
        <qiun-data-charts
          type="area"
          :opts="optsFooter"
          :chartData="chartDataFooter"
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

    <!-- 底部导航栏 -->
    <u-tabbar
      :value="value6"
      zIndex="99999"
      activeColor="#54D8A5"
      @change="changeTabbar"
      :fixed="true"
      :placeholder="true"
      :safeAreaInsetBottom="true"
    >
      <u-tabbar-item text="首页" icon="home"></u-tabbar-item>
      <u-tabbar-item text="统计" icon="list-dot"></u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script>
import { getModelList } from "@/api";
export default {
  data() {
    return {
      value6: 1,
      headerList: [
        {
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230712_27c9740ea874472e87058571ff46bc82.png",
          title: "电梯总数",
          num: 1229,
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
      // chartData: {},
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
      // 曲线图配置对象
      // optsChart2: {
      //   timing: "easeOut",
      //   duration: 1000,
      //   rotate: false,
      //   rotateLock: false,
      //   color: [
      //     // "#1890FF",
      //     "#2BAAE2",
      //     "#FAC858",
      //     "#EE6666",
      //     "#73C0DE",
      //     "#3CA272",
      //     "#FC8452",
      //     "#9A60B4",
      //     "#ea7ccc",
      //   ],
      //   padding: [0, 0, 0, 10],
      //   fontSize: 13,
      //   fontColor: "#666666",
      //   dataLabel: false,
      //   dataPointShape: false,
      //   dataPointShapeType: "solid",
      //   touchMoveLimit: 60,
      //   enableScroll: false,
      //   enableMarkLine: false,
      //   legend: {
      //     show: false,
      //     position: "bottom",
      //     float: "center",
      //     padding: 5,
      //     margin: 5,
      //     backgroundColor: "rgba(0,0,0,0)",
      //     borderColor: "rgba(0,0,0,0)",
      //     borderWidth: 0,
      //     fontSize: 13,
      //     fontColor: "#666666",
      //     lineHeight: 11,
      //     hiddenColor: "#CECECE",
      //     itemGap: 10,
      //   },
      //   xAxis: {
      //     disableGrid: true,
      //     disabled: true,
      //     // 图表底部的横线是否显示
      //     axisLine: false,
      //     axisLineColor: "#CCCCCC",
      //     calibration: false,
      //     fontColor: "#666666",
      //     fontSize: 13,
      //     lineHeight: 20,
      //     marginTop: 0,
      //     rotateLabel: false,
      //     rotateAngle: 45,
      //     itemCount: 5,
      //     boundaryGap: "center",
      //     splitNumber: 5,
      //     gridColor: "#CCCCCC",
      //     gridType: "solid",
      //     dashLength: 4,
      //     gridEval: 1,
      //     scrollShow: false,
      //     scrollAlign: "left",
      //     scrollColor: "#A6A6A6",
      //     scrollBackgroundColor: "#EFEBEF",
      //     title: "",
      //     titleFontSize: 13,
      //     titleOffsetY: 0,
      //     titleOffsetX: 0,
      //     titleFontColor: "#666666",
      //     format: "",
      //   },
      //   yAxis: {
      //     gridType: "dash",
      //     dashLength: 2,
      //     disabled: true,
      //     disableGrid: true,
      //     splitNumber: 5,
      //     gridColor: "#CCCCCC",
      //     padding: 10,
      //     showTitle: false,
      //     data: [],
      //   },
      //   extra: {
      //     area: {
      //       type: "curve",
      //       opacity: 0.2,
      //       addLine: true,
      //       width: 2,
      //       gradient: true,
      //       activeType: "hollow",
      //     },
      //     tooltip: {
      //       showBox: true,
      //       showArrow: true,
      //       showCategory: false,
      //       borderWidth: 0,
      //       borderRadius: 0,
      //       borderColor: "#000000",
      //       borderOpacity: 0.7,
      //       bgColor: "#000000",
      //       bgOpacity: 0.7,
      //       gridType: "solid",
      //       dashLength: 4,
      //       gridColor: "#CCCCCC",
      //       boxPadding: 3,
      //       fontSize: 13,
      //       lineHeight: 20,
      //       fontColor: "#FFFFFF",
      //       legendShow: true,
      //       legendShape: "auto",
      //       splitLine: true,
      //       horizentalLine: false,
      //       xAxisLabel: false,
      //       yAxisLabel: false,
      //       labelBgColor: "#FFFFFF",
      //       labelBgOpacity: 0.7,
      //       labelFontColor: "#666666",
      //     },
      //     // markLine: {
      //     //   type: "solid",
      //     //   dashLength: 4,
      //     //   data: [],
      //     // },
      //   },
      // },
      // optsChart1: {
      //   timing: "easeOut",
      //   duration: 1000,
      //   rotate: false,
      //   rotateLock: false,
      //   color: [
      //     "#FE7031",
      //     "#91CB74",
      //     "#FAC858",
      //     "#EE6666",
      //     "#73C0DE",
      //     "#3CA272",
      //     "#FC8452",
      //     "#9A60B4",
      //     "#ea7ccc",
      //   ],
      //   padding: [0, 0, 0, 10],
      //   fontSize: 13,
      //   fontColor: "#666666",
      //   dataLabel: false,
      //   dataPointShape: false,
      //   dataPointShapeType: "solid",
      //   touchMoveLimit: 60,
      //   enableScroll: false,
      //   enableMarkLine: false,
      //   legend: {
      //     show: false,
      //     position: "bottom",
      //     float: "center",
      //     padding: 5,
      //     margin: 5,
      //     backgroundColor: "rgba(0,0,0,0)",
      //     borderColor: "rgba(0,0,0,0)",
      //     borderWidth: 0,
      //     fontSize: 13,
      //     fontColor: "#666666",
      //     lineHeight: 11,
      //     hiddenColor: "#CECECE",
      //     itemGap: 10,
      //   },
      //   xAxis: {
      //     disableGrid: true,
      //     disabled: true,
      //     // 图表底部的横线是否显示
      //     axisLine: false,
      //     axisLineColor: "#CCCCCC",
      //     calibration: false,
      //     fontColor: "#666666",
      //     fontSize: 13,
      //     lineHeight: 20,
      //     marginTop: 0,
      //     rotateLabel: false,
      //     rotateAngle: 45,
      //     itemCount: 5,
      //     boundaryGap: "center",
      //     splitNumber: 5,
      //     gridColor: "#CCCCCC",
      //     gridType: "solid",
      //     dashLength: 4,
      //     gridEval: 1,
      //     scrollShow: false,
      //     scrollAlign: "left",
      //     scrollColor: "#A6A6A6",
      //     scrollBackgroundColor: "#EFEBEF",
      //     title: "",
      //     titleFontSize: 13,
      //     titleOffsetY: 0,
      //     titleOffsetX: 0,
      //     titleFontColor: "#666666",
      //     format: "",
      //   },
      //   yAxis: {
      //     gridType: "dash",
      //     dashLength: 2,
      //     disabled: true,
      //     disableGrid: true,
      //     splitNumber: 5,
      //     gridColor: "#CCCCCC",
      //     padding: 10,
      //     showTitle: false,
      //     data: [],
      //   },
      //   extra: {
      //     area: {
      //       type: "curve",
      //       opacity: 0.2,
      //       addLine: true,
      //       width: 2,
      //       gradient: true,
      //       activeType: "hollow",
      //     },
      //     tooltip: {
      //       showBox: true,
      //       showArrow: true,
      //       showCategory: false,
      //       borderWidth: 0,
      //       borderRadius: 0,
      //       borderColor: "#000000",
      //       borderOpacity: 0.7,
      //       bgColor: "#000000",
      //       bgOpacity: 0.7,
      //       gridType: "solid",
      //       dashLength: 4,
      //       gridColor: "#CCCCCC",
      //       boxPadding: 3,
      //       fontSize: 13,
      //       lineHeight: 20,
      //       fontColor: "#FFFFFF",
      //       legendShow: true,
      //       legendShape: "auto",
      //       splitLine: true,
      //       horizentalLine: false,
      //       xAxisLabel: false,
      //       yAxisLabel: false,
      //       labelBgColor: "#FFFFFF",
      //       labelBgOpacity: 0.7,
      //       labelFontColor: "#666666",
      //     },
      //     // markLine: {
      //     //   type: "solid",
      //     //   dashLength: 4,
      //     //   data: [],
      //     // },
      //   },
      // },
      // 底部图标
      optsFooter: {
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
      chartDataFooter: {},
      // 维修图标
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
      // 小图表
      minChartData: {},
      // 所有数据
      allData: {},
    };
  },
  // onReady() {
  //   // this.getServerData();

  //   // this.getServerChartData();

  //   this.getServerFooterData();

  //   this.getServerFooterData2();
  // },
  computed: {
    chartData() {
      return {
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
            data: [
              this.getErrorNumList("电梯困人"),
              this.getErrorNumList("电梯冲顶"),
              this.getErrorNumList("电梯蹲底"),
              this.getErrorNumList("轿厢异常晃动"),
              this.getErrorNumList("突发停电"),
              this.getErrorNumList("反复开关门"),
              this.getErrorNumList("关门超时"),
            ],
          },
        ],
      };
    },
  },
  methods: {
    // getServerData() {
    //   //模拟从服务器获取数据时的延时
    //   setTimeout(() => {
    //     //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    //     let res = {
    //       categories: [
    //         "电梯困人",
    //         "电梯冲顶",
    //         "电梯蹲底",
    //         "轿厢异常晃动",
    //         "突发停电",
    //         "反复开关门",
    //         "关门超时",
    //       ],
    //       series: [
    //         {
    //           name: "统计值",
    //           data: [23, 62, 19, 23, 49, 34, 86],
    //         },
    //       ],
    //     };
    //     this.chartData = JSON.parse(JSON.stringify(res));
    //   }, 500);
    // },

    // getServerChartData() {
    //   //模拟从服务器获取数据时的延时
    //   setTimeout(() => {
    //     //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    //     let res = {
    //       categories: [
    //         "星期一",
    //         "星期二",
    //         "星期三",
    //         "星期四",
    //         "星期五",
    //         "星期六",
    //         "星期天",
    //       ],
    //       series: [
    //         {
    //           name: "使用率",
    //           data: [0, 38, 11, 37, 4, 20, 30],
    //         },
    //       ],
    //     };
    //     this.minChartData = JSON.parse(JSON.stringify(res));
    //   }, 500);
    // },

    // getServerFooterData() {
    //   //模拟从服务器获取数据时的延时
    //   setTimeout(() => {
    //     //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    //     let res = {
    //       categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
    //       series: [
    //         {
    //           name: "维修次数",
    //           data: [0, 3, 5, 7, 4, 3],
    //         },
    //       ],
    //     };
    //     this.chartDataFooter = JSON.parse(JSON.stringify(res));
    //   }, 500);
    // },

    // getServerFooterData2() {
    //   //模拟从服务器获取数据时的延时
    //   setTimeout(() => {
    //     //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
    //     let res = {
    //       categories: ["1月", "2月", "3月", "4月", "5月", "6月"],
    //       series: [
    //         {
    //           name: "保养次数",
    //           data: [0, 3, 5, 7, 4, 3],
    //         },
    //       ],
    //     };
    //     this.chartDataFooter2 = JSON.parse(JSON.stringify(res));
    //   }, 500);
    // },

    // 底部tabbar点击事件
    changeTabbar(index) {
      this.value6 = index;

      switch (index) {
        case 0:
          uni.redirectTo({
            url: "./elevator-safety",
          });
          break;
        case 1:
          uni.redirectTo({
            url: "./safety-statistics",
          });
          break;

        default:
          break;
      }
    },
    // 获取统计信息
    async getStatisticsData() {
      const { data } = await getModelList("6507fcee0538024e9740e2ac");
      console.log(data);
      this.allData = data?.list[0];
      this.headerList = this.headerList?.map((item) => {
        if (item.title == "电梯总数") {
          item.num = this.allData?.allDeciveNumber;
        }
        if (item.title == "临近到期") {
          item.num = Math.floor(
            (this.allData?.expireDate - Date.now()) / 1000 / 60 / 60 / 24
          );
        }
        if (item.title == "正常维保") {
          item.num = this.allData?.maintenanceNum;
        }
        return item;
      });

      // 获取维修数据
      this.chartDataFooter = {
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
              this.allData.yearAllMaintenance?.map((item) => Number(item)) ||
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
            data: this.allData.yearAllrepair?.map((item) => Number(item)) || [],
          },
        ],
      };
    },
    // 获取异常次数数组
    getErrorNumList(type) {
      return this.allData?.tableField110?.[0][type];
    },
  },
  onLoad() {
    this.getStatisticsData();
  },
};
</script>

<style lang="scss" scoped>
.safety-statistics {
  width: 100vw;
  color: #ffffff;
  padding-bottom: 100rpx;

  &-header {
    width: 100%;
    margin-bottom: 64rpx;

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

  &-ranking {
    text-align: center;

    &-title {
      height: 54rpx;
      font-size: 38rpx;
      font-weight: 800;
      color: #35a584;
      line-height: 54px;
    }
  }

  &-yesterday {
    &-item {
      width: 670rpx;
      height: 174rpx;
      background: #e7f6fe;
      border-radius: 10rpx;
      margin: 32rpx auto;

      .item-message {
        font-size: 22rpx;
        color: #333333;
        margin-left: 20rpx;

        &-num {
          height: 70rpx;
          font-size: 50rpx;
          font-weight: 800;
          color: #333333;
          line-height: 70rpx;
        }
      }
      .item-chart {
        text-align: center;

        > view {
          font-size: 22rpx;
          color: #999999;
        }

        &-box {
          width: 280rpx;
          height: 86rpx;
          margin-bottom: 20rpx;
        }
      }

      > image {
        flex-shrink: 0;
      }
    }
  }

  &-footer {
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
