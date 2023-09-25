<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-13 14:11:59
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-18 12:25:36
 * @FilePath: /SmartPark/subPages/function/self-government/another/elevator-safety/device-List.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 data: 2021-07-13 14:11:59
-->
<template>
  <view class="device-list padding-20">
    <view class="device-list-search">
      <u-search
        placeholder="请输入电梯位置"
        :showAction="false"
        v-model="keyword"
      ></u-search>
    </view>

    <view class="device-list-tabs">
      <u-tabs
        :list="list1"
        @click="clickTabs"
        lineColor="#54D8A5"
        :activeStyle="{ color: '#54D8A5' }"
        :scrollable="false"
      ></u-tabs>
    </view>

    <view class="device-list-content">
      <u-grid :border="false" col="2">
        <u-grid-item
          v-for="(baseListItem, baseListIndex) in currentList"
          @click="toDetail(baseListItem.detailID)"
          :key="baseListIndex"
        >
          <view class="grid-content-item padding-24">
            <view
              class="grid-content-item-header flex-a-center-j-space-between"
            >
              <view class="left flex-a-center">
                <view
                  class="dot"
                  :style="{
                    background: baseListItem.erroreType ? '#FE0404' : '',
                  }"
                ></view>
                <view
                  class="header-title"
                  :style="{ color: baseListItem.erroreType ? '#FE0404' : '' }"
                >
                  {{
                    baseListItem.erroreType
                      ? baseListItem.erroreType
                      : "电梯正常"
                  }}
                </view>
              </view>
              <view class="right" v-if="baseListItem.isEyes">{{
                baseListItem.isEyes ? "已关注" : ""
              }}</view>
            </view>
            <view class="grid-content-item-body">
              <view>{{ baseListItem.deviceAddress }}</view>
              <view>{{ baseListItem.deviceNumber }}</view>
            </view>
            <view
              class="grid-content-item-footer flex-a-center-j-space-between"
            >
              <view class="footer-text">维护人员</view>
              <view class="score">
                <text :style="{ color: '#FFCC0E' }">
                  {{ baseListItem.feedbackPerson }}
                </text>
              </view>
            </view>
          </view>
        </u-grid-item>
      </u-grid>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
export default {
  data() {
    return {
      keyword: "",
      list1: [
        {
          name: "全部",
        },
        {
          name: "正常",
        },
        {
          name: "异常",
        },
      ],
      baseList: [],
      currentList: [],
    };
  },
  methods: {
    clickTabs(e) {
      //   console.log(e);
      switch (e.name) {
        case "全部":
          this.currentList = this.baseList;
          break;
        case "正常":
          this.currentList = this.baseList.filter((item) => !item.erroreType);
          break;
        case "异常":
          this.currentList = this.baseList.filter((item) => item.erroreType);
          break;

        default:
          break;
      }
    },

    // 跳转到详情页面
    toDetail(id) {
      uni.navigateTo({
        url: `./device-detail?id=${id}`,
      });
    },

    // 获取列表数据
    async getDeviceDataList() {
      const { data } = await getModelList("6506bd0e0538024e9740e266");
      this.baseList = data?.list;
      this.currentList = this.baseList;
    },
  },
  computed: {},
  async onLoad() {
    this.getDeviceDataList();
  },
};
</script>

<style lang="scss" scoped>
$color: #54d8a5;

.device-list {
  width: 100vw;

  &-search {
    margin-bottom: 20px;
  }

  &-tabs {
    margin-bottom: 20px;
  }

  &-content {
    height: calc(100vh - 64px - 34px - 40px);
    overflow-y: scroll;
    padding-bottom: 60rpx;

    .grid-content-item {
      width: 325rpx;
      height: 270rpx;
      background: #ffffff;
      box-shadow: 6rpx 6rpx 16rpx 1rpx rgba(214, 214, 214, 0.41);
      border-radius: 20rpx;
      margin-top: 20rpx;

      &-header {
        .dot {
          width: 13rpx;
          height: 13rpx;
          background: $color;
          margin-right: 14rpx;
        }

        .header-title {
          height: 32rpx;
          font-size: 24rpx;
          font-weight: bold;
          color: $color;
          line-height: 32rpx;
        }

        .right {
          height: 30rpx;
          font-size: 22rpx;
          color: #ffcc0e;
          line-height: 30rpx;
        }
      }

      &-body {
        margin: 34rpx 0;
        text-align: center;
        font-size: 32rpx;
        font-weight: 800;
        color: #333333;
      }

      &-footer {
        font-size: 22rpx;
        color: #333333;

        text {
          font-size: 36rpx;
          color: $color;
        }
      }
    }
  }
}
</style>
