<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-08-02 11:27:13
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-13 17:32:58
 * @FilePath: /smart-park/pages/server/server.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="server">
    <u-sticky bgColor="#f4f5f7">
      <u-tabs :list="tabList" lineWidth="30" @click="tabClick"></u-tabs>
    </u-sticky>

    <view class="server-container" v-if="dataList.length">
      <view
        class="server-container-item"
        v-for="(item, index) in dataList"
        :key="item._id"
      >
        <!-- 业主信息 -->
        <view class="item-info user-header flex-a-center">
          <u-avatar
            size="94rpx"
            :src="getHeardImg(item.userIcon)"
            shape="circle"
          ></u-avatar>

          <view class="item-info-num">
            <u--text
              color="#252B50"
              size="32rpx"
              :text="item.showName ? '匿名用户' : item.roomNum + '业主'"
            >
            </u--text>
            <u--text
              type="info"
              size="24rpx"
              :text="$u.timeFrom(item.creatorTime)"
            >
            </u--text>
          </view>
        </view>

        <u--text color="color: #636676;" block :text="item.description">
        </u--text>
        <!-- <view class="item-description text-2-hidden">
          {{ item.description }}
        </view> -->
        <view class="item-image">
          <view class="reply-img">
            <image
              v-for="(data, index) in item.image"
              :key="index"
              :src="baseUrl + data.url"
              mode="aspectFill"
              @tap="previewImage(index, data.image)"
              :style="{
                width: imgWidth / 3 - 8 + 'px',
                height: imgWidth / 3 - 8 + 'px',
              }"
              style="margin: 0 8rpx 8rpx 0"
            ></image>
          </view>
        </view>

        <view class="item-tools flex-a-center-j-space-between">
          <view class="item-address flex-a-center">
            <u-icon name="map-fill" size="20" color="#6377f5"></u-icon>
            <view class="address" style="margin-left: 10rpx">{{
              item.address || "暂无地址"
            }}</view>
          </view>

          <view class="item-tools-interactive flex-a-center">
            <view class="interactive flex-a-center" @click="like(index)">
              <u-icon
                :name="item.islike === 0 ? 'thumb-up' : 'thumb-up-fill'"
                size="26"
              ></u-icon>
              <view class="thumb-up-num">{{ item.like_count }}</view>
            </view>
            <view class="interactive flex-a-center" @tap="comment(index)">
              <u-icon name="more-circle" size="26"></u-icon>
              <view class="more-circle-num">{{
                item.comments ? item.comments.length : 0
              }}</view>
            </view>
          </view>
        </view>

        <!-- 赞／评论区 -->
        <view class="post-footer">
          <view
            class="footer_content"
            v-for="(comment, comment_index) in item.comments"
            :key="comment_index"
            @tap="reply(index, comment_index)"
          >
            <text class="comment-nickname">
              <text
                v-if="comment.role.includes('a6ba7e622d714844bf3055a63e184edf')"
                style="color: #6377f5"
                >管理员</text
              >
              {{ comment.comment_person_name }}
              <text v-if="comment.reply_person_name"
                >回复
                <text
                  v-if="
                    comment.role.includes('a6ba7e622d714844bf3055a63e184edf')
                  "
                  style="color: #6377f5"
                  >管理员</text
                >
                {{ comment.reply_person_name }}</text
              >：
              <text class="comment-content">{{ comment.content }}</text>
            </text>
          </view>
        </view>

        <view class="dot">{{ item.questionType }}</view>
      </view>

      <u-loadmore v-if="loading" line status="loading" marginTop="12" />
      <u-loadmore v-else-if="nomore" line status="nomore" marginTop="12" />
    </view>
    <view class="empty" v-else>
      <u-empty mode="list" icon="http://cdn.uviewui.com/uview/empty/data.png">
      </u-empty>
    </view>
    <view-tabbar tabIndex="1"></view-tabbar>

    <view class="foot" v-show="showInput">
      <chat-input
        @send-message="send_comment"
        @blur="blur"
        :focus="focus"
        :placeholder="input_placeholder"
      ></chat-input>
      <!-- <chat-input @send-message="send_comment" @blur="blur" :placeholder="input_placeholder"></chat-input> -->
    </view>
  </view>
