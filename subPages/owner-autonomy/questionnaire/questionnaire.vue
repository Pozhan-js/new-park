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
            <view class="investigation-detail-content-list-row-title">
              {{ topic.questionTitle }}
            </view>
            <view class="select-list" v-if="topic.isSelect">
              <view
                class="investigation-detail-content-list-item"
                v-for="(info, infoIndex) in checkoutInfoList"
                :key="info"
                @click="handleClickInfo(infoIndex, index)"
              >
                <view class="name">{{ info }}</view>
                <u-icon
                  name="checkbox-mark"
                  v-if="everyAnswerList[index] === infoIndex"
                ></u-icon>
              </view>
            </view>

            <u--textarea
              v-else
              v-model="everyAnswerList[index]"
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
      // 选择题选项
      checkoutInfoList: [],
      currentAnswerIndex: -1,
      // 存储最终答题结果
      answerDataList: [],
      // 存储每道题选择的下标
      everyAnswerList: [],
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
    // 点击显示
    handleClickInfo(index, titleIndex) {
      this.everyAnswerList.splice(titleIndex, 0, index);
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
      this.checkoutInfoList = data?.selectAnswer;
    },
    //
    async handlerClickBtn() {
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
            result: this.everyAnswerList,
            questionId: this.reqData._id,
            answerPerson: this.userInfo.id,
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
          const data = await createModel("650bb5b20538024e9740e396", {
            result: this.everyAnswerList,
            questionId: this.reqData._id,
            answerPerson: this.userInfo.id,
          });

          if (data.code === 200) {
            uni.showToast({
              title: "提交成功",
              icon: "success",
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
  height: 100vh;
  padding-top: 1px;
  box-sizing: border-box;
  background-color: #b1bbf5;
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
    overflow: hidden;
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
      height: 750rpx;
      // overflow: hidden;

      &-list {
        margin-top: 20rpx;
        overflow: hidden;

        &-row-title {
          margin-bottom: 10rpx;
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
            color: #333333;
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

  // &-footer {
  //   width: 100%;
  //   text-align: center;
  //   background-color: #6377f5;
  //   position: fixed;
  //   bottom: 0;
  //   font-size: 36rpx;
  //   font-weight: bold;
  //   color: #ffffff;
  //   padding-bottom: constant(safe-area-inset-bottom) !important;
  //   padding-bottom: env(safe-area-inset-bottom) !important;
  // }

  .qu-btn {
    // position: absolute;
    // bottom: 0;
    width: 80%;
    margin: 100rpx auto;
    margin-bottom: constant(safe-area-inset-bottom) !important;
    margin-bottom: env(safe-area-inset-bottom) !important;
  }
}

.transition {
  width: 100rpx;
  height: 100rpx;
  background-color: red;
}
</style>
