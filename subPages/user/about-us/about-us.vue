<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-24 15:25:46
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-24 16:57:08
 * @FilePath: /smart-park/subPages/user/about-us/about-us.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="about-us">
    <view class="about-us-list">
      <view class="item" v-for="item in aboutList" :key="item._id">
        <view class="item-title">{{ item.title }}</view>
        <view class="item-time">{{
          $u.timeFormat(item.creatorTime, "yyyy-mm-dd")
        }}</view>
        <image
          style="width: 100%; height: 280rpx"
          :src="getImage(item.image[0].url)"
          mode=""
        />
        <view
          class="item-descrption flex-a-center-j-space-between"
          @click="goToDetail(item)"
        >
          <view>{{ item.descrption }}</view>
          <u-icon name="arrow-right" size="16"></u-icon>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
export default {
  data() {
    return {
      aboutList: [],
    };
  },
  methods: {
    async getAboutUsList() {
      const { data } = await getModelList("65377419388a8c7a0eb9c59b");
      this.aboutList = data?.list;
      console.log(data);
    },

    getImage(url) {
      return this.$helper.filterCover(url);
    },

    // 跳转
    goToDetail(data) {
      uni.navigateTo({
        url: `/subPages/user/about-us/us-detail`,
        success: function (res) {
          // 通过eventChannel向被打开页面传送数据
          res.eventChannel.emit("usPageDetail", {
            data,
          });
        },
      });
    },
  },

  onLoad() {
    this.getAboutUsList();
  },
};
</script>

<style lang="scss" scoped>
.about-us {
  width: 100vw;
  height: fit-content;
  min-height: 100vh;
  background: #f4f5f7;
  padding: 30rpx;
  box-sizing: border-box;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;

  &-list {
    .item {
      background-color: #fff;
      border-radius: 16rpx;
      margin-bottom: 30rpx;

      &-title {
        padding: 20rpx;
        font-size: 32rpx;
        font-weight: 500;
        color: #000000;
      }

      &-time {
        font-size: 24rpx;
        color: #969dab;
        padding-left: 20rpx;
        margin-bottom: 20rpx;
      }

      &-descrption {
        padding: 20rpx;
        color: #666;
        font-size: 26rpx;
      }
    }
  }
}
</style>
