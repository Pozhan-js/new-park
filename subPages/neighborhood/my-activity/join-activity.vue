<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-06-25 14:29:51
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-08-22 17:03:09
 * @FilePath: /SmartPark/subPages/function/neighborhood-activities/my-self/my-collection.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="collection">
    <u-navbar :title="title" :placeholder="true" :autoBack="true"></u-navbar>
    <!-- tab-->
    <view class="collection-tab">
      <view class="tab-header">
        <u-tabs :list="list1" @click="clickTab" :lineWidth="60"></u-tabs>
      </view>
    </view>

    <!-- 参与活动列表 -->
    <view class="participation-container">
      <view
        class="participation-container-item"
        v-for="item in joinDataList"
        :key="item._id"
        @click="handleClickJoin(item.joinId, item._id)"
      >
        <image :src="item.activity_log.url" mode="" />
        <view class="participation-container-item-right">
          <view class="item-header text-hidden">
            {{ item.activity_title }}
          </view>
          <view class="item-footer flex-a-center text-hidden">
            <u-icon name="map" size="12"></u-icon>
            <view class="text-hidden">{{
              item.activity_location.address
            }}</view>
          </view>
          <view class="item-content flex-a-center">
            <u-icon name="clock" size="12"></u-icon>
            <view>{{
              $u.timeFrom(item.activity_time[0], "yyyy-mm-dd hh:MM:ss")
            }}</view>
          </view>

          <view class="item-btn">{{
            item.joinId ? "取消报名" : "立即报名"
          }}</view>
        </view>
      </view>
    </view>
    <!-- 我发布的 -->
    <!-- <view class="post-container" v-if="title == '我发布的'">
      <view
        class="post-container-item"
        v-for="item in filterList"
        :key="item._id"
      >
        <image :src="item.activity_log" mode="" />
        <view class="post-container-item-right">
          <view class="item-header">
            {{ item.activity_title }}
          </view>
          <view class="item-content">
            <view>{{ item.start_date }}</view>
          </view>
          <view class="item-footer">
            <view class="item-footer-delete">删除</view>
            <view class="item-footer-edit" @click="handleEditDetail(item)"
              >编辑</view
            >
          </view>
        </view>
      </view>
    </view> -->
    <!-- <u-loading-icon :show="loading"></u-loading-icon> -->
  </view>
</template>

<script>
import { dataInterface } from "@/api/index";
export default {
  data() {
    return {
      list1: [
        {
          name: "最新活动",
        },
        {
          name: "往期活动",
        },
      ],
      title: "",
      path: "",
      // 显示加载动画
      loading: false,
      tabIndex: 0,
      dataList: [],
      joinDataList: [],
      join: [],
      filterList: [],
    };
  },
  computed: {},
  watch: {
    dataList: {
      handler(val) {
        this.joinDataList = val
          .map((item) => {
            return {
              ...item,
              activity_log: {
                ...item.activity_log[0],
                url: this.$helper.filterCover(item.activity_log[0].url),
              },
            };
          })
          .filter((data) => {
            return data.joinId && data.activity_time[1] > new Date().getTime();
          });
      },
      deep: true,
    },
  },
  methods: {
    // 点击tab切换
    clickTab(e) {
      switch (e.name) {
        case "最新活动":
          this.joinDataList = this.dataList
            .map((item) => {
              return {
                ...item,
                activity_log: {
                  ...item.activity_log[0],
                  url: this.$helper.filterCover(item.activity_log[0].url),
                },
              };
            })
            .filter((data) => {
              return (
                data.joinId && data.activity_time[1] > new Date().getTime()
              );
            });
          break;
        case "往期活动":
          this.joinDataList = this.dataList
            .map((item) => {
              return {
                ...item,
                activity_log: {
                  ...item.activity_log[0],
                  url: this.$helper.filterCover(item.activity_log[0].url),
                },
              };
            })
            .filter((data) => {
              return (
                data.joinId && data.activity_time[1] < new Date().getTime()
              );
            });
          break;
        default:
          break;
      }
    },

    //
    changeTabIndex({ index }) {
      this.tabIndex = index;
    },
    // 点击收藏按钮
    handleClickJoin(joinId, id) {
      uni.navigateTo({
        url: `/subPages/neighborhood/detail/detail?joinID=${joinId || ""}&id=${
          id || ""
        }&type=${this.path}&title=${this.title}`,
      });
    },
    // 请求列表数据
    async getCollectActivityList() {
      const resultList = await dataInterface("64e32602642a000093003854");
      this.dataList = resultList?.data || [];
    },
  },
  onShow() {
    let that = this;
    uni.$on("deleteId", function (id) {
      // console.log(id);
      let indexNew;
      that.dataList.forEach((item, index) => {
        if (item._id == id) {
          indexNew = index;
        }
      });

      that.dataList.splice(indexNew, 1);

      if (!that.dataList.length) {
        that.$nextTick(() => (that.tabIndex = 0));
      }
    });
  },
  onLoad(option) {
    this.title = option.text;
    this.path = option.path;
    this.getCollectActivityList();
  },
};
</script>
</script>

