<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-10-25 10:29:24
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-07 10:36:55
 * @FilePath: /smart-park/subPages/user/product-opinions/product-opinions.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="product-opinions container">
    <view class="product-opinions-tooltip">
      <u-icon name="info-circle" size="24" color="#9296af"></u-icon>
      <text class="text"
        >您对小区事物提出的合理化意见,对小区未来的发展非常重要</text
      >
    </view>

    <view class="form">
      <u-cell-group :border="false">
        <!-- @click="titleObj.show = true" isLink -->
        <u-cell title="反馈标题" :titleStyle="titleStyle">
          <!-- <template v-slot:value>
            <view class="cell-value" :style="params.f_title && 'font-size: 28rpx; color: #000;'">
              {{ params.f_title || "请输入反馈标题" }}
            </view>
          </template> -->
          <template v-slot:label>
            <view class="label-img">
              <u--textarea
                v-model="params.f_title"
                placeholder="请输入反馈标题"
                maxlength="30"
                :count="true"
                confirmType="done"
                bgColor="#EDF3FF"
              ></u--textarea>
            </view>
          </template>
        </u-cell>

        <u-cell title="详情描述" :titleStyle="titleStyle">
          <template v-slot:label>
            <view class="label-img">
              <u--textarea
                v-model="params.f_description"
                placeholder="请详细描述一下您的建议..."
                maxlength="200"
                :count="true"
                confirmType="done"
                bgColor="#EDF3FF"
              ></u--textarea>
            </view>
          </template>
        </u-cell>

        <!-- 现场照片S -->
        <u-cell :titleStyle="titleStyle">
          <template v-slot:title>
            <view class="flex-a-center-j-space-between">
              <view class="cell-title">反馈图片</view>
              <view class="cell-value">{{ fileList1.length }}/5</view>
            </view>
          </template>
          <template v-slot:label>
            <view class="label-img">
              <u-upload
                :fileList="fileList1"
                @afterRead="afterRead"
                @delete="deletePic"
                name="1"
                multiple
                :maxCount="5"
                :capture="['album', 'camera']"
                :width="labelImgWidth / 5 - 8 + 'px'"
                :height="labelImgWidth / 5 - 8 + 'px'"
              ></u-upload>
            </view>
          </template>
        </u-cell>
        <!-- 现场照片E -->

        <u-cell title="是否匿名">
          <template v-slot:value>
            <view class="cell-value">
              <u-switch
                v-model="params.f_anonymity"
                :inactiveValue="1"
                :activeValue="0"
              ></u-switch>
            </view>
          </template>
        </u-cell>
      </u-cell-group>
    </view>

    <button class="submit circle-button qu-btn" @click="submit">提交</button>

    <!-- 标题S -->
    <u-modal
      :show="titleObj.show"
      title="提示"
      @confirm="titleObj.show = false"
      confirmText="确认"
    >
      <view class="flex-ai" style="width: 100%">
        <view>反馈标题:</view>
        <view class="flex-1">
          <u--input
            placeholder="请输入反馈标题"
            border="bottom"
            v-model="params.f_title"
          ></u--input>
        </view>
      </view>
    </u-modal>
  </view>
</template>

