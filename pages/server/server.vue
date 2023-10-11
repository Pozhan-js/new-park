<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-02 11:27:13
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-11 10:33:40
 * @FilePath: /smart-park/pages/server/server.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="server">
    <u-sticky bgColor="#f4f5f7">
      <u-tabs :list="tabList" lineWidth="30" @click="tabClick"></u-tabs>
    </u-sticky>

    <view class="server-container" v-if="dataList.length">
      <view
        class="server-container-item"
        v-for="item in dataList"
        :key="item._id"
      >
        <!-- 业主信息 -->
        <view class="item-info flex-a-center">
          <u-avatar :src="src"></u-avatar>
          <view class="item-info-num">{{
            item.showName ? "匿名用户" : item.roomNum
          }}</view>
        </view>
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
        <view class="item-address flex-a-center">
          <u-icon name="map-fill" size="16" color="#6377f5"></u-icon>
          <view class="address" style="margin-left: 10rpx">{{
            item.address
          }}</view>
        </view>
        <view class="item-tools flex-a-center-j-space-between">
          <view class="item-tools-date flex-a-center">
            <u-icon size="16" name="clock" color="#6377f5"></u-icon>
            <view class="time" style="font-size: 24rpx">{{
              isTimeOut(item.creatorTime)
            }}</view>
          </view>

          <view class="item-tools-interactive flex-a-center">
            <view class="interactive flex-a-center">
              <u-icon name="thumb-up" size="24"></u-icon>
              <view class="thumb-up-num">452</view>
            </view>
            <view class="interactive flex-a-center">
              <u-icon name="more-circle" size="24"></u-icon>
              <view class="more-circle-num">89</view>
            </view>
          </view>
        </view>

        <view class="dot">{{ item.questionType }}</view>
      </view>
    </view>
    <view class="empty" v-else>
      <u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/data.png">
      </u-empty>
    </view>
    <view-tabbar tabIndex="1"></view-tabbar>
  </view>
</template>

<script>
import { getRequestFilter } from "@/common/function";
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
      typeList: [],
      // 接收数据
      shootCasuallyListData: [],
      // 接收点赞数据
      thumbUpData: {},
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
    tabList() {
      return this.typeList.map((item) => {
        return {
          name: item,
        };
      });
    },
  },
  methods: {
    // 获取随手拍列表
    async getShootCasuallyList(type = "全部") {
      //显示加载框
      uni.showLoading({
        title: "加载中",
      });
      if (type === "全部") {
        const res = await getModelList("64d1dcab8b140b0b56b6ed90");
        this.shootCasuallyListData = res.data?.list;
      } else {
        let reqData = getRequestFilter({ questionType: type });
        const res = await getModelList("64d1dcab8b140b0b56b6ed90", reqData);
        this.shootCasuallyListData = res.data?.list;
      }

      // 获取分类
      let filterTypeData = getRequestFilter({
        key: "问题类型",
      });
      const result = await getModelList(
        "65250f6f388a8c7a0eb9b934",
        filterTypeData
      );

      this.typeList = result.data?.list[0].value;

      //隐藏加载框
      uni.hideLoading();
    },
    // 切换tab
    tabClick(item) {
      this.getShootCasuallyList(item.name);
    },
    // 判断时间是否超时
    isTimeOut(time) {
      let nowTime = Date.now();
      let isOut = (nowTime - time) / 1000 / 60 / 60 / 24;
      if (isOut > 30) {
        return uni.$u.timeFormat(time, "yyyy-mm-dd");
      } else {
        return uni.$u.timeFrom(time, "yyyy-mm-dd");
      }
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
  overflow: scroll;
  background: #f4f5f7;
  height: 100vh;

  &-container {
    padding: 20rpx;
    box-sizing: border-box;
    overflow: scroll;
    width: 100%;
    margin-top: 20rpx;
    // padding-bottom: 200rpx;
    padding-bottom: 64px;
    // margin-bottom: 200rpx;

    &-item {
      width: 100%;
      background: #ffffff;
      box-shadow: 0rpx 6rpx 10rpx 1rpx rgba(229, 229, 229, 0.1);
      border-radius: 20rpx;
      padding: 32rpx 38rpx;
      box-sizing: border-box;
      margin-bottom: 20rpx;
      position: relative;

      .item-description {
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
      }

      .item-image {
        margin: 20rpx 0;
      }

      .item-address {
        font-size: 24rpx;
        color: #969dab;
      }

      .item-tools {
        margin-top: 10rpx;

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

      .dot {
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 12rpx;
        width: 120rpx;
        height: 50rpx;
        font-size: 26rpx;
        padding: 4rpx 6rpx;
        background-color: #6377f5;
        color: #ffffff;
        line-height: 50rpx;
        text-align: center;
      }

      .item-info {
        margin-bottom: 20rpx;
        &-num {
          margin-left: 20rpx;
        }
      }
    }
  }
}
</style>
