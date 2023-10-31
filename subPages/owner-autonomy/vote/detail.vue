<template>
  <view class="vote-detail">
    <view class="vote-detail-content">
      <view class="vote-detail-content-title">{{
        decisionData.decisionTitle
      }}</view>
      <view class="vote-detail-content-row-title">{{
        decisionData.decisionIssue
      }}</view>
      <view class="vote-detail-content-list">
        <view
          class="vote-detail-content-list-item"
          v-for="(info, index) in checkoutInfoList"
          :key="info.name"
          @click="handleClickInfo(info)"
        >
          <view class="name flex-a-center">
            <view>{{ index + 1 }}.</view>
            <view>{{ info.name }}</view>
          </view>

          <u-icon name="checkbox-mark" v-if="info.isCheck"></u-icon>
        </view>
      </view>
    </view>
    <view class="vote-detail-bottom">
      <u-button
        type="primary"
        text="确定"
        @click="addAndEditResult(detailId)"
      ></u-button>
    </view>
  </view>
</template>

<script>
import { getModelInfo, getModelList, updateModel, createModel } from "@/api";
import { getRequestFilter } from "@/common/function";
import infoMixin from "@/common/mixins/info";
import { sleep } from "@/common/function";
export default {
  mixins: [infoMixin],
  data() {
    return {
      decisionData: {},
      currentResult: "",
      detailId: "",
      btnLoading: false,
      result: "",
      disabled: true,
      // customStyle: {
      //   width: "100%",
      //   height: "100%",
      // },
    };
  },
  methods: {
    // 点击显示
    handleClickInfo(info) {
      this.checkoutInfoList.forEach((item) => {
        if (item.name === info.name) {
          item.isCheck = true;
          this.currentResult = item.name;
        } else {
          item.isCheck = false;
        }
      });
    },
    // 获取活动详情
    async getDetailData(id) {
      const { data } = await getModelInfo("64f93a574b635d6996a92a95", id);
      this.decisionData = data;
    },

    // 获取自己在该条决策的投票结果
    async getCurrentResult(decisionId) {
      let filterData = getRequestFilter({
        decisionId,
        decisionPeopleId: this.userInfo.id,
      });
      const { data } = await getModelList(
        "64f93b4e4b635d6996a92a97",
        filterData
      );
      this.result = data?.list[0]?.result;
    },

    // 添加或者是修改答案
    async addAndEditResult(decisionId) {
      console.log("函数执行");
      this.btnLoading = true;
      let filterData = getRequestFilter({
        decisionId,
        decisionPeopleId: this.userInfo.id,
      });
      try {
        const { data } = await getModelList(
          "64f93b4e4b635d6996a92a97",
          filterData
        );

        if (!this.currentResult) {
          uni.showToast({
            title: `投票结果不能为空`,
            icon: "none",
          });
        } else {
          if (data?.list.length) {
            let itemId = data.list[0]._id;
            await updateModel(
              "64f93b4e4b635d6996a92a97",
              {
                result: this.currentResult,
                decisionId: decisionId, //决策id
                decisionPeopleId: this.userInfo.id, //投票者id
              },
              itemId
            );
            sleep(() => {
              uni.showToast({
                title: `投票${this.currentResult}成功`,
                icon: "success",
              });
              sleep(() => {
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
              result: this.currentResult,
              decisionId: decisionId, //决策id
              decisionPeopleId: this.userInfo.id, //投票者id
            });
            sleep(() => {
              uni.showToast({
                title: `投票${this.currentResult}成功`,
                icon: "success",
              });
              sleep(() => {
                // 刷新了;列表数据
                uni.navigateBack({
                  delta: 1,
                });
              }, 600);
            }, 600);
          }
        }
      } catch (error) {
        uni.showToast({
          title: `${error}`,
          icon: "warring",
        });
      } finally {
        this.btnLoading = false;
      }
    },
  },

  computed: {
    checkoutInfoList() {
      return this.decisionData.selectValue?.map((item) => {
        return this.result && this.result == item
          ? { name: item, isCheck: true }
          : {
              name: item,
              isCheck: false,
            };
      });
    },
  },
  onLoad(option) {
    let { id } = option;
    this.detailId = id;
    this.getDetailData(id);
    this.getCurrentResult(id);
  },
};
</script>

<style lang="scss" scoped>
.vote-detail {
  width: 100vw;
  height: 100vh;
  padding-top: 1px;
  box-sizing: border-box;
  background-color: #b1bbf5;

  &-content {
    margin: 15rpx;
    height: 707rpx;
    background: #fff;
    border-radius: 20rpx;
    padding: 40rpx;
    margin-bottom: 0;

    &-title {
      font-size: 36rpx;
      margin-bottom: 30rpx;
      text-align: center;
      font-weight: bold;
      color: #6377f5;
    }

    &-list {
      margin-top: 20rpx;

      &-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80rpx;
        background: #eee;
        border-radius: 4rpx;
        box-sizing: border-box;
        padding-right: 30rpx;
        margin-bottom: 40rpx;

        .name {
          font-size: 28rpx;
          color: #333333;
          margin-left: 56rpx;
        }
      }
    }
  }

  &-bottom {
    margin: 100rpx auto;
    width: 650rpx;
    height: 40rpx;
    background: #ffffff;
    border-radius: 0rpx 20rpx;
  }
}
</style>
