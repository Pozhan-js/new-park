<!--
 * @Author: Why so serious my dear 854059946@qq.com
 * @Date: 2023-07-04 16:30:31
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-11-23 11:51:50
 * @FilePath: /used-idle/pages/release/detail/detail.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view class="release-detail container box">
    <view class="form release-detail-content">
      <u--form
        labelPosition="left"
        :model="releaseForm"
        :rules="rules"
        ref="releaseForm"
      >
        <u-form-item prop="releaseForm.textContent" borderBottom>
          <u--textarea
            v-model="releaseForm.textContent"
            :height="400"
            :count="true"
            placeholder="分享心情。。。"
            :cursorSpacing="20"
            autoHeight
            :showConfirmBar="false"
            border="none"
          ></u--textarea>
        </u-form-item>
      </u--form>
    </view>
    <!-- <view class="release-detail-content box">
      <u--textarea
        v-model="value3"
        :height="200"
        placeholder="分享心情。。。"
        autoHeight
        border="none"
        :showConfirmBar="false"
      ></u--textarea>

      <view class="release-detail-content-upload">
        <u-upload
          :fileList="fileList3"
          @afterRead="afterRead"
          @delete="deletePic"
          name="3"
          multiple
          :maxCount="3"
          :previewFullImage="true"
        ></u-upload>
      </view>

      <view class="release-detail-content-list">
        <view
          class="item-context color"
          :style="{ '--color': color }"
          @click="clickAddrs"
        >
          <view class="item-context-left flex-a-center">
            <u-icon name="map" :color="color" size="20"></u-icon>
            <view class="text">获取位置</view>
            <view>{{ city }} {{ district }}</view>
          </view>

          <u-icon name="arrow-right" :color="color"></u-icon>
        </view>
        <view
          class="item-context color-who"
          :style="{ '--color-who': colorWho }"
          @click="whoLook"
        >
          <view class="item-context-left flex-a-center">
            <u-icon name="man-add-fill" :color="colorWho" size="20"></u-icon>
            <view class="text">提醒谁看</view>
            <view>{{}}</view>
          </view>

          <u-icon name="arrow-right" :color="colorWho"></u-icon>
        </view>
      </view>

      <view style="margin: 100rpx 0">
        <u-button shape="circle" type="primary">发表</u-button>
      </view>
    </view> -->
    <tabbarPro :tabIndex="tabIndex"></tabbarPro>
  </view>
</template>

<script>
import tabbarPro from "../components/tabbar";
export default {
  components: { tabbarPro },
  data() {
    // 实例化API核心类
    return {
      value3: "",
      fileList3: [
        {
          url: "https://cdn.uviewui.com/uview/swiper/1.jpg",
        },
      ],
      color: "#666",
      colorWho: "#666",
      tabIndex: 1,
      // 表单提交数据
      releaseForm: {
        textContent: "",
      },
      rules: {
        textContent: [
          // 必填规则
          {
            required: true,
            message: "此为必填字段",
            required: true,
            // blur和change事件触发检验
            trigger: ["blur", "change"],
          },
        ],
      },
    };
  },
  methods: {
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
            url: result,
          })
        );
        fileListLen++;
      }
    },
    uploadFilePromise(url) {
      return new Promise((resolve, reject) => {
        let a = uni.uploadFile({
          url: "http://192.168.2.21:7001/upload", // 仅为示例，非真实的接口地址
          filePath: url,
          name: "file",
          formData: {
            user: "test",
          },
          success: (res) => {
            setTimeout(() => {
              resolve(res.data.data);
            }, 1000);
          },
        });
      });
    },
  },
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.releaseForm.setRules(this.rules);
  },
};
</script>

<style lang="scss" scoped>
%flex-j-space {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.release-detail {
  background: #f5f7fb;
  border-top: 1px solid transparent;

  &-content {
    margin: 32rpx 0;
    box-sizing: border-box;
    background-color: #fff;
    box-shadow: 2px;
    height: 100%;
    border-radius: 14rpx;

    &-upload {
      margin-top: 100rpx;
    }

    &-list {
      margin-top: 50rpx;

      .item-context {
        @extend %flex-j-space;
        border-top: 1px solid #eeeeee;
        padding: 20rpx 0;
        color: var(--addr-color);

        &-left {
          .text {
            margin: 0 30rpx;
          }
        }
      }
    }
  }
}

.color {
  color: var(--color) !important;
}
.color-who {
  color: var(--color-who) !important;
}
</style>
