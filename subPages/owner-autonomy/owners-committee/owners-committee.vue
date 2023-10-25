<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-23 11:23:39
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-24 11:52:07
 * @FilePath: /smart-park/subPages/owner-autonomy/owners-committee/owners-committee.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="owners-committee">
    <view class="search flex-a-center-j-center">
      <EasySelect placeholder="请输入关键字" />
    </view>

    <view class="owners-committee-choose flex-a-center-j-space-around">
      <view class="choose-item blue-box" @click="goUserOrganization">
        <text>组织架构</text>
      </view>
      <view class="choose-item orange-box" @click="goWorkReport">
        <text>工作汇报</text>
      </view>
    </view>

    <view class="owners-committee-report">
      <view class="report-header flex-a-center-j-space-between">
        <view class="report-header-left">工作汇报</view>
        <view class="report-header-right flex-a-center" @click="goWorkReport">
          <text>更多</text>
          <u-icon name="arrow-right" size="14" color="#999"></u-icon>
        </view>
      </view>
      <view class="report-body">
        <view class="report-body-item flex-a-center-j-space-between">
          <view class="report-body-item-left">
            <view class="left-title text-2-hidden">
              5月13日藏珑友邻义工第一次动员会
            </view>
            <view class="left-time flex-a-center">
              <u-icon name="clock" size="14" color="#999"></u-icon>
              <text style="margin-left: 10rpx">2023-05-13</text>
            </view>
          </view>
          <image
            style="width: 136rpx; height: 118rpx; border-radius: 6rpx"
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231023_d74e1dd16c614d879d5f9b1605436d58.png"
            mode=""
          />
        </view>
        <view class="report-body-item flex-a-center-j-space-between">
          <view class="report-body-item-left">
            <view class="left-title text-2-hidden">
              长沙市城区新建居民住宅供水设施建 设和管理办法宣传通稿
            </view>
            <view class="left-time flex-a-center">
              <u-icon name="clock" size="14" color="#999"></u-icon>
              <text style="margin-left: 10rpx">2023-04-29</text>
            </view>
          </view>
          <image
            style="width: 136rpx; height: 118rpx; border-radius: 6rpx"
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231023_cf7e0354a10d487a98ae1f4a75034631.png"
            mode=""
          />
        </view>
      </view>
    </view>

    <view class="owners-committee-user">
      <view class="user-header flex-a-center-j-space-between">
        <view class="user-header-left">组织架构</view>
        <view
          class="user-header-right flex-a-center"
          @click="goUserOrganization"
        >
          <text>更多</text>
          <u-icon name="arrow-right" size="14" color="#999"></u-icon>
        </view>
      </view>

      <view class="user-list flex-a-center-j-space-between">
        <view class="user-item flex-a-center" @click="goUserDetail">
          <image
            style="width: 50%; height: 100%"
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231023_80da2bd735364aec9cea8a94ddcad5c5.png"
            mode=""
          />
          <view class="user-info">
            <view class="name">里奥</view>
            <view class="data">36岁</view>
            <view class="data">党员</view>
            <view class="data">主席</view>
          </view>
        </view>
        <view class="user-item flex-a-center">
          <image
            style="width: 50%; height: 100%"
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231023_80da2bd735364aec9cea8a94ddcad5c5.png"
            mode=""
          />
          <view class="user-info">
            <view class="name">里奥</view>
            <view class="data">36岁</view>
            <view class="data">党员</view>
            <view class="data">主席</view>
          </view>
        </view>
        <view class="user-item flex-a-center">
          <image
            style="width: 50%; height: 100%"
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231023_80da2bd735364aec9cea8a94ddcad5c5.png"
            mode=""
          />
          <view class="user-info">
            <view class="name">里奥</view>
            <view class="data">36岁</view>
            <view class="data">党员</view>
            <view class="data">主席</view>
          </view>
        </view>
        <view class="user-item flex-a-center">
          <image
            style="width: 50%; height: 100%"
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231023_80da2bd735364aec9cea8a94ddcad5c5.png"
            mode=""
          />
          <view class="user-info">
            <view class="name">里奥</view>
            <view class="data">36岁</view>
            <view class="data">党员</view>
            <view class="data">主席</view>
          </view>
        </view>
        <view class="user-item flex-a-center">
          <image
            style="width: 50%; height: 100%"
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231023_80da2bd735364aec9cea8a94ddcad5c5.png"
            mode=""
          />
          <view class="user-info">
            <view class="name">里奥</view>
            <view class="data">36岁</view>
            <view class="data">党员</view>
            <view class="data">主席</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import EasySelect from "@/components/easy-select/easy-select.vue";
