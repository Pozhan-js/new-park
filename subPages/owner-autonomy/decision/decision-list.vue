<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-25 15:47:04
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-10-30 21:41:49
 * @FilePath: /smart-park/subPages/owner-autonomy/decision/decision-list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="decision-list">
    <view
      class="decision-list-item"
      @click="handleClickDetail(data._id)"
      v-for="data in decisionData"
      :key="data._id"
    >
      <view class="item-content">
        <view class="item-content-title flex-a-center-j-center">
          <image
            src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230906_791ed1e59fd14501a6555bf7f39dbbbf.png"
            mode=""
          />
          <view class="title"> {{ data.decisionTitle }} </view>
        </view>
        <u-line dashed></u-line>
        <view class="item-body">
          <view class="item-body-article">
            <view class="article-title text-1-hidden">
              {{ data.decisionIssue }}
            </view>
            <view class="article-content text-2-hidden">
              {{ data.description }}
            </view>
          </view>

          <view class="decision-button flex-a-center-j-space-between">
            <view
              class="button-reject flex-a-center-j-space-around"
              v-for="value in data.selectValue"
              :key="value"
            >
              <view>{{ value }}</view>
              <view>（{{ getDataLength(data, value) }}户）</view>
            </view>
          </view>
          <view class="join-text"
            >{{ userListLength(data) }}户参与决策投票</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getModelList } from "@/api";
import { getRequestFilter } from "@/common/function";
export default {
  data() {
    return {
      decisionData: [],
      allVoterList: {}, //总投票人数
      userList: {},
    };
  },
  methods: {
    handleClickDetail(id) {
      uni.navigateTo({
        url: `/subPages/owner-autonomy/decision/decision-detail?id=${id}`,
      });
    },

    // 获取所有决策数据
    async getDecisionDataList() {
      const { data } = await getModelList("64f93a574b635d6996a92a95");
      this.decisionData = data?.list || [];
      await getModelList("64f93b4e4b635d6996a92a97");
      const target = {};
      for (let val of this.decisionData) {
        let filterData = getRequestFilter({ decisionId: val._id });
        let { data } = await getModelList(
          "64f93b4e4b635d6996a92a97",
          filterData
        );
        target[val._id] = data?.list || [];
      }
      this.allVoterList = target;
    },

    // 获取每个选项的数据长度
    getDataLength(data, type) {
      return (
        this.allVoterList[data._id]?.filter((item) => {
          return item.result === type;
        }).length || 0
      );
    },
  },
  watch: {
    allVoterList: {
      handler(val) {
        this.userList = val;
      },
      deep: true,
    },
  },
  computed: {
    userListLength() {
      return (data) => {
        const userList = this.$data.userList;
        if (userList && userList[data._id]) {
          return userList[data._id].length;
        } else {
          // 当 userList[data._id] 不存在时返回一个默认值
          return 0;
        }
      };
    },
  },
  onShow() {
    this.getDecisionDataList();
  },
};
</script>

<style lang="scss" scoped>
.decision-list {
  width: 100vw;
  min-height: 100vh;
  background-color: #f8f9fd;
  padding: 20rpx 30rpx;
  box-sizing: border-box;
  margin-bottom: constant(safe-area-inset-bottom) !important;
  margin-bottom: env(safe-area-inset-bottom) !important;

  &-item {
    width: 100%;
    // height: 400rpx;
    box-sizing: border-box;
    padding: 0 40rpx;
    background: #ffffff;
    box-shadow: 0rpx 3rpx 14rpx 1rpx rgba(143, 143, 143, 0.1);
    border-radius: 20rpx;
    margin-bottom: 20rpx;

    .item-content {
      width: 100%;

      &-title {
        padding: 20rpx 0;

        > image {
          width: 45rpx;
          height: 36rpx;
          margin-right: 14rpx;
        }

        .title {
          font-size: 42rpx;
          font-weight: bold;
          color: #6377f5;
        }
      }

      .item-body {
        padding: 20rpx 0;

        &-article {
          height: 160rpx;
          background: #f9f9f9;
          border-radius: 10rpx;
          padding: 18rpx;
          box-sizing: border-box;
          margin-bottom: 16rpx;

          .article-title {
            font-size: 32rpx;
            font-weight: bold;
            color: #1f2329;
            padding-bottom: 10rpx;
          }
          .article-content {
            font-size: 28rpx;
            color: #999999;
          }
        }

        .decision-button {
          padding: 20rpx 0;
          flex-wrap: wrap;

          .button-allow {
            background: rgba(252, 63, 21, 0.1);
            @extend %btn;
            color: #fd4e28;
          }

          .button-reject {
            background: rgba(99, 119, 245, 0.1);
            @extend %btn;
            color: #6377f5;
          }
        }

        .text {
          font-size: 28rpx;
          color: #999999;
          margin-top: 16rpx;
        }

        .join-text {
          font-size: 28rpx;
          font-weight: bold;
          color: #6377f5;
          margin-top: 16rpx;
        }
      }
    }
  }
}
// TODO没有被继承就不会输出css
%btn {
  width: 295rpx;
  height: 60rpx;
  border-radius: 30rpx;
  text-align: center;
  line-height: 60rpx;
  font-size: 28rpx;
  font-weight: bold;
  margin-bottom: 20rpx;
}
</style>
