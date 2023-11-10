<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-26 17:55:21
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-09 16:34:40
 * @FilePath: /smart-park/subPages/user/product-opinions/product-detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="product-detail container">
    <!-- 业主评论内容 -->
    <view class="product-content">
      <!-- 标题S -->
      <u--text size="36rpx" block bold :text="contentDetail.f_title"> </u--text>

      <!-- 用户信息S -->
      <view class="user-header flex-a-center">
        <u-avatar
          size="94rpx"
          :src="
            contentDetail.f_anonymity == '1'
              ? anonymousAvatar
              : contentDetail.f_headerIcon[0].url
          "
        ></u-avatar>
        <view class="flex-column" style="margin-left: 20rpx">
          <u--text
            color="#252B50"
            size="32rpx"
            :text="
              contentDetail.f_anonymity == '1'
                ? '匿名用户'
                : contentDetail.build_number + '业主'
            "
          >
          </u--text>
          <u--text
            type="info"
            size="24rpx"
            :text="$u.timeFrom(contentDetail.creatorTime)"
          >
          </u--text>
        </view>
      </view>

      <!-- 回复内容S -->
      <u--text
        color="color: #636676;"
        block
        :text="contentDetail.f_description"
      >
      </u--text>

      <!-- 用户上传的图片S -->
      <view
        v-if="contentDetail.f_images && contentDetail.f_images != '[]'"
        class="reply-img"
      >
        <image
          v-for="(item, index) in contentDetail.f_images"
          :key="index"
          :src="baseUrl + item.url"
          mode="aspectFill"
          @tap="previewImage(index, contentDetail.f_images)"
          :style="{
            width: imgWidth / 3 - 8 + 'px',
            height: imgWidth / 3 - 8 + 'px',
          }"
          style="margin: 0 8rpx 8rpx 0"
        ></image>
      </view>

      <u-line margin="20rpx"></u-line>

      <!-- 回复 -->
      <!-- 管理员回复S " -->
      <view v-if="contentDetail.reply == 1">
        <view class="user-header flex-a-center">
          <u-avatar size="94rpx" :src="adminAvatar"></u-avatar>
          <view class="flex-column reply-header">
            <view class="flex-a-center">
              <u--text color="#252B50" size="32rpx" :text="realName"> </u--text>
              <view class="tag">管理员</view>
            </view>

            <u--text
              type="info"
              size="24rpx"
              :text="$u.timeFrom(contentDetail.lastModifyTime)"
            >
            </u--text>
          </view>
        </view>

        <!-- 回复内容S -->
        <u--text
          color="color: #636676;"
          block
          :text="contentDetail.replyContent"
        >
        </u--text>
        <!-- 回复内容E -->

        <!-- 回复图片S -->
        <view v-if="contentDetail.reply == 1" class="reply-img">
          <image
            v-for="(item, index) in contentDetail.replyImage"
            :key="index"
            :src="baseUrl + item.url"
            mode="aspectFill"
            @tap="previewImage(index, contentDetail.replyImage)"
            :style="{
              width: imgWidth / 3 - 8 + 'px',
              height: imgWidth / 3 - 8 + 'px',
            }"
            style="margin: 0 8rpx 8rpx 0"
          ></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import config from "@/common/config";
import { getRequestFilter } from "@/common/function";
import { getModelList } from "@/api";
import { getModelInfo } from "@/api";
export default {
  data() {
    return {
      imgWidth: 0,

      // 匿名头像
      anonymousAvatar:
        "https://kindoucloud.com:8011/api/file/Image/systemicon/ycj/20221215_f98c8d40229845abacad5b2b8182eb82.png",
      adminAvatar:
        "https://kindoucloud.com:8011/api/file/Image/systemicon/ycj/20221215_8753d36a81e1434aa2c7ec4cd70df046.png",
      contentDetail: {},
      realName: "",
    };
  },
  methods: {
    previewImage(index, imgList) {
      let imgListUrl = [];
      imgList.forEach((item) => {
        imgListUrl.push(this.baseUrl + item.url);
      });
      uni.previewImage({
        current: index,
        urls: imgListUrl,
      });
    },
    async getContentDetail(id) {
      const { data } = await getModelInfo("6538b911388a8c7a0eb9c5dc", id);
      this.contentDetail = data;

      if (data.reply === 1) {
        this.getApprovalInfo(data.replyUser);
      }

      this.$nextTick(async () => {
        let rectInfo = await this.$u.getRect(".user-header");
        this.imgWidth = rectInfo.width;
      });
    },
    // 获取审批信息
    async getApprovalInfo(id) {
      const { data: res } = await getModelList(
        "64f6d064d85a4b7b32ec641d",
        getRequestFilter({
          formUser: id,
        })
      );
      this.realName = res?.list[0]?.roomName || "";
    },
  },
  computed: {
    baseUrl() {
      return config.baseURL;
    },
  },
  onReady() {
    // console.log("onReady", this.imgWidth);
  },
  onLoad(option) {
    this.getContentDetail(option.id);
  },
};
</script>

<style lang="scss" scoped>
.product-detail {
  background-color: #f5f7fb;
  box-sizing: border-box;
  padding: 32rpx;

  .product-content {
    background: #ffffff;
    border-radius: 12rpx;
    box-sizing: border-box;
    padding: 32rpx;

    .reply-img {
      width: 100%;
      margin-top: 16rpx;
    }
  }

  .user-header {
    margin-top: 32rpx;
    margin-bottom: 32rpx;
  }

  .reply-header {
    margin-left: 20rpx;
  }

  .tag {
    background: #6377f5;
    border-radius: 4rpx;
    color: #ffffff;
    font-size: 24rpx;
    padding: 0rpx 5rpx;
    margin-left: 15rpx;
  }
}
</style>
