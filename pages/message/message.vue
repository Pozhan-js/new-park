<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-02 10:34:12
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-01 10:14:54
 * @FilePath: /smart-park/pages/message/message.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="message padding-32">
    <view class="message-header">
      <view
        class="message-header-item"
        v-for="item in iconList"
        :key="item.text"
      >
        <view class="message-header-item-icon">
          <image :src="item.url" />
          <!-- TODO 动态判断 角标是否显示 -->
          <view class="icon-badge" v-show="true">
            <u-badge :isDot="true" type="warning"></u-badge>
          </view>
        </view>
        <view class="message-header-item-text">
          {{ item.text }}
        </view>
      </view>
    </view>
    <view class="message-content">
      <uni-list>
        <uni-list :border="true">
          <!-- 右侧带角标 -->
          <uni-list-chat
            title="8栋2180号"
            avatar="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230710_8bd9bd6c7d774b50be3567f494b50fba.png"
            note="您收到一条新的消息"
            time="2020-02-02 20:20"
            badge-text="12"
            clickable
            @click="toChatPage"
          ></uni-list-chat>
          <uni-list-chat
            title="系统消息"
            avatar="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230710_2f841e5ff59d40fa82e59e04eb81a21b.png"
            note="您收到一条新的消息"
            time="2020-02-02 21:20"
            badge-text="12"
          ></uni-list-chat>
        </uni-list>
      </uni-list>
    </view>
    <view-tabbar tabIndex="3"></view-tabbar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      avatarList: [
        {
          url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
        },
        {
          url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
        },
        {
          url: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
        },
      ],
      iconList: [
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230808_fb70e08f6c8d40959dd9a4afe42ef4b9.png",
          text: "活动通知",
        },
        {
          url: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230808_3872a32a74a34b11b20c9c618a48dd9e.png",
          text: "系统通知",
        },
      ],
    };
  },
  methods: {
    toChatPage() {
      // console.log("xxxxxx");
      uni.navigateTo({
        url: "/subPages/message/chat",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.message {
  position: relative;
  background: #f4f5f7;
  min-height: 100vh;

  &-header {
    display: flex;
    // justify-content: space-between;
    width: 100%;
    margin-bottom: 20rpx;

    &-item {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      width: 25%;
      margin-right: 20rpx;

      &-icon {
        width: 82rpx;
        height: 82rpx;
        margin-bottom: 10rpx;
        position: relative;

        > image {
          width: 100%;
          height: 100%;
        }

        .icon-badge {
          position: absolute;
          top: 0;
          right: 0;
        }
      }

      &-text {
        width: 100%;
        height: 46rpx;
        font-size: 25rpx;
        font-weight: 400;
        color: #333333;
        line-height: 46rpx;
        text-align: center;
      }
    }
  }
}

.chat-custom-right {
  flex: 1;
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}

.chat-custom-text {
  font-size: 12px;
  color: #999;
}
</style>