</template>

<script>
import { getRequestFilter } from "@/common/function";
import config from "@/common/config";
import { getModelList, createModel, deleteModel } from "@/api";
import chatInput from "@/components/im-chat/chatinput.vue"; //input框
import { mapState } from "vuex";

export default {
  components: {
    chatInput,
  },
  data() {
    return {
      user_id: 4,
      username: "Liuxy",
      imgWidth: 0,
      index: "",
      comment_index: "",

      input_placeholder: "评论", //占位内容
      focus: false, //是否自动聚焦输入框
      is_reply: false, //回复还是评论
      showInput: false, //评论输入框
      typeList: [],
      // 接收数据
      shootCasuallyListData: [],
      commentsListData: [],
      // 接收点赞数据
      thumbUpData: "",
      // 总点赞数

      currentPage: 1,
      pageSize: 10,
      total: 0,
      loading: false,
      isEnd: false,
    };
  },
  computed: {
    ...mapState("user", ["userInfo", "userData", "token"]),
    dataList() {
      return this.shootCasuallyListData.map((data) => {
        return {
          ...data,
        };
      });
    },
    baseUrl() {
      return config.baseURL;
    },
    tabList() {
      return this.typeList.map((item) => {
        return {
          name: item,
        };
      });
    },
  },
  methods: {
    reply(index, comment_index) {
      let reply_id =
        this.shootCasuallyListData[index].comments[comment_index].user_id;
      if (this.userInfo.id == reply_id) {
        return false;
      }
      this.is_reply = true; //回复中
      this.showInput = true; //调起input框
      let replyTo =
        this.shootCasuallyListData[index].comments[comment_index]
          .comment_person_name;
      this.input_placeholder = " 回复 " + replyTo;
      this.index = index; //post索引
      this.comment_index = comment_index; //评论索引
      this.focus = true;
      console.log(this.is_reply);

      // deleteModel('64e70412d85a4b7b32ec5d4a', this.shootCasuallyListData[index].comments[comment_index].reply_id)
    },
    async send_comment(message) {
      var reply_person_name = "";
      var reply_id = "";
      var parent_comment_id = "";
      var comment_content = message.content;
      if (this.is_reply) {
        var reply_person_name =
          this.shootCasuallyListData[this.index].comments[this.comment_index]
            .comment_person_name;
        var reply_id =
          this.shootCasuallyListData[this.index].comments[this.comment_index]
            .user_id;
        parent_comment_id =
          this.shootCasuallyListData[this.index].comments[this.comment_index]
            .post_id;
      }

      let userinfo = await getModelList(
        "64f6d064d85a4b7b32ec641d",
        getRequestFilter({
          formUser: this.userInfo.id,
        })
      );
      // console.log("用户信息", userinfo);

      let data = {
        post_id: this.shootCasuallyListData[this.index]._id,
        // "parent_comment_id":
        role: this.userInfo.roleId,
        user_id: this.userInfo.id,
        comment_person_name: userinfo.data.list[0].roomName, //this.userInfo.realName,
        reply_id: reply_id,
        reply_person_name: reply_person_name,
        content: comment_content, //直接获取input中的值
      };
      const res = await createModel("64e70412d85a4b7b32ec5d4a", data);
      console.log(this.is_reply, data, res);
      // console.log(this.is_reply,reply_username,comment_content)

      // this.shootCasuallyListData[this.index].comments.total += 1;
      this.shootCasuallyListData[this.index].comments.push(data);
      // this.getComList()
      this.init_input();

      this.$forceUpdate();
    },
    init_input(type) {
      this.showInput = false;
      this.focus = false;
      this.input_placeholder = "评论";
      // this.is_reply = false;
    },
    blur: function () {
      this.init_input();
    },
    async like(index) {
      console.log(this.shootCasuallyListData[index]);
      //
      // 点赞
      if (this.shootCasuallyListData[index].islike === 0) {
        // 未点

        let data = {
          current_question_id: this.shootCasuallyListData[index]._id,
        };
        const res = await createModel("64e6d292d85a4b7b32ec5d10", data);
        console.log(res);
        this.shootCasuallyListData[index].islike = res.data;
        this.shootCasuallyListData[index].like_count += 1;
      } else {
        // 已点
        deleteModel(
          "64e6d292d85a4b7b32ec5d10",
          this.shootCasuallyListData[index].islike
        );

        this.shootCasuallyListData[index].islike = 0;
        this.shootCasuallyListData[index].like_count -= 1;
      }

      this.$forceUpdate();
    },
    comment(index) {
      this.showInput = true; //调起input框
      this.focus = true;
      this.index = index;
      this.is_reply = false;

      console.log(this.userInfo);
    },
    async getComList() {
      const res = await getModelList("64e70412d85a4b7b32ec5d4a");

      let list = res.data?.list;
      let com_data = [];
      list.forEach((item) => {
        if (!com_data[item.post_id]) {
          com_data[item.post_id] = [];
        }
        com_data[item.post_id].push(item);
      });

      this.shootCasuallyListData = this.shootCasuallyListData.map((data) => {
        return {
          ...data,
          comments: com_data[data._id] ? com_data[data._id] : [],
        };
      });

      this.$forceUpdate();
    },
    async getLikeList() {
      let self = this;
      const res = await getModelList("64e6d292d85a4b7b32ec5d10");
      let list = res.data?.list;
      let like_data = [];
      let like_data2 = [];
      list.forEach((item) => {
        if (item.creatorUserId == self.userInfo.id) {
          if (!like_data2[item.current_question_id]) {
            like_data2[item.current_question_id] = [];
          }
          like_data2[item.current_question_id].push(item);
        }

        if (!like_data[item.current_question_id]) {
          like_data[item.current_question_id] = [];
        }
        like_data[item.current_question_id].push(item);
      });

      //   console.log(like_data);
      this.shootCasuallyListData = this.shootCasuallyListData.map((data) => {
        return {
          ...data,
          islike: like_data2[data._id] ? like_data2[data._id][0]._id : 0,
          like_count: like_data[data._id] ? like_data[data._id].length : 0,
        };
      });

      this.$forceUpdate();
    },
    // 获取随手拍列表
    async getShootCasuallyList(type = "全部") {
      //显示加载框
      uni.showLoading({
        title: "加载中",
      });

      let that = this;

      if (type === "全部") {
        let pageNation = {
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        };
        const res = await getModelList("64d1dcab8b140b0b56b6ed90", pageNation);
        this.shootCasuallyListData = [
          ...that.shootCasuallyListData,
          ...res.data?.list.sort((a, b) => {
            return b.creatorTime - a.creatorTime;
          }),
        ];
        this.total = res.data?.pagination.total;
      } else {
        let reqData = getRequestFilter({
          questionType: type,
        });
        const res = await getModelList("64d1dcab8b140b0b56b6ed90", reqData);
        this.shootCasuallyListData = res.data?.list.sort((a, b) => {
          return b.creatorTime - a.creatorTime;
        });
      }
      this.getComList();
      this.getLikeList();

      // 获取分类
      let filterTypeData = getRequestFilter({
        key: "问题类型",
      });
      const result = await getModelList(
        "65250f6f388a8c7a0eb9b934",
        filterTypeData
      );

      this.typeList = ["全部", ...result.data?.list[0].value];

      this.$nextTick(async () => {
        let rectInfo = await this.$u.getRect(".user-header");
        this.imgWidth = rectInfo.width;
      });

      //隐藏加载框
      uni.hideLoading();
    },
    // 切换tab
    tabClick(item) {
      this.getShootCasuallyList(item.name);
    },
    // 判断时间是否超时
    isTimeOut(time) {
      let nowTime = Date.now();
      let isOut = (nowTime - time) / 1000 / 60 / 60 / 24;
      if (isOut > 30) {
        return uni.$u.timeFormat(time, "yyyy-mm-dd");
      } else {
        return uni.$u.timeFrom(time, "yyyy-mm-dd");
      }
    },
    // 获取头像
    getHeardImg(url) {
      return this.$helper.filterCover(url) || "";
    },

    // 获取评论图片数组
    getImageList(list = []) {
      return list.map((item) => {
        return {
          url: this.$helper.filterCover(item.url),
        };
      });
    },

    previewImage(index, imgList) {
      let imgListUrl = [];
      imgList.forEach((item) => {
        imgListUrl.push(config.baseURL + item.url);
      });
      uni.previewImage({
        current: index,
        urls: imgListUrl,
      });
    },
  },
  onLoad() {
    // 现获取点赞结果
    this.getShootCasuallyList();
  },
  onReachBottom() {
    // console.log("划到底部");
    // 当滑动到底部先判断当前是否还有数据需要请求
    if (this.shootCasuallyListData.length < this.total) {
      // 说明还有数据需要请求
      this.loading = true;
    }
  },
};
</script>

