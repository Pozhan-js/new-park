<template>
  <view class="investigation-detail">
    <u-navbar
      bgColor="#b1bbf5"
      title="调查问卷"
      :autoBack="true"
      placeholder="true"
    >
    </u-navbar>
    <view class="investigation-detail-header">
      <view class="investigation-detail-header-title">
        答题进度 {{ everyAnswerList.length }}/{{ topicList.length }}
      </view>
      <u-line-progress
        :percentage="progressPercentage"
        height="8"
        :showText="false"
      ></u-line-progress>
    </view>

    <view class="investigation-detail-loop">
      <view class="investigation-detail-loop-title">物业满意度调查</view>
      <view class="investigation-detail-content">
        <view class="investigation-detail-content-list">
          <u-transition
            :show="topicIndex === index"
            :mode="isNext ? 'slide-right' : 'slide-left'"
            duration="0"
            v-for="(topic, index) in topicList"
            :key="index"
          >
            <view
              class="investigation-detail-content-list-row-title"
              style="font-size: 32rpx; font-weight: bold"
            >
              <text>{{ index + 1 }}. </text> {{ topic.questionTitle }}
              <text style="color: #6377f5; margin-left: 30rpx">{{
                topic.is_single
              }}</text>
            </view>
            <view class="select-list" v-if="topic.isSelect">
              <view
                class="investigation-detail-content-list-item"
                v-for="info in topic.selectAnswer"
                :class="isShowIcon(topic, info) ? 'currentItem' : ''"
                :key="info"
                @click="handleClickInfo(topic, info)"
              >
                <view class="name">{{ info }}</view>
                <!-- <u-icon
                  name="checkbox-mark"
                  color="#6377f5"
                  v-if="isShowIcon(topic, info)"
                ></u-icon> -->
              </view>
            </view>

            <u--textarea
              v-else
              @input="handleInputInfo($event, topic)"
              placeholder="请输入内容"
            ></u--textarea>

            <!-- 底部按钮 -->
            <view class="investigation-detail-content-list-btn">
              <u-button
                :disabled="index === 0"
                type="primary"
                :plain="true"
                customStyle="border:none;"
                size="small"
                align="center"
                text="上一题"
                @click="handleClickPer(index)"
              ></u-button>
              <u-button
                type="primary"
                :plain="true"
                :disabled="index === topicList.length - 1"
                customStyle="border:none;"
                size="small"
                align="center"
                text="下一题"
                @click="handleClickNext(index)"
              ></u-button>
            </view>
          </u-transition>
        </view>
      </view>
    </view>

    <view class="investigation-detail-bottom"></view>
    <view class="investigation-detail-bottom-two"></view>

    <button class="circle-button qu-btn" @click="handlerClickBtn">提交</button>
  </view>
</template>

