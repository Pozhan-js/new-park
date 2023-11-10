<template>
  <view class="user-pages container">
    <navbar pages />
    <view
      class="user-pages-header relative padding-y-24 flex"
      :class="{ 'items-center': !isLogin }"
    >
      <u-avatar size="140rpx" :src="avatar" />
      <view v-if="isLogin" class="user-info flex-col flex-grow justify-evenly">
        <!-- <text class="user-name text_ellipsis">{{ realName }}</text> -->
        <text class="user-name text_ellipsis"
          >{{ userMessage.roomName || "" }}业主</text
        >
        <text class="study-days">{{ userInfo.realName || "" }}</text>
      </view>
      <view
        v-else
        class="login-btn color-white bg-theme radius-25"
        @click="handleLogin"
      >
        点击登录
      </view>
      <image
        class="head-bg absolute top-0"
        :src="$helper.getImage('', '20220829_9950d6ac472c4ad7bfe80a4d5511c3bf')"
      ></image>
    </view>

    <!-- 我的功能 -->
    <view class="user-pages-function">
      <view class="title">我的功能</view>
      <view class="function-list">
        <u-grid :border="false" @click="clickFunction" col="4">
          <u-grid-item v-for="(item, index) in baseList" :key="index">
            <image
              :style="{
                width: '72rpx',
                height: '72rpx',
                marginTop: '20rpx',
              }"
              :src="item.name"
              mode=""
            />
            <view
              v-if="item.title === '在线客服'"
              style="
                position: absolute;
                width: 72rpx;
                height: 72rpx;
                opacity: 0;
              "
            >
              <u-button type="primary" open-type="contact">联系客服</u-button>
            </view>
            <text class="grid-text">{{ item.title }}</text>
          </u-grid-item>
        </u-grid>
      </view>
    </view>

    <!-- <view
      class="user-pages-body bg-white radius-10 overflow-hidden padding-y-24 margin-t-24"
    >
      <u-cell-group :border="false">
        <u-cell
          v-for="(item, index) in cellList"
          :key="index"
          isLink
          center
          size="large"
          :icon="item.icon"
          :title="item.title"
          @click="handleCellClick(item)"
        />
      </u-cell-group>
    </view> -->

    <view-tabbar tabIndex="4"></view-tabbar>
  </view>
</template>

<script>
import { getModelList } from "@/api";
import { sleep } from "@/common/function";
import { getRequestFilter } from "@/common/function";
import infoMixin from "@/common/mixins/info";
export default {
  mixins: [infoMixin],
  data() {
    const getIcon = (icon) => `/static/image/icon/user/${icon}.png`;
    const getPath = (path) => `/subPages/user/${path}/${path}`;

    return {
      cellList: [
        { title: "设置", path: getPath("settings"), icon: getIcon("settings") },
      ],

      userMessage: {},
      baseList: [
        {
          name: "https://kindoucloud.com:8011/api/file/Image/systemicon/ycj/20221227_c6fe168a6c144764bffeb88abfb2c0e6.jpg",
          title: "家庭成员",
        },
        {
          name: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230710_a3582083257f4660a701803c168a6850.png",
          title: "我的活动",
        },
        {
          name: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230710_9512abd1beb24de8a901dc01e86fdae2.png",
          title: "产品建议",
        },
        {
          name: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230710_b4ee0fb76ed643b4bd1ab3c80dd288b0.png",
          title: "关于友邻",
        },
        {
          name: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230620_3b9b56c6a549470caa7ffa7612f6d905.png",
          title: "在线客服",
        },
        {
          name: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230710_2e92a8a1ddf342e388f40412ff5ef1c1.png",
          title: "上报的隐患",
        },
        {
          name: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230710_4b5e71a3e1a14377a64540a3997749b4.png",
          title: "设置中心",
        },
        {
          name: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230710_ff12c362af984e8c8a02354bbf862b34.png",
          title: "退出登录",
        },
      ],
    };
  },
  computed: {
    studyDays() {
      return 0;
    },
  },
  methods: {
    handleLogin() {
      this.$jump("/subPages/user/login/login");
    },
    handleCellClick(item) {
      if (!item.path) this.$message("功能开发中...", "none");
      else this.$jump(item.path);
    },
    async getUserMessage() {
      let filterData = getRequestFilter({
        formUser: this.userInfo.id,
      });
      const { data: res } = await getModelList(
        "64f6d064d85a4b7b32ec641d",
        filterData
      );

      this.userMessage = res?.list[0] || {};
    },

    clickFunction(name) {
      switch (name) {
        case 0:
          // 判断是否有权限 有权限在跳转
          this.$jump("/subPages/user/family/family");
          break;
        case 1:
          this.$jump("/subPages/user/user-activity/user-activity");
          break;
        case 2:
          this.$jump("/subPages/user/product-opinions/product-list");
          break;
        case 3:
          this.$jump("/subPages/user/about-us/about-us");
          break;
        case 4:
          break;
        case 5:
          this.$jump("/subPages/main/say-some/say-some");
          break;
        case 6:
          this.$jump("/subPages/user/settings/userInfo");
          break;
        case 7:
          this.quit();
          break;
        default:
          this.$message("功能开发中...", "none");
          return;
      }
      // this.$refs.uToast.success(`点击了第${name}个`);
    },
    quit() {
      this.$model("提示", "是否确认退出？").then((e) => {
        if (e.confirm) {
          const duration = 600;
          uni.showLoading({ mask: true });
          this.$store.dispatch("user/logout");
          sleep(() => {
            uni.hideLoading();
            this.$message("退出成功", { duration });
            sleep(() => {
              uni.reLaunch({ url: "/pages/user/user" });
              // console.log("函数执行");
            }, duration);
          }, 600);
        }
      });
    },
  },
  async onShow() {
    this.getUserMessage();
  },
};
</script>
<style lang="scss" scoped>
.user-pages {
  position: relative;
  padding: 0 5%;
  &-header {
    margin-top: 16rpx;
    ::v-deep > .u-avatar {
      margin-right: 36rpx;
    }
    .login-btn {
      width: 180rpx;
      height: 80rpx;
      font-size: 30rpx;
      text-align: center;
      line-height: 80rpx;
    }
    .user-info {
      .user-name {
        max-width: 7em;
        font-size: 40rpx;
        color: #333;
      }
      .study-days {
        color: #969dab;
      }
    }
    .head-bg {
      width: 232rpx;
      right: 32rpx;
      height: 100%;
    }
  }

  &-function {
    margin: 40rpx 0;
    background: #fff;
    border-radius: 20rpx;

    .title {
      padding: 30rpx 30rpx 0 30rpx;
      height: 54rpx;
      font-size: 34rpx;
      font-weight: 500;
      color: #000000;
      line-height: 54rpx;
    }
  }
  ::v-deep .u-cell:last-child > .u-cell__body + view {
    // 隐藏最后一个下划线
    display: none;
  }
  ::v-deep .u-cell__title-text {
    font-weight: bold;
    text-indent: 0.8em;
  }
}

.grid-text {
  font-size: 16px;
  color: #909399;
  padding: 10rpx 0 20rpx 0rpx;
  /* #ifndef APP-PLUS */
  box-sizing: border-box;
  /* #endif */
}
</style>
