<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-09-19 15:39:22
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-13 14:59:25
 * @FilePath: /smart-park/subPages/main/more/more.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="more">
    <u-grid :border="false" col="4">
      <u-grid-item
        v-for="(baseListItem, baseListIndex) in baseList"
        @click="clickGridItem(baseListItem)"
        :key="baseListIndex"
      >
        <image
          :src="baseListItem.imageUrl"
          mode=""
          :style="{ width: '74rpx', height: '74rpx', marginTop: '20rpx' }"
        />
        <text class="grid-text">{{ baseListItem.title }}</text>
      </u-grid-item>
    </u-grid>
  </view>
</template>

<script>
export default {
  data() {
    return {
      baseList: [
        {
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230804_90c53937f86a49ea9141ecc72b79c9a8.png",
          title: "律师咨询",
          path: "/subPages/legal-advice/legal-advice",
        },
        {
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230804_49d47bdaf3d2401fb123ceda0db26e35.png",
          title: "养老健康",
          path: "/subPages/test/test",
        },
        {
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230621_9d4eab73b87143b3bda95f01e799a351.png",
          title: "审批认证",
          path: "/subPages/main/owner-review/owner-review",
        },
      ],
    };
  },
  methods: {
    //应用跳转方法
    clickGridItem(item) {
      if (item.path == "./") {
        uni.showToast({
          title: "暂未开放",
          icon: "none",
        });
      } else {
        uni.navigateTo({
          url: item.path,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.grid-text {
  font-size: 14px;
  color: #909399;
  padding: 10rpx 0 20rpx 0rpx;
  /* #ifndef APP-PLUS */
  box-sizing: border-box;
  /* #endif */
}
</style>
