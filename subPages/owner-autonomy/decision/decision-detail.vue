<template>
  <view class="decision-detail">
    <u-navbar
      title="决策详情"
      bgColor="transparent"
      titleStyle="color:#fff"
      :placeholder="true"
      leftIconColor="#fff"
      :autoBack="true"
    >
    </u-navbar>
    <view class="decision-detail-container">
      <view class="container-article">
        <view class="container-article-header flex-a-center-j-center">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230906_791ed1e59fd14501a6555bf7f39dbbbf.png"
            mode=""
          />
          <view class="title">{{ detailData.decisionTitle }}</view>
        </view>
        <u-line dashed></u-line>
        <view class="container-article-body">
          <view class="body-message">
            <view class="body-message-item">
              {{ detailData.decisionIssue }}
            </view>
            <view class="body-message-item">起始时间: {{ startTime }}</view>
            <view class="body-message-item flex-a-center">
              发起人:
              <view class="room-user">{{
                detailData.creatorUser.realName
              }}</view>
            </view>
            <view class="body-message-item"
              >结束时间:
              {{ endTime }}
            </view>
          </view>
          <view class="body-content">
            {{ detailData.description }}
          </view>
          <view class="body-result">结论: 未过半数同意，未能通过</view>
        </view>
      </view>

      <view class="data-container">
        <view class="data-container-header"> 详情 </view>
        <u-line dashed></u-line>
        <view class="data-container-body">
          <view class="body-content">
            <view>
              同意户数{{ resolveList.length }}户参与投票占有效业主比例{{
                (
                  resolveList.length /
                  (resolveList.length + rejectList.length)
                ).toFixed(1) * 100 || 0
              }}%
            </view>
            <view>
              反对户数{{ rejectList.length }}户参与投票占有效业主比例{{
                (
                  rejectList.length /
                  (resolveList.length + rejectList.length)
                ).toFixed(1) * 100 || 0
              }}%
            </view>
          </view>

          <view class="decision-button flex-a-center-j-space-between">
            <view
              class="button-allow flex-a-center-j-space-around"
              data-index="同意"
            >
              <!-- @click="addDecisionList(decisionID, $event)" -->
              <view>同意</view>
              <view>（{{ resolveList.length }}户）</view>
            </view>
            <view
              class="button-reject flex-a-center-j-space-around"
              data-index="反对"
            >
              <!--  @click="addDecisionList(decisionID, $event)" -->
              <view>反对</view>
              <view>（{{ rejectList.length }}户）</view>
            </view>
          </view>
        </view>
        <u-line dashed></u-line>
        <view class="data-container-footer">
          <view class="label">已参与人员</view>
          <view class="footer-content flex-a-center">
            <view class="room-user" v-for="item in buildDataList" :key="item">{{
              item
            }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getModelInfo, getModelList, createModel, updateModel } from "@/api";
import { getRequestFilter } from "@/common/function";
import infoMixin from "@/common/mixins/info";
import userMixin from "@/common/mixins/user";
import { sleep } from "@/common/function";
export default {
  mixins: [infoMixin, userMixin],
  data() {
    return {
      detailData: {},
      decisionID: "",
      buildMessage: "",
      // 获取所有投票者楼栋信息
      buildDataList: [],
      // 统计所有反对
      rejectList: [],
      resolveList: [],
    };
  },
  methods: {
    // 点击添加记录邮票结果
    async addDecisionList(decisionId, e) {
      let reqData = e.currentTarget.dataset.index;
      // TODO现在判断是添加还是修改
      let filterData = getRequestFilter({
        decisionId,
        decisionPeopleId: this.userInfo.id,
      });
      const { data } = await getModelList(
        "64f93b4e4b635d6996a92a97",
        filterData
      );

      if (data?.list.length) {
        let itemId = data.list[0]._id;
        await updateModel(
          "64f93b4e4b635d6996a92a97",
          {
            result: reqData,
            decisionId: this.decisionID, //决策id
            decisionPeopleId: this.userInfo.id, //投票者id
          },
          itemId
        );
        sleep(() => {
          uni.showToast({
            title: `投票${reqData}成功`,
            icon: "success",
          });
          sleep(async () => {
            // 刷新了;列表数据
            uni.navigateBack({
              delta: 1,
            });
          }, 600);
        }, 600).then(async () => {
          await getModelList("64f93b4e4b635d6996a92a97");
        });
      } else {
        await createModel("64f93b4e4b635d6996a92a97", {
          result: reqData,
          decisionId: this.decisionID, //决策id
          decisionPeopleId: this.userInfo.id, //投票者id
        });
        uni.showToast({
          title: `投票${reqData}成功`,
          icon: "success",
        });
      }
    },
    //获取楼栋号
    async getRoomMessage(id) {
      const { data } = await getModelInfo("64f6d11ed85a4b7b32ec641e", id);
      this.buildMessage = `${data.buildingNumber || 0}-${data.roomNumber || 0}`;
      return `${data.buildingNumber || 0}-${data.roomNumber || 0}`;
    },
    // 获取楼号信息
    async getApproverMessage(id) {
      const filterData = getRequestFilter({ formUser: id });
      const { data } = await getModelList(
        "64f6d064d85a4b7b32ec641d",
        filterData
      );
      let { roomId } = data?.list[0] || { roomId: "" };
      return this.getRoomMessage(roomId);
    },
    // 获取详情信息
    async getDecisionDetail(id) {
      const { data } = await getModelInfo("64f93a574b635d6996a92a95", id);
      this.detailData = data;
      this.getApproverMessage(data.creatorUserId);
    },
    // 查询投票结果
    async selectApproverList(id) {
      let filterData = getRequestFilter({ decisionId: id });
      // TODO获取决策的结果  此时若查到说明该用户投票过该决策
      const { data } = await getModelList(
        "64f93b4e4b635d6996a92a97",
        filterData
      );
      for (let i = 0; i <= data?.list.length - 1; i++) {
        if (data.list[i].result === "同意") {
          this.resolveList.push(data.list[i]);
        } else {
          this.rejectList.push(data.list[i]);
        }
      }
      // console.log("决策投票结果总数", data);
      // 获取所有投票的楼栋号
      data.list.map((item) => {
        this.getApproverMessage(item.decisionPeopleId).then((res) => {
          // console.log("请求回来人员的数据", res);
          this.buildDataList.push(res);
        });
      });
    },
  },
  computed: {
    startTime() {
      return uni.$u.timeFormat(
        this.detailData?.decisionRange?.[0],
        "yyyy-mm-dd"
      );
    },
    endTime() {
      return uni.$u.timeFormat(
        this.detailData?.decisionRange?.[1],
        "yyyy-mm-dd"
      );
    },
  },
  onLoad(option) {
    let { id } = option;
    this.decisionID = id;
    this.getDecisionDetail(id);
    this.selectApproverList(id);
  },
};
</script>

