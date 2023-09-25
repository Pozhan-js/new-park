<template>
  <view class="active-my">
    <u-navbar bgColor="transparent" leftIconColor="#fff">
      <view slot="left"> </view>
    </u-navbar>

    <view class="active-my-header">
      <u-avatar size="80rpx" :src="avatar" />
      <view class="active-my-header-name">{{ realName }}</view>
    </view>

    <view class="active-my-container">
      <view
        class="active-my-container-item"
        v-for="(setting, index) in settingList"
        :key="index"
        @click="handleToMyActivity(setting)"
      >
        <view class="left">
          <image :src="setting.url" mode="" />
          <view>{{ setting.text }}</view>
        </view>
        <u-icon name="arrow-right" size="18"></u-icon>
      </view>
    </view>

    <!-- 底部导航栏 -->
    <u-tabbar
      :value="value6"
      @change="handleClick"
      :fixed="true"
      activeColor="#6377F5"
      :placeholder="true"
      :safeAreaInsetBottom="true"
    >
      <u-tabbar-item
        v-for="item in tabbarList"
        :key="item.text"
        :text="item.text"
        :icon="item.isActive ? item.activeUrl : item.url"
      ></u-tabbar-item>
    </u-tabbar>
  </view>
</template>

<script>
import infoMixin from "@/common/mixins/info";
import { mapGetters } from "vuex";
export default {
  mixins: [infoMixin],
  data() {
    return {
      // 底部导航栏数据
      value6: 2,
      tabbarList: [
        {
          url: "/static/image/tabbar/neighborhood/tabbar02.png",
          activeUrl: "/static/image/tabbar/neighborhood/tabbar01.png",
          pageUrl: "./neighborhood",
          text: "首页",
          name: 0,
          isActive: false,
        },
        {
          url: "/static/image/tabbar/neighborhood/tabbar05.png",
          activeUrl: "/static/image/tabbar/neighborhood/tabbar06.png",
          pageUrl: "./neighborhood-release",
          text: "发布",
          name: 1,
          isActive: false,
        },
        {
          url: "/static/image/tabbar/neighborhood/tabbar04.png",
          activeUrl: "/static/image/tabbar/neighborhood/tabbar03.png",
          text: "我的",
          pageUrl: "./neighborhood-my",
          name: 2,
          isActive: true,
        },
      ],
      settingList: [
        {
          text: "我发布的",
          path: "release",
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230621_06321d21111046ef9e1b4412a49ace35.png",
        },
        {
          text: "我参与的",
          path: "join",
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230621_0a6dca1cda5446fc9f75753fbff5293c.png",
        },
        {
          text: "我收藏的",
          path: "collect",
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230621_0fc748dd1c9e4951ba3324f6985e2b69.png",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("neighborhood", ["newActivityList"]),
  },
  methods: {
    // tabbar点击事件
    handleClick(name) {
      // console.log(name);
      this.tabbarList.forEach((item) => {
        if (item.name === name) {
          item.isActive = true;
          uni.redirectTo({
            url: item.pageUrl,
          });
        } else {
          item.isActive = false;
        }
      });
      this.value6 = name;
    },
    // 点击setting详跳转到我的活动
    handleToMyActivity(item) {
      uni.navigateTo({
        url: `/subPages/neighborhood/my-activity/${item.path}-activity?text=${item.text}&path=${item.path}`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.active-my {
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: auto;

  &::before {
    content: "";
    position: fixed;
    width: 100vw;
    height: 372rpx;
    top: 0;
    left: 0;
    background: #6377f5;
    box-shadow: 0rpx 6rpx 10rpx 1rpx rgba(0, 0, 0, 0.16);
    z-index: -1;
  }

  &-header {
    display: flex;
    align-items: center;
    margin: 164rpx 0 0 58rpx;

    view {
      height: 45rpx;
      font-size: 32rpx;
      font-weight: bold;
      color: #ffffff;
      line-height: 45rpx;
      margin-left: 20rpx;
    }
  }

  &-container {
    margin-top: 20rpx;
    border-radius: 80rpx;
    background: #ffffff;
    height: calc(100vh - 278rpx);
    padding: 58rpx 50rpx;
    box-sizing: border-box;

    &-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx 0;
      border-bottom: 1px solid #eee;

      .left {
        display: flex;
        align-items: center;

        > image {
          width: 38rpx;
          height: 38rpx;
          margin-right: 22rpx;
        }

        view {
          height: 45rpx;
          font-size: 32rpx;
          font-weight: bold;
          color: #333333;
          line-height: 45rpx;
        }
      }
    }
  }
}
</style>