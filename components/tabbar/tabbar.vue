<template>
  <view class="tab-block">
    <ul
      class="tab-list flex flex-center"
      :class="
        showMiddleButton === true ? 'tab-list-middle' : 'tab-list-default'
      "
    >
      <li
        v-for="(item, index) in tabList"
        :class="'list-item flex flex-column flex-middle ' + item.middleClass"
        @click="handlePush(item, index)"
        :key="index"
      >
        <view class="item-img-box">
          <image
            class="item-img"
            :src="tabIndex == index ? item.selectedIconPath : item.iconPath"
          />
        </view>
        <view
          class="item-text font-20 color-black"
          :class="{ specialColor: tabIndex == index }"
        >
          {{ item.text }}
        </view>
      </li>
    </ul>

    <!-- 兼容iPhonex下面的小黑条 -->
    <view class="tab-bar" v-show="showTabBar === true"></view>
  </view>
</template>

<script>
export default {
  props: {
    tabIndex: {
      //当前选中的tab项
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      /*
       * iconPath: 默认icon图片路径
       * selectedIconPath: 选中icon图片路径
       * text: tab按钮文字
       * pagePath:页面路径
       * middleClass:该按钮所有的特殊样式类名
       * tabList最小两项，最多五项
       * tabList长度为奇数时，中间按钮才会突出显示
       *
       */
      tabList: [
        {
          iconPath: "/static/image/tabbar/home.png",
          selectedIconPath: "/static/image/tabbar/home-active.png",
          text: "首页",
          pagePath: "/pages/index/index",
          middleClass: "",
        },
        {
          iconPath: "/static/image/tabbar/reserve.png",
          selectedIconPath: "/static/image/tabbar/reserve-active.png",
          text: "监督",
          pagePath: "/pages/server/server",
          middleClass: "",
        },
        {
          iconPath: "/static/image/tabbar/midButton.jpg",
          selectedIconPath: "/static/image/tabbar/midButton.jpg",
          text: "",
          pagePath: "/subPages/main/garden/garden",
          middleClass: "",
        },
        {
          iconPath: "/static/image/tabbar/info2.png",
          selectedIconPath: "/static/image/tabbar/info.png",
          text: "消息",
          pagePath: "/pages/message/message",
          middleClass: "",
        },

        {
          iconPath: "/static/image/tabbar/my.png",
          selectedIconPath: "/static/image/tabbar/my-active.png",
          text: "我的",
          pagePath: "/pages/user/user",
          middleClass: "",
        },
      ],
      showTabBar: false,
      showMiddleButton: false,
    };
  },
  computed: {
    getHeight() {
      return Number(this.height);
    },
  },
  mounted() {
    this.getSystemInfo();
    this.setTabBar();
  },
  methods: {
    //判断中间按钮是否突出显示，奇数or偶数，奇数突出
    setTabBar() {
      let tabLength = this.tabList.length;
      if (tabLength % 2) {
        // debugger;
        this.showMiddleButton = true;
        // 向上取整
        let middleIndex = Math.floor(tabLength / 2);
        // 给中间的添加mid-button
        this.tabList[middleIndex].middleClass = "mid-button";
      }
    },

    //点击按钮
    handlePush(item, index) {
      // console.log("item", item);
      if (this.tabIndex !== index) {
        uni.redirectTo({
          url: item.pagePath,
        });
      }
    },

    //兼容iPhoneX以上底部黑线条的显示
    getSystemInfo() {
      //获取系统信息
      uni.getSystemInfo({
        success: (res) => {
          // X及以上的异形屏top为44，非异形屏为20
          if (res.safeArea.top > 20) {
            this.showTabBar = true;
          }
        },
      });
    },
  },
};
</script>

<style lang="scss">
.specialColor {
  color: rgb(229, 113, 1);
}
.flex {
  display: flex;
  flex-flow: row wrap;
}

.flex-center {
  align-items: center;
  justify-content: center;
}

.flex-column {
  flex-direction: column;
}

.flex-middle {
  align-items: center;
}
.font-20 {
  font-size: 30rpx;
}
.tab-block {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  background-size: contain;
  width: 100vw;
  .tab-list {
    height: 100rpx;
  }
  .tab-list-default {
    background-color: #ffffff;
    border-top: 1px #dddddd solid;
  }
  .tab-list-middle {
    position: relative;
    background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230823_3c510d53072a4937a27bdb990c4c3053.png")
      no-repeat center center;
    background-size: cover;
  }
  .list-item {
    flex: 1;
    .item-img-box {
      width: 44rpx;
      height: 42rpx;
      margin-bottom: 9rpx;
      position: relative;
    }

    .item-img {
      width: 44rpx;
      height: 42rpx;
    }
  }

  .mid-button {
    position: relative;

    .item-img-box {
      width: 106rpx;
      height: 106rpx;
      margin-bottom: 9rpx;
      position: absolute;
      z-index: 1002;
      top: -108rpx;
      // top: -104rpx;
    }

    .item-img {
      width: 106rpx;
      height: 106rpx;
      border-radius: 50%;
    }

    .item-text {
      font-size: 20rpx;
      position: absolute;
      z-index: 1002;
      bottom: -40rpx;
    }
  }

  .tab-bar {
    height: 30rpx;
    background-color: #ffffff;
  }
}
</style>
