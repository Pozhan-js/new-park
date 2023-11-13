<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-10 09:58:30
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-10 14:39:34
 * @FilePath: /smart-park/subPages/main/activity/activity-detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="detail container">
    <view v-if="!loading">
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
          <view class="item flex-a-center">
            <image
              style="width: 32rpx; height: 32rpx; margin: auto 0"
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231017_5a536a2927204fe7b6cba1bf0443a9e8.png"
              mode=""
            />
            <view class="nomal-fonts">
              <!-- <view class="item-title"></view> -->
              <view class="item-content">
                发起人: {{ detailData.launching_person || "匿名用户" }}</view
              >
            </view>
          </view>
          <view class="item flex-a-center">
            <image
              style="width: 32rpx; height: 32rpx; margin: auto 0"
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231018_1b460efa7414422986067c7c69a06ec4.png"
              mode=""
            />
            <view class="nomal-fonts">
              <view class="item-content">
                活动类型: {{ detailData.active_type }}</view
              >
            </view>
          </view>
          <!-- 召开时间 -->
          <view class="item flex-a-center">
            <image
              style="width: 32rpx; height: 32rpx; margin: auto 0"
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231018_5674ada7aadc43d2881a63c07e0d7042.png"
              mode=""
            />
            <view class="nomal-fonts">
              <view class="item-content">
                召开时间:
                {{
                  $u.timeFormat(detailData.hold_date, "yyyy-mm-dd") ||
                  "" + " " + detailData.hold_time ||
                  ""
                }}</view
              >
            </view>
          </view>
          <!-- 地址 -->
          <view class="item flex-a-center">
            <image
              style="width: 32rpx; height: 32rpx; margin: auto 0"
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231018_5aed1281b5ca482bb132e2cb331cdc66.png"
              mode=""
            />
            <view class="nomal-fonts">
              <view class="item-content">
                地点:
                {{ detailData.activity_location.address || "未知" }}</view
              >
            </view>
          </view>
          <!-- 未知导航按钮 -->
          <view
            class="navigation"
            @click="openLocation(detailData.activity_location)"
          >
            位置导航
          </view>

          <!-- 活动类型 -->
          <view class="item flex-a-center">
            <view class="nomal-fonts">
              <!-- <view class="item-title"></view> -->
              <view class="item-content">
                活动类型:
                <text style="font-size: 32rpx; color: #fb8753">
                  {{ detailData.active_type }}
                </text>
              </view>
            </view>
          </view>
          <!-- 是否免费 -->
          <view class="item flex-a-center">
            <view class="nomal-fonts">
              <!-- <view class="item-title"></view> -->
              <view class="item-content">
                是否免费:
                <text style="font-size: 32rpx; color: #fb8753">
                  {{ detailData.is_free ? "免费活动" : "付费活动" }}
                </text>
              </view>
            </view>
          </view>

          <!-- 建议人数 -->
          <view class="item flex-a-center">
            <image
              style="width: 32rpx; height: 32rpx; margin: auto 0"
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231018_d378ca6139844247979bf78bdd75f61e.png"
              mode=""
            />
            <view class="nomal-fonts">
              <view class="item-content">
                活动总人数:
                <text style="font-size: 32rpx; color: #ea2839">
                  {{ detailData.people_num }} 人
                </text>
              </view>
            </view>
          </view>

          <!-- 目前已报名 -->
          <view class="item flex-a-center">
            <image
              style="width: 32rpx; height: 32rpx; margin: auto 0"
              src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231018_2174201883a145898f829b96eb9d7238.png"
              mode=""
            />
            <view class="nomal-fonts">
              <view class="item-content">
                目前已报名人数:
                <text style="font-size: 32rpx; color: #fb8753">
                  {{ personMessage.length || 0 }} 人
                </text>
              </view>
            </view>
          </view>

          <view class="person-message" style="flex-wrap: wrap">
            <view
              style="margin: 0 10rpx 10rpx 0rpx"
              v-for="item in personMessage"
              :key="item"
            >
              <u-tag :text="item.roomName"></u-tag>
            </view>
          </view>

          <view class="item flex-a-center">
            <view class="nomal-fonts">
              <view class="item-content" style="color: #636676">
                <u-parse :content="detailData.activity_content"></u-parse>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- 提交按钮 -->
      <view class="submit-btn flex-a-center">
        <view style="width: 50%"
          ><uni-fav
            :checked="check ? true : false"
            :circle="true"
            :content-text="contentText"
            class="favBtn"
            @click="favClick(detailData._id)"
        /></view>
        <view style="width: 50%" v-if="isShowButton">
          <u-button
            @click="handleJoinActivity(detailData._id)"
            shape="circle"
            color="#6377F5"
            :text="join ? '取消活动' : '参加活动'"
          ></u-button>
        </view>
      </view>
    </view>

    <u-skeleton
      :loading="loading"
      :animate="loading"
      rows="11"
      :title="false"
      :rowsHeight="rowsHeightList"
    ></u-skeleton>
  </view>
