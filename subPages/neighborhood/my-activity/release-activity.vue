<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-06-25 14:29:51
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-08-23 12:40:29
 * @FilePath: /SmartPark/subPages/function/neighborhood-activities/my-self/my-collection.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="collection">
    <u-navbar :title="title" :placeholder="true" :autoBack="true"></u-navbar>
    <!-- tab-->
    <view class="collection-tab">
      <view class="tab-header">
        <u-tabs
          :list="list1"
          @click="clickTab"
          @change="changeTabIndex"
          :current="tabIndex"
          :lineWidth="60"
        ></u-tabs>
      </view>
    </view>

    <view class="post-container">
      <view
        class="post-container-item"
        v-for="item in releaseDataList"
        :key="item._id"
      >
        <image :src="item.activity_log.url" mode="" />
        <view class="post-container-item-right">
          <view class="item-header">
            {{ item.activity_title }}
          </view>
          <view class="item-content">
            <view>{{ item.start_date }}</view>
          </view>
          <view class="item-footer">
            <view
              class="item-footer-delete"
              @click="deleteActivityData(item._id)"
              >删除</view
            >
            <view class="item-footer-edit" @click="handleEditDetail(item)"
              >编辑</view
            >
          </view>
        </view>
      </view>
    </view>
    <!-- <u-loading-icon :show="loading"></u-loading-icon> -->
  </view>
</template>

<script>
// import filter from "@/common/function/filter.js";
import { getModelList, deleteModel } from "@/api/index";
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
      releaseDataList: [],
      filterList: [],
    };
  },
  computed: {},
  watch: {
    dataList: {
      handler(val) {
        this.releaseDataList = val
          .map((item) => {
            return {
              ...item,
              activity_log: {
                ...item.activity_log[0],
                url: this.$helper.filterCover(item.activity_log[0]?.url),
              },
            };
          })
          .filter((data) => {
            return data.activity_time[1] > new Date().getTime();
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
          this.releaseDataList = this.dataList
            .map((item) => {
              return {
                ...item,
                activity_log: {
                  ...item.activity_log[0],
                  url: this.$helper.filterCover(item.activity_log[0].url) || "",
                },
              };
            })
            .filter((data) => {
              return data.activity_time[1] > new Date().getTime();
            });
          break;
        case "往期活动":
          this.releaseDataList = this.dataList
            .map((item) => {
              return {
                ...item,
                activity_log: {
                  ...item.activity_log[0],
                  url: this.$helper.filterCover(item.activity_log[0].url) || "",
                },
              };
            })
            .filter((data) => {
              return data.activity_time[1] < new Date().getTime();
            });
          break;
        default:
          break;
      }
    },

    //当tab标签改变时 将改变的值赋值给变量
    changeTabIndex({ index }) {
      this.tabIndex = index;
    },

    // 点击编辑按钮
    handleEditDetail(data) {
      uni.navigateTo({
        url: `/subPages/neighborhood/pages/neighborhood-release`,
        success: (res) => {
          res.eventChannel.emit("releaseActivityEdit", {
            data,
          });
        },
      });
    },

    // 点击删除按钮删除数据
    async deleteActivityData(id) {
      const deleteResult = await deleteModel("64dc41e943432c56038f3005", id);
      if (deleteResult.code === 200) {
        this.getActivityList({
          filter: [
            {
              key: "creatorUserId",
              method: "eq",
              type: "field",
              value: ["currentUser"],
            },
          ],
        });
      }
      // if (!this.dataList.length) {
      //   this.$nextTick(() => (this.tabIndex = 0));
      // }
    },

    // 请求列表数据
    async getActivityList(data = {}) {
      const resultList = await getModelList("64dc41e943432c56038f3005", data);
      this.dataList = resultList.data?.list || [];
      this.$nextTick(() => (this.tabIndex = 0));
    },
  },
  onShow() {
    let that = this;
    uni.$on("deleteId", function (id) {
      console.log(id);
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

    // 条件筛选
    this.getActivityList({
      filter: [
        {
          key: "creatorUserId",
          method: "eq",
          type: "field",
          value: ["currentUser"],
        },
      ],
    });
  },
  onLoad(option) {
    this.title = option.text;
    this.path = option.path;
  },
};
</script>

<style lang="scss" scoped>
.collection {
  height: 100vh;
  overflow: scroll;
  padding: 32rpx;
  box-sizing: border-box;
  background: linear-gradient(165deg, #f4f8ff 0%, #edeff7 100%);
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;

  &-tab {
    padding-bottom: 32rpx;
  }

  // 我发布的
  .post-container {
    width: 100%;
    background: #ffffff;
    border-radius: 17rpx;
    padding: 32rpx;
    box-sizing: border-box;

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
  background-color: #ecde4d !important;
}
</style>
