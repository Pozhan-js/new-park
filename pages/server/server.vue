<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-02 11:27:13
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-08-24 14:06:20
 * @FilePath: /smart-park/pages/server/server.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="server">
    <view class="server-container">
      <view
        class="server-container-item"
        v-for="item in dataList"
        :key="item._id"
      >
        <view class="item-description text-2-hidden">
          {{ item.description }}
        </view>
        <view class="item-image">
          <u-album
            :urls="item.image"
            :singleSize="100"
            :maxCount="3"
            keyName="url"
          ></u-album>
        </view>
        <view class="item-tools flex-a-center-j-space-between">
          <view class="item-tools-date flex-a-center">
            <u-icon size="12" name="clock"></u-icon>
            <view class="time">{{
              $u.timeFrom(item.creatorTime, "yyyy-mm-dd")
            }}</view>
          </view>

          <view class="item-tools-interactive flex-a-center">
            <view class="interactive flex-a-center">
              <u-icon name="thumb-up" size="16"></u-icon>
              <view class="thumb-up-num">452</view>
            </view>
            <view class="interactive flex-a-center">
              <u-icon name="more-circle" size="16"></u-icon>
              <view class="more-circle-num">89</view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view-tabbar tabIndex="1"></view-tabbar>
  </view>
</template>

<script>
import helper from "@/common/helper";
import { getModelList } from "@/api";
export default {
  data() {
    return {
      urls1: [
        {
          url: "https://cdn.uviewui.com/uview/album/1.jpg",
        },
        {
          url: "https://cdn.uviewui.com/uview/album/1.jpg",
        },
        {
          url: "https://cdn.uviewui.com/uview/album/1.jpg",
        },
        {
          url: "https://cdn.uviewui.com/uview/album/1.jpg",
        },
      ],
      // 接收数据
      shootCasuallyListData: [],
    };
  },
  computed: {
    dataList() {
      return this.shootCasuallyListData.map((data) => {
        return {
          ...data,
          image: data.image.map((item) => {
            return {
              ...item,
              url: helper.filterCover(item.url),
            };
          }),
        };
      });
    },
  },
  methods: {
    // 获取随手拍列表
    async getShootCasuallyList() {
      const res = await getModelList("64d1dcab8b140b0b56b6ed90");
      this.shootCasuallyListData = res.data?.list;
    },
  },
  onLoad() {
    this.getShootCasuallyList();
  },
};
</script>

<style lang="scss" scoped>
.server {
  width: 100vw;
  padding: 20rpx;
  box-sizing: border-box;
  background: #f4f5f7;
  min-height: 100vh;

  &-container {
    width: 100%;
    margin-bottom: 64px;

    &-item {
      width: 100%;
      background: #ffffff;
      box-shadow: 0rpx 6rpx 10rpx 1rpx rgba(229, 229, 229, 0.1);
      border-radius: 20rpx 20rpx 20rpx 20rpx;
      padding: 32rpx 38rpx;
      box-sizing: border-box;
      margin-bottom: 20rpx;

      .item-description {
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
      }

      .item-image {
        margin: 20rpx 0;
      }

      .item-tools {
        &-date {
          .time {
            font-size: 24rpx;
            color: #969dab;
            margin-left: 8rpx;
          }
        }

        &-interactive {
          .interactive {
            margin-left: 20rpx;

            .thumb-up-num {
              font-size: 24rpx;
              color: #969dab;
              margin-left: 8rpx;
            }

            .more-circle-num {
              font-size: 24rpx;
              color: #969dab;
              margin-left: 8rpx;
            }
          }
        }
      }
    }
  }
}
</style>