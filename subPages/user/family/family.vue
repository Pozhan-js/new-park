<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-11-03 14:16:53
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-06 16:11:04
 * @FilePath: /smart-park/subPages/user/family/family.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="family page-box">
    <view class="family-item">
      <!-- 图标识别 -->
      <view class="type flex-a-center manager">
        <image
          style="width: 60rpx; height: 60rpx"
          src="https://kindoucloud.com:8011/api/file/Image/systemicon/ycj/20221227_249ae9d5470e447482048364768d46f3.png"
        ></image>
        <view class="type-info">
          {{ true ? "业主" : "" }}
        </view>
      </view>

      <!-- 业主用户信息 -->
      <view class="user-info flex-a-center">
        <u-avatar size="120rpx" :src="headerIcon"></u-avatar>
        <view class="user-info-text">
          <view class="name">{{ parentsInfo.realName }}</view>
          <view>
            <u--text
              mode="phone"
              :text="parentsInfo.mobilePhone + ''"
              format="encrypt"
            ></u--text>
          </view>
        </view>
      </view>

      <!-- 横线 -->
      <view>
        <u-line margin="20rpx 5rpx"></u-line>
        <view class="status success"> 通过 </view>
      </view>
    </view>

    <!-- TODO成员列表信息展示 -->
    <view class="family-item" v-for="info in infoList" :key="info._id">
      <!-- 图标识别 -->
      <view class="type flex-a-center">
        <image
          style="width: 60rpx; height: 60rpx"
          src="https://kindoucloud.com:8011/api/file/Image/systemicon/ycj/20221227_249ae9d5470e447482048364768d46f3.png"
        ></image>
        <view class="type-info">
          {{ info.parentsID ? "家属" : "" }}
        </view>
      </view>

      <!-- 成员用户信息 -->
      <view class="user-info flex-a-center">
        <u-avatar
          size="120rpx"
          src="/static/image/default-avatar.png"
        ></u-avatar>
        <view class="user-info-text">
          <view class="name">{{ info.nickName }}</view>
          <view>
            <u--text mode="phone" :text="info.phone" format="encrypt"></u--text>
          </view>
        </view>
      </view>

      <!-- 横线 -->
      <view>
        <u-line margin="20rpx 5rpx"></u-line>
        <view class="status success"> 通过 </view>
      </view>
    </view>

    <!-- 添加成员S -->
    <view class="fixed-bottom flex-center" @click="goAddUser">
      <view class="btn flex-center">
        <image
          style="width: 40rpx; height: 40rpx"
          src="https://kindoucloud.com:8011/api/file/Image/systemicon/ycj/20221227_c21bda2e937741a1aaa5359507090d07.png"
        >
        </image>

        <view class="btn-words">添加成员</view>
      </view>
    </view>
    <!-- 添加成员E -->
  </view>
</template>

<script>
import storage from "@/common/function/storage";
import config from "@/common/config";
import { getModelList } from "@/api";
import { getRequestFilter } from "@/common/function";
import infoMixin from "@/common/mixins/info";
export default {
  mixins: [infoMixin],
  data() {
    return {
      roomName: "c1栋106号",
      nickName: "xx",
      phone: "",
      parentsInfo: {},
      familyList: [],

      // 判断是否能添加该用户为成员(不能再用户列表中已注册的用户)
      infoList: [],
    };
  },
  computed: {
    headerIcon() {
      // 这个头像还需判断
      return config.baseURL + storage.get("UserInfo").headIcon;
    },
  },
  methods: {
    goAddUser() {
      uni.navigateTo({
        url: "/subPages/user/family/add-family",
      });
    },
    // 获取该用户的成员数据
    async getFamilyDataList() {
      let filterData = getRequestFilter({
        parentsID: storage.get("UserInfo").id,
      });

      let { data } = await getModelList("64f6d064d85a4b7b32ec641d", filterData);
      this.infoList = data?.list;
    },
  },
  onShow() {
    this.parentsInfo = storage.get("UserInfo");
    this.getFamilyDataList();
  },
};
</script>

<style lang="scss" scoped>
.family {
  background-color: #f1f1f1;

  &-item {
    margin-bottom: 30rpx;
    background: #fff;
    border-radius: 15rpx;
    position: relative;

    .type {
      position: absolute;
      border-radius: 15rpx 0 15rpx 0;
      padding: 0 15rpx;
      top: 0;
      color: #fff;
      background: #35a4df;
      left: 0;

      &-info {
        margin-left: 20rpx;
      }
    }

    .user-info {
      padding: 30rpx;
      padding-top: 80rpx;

      &-text {
        margin-left: 20rpx;

        .name {
          margin-bottom: 10rpx;
        }
      }
    }
    .manager {
      background: #47d27e !important;
    }
  }

  .status {
    text-align: right;
    color: #1cdfdf;
    font-size: 28rpx;
    padding: 10rpx;
    margin: 10rpx 0rpx;
  }

  .success {
    color: #47d27e !important;
  }
  .refuse {
    color: #d42424 !important;
  }

  .fixed-bottom {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding-bottom: 0;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);

    .btn {
      text-align: center;
      color: #ffffff;
      background: #6377f5;
      padding: 10rpx 30rpx;
      border-radius: 50rpx;
      .btn-words {
        margin-left: 15rpx;
        font-size: 36rpx;
      }
    }
  }
}
</style>
