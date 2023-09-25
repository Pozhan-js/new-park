<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-10 09:58:30
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-08-23 14:42:45
 * @FilePath: /smart-park/subPages/main/activity/activity-detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="detail container">
    <!-- 轮播图 -->
    <view class="u-demo-block">
      <u-swiper
        :list="imageList"
        height="280"
        @change="(e) => (currentNum = e.current)"
        :autoplay="true"
        indicatorStyle="right: 20px"
      >
        <view slot="indicator" class="indicator-num">
          <text class="indicator-num__text"
            >{{ currentNum + 1 }}/{{ imageList.length }}</text
          >
        </view>
      </u-swiper>
    </view>

    <view class="detail-content">
      <view class="detail-content-title">
        <view class="title-icon"></view>
        <view class="title-text">{{ detailData.activity_title }}</view>
      </view>
      <view class="detail-content-list">
        <view class="item">
          <view class="item-title">活动截止时间</view>
          <view class="item-content"
            >{{
              $u.timeFormat(detailData.creatorTime, "yyyy-mm-dd hh:MM:ss")
            }}/{{
              $u.timeFormat(detailData.lastModifyTime, "yyyy-mm-dd hh:MM:ss")
            }}</view
          >
        </view>
        <view class="item">
          <view class="item-title">建议人数</view>
          <view class="item-content">{{ detailData.people_num }}</view>
        </view>
        <view class="item">
          <view class="item-title">活动地点</view>
          <view class="item-content">{{
            detailData.activity_location.address
          }}</view>
        </view>
        <view class="item">
          <view class="item-title">活动内容</view>
          <view class="item-content">
            <u-parse :content="detailData.activity_content"></u-parse>
          </view>
        </view>

        <view class="item">
          <view class="item-title">报名成员</view>
          <view class="item-content flex-a-center">
            <image
              v-for="item in detailData.activity_avatar"
              :key="item"
              :src="item"
              mode=""
            />
          </view>
        </view>
      </view>
    </view>

    <!-- 提交按钮 -->
    <view class="submit-btn flex-a-center">
      <view style="width: 50%"
        ><uni-fav
          :checked="check ? true : false"
          :content-text="contentText"
          class="favBtn"
          @click="favClick(detailData._id)"
      /></view>
      <view style="width: 50%">
        <u-button
          @click="handleJoinActivity(detailData._id)"
          shape="circle"
          color="#6377F5"
          :text="join ? '取消活动' : '参加活动'"
        ></u-button>
      </view>
    </view>
  </view>
</template>

<script>
import { createModel, deleteModel } from "@/api/index";
import { message } from "@/common/function/index";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      currentNum: 0,
      detailData: {},
      singleDataID: "",
      // // 收藏按钮
      contentText: {
        contentDefault: "收藏",
        contentFav: "取消收藏",
      },
      check: false,
      // 加入id
      join: "",
      // 收藏id
      collect: "",
      // 类型
      activityType: "",
      activityTitle: "",
    };
  },
  computed: {
    ...mapState("neighborhood", ["activityDetail"]),
    imageList() {
      return this.detailData?.activity_log || [];
    },
  },
  methods: {
    ...mapActions("neighborhood", ["getActivityDetail", "getActivityList"]),
    // 参加活动
    async handleJoinActivity(id) {
      if (!this.join) {
        // 64e2cb13d85a4b7b32ec579c
        const collectResult = await createModel("64e2cb13d85a4b7b32ec579c", {
          activity_id: id,
        });
        if (collectResult.code === 200) {
          this.getActivityList();
          message("报名成功", "success");
        }
      } else {
        const cancelResult = await deleteModel(
          "64e2cb13d85a4b7b32ec579c",
          this.join
        );
        if (cancelResult.code === 200) {
          this.getActivityList();
          message("取消收藏", "success");
          // 当从收藏列表页跳转到详情页时才会被调用
          uni.$emit("deleteId", { id });
        }
      }

      this.$forceUpdate();

      setTimeout(() => {
        uni.navigateBack({
          delta: 1,
        });
      }, 1000);
    },
    // 点击收藏按钮
    async favClick(id) {
      if (!this.check) {
        const collectResult = await createModel("64e2cabed85a4b7b32ec579b", {
          activity_id: this.singleDataID,
        });
        if (collectResult.code === 200) {
          this.check = true;
          this.getActivityList();
          message("收藏成功", "success");
        }
      } else {
        const cancelResult = await deleteModel(
          "64e2cabed85a4b7b32ec579b",
          this.collect
        );
        if (cancelResult.code === 200) {
          this.check = false;
          this.getActivityList();
          message("取消收藏", "success");
          // 当从收藏列表页跳转到详情页时才会被调用
          uni.$emit("deleteId", { id });
        }
      }
      this.$forceUpdate();

      setTimeout(() => {
        uni.navigateBack({
          delta: 1,
        });
      }, 1000);
    },
  },

  watch: {
    activityDetail: {
      handler(val) {
        this.detailData = {
          ...val,
          activity_log:
            val.activity_log?.map((data) => {
              return {
                ...data,
                url: this.$helper.filterCover(data.url),
              };
            }) || [],
        };
      },
      deep: true,
    },
  },

  onLoad(options) {
    // console.log("options", options);
    this.join = options.joinID;
    this.collect = options.collectID;
    this.singleDataID = options.id;
    this.activityType = options.type;
    this.activityTitle = options.title;
    if (!this.collect) {
      this.check = false;
    } else {
      this.check = true;
    }
    // 拿到id获取详情
    this.getActivityDetail({
      id: options.id,
    });
  },
};
</script>

<style lang="scss">
.detail {
  width: 100vw;

  &-content {
    padding: 14rpx 32rpx;
    background-color: #ffffff;
    padding-bottom: 120rpx;

    &-title {
      display: flex;
      align-items: center;
      margin-bottom: 20rpx;
      // overflow: hidden;

      .title-icon {
        width: 8rpx;
        height: 33rpx;
        // padding: 5rpx;
        margin-right: 20rpx;
        background-color: #6377f5;
      }

      .title-text {
        width: 90%;
        display: inline-block;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }
    }

    &-list {
      .item {
        margin-bottom: 20rpx;
        padding-bottom: 20rpx;
        border-bottom: 1px solid #d8d8d8;

        .item-title {
          height: 50rpx;
          font-size: 29rpx;
          color: #333333;
          line-height: 50rpx;
        }

        .item-content {
          // height: 50rpx;
          font-size: 29rpx;
          color: #999999;
          line-height: 50rpx;

          > image {
            width: 50rpx;
            height: 50rpx;
            margin-right: 18rpx;
          }
        }
      }
    }
  }

  .submit-btn {
    margin: 0 auto;
    position: fixed;
    bottom: 0rpx;
    width: 100%;
    padding: 32rpx;
    box-sizing: border-box;
    padding-bottom: constant(safe-area-inset-bottom) !important;
    padding-bottom: env(safe-area-inset-bottom) !important;
    background-color: #fff;
    z-index: 1;
  }
}

.indicator {
  @include flex(row);
  justify-content: center;

  &__dot {
    height: 6px;
    width: 6px;
    border-radius: 100px;
    background-color: rgba(255, 255, 255, 0.35);
    margin: 0 5px;
    transition: background-color 0.3s;

    &--active {
      background-color: #ffffff;
    }
  }
}

.indicator-num {
  padding: 2px 0;
  background-color: rgba(0, 0, 0, 0.35);
  border-radius: 100px;
  width: 35px;
  @include flex;
  justify-content: center;

  &__text {
    color: #ffffff;
    font-size: 12px;
  }
}
</style>