export default {
  data() {
    return {};
  },
  methods: {
    goWorkReport() {
      uni.navigateTo({
        url: "./work-report",
      });
    },
    goUserOrganization() {
      uni.navigateTo({
        url: "./user-organization",
      });
    },
    goUserDetail() {
      uni.navigateTo({
        url: "./user-detail",
      });
    },
  },
  components: {
    EasySelect,
  },
};
</script>

<style lang="scss" scoped>
.owners-committee {
  background: #f8f9fd;
  width: 100vw;
  min-height: 100vh;
  padding-bottom: constant(safe-area-inset-bottom) !important;
  padding-bottom: env(safe-area-inset-bottom) !important;

  .search {
    // height: 100px;
    padding: 30rpx 0;
    // background: #fff;
  }

  &-choose {
    .choose-item {
      width: 330rpx;
      height: 180rpx;
      padding: 30rpx;
      box-sizing: border-box;

      > text {
        font-size: 36rpx;
        font-weight: bold;
        color: #ffffff;
      }
    }
  }

  .orange-box {
    background-color: #e99762;
    background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231023_4c4107e837b341b3ad2e42d3db41642a.png");
    background-size: cover;
  }
  .blue-box {
    background-color: #61a3f4;
    background: url("https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20231023_e86d40e4a9f54b43aaf471ddfd616351.png");
    background-size: cover;
  }

  &-report {
    margin: 40rpx auto 26rpx;
    width: 690rpx;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 20rpx 1rpx rgba(178, 178, 178, 0.2);
    border-radius: 20rpx;
    padding: 20rpx 30rpx;
    box-sizing: border-box;

    .report-header {
      &-left {
        font-size: 34rpx;
        font-weight: 800;
        color: #1f2329;
      }

      &-right {
        font-size: 28rpx;
        color: #999999;
      }
    }

    .report-body {
      margin-top: 24rpx;
      width: 100%;

      &-item {
        margin-bottom: 44rpx;

        &-left {
          height: 118rpx;
          position: relative;

          .left-title {
            font-size: 28rpx;
            font-weight: bold;
            color: #333333;
          }

          .left-time {
            font-size: 26rpx;
            color: #999999;
            position: absolute;
            bottom: 0;
          }
        }

        > image {
          flex-shrink: 0;
        }
      }
    }
  }

  &-user {
    width: 690rpx;
    margin: 0 auto;
    border-radius: 20rpx;
    background: #ffffff;
    box-shadow: 0rpx 6rpx 20rpx 1rpx rgba(178, 178, 178, 0.2);
    padding: 20rpx 0;
    box-sizing: border-box;

    .user-header {
      box-sizing: border-box;
      padding: 0 30rpx;
      margin-bottom: 30rpx;

      &-left {
        font-size: 34rpx;
        font-weight: 800;
        color: #1f2329;
      }

      &-right {
        font-size: 28rpx;
        color: #999999;
      }
    }

    .user-list {
      flex-wrap: wrap;
      .user-item {
        flex-shrink: 0;
        width: 330rpx;
        height: 226rpx;
        background: #ffffff;
        box-shadow: 0rpx 6rpx 10rpx 1rpx rgba(146, 146, 146, 0.14);
        border-radius: 10rpx;
        margin-bottom: 30rpx;

        .user-info {
          > view {
            width: 165rpx;
            text-align: center;
            margin-bottom: 10rpx;
          }

          .name {
            height: 50rpx;
            font-size: 36rpx;
            font-weight: bold;
            color: #333333;
            line-height: 50rpx;
          }

          .data {
            font-size: 26rpx;
            color: #333333;
          }
        }
      }
    }
  }
}
</style>
