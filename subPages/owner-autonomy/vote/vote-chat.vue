<template>
  <view class="vote-chat">
    <view class="charts-box">
      <view class="charts-box-title">业主投票率情况</view>
      <qiun-data-charts type="ring" :opts="opts" :chartData="chartData" />
    </view>

    <view class="vote-chat-content">
      <!-- <view class="vote-chat-content-title">选项一投票情况</view> -->
      <!-- <view class="vote-chat-content-text">
        尊敬的社区居民们，大家好！
        我们衷心感谢大家对社区建设的支持和合作。我们将持续努力，为大家提供更好的居住环境和更多的福利活动。以下是一些重要的公告事项，请大家务必注意：
        社区活动：本周六将举行社区嘉年华活动，届时会有丰富多彩的游戏和表演。我们邀请大家全家参与，一起度过愉快的时光。活动地点为社区公园，请大家准时参加。
        健身房维护：由于健身房设备维护所需，健身房将在下周一至下周三期间关闭。请大家提前做好安排，以免造成不便。
        垃圾分类：为了保护环境，我们再次呼吁大家将垃圾正确分类。请将可回收物、有害垃圾和普通垃圾分别放入不同的垃圾桶中。详细分类指南已经张贴在公告栏上，请大家查看并积极配合。
        安全提示：近期社区附近发生了一些不法行为事件，请大家提高警惕，加强自身的安全意识。如果遇到可疑情况，请及时向社区管理办公室报告。
        公共设施使用：为了更好地服务社区居民，我们将优化公共设施的使用流程。请大家合理使用场地，并提前预约使用时间，以免造成冲突。
        祝大家生活愉快，如有任何问题或建议，请随时与我们联系。感谢大家的支持和理解！
      </view> -->

      <view class="charts-box1">
        <view class="charts-box-title">业主投票同意率情况</view>
        <qiun-data-charts type="ring" :opts="opts1" :chartData="chartData1" />
      </view>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
import infoMixin from "@/common/mixins/info";
import { getRequestFilter } from "@/common/function";
export default {
  mixins: [infoMixin],
  data() {
    return {
      // chartData: {},
      // chartData1: {},
      //您可以通过修改 config-ucharts.js 文件中下标为 ['ring'] 的节点来配置全局默认参数，如都是默认参数，此处可以不传 opts 。实际应用过程中 opts 只需传入与全局默认参数中不一致的【某一个属性】即可实现同类型的图表显示不同的样式，达到页面简洁的需求。
      opts: {
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
        padding: [5, 5, 5, 5],
        dataLabel: true,
        enableScroll: false,
        // 右侧数据列
        legend: {
          show: true,
          position: "bottom",
          lineHeight: 25,
        },
        title: {
          name: "投票率",
          fontSize: 15,
          color: "#666666",
        },
        subtitle: {
          name: "",
          fontSize: 25,
          color: "#7cb5ec",
        },
        extra: {
          ring: {
            ringWidth: 30,
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: true,
            borderWidth: 3,
            borderColor: "#FFFFFF",
            linearType: "custom",
          },
        },
      },
      opts1: {
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
        padding: [5, 5, 5, 5],
        dataLabel: true,
        enableScroll: false,
        // 右侧数据列
        legend: {
          show: true,
          position: "bottom",
          lineHeight: 25,
        },
        title: {
          name: "同意率",
          fontSize: 15,
          color: "#666666",
        },
        subtitle: {
          name: "",
          fontSize: 25,
          color: "#7cb5ec",
        },
        extra: {
          ring: {
            ringWidth: 30,
            activeOpacity: 0.5,
            activeRadius: 10,
            offsetAngle: 0,
            labelWidth: 15,
            border: true,
            borderWidth: 3,
            borderColor: "#FFFFFF",
            linearType: "custom",
          },
        },
      },
      allPeopleData: [], //总户
      currentDecisionNum: [], //单个决策投票人
      agreeList: [], //同意
      fightList: [], //反对
    };
  },

  methods: {
    // 获取总户数
    // 查询投票结果列表
    async getAllPeopleNum() {
      const { data } = await getModelList("64f6d11ed85a4b7b32ec641e");
      this.allPeopleData = data?.list;
    },
    // 获取给这个决策投票的人数
    async getClickCurrentDecisionNum(decisionId) {
      let filterData = getRequestFilter({
        decisionId,
      });
      // 获取给这个决策投票的人数
      const { data } = await getModelList(
        "64f93b4e4b635d6996a92a97",
        filterData
      );
      this.currentDecisionNum = data?.list;
    },
  },
  computed: {
    chartData() {
      return {
        series: [
          {
            data: [
              {
                name: "已投票",
                value:
                  (
                    this.currentDecisionNum.length / this.allPeopleData.length
                  ).toFixed(4) * 100,
              },
              {
                name: "未投票",
                value:
                  (
                    (this.allPeopleData.length -
                      this.currentDecisionNum.length) /
                    this.allPeopleData.length
                  ).toFixed(4) * 100,
              },
            ],
          },
        ],
      };
    },
    chartData1() {
      return {
        series: [
          {
            data: [
              {
                name: "同意",
                value:
                  (
                    this.agreeList.length / this.currentDecisionNum.length
                  ).toFixed(4) * 100,
              },
              {
                name: "反对",
                value:
                  (
                    this.fightList.length / this.currentDecisionNum.length
                  ).toFixed(4) * 100,
              },
            ],
          },
        ],
      };
    },
  },
  watch: {
    currentDecisionNum: {
      handler(val) {
        this.currentDecisionNum = val;
        val.forEach((item) => {
          if (item.result === "同意") {
            this.agreeList.push(item);
          } else {
            this.fightList.push(item);
          }
        });
      },
      deep: true,
      immediate: true, // 立即执行一次
    },
  },
  onLoad(option) {
    // 传递
    let { id } = option;
    // console.log(id);
    this.getClickCurrentDecisionNum(id);
    this.getAllPeopleNum();
  },
};
</script>

<style lang="scss" scoped>
.vote-chat {
  width: 100vw;
  padding-top: 1rpx;
  box-sizing: border-box;
  background-color: #f8f9fd;
}
</style>