</template>

<script>
import { createModel, deleteModel, getModelList } from "@/api/index";
import { getRequestFilter } from "@/common/function";
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
      // 人员信息ID
      personMessageID: [],
      personMessage: [],
      loading: true,
      rowsHeightList: [
        "280px",
        "28px",
        "28px",
        "28px",
        "28px",
        "28px",
        "28px",
        "28px",
        "28px",
        "28px",
        "28px",
        "28px",
      ],
    };
  },
  computed: {
    ...mapState("neighborhood", ["activityDetail"]),
    imageList() {
      return this.detailData?.activity_log || [];
    },

    // 是否显示按钮
    isShowButton() {
      let newTime = new Date().getTime();

      return newTime - this.detailData.activity_time?.[1] > 0 ? false : true;
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
    // 获取地址
    openLocation(data) {
      const { address, point } = data;
      uni.openLocation({
        latitude: point.lat,
        longitude: point.lng,
        address,
      });
    },
    // 获取所有报名该活动的人信息
    async getJoinActivity() {
      let filter = getRequestFilter({
        activity_id: this.singleDataID,
      });

      const { data } = await getModelList("64e2cb13d85a4b7b32ec579c", filter);
      this.personMessageID = data?.list.map((item) => item.creatorUserId);
      // console.log("所有报名人员", data);

      // 获取所有报名该活动的人信息
      for (let person of this.personMessageID) {
        let filterPerson = getRequestFilter({
          formUser: person,
        });
        const { data } = await getModelList(
          "64f6d064d85a4b7b32ec641d",
          filterPerson
        );
        // console.log("所有报名人员信息", data);
        this.personMessage.push(data?.list[0]);
      }
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
  onShow() {
    // // 延时2秒钟
    // uni.$u.sleep(2000).then(() => {
    //   this.loading = false;
    // });
  },

  onLoad(options) {
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
    }).then((res) =>
      uni.$u.sleep(2000).then(() => {
        this.loading = false;
      })
    );

    this.getJoinActivity();
  },
};
</script>

<style lang="scss">
.detail {
  width: 100vw;
  background-color: #f1f1f1;

  //导航过去的按钮
  .navigation {
    width: 120rpx;
    height: 50rpx;
    line-height: 50rpx;
    text-align: center;
    margin-left: 20rpx;
    background: #6377f5;
    color: #ffffff;
    border-radius: 25rpx;
    font-size: 22rpx;
    margin-bottom: 20rpx;
  }

  // 人员信息展示
  .person-message {
    display: flex;
  }

  &-content {
    padding: 14rpx 32rpx;
    background-color: #ffffff;
    padding-bottom: 120rpx;

    &-title {
      display: flex;
      align-items: center;

      .title-text {
        width: 90%;
        display: inline-block;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
        font-size: 32rpx;
        font-weight: bold;
        margin: 10rpx 0;
      }
    }

    &-list {
      .item {
        margin-bottom: 20rpx;
        padding-bottom: 20rpx;
        // border-bottom: 1px solid #d8d8d8;

        .nomal-fonts {
          font-size: 26rpx;
          flex: 1;
          margin-left: 10rpx;
          font-weight: 400;
          color: #636676;
        }

        .item-content {
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
