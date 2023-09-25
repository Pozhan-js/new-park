<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-05-23 22:05:42
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-18 16:47:07
 * @FilePath: /SmartPark/subPages/function/self-government/pages/elevator-safety.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="safety">
    <view class="safety-header box-all flex-a-center-j-space-between">
      <view class="safety-header-left">
        <view class="safety-header-left-title">长江友邻总梯量</view>
        <view class="safety-header-left-number">
          {{ safetyPageData.filtNum || 0 }}
        </view>
        <view class="safety-header-left-time">
          已运行 {{ filtRunTime || 0 }}天</view
        >
        <view class="safety-header-left-error">
          成功为您告警{{ safetyPageData.filtErrorNum || 0 }}次
        </view>
        <view class="safety-header-left-message flex-a-center">
          <view class="message-item flex-a-center">
            <image
              style="width: 32rpx; height: 32rpx"
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230911_a43a2c9b41674f50a29847dd25e108f4.png"
              mode=""
            />
            <view class="name">
              维保人员 {{ safetyPageData.maintainPeople }}
            </view>
          </view>
          <view class="message-item flex-a-center">
            <image
              style="width: 32rpx; height: 32rpx"
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230911_d4aadcc040da4fa39d6c6b772101252d.png"
              mode=""
            />
            <view class="type">{{ safetyPageData.filtType }}</view>
          </view>
        </view>
      </view>
      <view class="safety-header-right">
        <!-- TAG 通过控制容器大小来控制图表大小 -->
        <view class="charts-box">
          <qiun-data-charts type="arcbar" :opts="opts" :chartData="chartData" />
        </view>
        <view class="chart-status">项目电梯状态</view>
      </view>
    </view>

    <view class="safety-grid">
      <u-grid :border="false" :col="baseList.length">
        <u-grid-item
          v-for="(baseListItem, baseListIndex) in baseList"
          @click="toSomePage(baseListItem.path)"
          :key="baseListIndex"
        >
          <image
            style="
              width: 72rpx;
              height: 68rpx;
              margin-top: 32rpx;
              margin-bottom: 10rpx;
            "
            :src="baseListItem.imageUrl"
            mode=""
          />
          <text class="grid-text">{{ baseListItem.title }}</text>
        </u-grid-item>
      </u-grid>
    </view>

    <view class="safety-check box flex-a-center-j-space-between">
      <view class="safety-check-left padding-20">
        <view class="left-header flex-a-center">
          <image
            style="width: 32rpx; height: 32rpx; margin-right: 10rpx"
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230711_ee172afe8e924658b418016d6c6dd3fa.png"
            mode=""
          />
          <view>电梯正常天数</view>
        </view>
        <view class="left-body">
          {{ filtRunTime - safetyPageData.filtErrorNum || 0 }}
        </view>
      </view>
      <view class="safety-check-right padding-20">
        <view class="right-header flex-a-center">
          <image
            style="width: 32rpx; height: 32rpx; margin-right: 10rpx"
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230711_70d3c9c8aa554bfcb67c9df6e9275348.png"
            mode=""
          />
          <view>电梯异常次数</view>
        </view>
        <view class="right-body"> {{ safetyPageData.filtErrorNum || 0 }} </view>
      </view>
    </view>

    <view class="safety-yesterday">
      <view
        class="safety-yesterday-item flex-a-center-j-space-between padding-26"
      >
        <image
          style="width: 66rpx; height: 72rpx"
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230712_cb238e23087946adb0f398aa5bf0cf55.png"
        ></image>
        <view class="item-message">
          <view class="item-message-num">{{ yesterdayPerson }}</view>
          <view>昨日乘梯人数</view>
        </view>
        <view class="item-chart">
          <view class="item-chart-box">
            <qiun-data-charts
              type="area"
              :opts="optsChart"
              :chartData="minPersonData"
            />
          </view>
          <view>近七天乘坐天梯人员涨幅</view>
        </view>
      </view>
      <view
        style="background: #fff9e1"
        class="safety-yesterday-item flex-a-center-j-space-between padding-26"
      >
        <image
          style="width: 66rpx; height: 72rpx"
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230712_467aa3be22224848a99991c76b6b2207.png"
        ></image>
        <view class="item-message">
          <view class="item-message-num">{{ yesterdayRun }}</view>
          <view>昨日运行次数</view>
        </view>
        <view class="item-chart">
          <view class="item-chart-box">
            <qiun-data-charts
              type="area"
              :opts="optsChart2"
              :chartData="minRunData"
            />
          </view>
          <view>近7天运行次数涨幅</view>
        </view>
      </view>
    </view>

    <view class="safety-footer-chart box">
      <view class="safety-footer-chart-title">昨日运行频率</view>
      <view class="safety-footer-chart-box">
        <!-- TODO :canvas2d="true" 添加属性解决图标层级过高 -->
        <qiun-data-charts
          type="area"
          :opts="optsFooter"
          :chartData="optsFooterData"
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
      chartData: {},
      // 近七天电梯人数
      minPersonData: {},
      // 近七天运行次数
      minRunData: {},
      //这里的 opts 是图表类型 type="arcbar" 的全部配置参数，您可以将此配置复制到 config-ucharts.js 文件中下标为 ['arcbar'] 的节点中来覆盖全局默认参数。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
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
          name: "0",
          fontSize: 25,
          color: "#00FF00",
          offsetX: 0,
          offsetY: 0,
        },
        subtitle: {
          name: "分",
          fontSize: 12,
          color: "#00FF00",
          offsetX: 0,
          offsetY: 0,
        },
        extra: {
          arcbar: {
            type: "circle",
            width: 10,
            backgroundColor: "#E9E9E9",
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
      // 曲线图配置对象
      optsChart: {
        timing: "easeOut",
        duration: 1000,
        rotate: false,
        rotateLock: false,
        color: ["#1890FF"],
        padding: [0, 0, 0, 15],
        fontSize: 13,
        fontColor: "#666666",
        dataLabel: false,
        dataPointShape: false,
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
          disableGrid: true,
          disabled: true,
          // 图表底部的横线是否显示
          axisLine: false,
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
          disabled: true,
          disableGrid: true,
          splitNumber: 5,
          gridColor: "#CCCCCC",
          padding: 10,
          showTitle: false,
          data: [],
        },
        extra: {
          area: {
            type: "curve",
            opacity: 0.2,
            addLine: true,
            width: 2,
            gradient: true,
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
        },
      },
      // 曲线图配置对象
      optsChart2: {
        timing: "easeOut",
        duration: 1000,
        rotate: false,
        rotateLock: false,
        color: ["#91CB74"],
        padding: [0, 0, 0, 15],
        fontSize: 13,
        fontColor: "#666666",
        dataLabel: false,
        dataPointShape: false,
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
          disableGrid: true,
          disabled: true,
          // 图表底部的横线是否显示
          axisLine: false,
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
          disabled: true,
          disableGrid: true,
          splitNumber: 5,
          gridColor: "#CCCCCC",
          padding: 10,
          showTitle: false,
          data: [],
        },
        extra: {
          area: {
            type: "curve",
            opacity: 0.2,
            addLine: true,
            width: 2,
            gradient: true,
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
          // markLine: {
          //   type: "solid",
          //   dashLength: 4,
          //   data: [],
          // },
        },
      },
      optsFooter: {
        timing: "easeOut",
        duration: 1000,
        rotate: false,
        rotateLock: false,
        color: ["#73C0DE"],
        padding: [15, 15, 0, 15],
        fontSize: 13,
        fontColor: "#666666",
        dataLabel: false,
        dataPointShape: false,
        dataPointShapeType: "hollow",
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
          disableGrid: true,
          disabled: false,
          axisLine: false,
          axisLineColor: "#CCCCCC",
          calibration: false,
          fontColor: "#666666",
          fontSize: 13,
          lineHeight: 20,
          marginTop: 0,
          rotateLabel: false,
          rotateAngle: 45,
          itemCount: 5,
          boundaryGap: "justify",
          splitNumber: 5,
          gridColor: "#CCCCCC",
          gridType: "dash",
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
          disabled: true,
          disableGrid: true,
          splitNumber: 5,
          gridColor: "#CCCCCC",
          padding: 10,
          showTitle: false,
          data: [{ min: 0, max: 50 }],
        },
        extra: {
          area: {
            type: "curve",
            opacity: 0.2,
            addLine: true,
            width: 2,
            gradient: false,
            activeType: "solid",
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
      // 底部
      optsFooterData: {},
      //宫格布局
      baseList: [
        {
          title: "维保预警",
          path: "./device-warning",
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230717_1e1d1e7eb91d41a1bbdbb4de7ffd467e.png",
        },
        {
          title: "异常记录",
          path: "./error-log",
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230717_dd6ab33f8110442d9e89a1a99b1e8e13.png",
        },
        {
          title: "设备列表",
          path: "./device-list",
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230717_a5264390e36c4aff82cadff50c8ebc74.png",
        },
        {
          title: "数据分析",
          path: "./device-analysis",
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230717_96bdc9c4ac144a51b3f3e2899848c734.png",
        },
        // {
        //   title: "电梯周报",
        //   path: "./device-weekly",
        //   imageUrl:
        //     "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230717_478c5fca65ba4e9ebfe5e4465797893d.png",
        // },
      ],
      // 底部导航栏默认下标
      value6: 0,
      //接收请求回来的数据
      safetyPageData: {},
      // 近7天乘电梯人数
      filtPersonNum: [],
    };
  },
  watch: {
    safetyPageData(val) {
      this.opts.title.name =
        (1 - val.filtErrorNum / this.filtRunTime).toFixed(2) * 100;

      this.chartData = {
        series: [
          {
            name: "正确率",
            color: "#2fc25b",
            data: (1 - val.filtErrorNum / this.filtRunTime).toFixed(2),
            // data: (1 - 0.4).toFixed(2),
          },
        ],
      };
      // 7天电梯人数
      this.minPersonData = {
        categories: [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期天",
        ],
        series: [
          {
            name: "使用率",
            data: this.minPersonDataList,
          },
        ],
      };
      //7天运行次数
      this.minRunData = {
        categories: [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期天",
        ],
        series: [
          {
            name: "使用率",
            data: this.minRunNDataList,
          },
        ],
      };
      //昨天运行评率
      this.optsFooterData = {
        categories: ["6点", "8点", "10点", "12点", "14点", "16点", "18点"],
        series: [
          {
            name: "电梯使用人数",
            data: this.minRunNumList,
          },
        ],
      };
    },
  },
  computed: {
    //电梯运行天数
    filtRunTime() {
      return Math.floor(
        (Date.now() - this.safetyPageData.filtStartTime) / 1000 / 60 / 60 / 24
      );
    },
    minPersonDataList() {
      const data = this.safetyPageData?.tableField115?.[0];
      if (data) {
        // 排列顺序
        let arr = [];
        for (let i = 0; i <= Object.values(data).length - 1; i++) {
          arr.push(data[`pepoleDay${i + 1}`]);
        }
        return arr
          .map((item) => {
            return Number(item);
          })
          .reverse();
      }
      return [];
    },
    // 7天电梯人数
    minRunNDataList() {
      const data = this.safetyPageData?.tableField123?.[0];
      if (data) {
        let arr = [];
        for (let i = 0; i <= Object.values(data).length - 1; i++) {
          arr.push(data[`runDay${i + 1}`]);
        }
        return arr
          .map((item) => {
            return Number(item);
          })
          .reverse();
      }
      return [];
    },
    minRunNumList() {
      const data = this.safetyPageData?.tableField131?.[0];
      if (data) {
        let arr = [];
        for (let i = 6; i <= 18; i += 2) {
          arr.push(data[`${i}-run`]);
        }
        return arr.map((item) => {
          return Number(item);
        });
        // .reverse();
      }
      return [];
    },
    // 昨日乘电梯人数
    yesterdayPerson() {
      const data = this.safetyPageData?.tableField115?.[0];
      if (data) {
        let arr = [];
        for (let i = 0; i <= Object.values(data).length - 1; i++) {
          arr.push(data[`pepoleDay${i + 1}`]);
        }
        return arr.shift();
      }
    },
    yesterdayRun() {
      const data = this.safetyPageData?.tableField123?.[0];
      if (data) {
        let arr = [];
        for (let i = 0; i <= Object.values(data).length - 1; i++) {
          arr.push(data[`runDay${i + 1}`]);
        }
        return arr.shift();
      }
    },
  },
  methods: {
    // 点击 icon跳转到指定页面
    toSomePage(url) {
      uni.navigateTo({
        url,
      });
    },
    //切换底部导航栏
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

    // 获取类型次数

    // 获取页面信息
    async getPageData() {
      const { data } = await getModelList("64fec5b34b635d6996a93412");
      this.safetyPageData = data?.list[0];
    },
  },
  onLoad() {
    this.getPageData();
  },
};
</script>

<style lang="scss" scoped>
%normal-view {
  height: 32rpx;
  line-height: 32rpx;
  margin-bottom: 10rpx;
}

.safety {
  width: 100vw;

  &-header {
    width: 670rpx;
    height: 324rpx;
    background: #54d8a5;
    box-shadow: 0rpx 8rpx 12rpx 1rpx rgba(99, 138, 123, 0.26);
    border-radius: 25rpx;
    margin: 0 auto;

    &-left {
      color: #ffffff;
      font-size: 24rpx;

      &-title {
        height: 46rpx;
        font-size: 32rpx;
        font-weight: 800;
        line-height: 46rpx;
      }

      &-number {
        height: 84rpx;
        font-size: 60rpx;
        font-weight: 800;
        line-height: 84rpx;
      }

      &-time {
        @extend %normal-view;
      }

      &-error {
        @extend %normal-view;
      }

      &-message {
        .message-item {
          margin-right: 20rpx;

          > view {
            font-size: 24rpx;
            margin-left: 10rpx;
          }
        }
      }
    }

    &-right {
      text-align: center;

      .chart-status {
        height: 32rpx;
        font-size: 24rpx;
        color: #ffffff;
        line-height: 32rpx;
      }
    }
  }

  &-grid {
    margin-bottom: 32rpx;
  }

  &-check {
    > view {
      width: 320rpx;
      border-radius: 0rpx 66rpx 66rpx 66rpx;
      font-size: 26rpx;
      color: #333333;
    }

    &-left {
      background: #e9faf7;

      .left-body {
        height: 98rpx;
        text-align: center;
        font-size: 70rpx;
        font-family: PingFang SC-Heavy, PingFang SC;
        font-weight: 800;
        color: #333333;
        line-height: 98rpx;
      }
    }

    &-right {
      background: #fef1ec;

      .right-body {
        height: 98rpx;
        font-size: 70rpx;
        font-family: PingFang SC-Heavy, PingFang SC;
        font-weight: 800;
        color: #333333;
        line-height: 98rpx;
        text-align: center;
      }
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
        font-size: 26rpx;
        color: #333333;
        margin: 0 20rpx;

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
          width: 300rpx;
          height: 86rpx;
          margin-bottom: 20rpx;
        }
      }

      > image {
        flex-shrink: 0;
      }
    }
  }

  &-footer-chart {
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
}

.charts-box {
  width: 200rpx;
  height: 200rpx;
}
</style>
