<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-31 17:08:37
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-03 11:51:17
 * @FilePath: /smart-park/subPages/main/review-detail/review-detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="review-detail">
    <u-loading-page
      loading-text="全力加载中..."
      :loading="loadingPage"
    ></u-loading-page>
    <view class="review-detail-form">
      <view class="review-detail-form-item">
        <view class="review-detail-form-item-label">
          <text style="color: red">*</text>
          用户楼号
        </view>
        <view class="review-detail-form-item-content">
          <u--input
            placeholder="请输入内容"
            border="none"
            v-model="formData.roomName"
          ></u--input
        ></view>
      </view>

      <view class="review-detail-form-item">
        <view class="review-detail-form-item-label">
          <text style="color: red">*</text>名称</view
        >
        <view class="review-detail-form-item-content">
          <u--input
            placeholder="请输入内容"
            border="none"
            v-model="formData.nickName"
          ></u--input
        ></view>
      </view>

      <view class="review-detail-form-item">
        <view class="review-detail-form-item-label">
          <text style="color: red">*</text>性别</view
        >
        <view class="review-detail-form-item-content">
          <u--input
            placeholder="请输入内容"
            border="none"
            v-model="formData.sex"
          ></u--input
        ></view>
      </view>

      <view class="review-detail-form-item">
        <view class="review-detail-form-item-label">
          <text style="color: red">*</text>年龄</view
        >
        <view class="review-detail-form-item-content">
          <u--input
            placeholder="请输入内容"
            border="none"
            v-model="formData.age"
          ></u--input
        ></view>
      </view>

      <view class="review-detail-form-item">
        <view class="review-detail-form-item-label">
          <text style="color: red">*</text>电话号码
        </view>
        <view class="review-detail-form-item-content">
          <u--input
            placeholder="请输入内容"
            border="none"
            v-model="formData.phone"
          ></u--input>
        </view>
      </view>

      <view class="review-detail-form-item">
        <view class="review-detail-form-item-label">用户id</view>
        <view class="review-detail-form-item-content">
          <u--input
            placeholder="请输入内容"
            border="none"
            v-model="formData.formUser"
          ></u--input
        ></view>
      </view>
    </view>

    <!-- 底部按钮 -->
    <view class="btn-bottom flex-a-center">
      <view class="save" @click.stop="cancelBtn">取消</view>
      <view class="submit" @click.stop="submitFlowMessage">提交</view>
    </view>
  </view>
</template>

<script>
import { getFlowFormData, parseFlow } from "@/api";
import { sleep } from "@/common/function";
export default {
  data() {
    return {
      loadingPage: false,
      radiolist1: [
        {
          name: "待审核",
        },
        {
          name: "审核通过",
        },
        {
          name: "审核不通过",
        },
      ],
      // 表单信息
      formData: {},
      id: "",
      endId: "",
    };
  },
  methods: {
    async submitFlowMessage() {
      let result = await parseFlow(
        this.id,
        this.endId,
        JSON.stringify(this.formData)
      );
      uni.showToast({
        title: result.msg,
        duration: 600,
      });

      sleep(() => {
        if (result.code === 200) {
          this.cancelBtn();
        }
      }, 800);
    },
    // 返回上一页函数
    cancelBtn() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
  async onLoad(option) {
    // console.log(option);
    let { id, recordId } = option;
    this.id = id;
    this.endId = recordId;
    let { data } = await getFlowFormData(id, recordId);
    console.log(data);
    this.formData = JSON.parse(data.task.taskOperatorRecord[1].nodeData);
  },
};
</script>

<style lang="scss" scoped>
%btn-flex {
  display: flex;
  justify-content: center;
  align-items: center;
}

.review-detail {
  width: 100vw;
  min-height: 100vh;
  box-sizing: border-box;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;

  &-form {
    background-color: #fff;
    padding-bottom: 20rpx;
    position: sticky;
    top: 0;
    z-index: 99;

    &-item {
      font-size: 28rpx;
      color: #333;
      padding: 20rpx;
      border-bottom: 1px solid #f0f2f6;

      &:last-child {
        border-bottom: none;
      }

      &-label {
        width: 200rpx;
        margin-bottom: 20rpx;
        flex-shrink: 0;
      }
      &-content {
        flex-shrink: 0;
        width: 100%;
        overflow: auto;
      }
    }
  }

  .btn-bottom {
    z-index: 10;
    background-color: #fff;
    width: 100%;
    position: fixed;
    bottom: 0;
    border-top: 1rpx solid #eee;
    height: 100rpx;
    padding: 0;
    padding-bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
  }

  .save {
    background-color: #fff;
    height: 100rpx;
    font-size: 39rpx;
    flex: 1;
    @extend %btn-flex;
  }

  .submit {
    height: 100rpx;
    background: #4b8af8;
    color: #fff;
    font-size: 39rpx;
    flex: 1;
    @extend %btn-flex;
  }
}

::v-deep .u-radio {
  margin-right: 40rpx;
}
</style>
