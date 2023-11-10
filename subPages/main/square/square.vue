<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-28 14:40:31
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-08 14:55:55
 * @FilePath: /community-square/subPages/home/clear.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="square">
    <view class="square-container padding-20">
      <view
        class="square-container-item"
        v-for="(item, _) in squareList"
        @click="toDetail"
        :key="_"
      >
        <image
          style="width: 100%; height: 246rpx"
          :src="item.imageUrl"
          mode=""
        />
        <view class="title">{{ item.title }}</view>
        <view class="type">{{ item.type }}</view>
        <view class="price">{{ item.price }}</view>
      </view>
      <view class="square-container-item"></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      squareList: [
        {
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230728_3e7c406f36c44a6db4e52cbaa3cdde62.png",
          title: "日常保洁3小时",
          type: "每周一次 | 省心又洁净",
          price: "65元/小时起",
        },
        {
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230728_3e7c406f36c44a6db4e52cbaa3cdde62.png",
          title: "深度保洁4小时",
          type: "死角缝隙 | 除尘除垢",
          price: "65元/小时起",
        },
        {
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230728_a3d9a7619c3249c289f7ff56a1dce77f.png",
          title: "油烟机免拆洗",
          type: "日常清洁",
          price: "65元/小时起",
        },
        {
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230728_108c5ec2a5414dbdac84dfdf7c25dd42.png",
          title: "擦玻璃40平米",
          type: "日常清洁",
          price: "65元/小时起",
        },
        {
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230728_4411e32beb86460785983d39d5b6795d.png",
          title: "单/双开门冰箱清洗",
          type: "日常清洁",
          price: "65元/小时起",
        },
        {
          imageUrl:
            "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230728_7dabb25e91f34e68820c033d8bc0c328.png",
          title: "燃气热水机清洗",
          type: "日常清洁",
          price: "65元/小时起",
        },
      ],
    };
  },
  methods: {
    toDetail() {
      uni.navigateTo({
        url: "/subPages/main/square/detail",
      });
    },
  },
};
</script>

<style lang="scss">
.square {
  width: 100vw;

  &-container {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;

    &-item {
      border-radius: 20rpx 20rpx 0 0;

      .title {
        margin: 10rpx 0;
        font-size: 32rpx;
        font-weight: bold;
        color: #333333;
      }

      .type {
        margin: 10rpx 0;
        font-size: 24rpx;
        color: #333333;
      }

      .price {
        height: 40rpx;
        font-size: 28rpx;
        font-weight: bold;
        color: #ff0000;
        line-height: 40rpx;
      }
    }
  }
}
</style>
