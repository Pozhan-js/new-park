<template>
  <view class="notice">
    <view class="notice-list">
      <!-- TODO：添加渲染判断条件 -->
      <view
        class="notice-item flex-a-center"
        v-for="item in filterDataList"
        :key="item.id"
        @click="handleClickDetail(item)"
      >
        <view class="image">
          <image :src="item.imageCover" mode="" />
        </view>
        <view>
          <view class="notice-item-top">
            {{ item.title }}
          </view>
          <view class="notice-item-bottom">
            <view class="icon" v-show="item.top === '是'">置顶</view>
            <view class="text"
              >公告 {{ $u.timeFrom(item.time[0], "yyyy-mm-dd") }}</view
            >
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import { mapGetters } from "vuex";
import helper from "@/common/helper";
import { getModelList } from "@/api/index";
export default {
  data() {
    return {
      msg: "公告列表",
      dataList: [],
      // filterDataList: [],
    };
  },
  computed: {
    // ...mapGetters("main", ["newNotice"]),

    filterDataList() {
      let arrIsTop = [];
      let arrNotTop = [];
      this.dataList.map((item) => {
        if (item.top === "是") {
          arrIsTop.push(item);
        } else {
          arrNotTop.push(item);
        }
      });
      arrIsTop.sort((a, b) => {
        // return b.lastModifyTime - a.lastModifyTime;
        return b.time[0] - a.time[0];
      });
      arrNotTop.sort((a, b) => {
        return b.time[0] - a.time[0];
      });

      return [...arrIsTop, ...arrNotTop];
    },
  },
  methods: {
    /**
     * @description: 点击公告列表跳转到公告详情
     * @return {*}
     */
    handleClickDetail(item) {
      uni.navigateTo({
        url: `/subPages/main/notice/notice-detail`,
        success: (res) => {
          res.eventChannel.emit("noticeListPageDetail", {
            data: item,
          });
        },
      });
    },

    //获取列表数据集
    async getNoticeList() {
      const { data } = await getModelList("64d2f5525d3fa95536f04c02");
      console.log(data);
      this.dataList = data?.list.map((item) => {
        return {
          title: item.title,
          image: helper.filterCover(item.cover_picture),
          imageCover: helper.filterCover(
            item["cover_picture_2"] || item["cover_picture"]
          ),
          read_num: item.reade_num,
          content: item.announcement_details,
          id: item._id,
          top: item.is_top,
          name: item.publisher,
          time: item?.activity_time || [],
          createTime: item.creatorTime,
        };
      });

      //  this.filterDataList = this.dataList
    },
  },
  async onLoad() {
    this.getNoticeList();
  },
};
</script>

<style lang="scss" scoped>
.notice {
  width: 100%;
  height: 100vh;
  padding: 32rpx;
  box-sizing: border-box;
  background: #f5f7fb;

  // 列表区域
  &-list {
    border-radius: 12rpx;
    background-color: #fff;
    box-sizing: border-box;
    padding: 32rpx;

    // 第一种渲染格式
    .notice-item {
      width: 100%;
      padding: 20rpx 0;
      // margin-bottom: 20rpx;
      border-bottom: 1px solid #e5e5e5;

      .image {
        width: 136rpx;
        height: 118rpx;
        border-radius: 20rpx;
        overflow: hidden;
        margin-right: 16rpx;
        flex-shrink: 0;

        > image {
          width: 100%;
          height: 100%;
        }
      }

      &-top {
        width: 500rpx;
        height: 46rpx;
        font-size: 32rpx;
        font-weight: 800;
        color: #252b50;
        line-height: 46rpx;
        overflow: hidden; //超出的文本隐藏
        text-overflow: ellipsis; //溢出用省略号显示
        white-space: nowrap; //溢出不换行
      }

      &-bottom {
        display: flex;
        font-size: 25rpx;
        padding: 20rpx 0;
        justify-content: flex-start;

        .icon {
          color: #ff4f4f;
          margin-right: 20rpx;
        }

        .text {
          color: #9296af;
        }
      }
    }
    // 第二种渲染格式
    .notice-item-img {
      display: flex;
      justify-content: space-between;

      &-left {
        width: 366rpx;

        .title {
          width: 366rpx;
          height: 100rpx;
          font-size: 33rpx;
          font-weight: 400;
          color: #333333;
          line-height: 50rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box; //作为弹性伸缩盒子模型显示。
          -webkit-box-orient: vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
          -webkit-line-clamp: 2; //显示的行
        }

        .text {
          margin-top: 38rpx;
          color: #9296af;
          font-size: 25rpx;
        }
      }

      &-right {
        width: 225rpx;
        height: 160rpx;
        background-color: aqua;
        border-radius: 9rpx;
        overflow: hidden;
      }
    }
  }
}
</style>