<style lang="scss" scoped>
.collection {
  height: 100vh;
  overflow: hidden;
  padding: 32rpx;
  box-sizing: border-box;
  background: linear-gradient(165deg, #f4f8ff 0%, #edeff7 100%);

  &-tab {
    padding-bottom: 32rpx;
  }

  // 参与活动列表
  .participation-container {
    width: 100%;
    height: calc(100vh - 124rpx);
    background: #ffffff;
    border-radius: 17rpx;
    padding: 32rpx;
    box-sizing: border-box;
    padding-bottom: 96rpx;
    overflow: auto;

    &-item {
      display: flex;
      align-items: center;
      padding-bottom: 32rpx;
      margin-bottom: 20rpx;
      border-bottom: 1px solid #d8d8d8;

      &:last-child {
        border-bottom: none;
      }

      > image {
        width: 196rpx;
        height: 166rpx;
        flex-shrink: 0;
        margin-right: 18rpx;
      }

      &-right {
        width: 100%;
        position: relative;
        // height: 166rpx;
        // background: #f4f8ff;
        // border-radius: 17rpx;

        > view {
          width: 100%;
          margin-bottom: 12rpx;
          font-size: 25rpx;
          color: #999999;
        }

        .item-header {
          font-size: 33rpx;
          color: #333333;
          width: 332rpx;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
        }

        .item-footer {
          & > view {
            width: 280rpx;
            margin-left: 10rpx;
          }
        }

        .item-btn {
          width: 164rpx;
          height: 68rpx;
          background: #eeeeee;
          border-radius: 8rpx;
          font-size: 30rpx;
          color: #999999;
          line-height: 68rpx;
          text-align: center;
          position: absolute;
          margin: 0;
          right: 0;
          bottom: -10rpx;
        }
      }
    }
  }

  // 我发布的
  .post-container {
    width: 100%;
    height: calc(100vh - 158rpx);
    background: #ffffff;
    border-radius: 17rpx;
    padding: 32rpx;
    box-sizing: border-box;
    padding-bottom: 96rpx;
    overflow: auto;

    &-item {
      display: flex;
      align-items: center;
      padding-bottom: 32rpx;
      margin-bottom: 20rpx;
      border-bottom: 1px solid #d8d8d8;

      &:last-child {
        border-bottom: none;
      }

      > image {
        width: 196rpx;
        height: 166rpx;
        flex-shrink: 0;
        margin-right: 18rpx;
      }

      &-right {
        width: 100%;
        position: relative;
        // height: 166rpx;
        // background: #f4f8ff;
        // border-radius: 17rpx;

        view {
          margin-bottom: 12rpx;
          font-size: 25rpx;
          color: #999999;
        }

        .item-header {
          font-size: 33rpx;
          color: #333333;
          width: 332rpx;
          overflow: hidden; //超出的文本隐藏
          text-overflow: ellipsis; //溢出用省略号显示
          white-space: nowrap; //溢出不换行
        }
        .item-content {
          display: flex;
          align-items: center;
        }
        .item-footer {
          //   display: flex;
          //   align-items: center;

          &-edit {
            float: right;
            margin-right: 32rpx;
            color: #999999;
            float: right;
            width: 117rpx;
            height: 42rpx;
            border-radius: 21rpx;
            border: 2rpx solid #999999;
            line-height: 42rpx;
            text-align: center;

            &:active {
              color: #ffffff;
              background: #999999;
            }
          }
          &-delete {
            float: right;
            color: #ff1212;
            width: 117rpx;
            height: 42rpx;
            border-radius: 21rpx;
            border: 2rpx solid #ff1212;
            line-height: 42rpx;
            text-align: center;

            &:active {
              color: #ffffff;
              background: #999999;
            }
          }
        }
      }
    }
  }
}

.icon-star {
  color: #ffffff !important;
  background-color: #ecde4d !important;
}
</style>