<style lang="scss" scoped>
.server {
  width: 100vw;
  // overflow: scroll;
  background: #f4f5f7;
  min-height: 100vh;

  &-container {
    padding: 20rpx;
    box-sizing: border-box;
    // overflow: scroll;
    width: 100%;
    margin-top: 20rpx;
    // padding-bottom: 200rpx;
    padding-bottom: 100px;
    // margin-bottom: 200rpx;

    &-item {
      width: 100%;
      background: #ffffff;
      box-shadow: 0rpx 6rpx 10rpx 1rpx rgba(229, 229, 229, 0.1);
      border-radius: 20rpx;
      padding: 32rpx 38rpx;
      box-sizing: border-box;
      margin-bottom: 20rpx;
      position: relative;

      .item-description {
        font-size: 28rpx;
        font-weight: bold;
        color: #333333;
      }

      .item-image {
        width: 100%;
        margin: 20rpx 0;
      }

      .item-address {
        font-size: 24rpx;
        color: #969dab;
      }

      .item-tools {
        margin-top: 10rpx;

        &-date {
          .time {
            font-size: 24rpx;
            color: #969dab;
            margin-left: 8rpx;
          }
        }

        &-interactive {
          .interactive {
            margin-left: 20rpx;

            .thumb-up-num {
              font-size: 24rpx;
              color: #969dab;
              margin-left: 8rpx;
            }

            .more-circle-num {
              font-size: 24rpx;
              color: #969dab;
              margin-left: 8rpx;
            }
          }
        }
      }

      .dot {
        position: absolute;
        top: 0;
        right: 0;
        border-radius: 12rpx;
        width: 120rpx;
        height: 50rpx;
        font-size: 26rpx;
        padding: 4rpx 6rpx;
        background-color: #6377f5;
        color: #ffffff;
        line-height: 50rpx;
        text-align: center;
      }

      .item-info {
        margin-bottom: 20rpx;

        &-num {
          margin-left: 20rpx;
        }
      }
    }
  }

  .foot {
    position: fixed;
    width: 100%;
    height: 90upx;
    min-height: 90upx;
    left: 0upx;
    bottom: 0upx;
    overflow: hidden;
    z-index: 99999;
  }

  .post-footer {
    margin-top: 20upx;
    background-color: #f3f3f5;
    width: 100%;

    .footer_content {
      padding-left: 10upx;
      position: relative;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -webkit-align-items: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
      line-height: 2;
    }

    .footer_content .nickname {
      color: #36648b;
      font-size: 24upx;
    }

    .footer_content .comment-nickname {
      color: #36648b;
      font-size: 24upx;
    }

    .footer_content .comment-content {
      color: #000000;
      font-size: 24upx;
    }
  }
}
</style>