<script>
import config from "@/common/config";
import { UpdateFilePath } from "@/api/file";
import { createModel, getModelList } from "@/api";
import Storage from "@/common/function/storage";
import { getRequestFilter, sleep } from "@/common/function";
import infoMixin from "@/common/mixins/info";
export default {
  mixins: [infoMixin],
  data() {
    return {
      fileList1: [],
      labelImgWidth: "",
      titleObj: {
        show: false,
      },
      anonymityObj: {
        show: false,
      },
      titleStyle: {
        color: "#636676",
      },
      // 用户审批信息
      approvalInfo: "",
      // 提交参数
      params: {
        f_title: "",
        f_description: "",
        // 描述图片
        f_images: [],
        // 头像
        f_headerIcon: [],
        // 匿名
        f_anonymity: 1,
        // 栋号
        reply: 0,

        build_number: "",
      },
    };
  },
  methods: {
    submit() {
      // 校验标题和描述是否为空,为空则弹出提示框
      if (!this.params.f_title || !this.params.f_description) {
        uni.showToast({
          title: "标题和描述不能为空",
          icon: "none",
        });
        return;
      }

      if (this.approvalInfo) {
        this.params.build_number = this.approvalInfo.roomName;
        this.params.f_headerIcon.push({
          fileId: this.userInfo.headIcon.split("/").at(-1),
          name: this.userInfo.headIcon,
          url: config.baseURL + this.userInfo.headIcon,
        });
        createModel("6538b911388a8c7a0eb9c5dc", this.params).then((res) => {
          console.log("创建完成", res);
          // 提示反馈成功 提交成功后返回上一页
          uni.showToast({
            title: "反馈成功",
            icon: "none",
          });
          setTimeout(() => {
            uni.navigateBack({
              delta: 1,
            });
          }, 1000);
        });
      } else {
        uni.showToast({
          title: "认证为业主才能上报哦~",
          icon: "none",
        });
      }
    },

    // 获取审批信息
    async getApprovalInfo() {
      const { data: res } = await getModelList(
        "64f6d064d85a4b7b32ec641d",
        getRequestFilter({
          formUser: this.userInfo.id,
        })
      );
      this.approvalInfo = res?.list[0] || {};
    },
    // 删除图片
    deletePic(event) {
      this[`fileList${event.name}`].splice(event.index, 1);
    },
    // 新增图片
    async afterRead(event) {
      // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file);
      let fileListLen = this[`fileList${event.name}`].length;
      lists.map((item) => {
        this[`fileList${event.name}`].push({
          ...item,
          status: "uploading",
          message: "上传中",
        });
      });
      for (let i = 0; i < lists.length; i++) {
        const result = await this.uploadFilePromise(lists[i].url);
        let item = this[`fileList${event.name}`][fileListLen];
        this[`fileList${event.name}`].splice(
          fileListLen,
          1,
          Object.assign(item, {
            status: "success",
            message: "",
            url: config.baseURL + result.url,
          })
        );
        fileListLen++;
        this.params.f_images.push({
          fileId: item.url.split("/").at(-1),
          name: item.name,
          url: result.url,
        });
      }
    },
    // 上传图片
    uploadFilePromise(url) {
      let that = this;
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: `${config.baseURL}` + `${UpdateFilePath}`, // 仅为示例，非真实的接口地址
          filePath: url,
          header: {
            Authorization: Storage.get("Token"),
          },
          name: "file",
          formData: {
            user: "test",
          },
          success: (res) => {
            setTimeout(() => {
              // console.log("上传成功", res, that.fileList1);
              let { data } = JSON.parse(res.data);
              resolve(data);
            }, 1000);
          },
        });
      });
    },
  },

  onReady() {
    /* 动态获取宽度 */
    this.$u.getRect(".label-img").then((res) => {
      this.labelImgWidth = res.width;
    });
  },
  onLoad() {
    this.getApprovalInfo();
  },
};
</script>

<style lang="scss" scoped>
.product-opinions {
  background-color: #f5f7fb;
  padding: 30rpx;
  box-sizing: border-box;

  &-tooltip {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin-bottom: 40rpx;

    .text {
      font-size: 32rpx;
      color: #9296af;
      margin-left: 10rpx;
    }
  }

  .form {
    background-color: #ffffff;
    position: relative;
    margin: 15rpx;
    border-radius: 12rpx;
    margin-top: 20rpx;

    .cell-title {
      color: #636676;
    }

    .cell-value {
      font-size: 26rpx;
      color: #9296af;
    }

    .label-img {
      margin: 10rpx 0;
      width: 100%;
    }
  }
}
.qu-btn {
  // position: absolute;
  // bottom: 0;
  width: 90%;
  margin: 100rpx auto;
  margin-bottom: constant(safe-area-inset-bottom) !important;
  margin-bottom: env(safe-area-inset-bottom) !important;

  &:active {
    transform: scale(0.98);
  }
}
</style>
