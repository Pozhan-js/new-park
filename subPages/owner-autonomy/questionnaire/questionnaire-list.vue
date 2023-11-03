<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-09-20 11:05:35
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-03 10:46:00
 * @FilePath: /smart-park/subPages/owner-autonomy/questionnaire/questionnaire-list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="questionnaire-list">
    <view
      class="questionnaire-item flex-a-center"
      v-for="data in questionList"
      @click="toDetailPage(data._id)"
      :key="data._id"
    >
      <view class="image">
        <image :src="getImageUrl(data.url)" mode="" />
      </view>
      <view class="item-right">
        <view class="right-up" style="font-size: 32rpx">{{
          data.outline
        }}</view>
        <view class="right-down" style="font-size: 28rpx">{{
          data.toast
        }}</view>
      </view>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
export default {
  data() {
    return {
      questionList: [],
    };
  },
  methods: {
    // 获取图片
    getImageUrl(data) {
      return this.$helper.filterCover(data?.[0].url);
    },
    async getQuestionnaire() {
      const { data } = await getModelList("650a5c8e0538024e9740e342");
      // console.log(data);
      this.questionList = data?.list;
    },
    // 跳转到详情
    toDetailPage(id) {
      uni.navigateTo({
        url: `/subPages/owner-autonomy/questionnaire/questionnaire?id=${id}`,
      });
    },
  },
  onLoad() {
    this.getQuestionnaire();
  },
};
</script>

<style lang="scss" scoped>
%padding-box {
  padding: 20rpx;
  box-sizing: border-box;
}

.questionnaire-list {
  width: 100vw;
  height: 100vh;
  @extend %padding-box;
  background: #f5f7fb;

  .questionnaire-item {
    background-color: #fff;
    border-radius: 25rpx;
    @extend %padding-box;
    margin-bottom: 20rpx;

    .image {
      width: 120rpx;
      height: 120rpx;
      border-radius: 20rpx;
      overflow: hidden;
      margin-right: 20rpx;

      > image {
        width: 100%;
        height: 100%;
      }
    }

    .item-right {
      .right-up {
        font-size: 26rpx;
        font-weight: bold;
      }

      .right-down {
        font-size: 22rpx;
        color: #666;
        // font-weight: bold;
      }
    }
  }
}
</style>