<script>
import userMixin from "@/common/mixins/user";
import infoMixin from "@/common/mixins/info";
import { getRequestFilter } from "@/common/function";
import { getModelInfo, createModel, updateModel, getModelList } from "@/api";
export default {
  mixins: [userMixin, infoMixin],
  data() {
    return {
      // 请求所有题目
      topicList: [],
      currentAnswerIndex: -1,
      // 存储每道题选择的下标
      everyAnswerList: [],
      // 存储多选题答案数组
      multipleChoice: {},
      // 记录当前题目序号
      topicIndex: 0,
      // 判断是下一题还是上一题
      isNext: true,
      reqData: {},
    };
  },
  computed: {
    progressPercentage() {
      return (this.everyAnswerList.length / this.topicList.length) * 100;
    },
  },
  methods: {
    // 判断是否显示图标
    isShowIcon(topic, info) {
      let self = this;

      if (
        this.everyAnswerList.filter(
          (data) => data.questionTitle === topic.questionTitle
        ).length
      ) {
        let flag = false;
        this.everyAnswerList.forEach((item, index) => {
          if (item.questionTitle === topic.questionTitle) {
            // console.log(info, topic, item);
            if (self.everyAnswerList[index].answer.includes(info)) {
              flag = true;
            }
          }
        });
        return flag;
      } else {
        return false;
      }
    },
    handleInputInfo(event, topic) {
      let self = this;
      console.log(event, topic);
      if (
        this.everyAnswerList.filter(
          (data) => data.questionTitle === topic.questionTitle
        ).length
      ) {
        this.everyAnswerList.forEach((item, index) => {
          if (item.questionTitle === topic.questionTitle) {
            self.everyAnswerList[index].answer = event;
          }
        });
      } else {
        // 单选首次答题
        this.everyAnswerList.push({
          questionTitle: topic.questionTitle,
          answer: event,
        });
      }
    },
    // 点击显示
    handleClickInfo(topic, info) {
      let self = this;
      // 先判断改题目是选择题还是判断题
      if (topic.isSelect) {
        // 是选择题
        if (topic.is_single === "单选") {
          // TODO单选
          // 单选修改时
          if (
            this.everyAnswerList.filter(
              (data) => data.questionTitle === topic.questionTitle
            ).length
          ) {
            this.everyAnswerList.forEach((item, index) => {
              if (item.questionTitle === topic.questionTitle) {
                self.everyAnswerList[index].answer = [info];
              }
            });
          } else {
            // 单选首次答题
            this.everyAnswerList.push({
              questionTitle: topic.questionTitle,
              answer: [info],
            });
          }
        } else {
          // TODO多选
          if (
            this.everyAnswerList.filter(
              (data) => data.questionTitle === topic.questionTitle
            ).length
          ) {
            this.everyAnswerList.forEach((item, index) => {
              if (item.questionTitle === topic.questionTitle) {
                if (item.answer.includes(info)) {
                  // 判断是否存在，存在则需要删除
                  self.everyAnswerList[index].answer = self.everyAnswerList[
                    index
                  ].answer.filter((e) => e != info);
                } else {
                  self.everyAnswerList[index].answer.push(info);
                }

                if (self.everyAnswerList[index].answer.length == 0) {
                  self.everyAnswerList.splice(index, 1);
                }
              }
            });
          } else {
            // 首次答题
            this.everyAnswerList.push({
              questionTitle: topic.questionTitle,
              answer: [info],
            });
          }
        }
      } else {
        // 是问答题

        return;
      }
    },

    //点击上一题
    handleClickPer() {
      this.isNext = false;
      this.topicIndex -= 1;
    },
    handleClickNext() {
      this.topicIndex += 1;
    },

    // 获取详情信息
    async getDetailData(id) {
      const { data } = await getModelInfo("650a5c8e0538024e9740e342", id);
      this.reqData = data;
      this.topicList = data?.tableField109;
    },
    //
    async handlerClickBtn() {
      if (this.everyAnswerList.length !== this.topicList.length) {
        uni.showToast({
          title: "请将题目做完再提交",
          icon: "error",
        });

        return;
      }
      // 避免单人重复提交
      let filterData = getRequestFilter({
        creatorUserId: this.userInfo.id,
        questionId: this.reqData._id,
      });

      const selectResult = await getModelList(
        "650bb5b20538024e9740e396",
        filterData
      );

      let isHas = selectResult.data?.list.length;

      if (isHas) {
        // 已经提交过需要修改
        const data = await updateModel(
          "650bb5b20538024e9740e396",
          {
            tableField102: this.everyAnswerList,
            questionID: this.reqData._id,
          },
          selectResult.data?.list[0]._id
        );

        if (data.code === 200) {
          uni.showToast({
            title: "修改成功",
            icon: "success",
          });
        }
      } else {
        try {
          // 提交答案
          const data = await createModel("65434f85876f5a37067f186d", {
            tableField102: this.everyAnswerList,
            questionID: this.reqData._id,
          });

          if (data.code === 200) {
            uni.showToast({
              title: "提交成功",
              icon: "success",
            });

            uni.navigateBack({
              delta: 1,
            });
          }
        } catch (error) {
          uni.showToast({
            title: "提交失败",
            icon: "error",
          });
        }
      }
    },
  },
  onLoad(option) {
    let { id } = option;
    // console.log(id);
    this.getDetailData(id);
  },
};
</script>

<style lang="scss" scoped>
.investigation-detail {
  width: 100vw;
  min-height: 100vh;
  padding-top: 1px;
  box-sizing: border-box;
  background-color: #b1bbf5;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;
  position: relative;
  // text-align: center;

  &-header {
    margin: 15rpx;
    font-size: 24rpx;
    color: #333333;

    &-title {
      margin-bottom: 8rpx;
    }
  }

  &-loop {
    margin: 15rpx;
    // height: 707rpx;
    background: #fff;
    border-radius: 20rpx;
    padding: 40rpx;
    overflow: auto;
    opacity: 1;
    margin-bottom: 0;

    &-title {
      font-size: 36rpx;
      margin-bottom: 30rpx;
      text-align: center;
      font-weight: bold;
      color: #6377f5;
    }

    .investigation-detail-content {
      width: 100%;
      // height: 750rpx;
      // overflow: hidden;

      &-list {
        margin-top: 20rpx;
        overflow: hidden;

        &-row-title {
          //   font-size: 28rpx;
          margin-bottom: 40rpx;
        }

        .select-list {
          overflow: hidden;
        }

        &-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 80rpx;
          background: #eee;
          border-radius: 4rpx;
          // opacity: 0.2;
          margin-bottom: 40rpx;
          padding-right: 20rpx;

          .name {
            font-size: 28rpx;
            // color: #333333;
            margin-left: 56rpx;
          }
        }

        &-btn {
          display: flex;
        }
      }
    }
  }

  &-bottom {
    margin: 0 auto;
    width: 650rpx;
    height: 40rpx;
    background: #ffffff;
    border-radius: 0rpx 0rpx 20rpx 20rpx;
    opacity: 0.3;
  }

  &-bottom-two {
    margin: 0 auto;
    width: 600rpx;
    height: 30rpx;
    background: #ffffff;
    border-radius: 0rpx 0rpx 20rpx 20rpx;
    opacity: 0.2;
  }

  .qu-btn {
    // position: absolute;
    // bottom: 0;
    width: 80%;
    margin: 100rpx auto;
    margin-bottom: constant(safe-area-inset-bottom) !important;
    margin-bottom: env(safe-area-inset-bottom) !important;
  }
}

.currentItem {
  background-color: #6377f5 !important;
  color: #fff !important;
}
</style>
