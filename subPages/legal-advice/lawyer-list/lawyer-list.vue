<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-06-25 20:10:46
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-08-11 16:14:09
 * @FilePath: /SmartPark/subPages/function/legal-aid/lawyer-list/lawyer-list.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="lawyer-list">
    <!-- 搜索框 -->
    <view class="search padding-30">
      <u-search
        placeholder="请输入关键字"
        v-model="keyword"
        :clearabled="true"
        :showAction="false"
      ></u-search>
    </view>
    <!-- 列表容器 -->
    <view class="lawyer-list-container">
      <view class="lawyer-list-container-item">
        <image
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230626_6ad4837e355743caba539796f34fa376.png"
          mode=""
        />
        <view class="lawyer-list-container-item-right">
          <view class="lawyer-list-container-item-right-header">
            <view class="title">利欧律师</view>
            <view class="price">¥<text>208</text>起</view>
          </view>
          <view class="lawyer-list-container-item-right-time">执行12年</view>
          <view class="lawyer-list-container-item-right-type">
            <view>擅长</view>
            <view class="type-item">借款借贷</view>
            <view class="type-item">劳动工伤</view>
            <view class="type-item">侵权纠纷</view>
          </view>
          <view class="lawyer-list-container-item-right-count">
            <view class="count-item">2652 人咨询</view>
            <view class="count-item">264 条评价</view>
          </view>

          <view class="lawyer-list-container-item-right-score">
            <view class="score-left">
              <image
                v-for="item in 5"
                :key="item"
                src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230626_dd9499a972be4409b7127ed5125842ba.png"
                mode=""
              />
              <view>5分</view>
            </view>
            <view class="score-right">私聊</view>
          </view>
        </view>
      </view>
      <view class="lawyer-list-container-item">
        <image
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230626_3a8ea7a673784c459eb9521bcb167808.png"
          mode=""
        />
        <view class="lawyer-list-container-item-right">
          <view class="lawyer-list-container-item-right-header">
            <view class="title">王佳律师</view>
            <view class="price">¥ <text>128</text> 起</view>
          </view>
          <view class="lawyer-list-container-item-right-time">执行8年</view>
          <view class="lawyer-list-container-item-right-type">
            <view>擅长</view>
            <view class="type-item">借款借贷</view>
            <view class="type-item">劳动工伤</view>
            <view class="type-item">侵权纠纷</view>
          </view>
          <view class="lawyer-list-container-item-right-count">
            <view class="count-item">2652 人咨询</view>
            <view class="count-item">264 条评价</view>
          </view>

          <view class="lawyer-list-container-item-right-score">
            <view class="score-left">
              <image
                src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230626_dd9499a972be4409b7127ed5125842ba.png"
                mode=""
              />
              <view>5分</view>
            </view>
            <view class="score-right">私聊</view>
          </view>
        </view>
      </view>
      <view class="lawyer-list-container-item">
        <image
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230626_59debb89d9b245fda4cbcb8893c25c39.png"
          mode=""
        />
        <view class="lawyer-list-container-item-right">
          <view class="lawyer-list-container-item-right-header">
            <view class="title">李婷律师</view>
            <view class="price">¥ <text>168</text> 起</view>
          </view>
          <view class="lawyer-list-container-item-right-time">执行10年</view>
          <view class="lawyer-list-container-item-right-type">
            <view>擅长</view>
            <view class="type-item">借款借贷</view>
            <view class="type-item">劳动工伤</view>
            <view class="type-item">侵权纠纷</view>
          </view>
          <view class="lawyer-list-container-item-right-count">
            <view class="count-item">2652 人咨询</view>
            <view class="count-item">264 条评价</view>
          </view>

          <view class="lawyer-list-container-item-right-score">
            <view class="score-left">
              <image
                src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230626_dd9499a972be4409b7127ed5125842ba.png"
                mode=""
              />
              <view>5分</view>
            </view>
            <view class="score-right">私聊</view>
          </view>
        </view>
      </view>
      <view class="lawyer-list-container-item">
        <image
          src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230626_e83fa8714af148a9a91ac63cfdab422f.png"
          mode=""
        />
        <view class="lawyer-list-container-item-right">
          <view class="lawyer-list-container-item-right-header">
            <view class="title">姜丹律师</view>
            <view class="price">¥ <text>68</text> 起</view>
          </view>
          <view class="lawyer-list-container-item-right-time">执行6年</view>
          <view class="lawyer-list-container-item-right-type">
            <view>擅长</view>
            <view class="type-item">借款借贷</view>
            <view class="type-item">劳动工伤</view>
            <view class="type-item">侵权纠纷</view>
          </view>
          <view class="lawyer-list-container-item-right-count">
            <view class="count-item">2652 人咨询</view>
            <view class="count-item">264 条评价</view>
          </view>

          <view class="lawyer-list-container-item-right-score">
            <view class="score-left">
              <image
                src="https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230626_dd9499a972be4409b7127ed5125842ba.png"
                mode=""
              />
              <view>5分</view>
            </view>
            <view class="score-right">私聊</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      data() {
        return {
          keyword: "",
        };
      },
    };
  },
};
</script>

<style lang="scss" scoped>
.lawyer-list {
  width: 100vw;

  &-container {
    padding: 0 40rpx;
    margin-top: 20rpx;

    &-item {
      display: flex;
      align-items: center;
      margin-bottom: 32rpx;

      > image {
        width: 166rpx;
        height: 255rpx;
        margin-right: 32rpx;
        margin-bottom: 32rpx;
        flex-shrink: 0;
      }

      &-right {
        width: 100%;
        border-bottom: 1rpx solid #e5e5e5;

        &-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8rpx;

          .title {
            height: 50rpx;
            font-size: 36rpx;
            font-weight: bold;
            color: #333333;
            line-height: 50rpx;
          }

          .price {
            height: 50rpx;
            font-size: 24rpx;
            font-weight: bold;
            color: #fb4e4e;
            line-height: 50rpx;

            text {
              font-size: 36rpx;
              font-weight: bold;
              color: #fb4e4e;
            }
          }
        }

        &-time {
          height: 38rpx;
          font-size: 26rpx;
          color: #333333;
          line-height: 38rpx;
          margin-bottom: 8rpx;
        }

        &-type {
          display: flex;
          align-items: center;
          margin-bottom: 8rpx;

          view {
            height: 38rpx;
            font-size: 26rpx;
            color: #333333;
            line-height: 38rpx;
            margin-right: 20rpx;
          }

          .type-item {
            height: 40rpx;
            background: #f5f5f5;
            padding: 0 8rpx;
            border-radius: 6rpx 6rpx 6rpx 6rpx;
            font-size: 24rpx;
            color: #999999;
            line-height: 40rpx;
          }
        }

        &-count {
          display: flex;
          align-items: center;
          margin-bottom: 8rpx;

          .count-item {
            height: 38rpx;
            font-size: 26rpx;
            color: #999999;
            line-height: 38rpx;
            margin-right: 20rpx;
          }
        }

        &-score {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 32rpx;

          .score-left {
            display: flex;
            align-items: center;

            > image {
              width: 20rpx;
              height: 20rpx;
            }

            view {
              height: 38rpx;
              font-size: 26rpx;
              color: #999999;
              line-height: 38rpx;
              margin-left: 20prx;
            }
          }

          .score-right {
            width: 130rpx;
            height: 50rpx;
            background: #fb4e4e;
            border-radius: 33rpx;
            font-size: 26rpx;
            font-weight: bold;
            color: #ffffff;
            line-height: 50rpx;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>