<style lang="scss" scoped>
.decision-detail {
  width: 100vw;
  min-height: 100vh;
  position: relative;

  &::before {
    content: "";
    position: fixed;
    top: 0;
    width: 100vw;
    height: 800rpx;
    z-index: -1;
    background: linear-gradient(
      180deg,
      #445eff 0%,
      rgba(99, 119, 245, 0.69) 61%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  &-container {
    padding: 30rpx;
    box-sizing: border-box;

    .container-article {
      height: 670rpx;
      background: #fff;
      box-shadow: 0rpx 3rpx 14rpx 1rpx rgba(143, 143, 143, 0.1);
      border-radius: 20rpx;
      margin-bottom: 20rpx;
      padding: 0 40rpx;
      box-sizing: border-box;

      &-header {
        font-size: 32rpx;
        font-weight: bold;
        color: #6377f5;
        padding: 20rpx 0;

        > image {
          width: 45rpx;
          height: 36rpx;
          margin-right: 14rpx;
        }
      }

      &-body {
        padding: 30rpx 0;
        box-sizing: border-box;

        .body-message {
          font-size: 26rpx;
          font-weight: bold;
          color: #1f2329;
          margin-bottom: 16rpx;

          &-item {
            margin-bottom: 16rpx;
          }
        }

        .body-content {
          font-size: 24rpx;
          color: #999999;
        }
        .body-result {
          margin-top: 20rpx;
          height: 60rpx;
          line-height: 60rpx;
          padding: 0 20rpx;
          box-sizing: border-box;
          background: linear-gradient(
            90deg,
            #6377f5 0%,
            rgba(240, 242, 254, 0) 85%,
            #ffffff 100%
          );
          font-size: 28rpx;
          font-weight: bold;
          color: #ffffff;
        }
      }
    }

    .data-container {
      background: #ffffff;
      box-shadow: 0rpx 3rpx 14rpx 1rpx rgba(143, 143, 143, 0.1);
      border-radius: 20rpx;
      padding: 0 40rpx;
      box-sizing: border-box;

      &-header {
        font-size: 32rpx;
        font-weight: bold;
        color: #6377f5;
        padding: 20rpx 0;
        text-align: center;
      }

      &-body {
        padding: 20rpx 0;
        margin-bottom: 20rpx;

        .body-content {
          // height: 128rpx;
          background: #f9f9f9;
          border-radius: 10rpx;
          text-align: center;
          padding: 30rpx 0;
          margin-bottom: 20rpx;
        }

        .decision-button {
          %btn {
            width: 295rpx;
            height: 60rpx;
            border-radius: 30rpx;
            text-align: center;
            line-height: 60rpx;
            font-size: 28rpx;
            font-weight: bold;
          }
          .button-allow {
            background: rgba(252, 63, 21, 0.1);
            @extend %btn;
            color: #fd4e28;
          }

          .button-reject {
            background: rgba(99, 119, 245, 0.1);
            @extend %btn;
            color: #6377f5;
          }
        }
      }

      &-footer {
        padding: 30rpx 0;

        .label {
          font-size: 24rpx;
          color: #333333;
        }

        .footer-content {
          font-size: 28rpx;
          font-weight: bold;
          color: #333333;
          flex-wrap: wrap;
        }
      }
    }
  }
}
.room-user {
  background-color: #d4dffc;
  padding: 3rpx 20rpx 3rpx;
  font-size: 26rpx;
  font-weight: bold;
  color: #1f2329;
  margin: 5rpx 0;
  margin-left: 10rpx;
}
</style>
