<template>
  <view class="buiding-app main-size">
    <view class="form">
      <u--form
        labelPosition="left"
        label-width="180rpx"
        :labelStyle="{ 'font-size': '36rpx' }"
      >
        <u-form-item
          label="我的楼栋"
          @click="pickObj.show = true"
          border-bottom
        >
          <view class="flex-a-center-j-space-between">
            <view class="flex-1">
              <u--input
                disabled
                disabled-color="#fff"
                fontSize="36rpx"
                v-model="pickObj.pickValue"
                placeholder="请选择您的楼栋号"
                border="none"
              />
            </view>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </u-form-item>

        <u-form-item label="我的房号" @click="hoursePick" border-bottom>
          <view class="flex-a-center-j-space-between">
            <view class="flex-1">
              <u--input
                disabled
                disabled-color="#fff"
                fontSize="36rpx"
                v-model="pickHourseObj.pickValue"
                placeholder="请选择您的房号"
                border="none"
              />
            </view>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </u-form-item>

        <!-- 我的名字 -->
        <u-form-item label="真实姓名" border-bottom>
          <view class="flex-a-center-j-space-between">
            <u--input
              fontSize="36rpx"
              placeholder="请输入真实姓名"
              v-model="realNameVal"
              border="none"
            ></u--input>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </u-form-item>

        <u-form-item label="电话号码" border-bottom>
          <view class="flex-a-center-j-space-between">
            <u--input
              fontSize="36rpx"
              placeholder="请输入电话号码"
              v-model="mobilPhone"
              border="none"
            ></u--input>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </u-form-item>
        <u-form-item label="身份证号" border-bottom>
          <view class="flex-a-center-j-space-between">
            <u--input
              fontSize="36rpx"
              placeholder="请输入身份证号"
              v-model="idCard"
              border="none"
            ></u--input>
            <u-icon name="arrow-right"></u-icon>
          </view>
        </u-form-item>
      </u--form>
    </view>

    <!-- 固定在右下角 联系客服图标 -->
    <!-- <view class="fixed-right-bottom">
      <view class="contact-btn">
        <u-button type="primary" open-type="contact">联系客服</u-button>
      </view>
    </view> -->
    <view class="sub flex-center" @click="submit">保 存</view>

    <u-picker
      :show="pickObj.show"
      :loading="pickObj.loading"
      :columns="pickObj.columns"
      @cancel="pickObj.show = false"
      @confirm="pickConfirm"
    ></u-picker>

    <u-picker
      :show="pickHourseObj.show"
      :loading="pickHourseObj.loading"
      :columns="pickHourseObj.columns"
      @cancel="pickHourseObj.show = false"
      @confirm="pickHourseConfirm"
    ></u-picker>

    <u-modal
      :show="modalObj.show"
      title="提示"
      content="该房号已经被注册，是否联系客服？"
      showCancelButton
    >
      <template v-slot:confirmButton>
        <view class="flex-ai flex-sb">
          <view style="margin-right: 10rpx" class="flex-1">
            <u-button @click="modalObj.show = false">取消</u-button>
          </view>

          <view style="margin-left: 10rpx" class="flex-1">
            <u-button type="primary" open-type="contact">联系客服</u-button>
          </view>
        </view>
      </template>
    </u-modal>
  </view>
</template>

<script>
import { getModelList, createFlow, realName, updateRole } from "@/api";
import infoMixin from "@/common/mixins/info";
import userMixin from "@/common/mixins/user";
export default {
  mixins: [infoMixin, userMixin],
  data() {
    return {
      modalObj: {
        show: false,
      },
      pickHourseObj: {
        loading: true,
        show: false,
        pickLabel: "",
        pickValue: "",
        columns: [[]],
      },
      pickObj: {
        loading: true,
        show: false,
        pickLabel: "请选择您所在的楼栋",
        pickValue: "",
        columns: [[]],
      },
      roomId: "",
      allDataList: [],
      requestLoading: false,
      realNameVal: "", //真实姓名
      mobilPhone: "", //  电话号码
      idCard: "", //省份证号
      // age: "",
    };
  },
  onLoad() {
    this.getBuildAndHouse();
  },

  methods: {
    hoursePick() {
      if (this.pickHourseObj.columns[0].length == 0) {
        uni.$u.toast("请选择楼栋");
        return;
      }
      this.pickHourseObj.show = true;
    },
    pickHourseConfirm(e) {
      this.pickHourseObj.pickValue = e.value[0];
      this.pickHourseObj.show = false;
    },
    pickConfirm(e) {
      this.pickObj.pickValue = e.value[0];
      this.pickObj.show = false;
    },

    async submit() {
      try {
        // 如果是在请求中则，不处理
        if (this.requestLoading) {
          return;
        }
        if (!this.pickObj.pickValue) {
          uni.showToast({
            title: "请选择楼栋",
            icon: "error",
          });
          return;
        }
        if (!this.pickHourseObj.pickValue) {
          uni.showToast({
            title: "请选择您所在的房号",
            icon: "error",
          });
          return;
        }
        this.requestLoading = true;
        // 获取roomId
        this.allDataList?.forEach((item) => {
          if (
            item.buildingNumber === this.pickObj.pickValue &&
            item.roomNumber === this.pickHourseObj.pickValue
          ) {
            this.roomId = item._id;
          }
        });

        // 实名认证
        const realInfoData = await realName(
          this.idCard,
          this.mobilPhone,
          this.realNameVal
        );
        // 认证成功
        if (realInfoData.data.result.verificationResult === "1") {
          try {
            const flow = await createFlow({
              data: JSON.stringify({
                phone: this.userInfo.mobilePhone,
                formUser: this.userInfo.id,
                roomId: this.roomId,
                realName: this.realNameVal,
                phone: this.mobilPhone,
                idCardNum: this.idCard,
                // age:
                //   new Date().getFullYear() -
                //     this.idCard.split("")?.slice(6, 10).join("") || "",
                nickName: `${
                  this.realNameVal.split("").length <= 3
                    ? this.realNameVal.split("")[0]
                    : `${this.realNameVal.split("").slice(1)}`
                }先生`,
                roomName: `${this.pickObj.pickValue}栋${this.pickHourseObj.pickValue}号`,
                sex:
                  this.idCard.split("")[this.idCard.split("").length - 2] % 2
                    ? "男"
                    : "女",
              }),
              flowId: "64f6d064d85a4b7b32ec641d",
              status: 0,
            });

            if (flow.code === 200) {
              uni.showToast({
                title: "实名认证成功",
                icon: "success",
              });
              setTimeout(() => uni.reLaunch({ url: "/pages/user/user" }), 2000);
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        uni.showToast({
          title: "实名认证失败",
          icon: "error",
        });
        this.$store.dispatch("user/logout");
        this.$helper.rollback(1200);
      }

      // this.idCard = "";
      // this.mobilPhone = "";
      // this.realNameVal = "";
    },

    //TODO 发送请求获取楼栋号
    async getBuildAndHouse() {
      const { data } = await getModelList("64f6d11ed85a4b7b32ec641e");
      // console.log(data);
      this.allDataList = data?.list;

      this.pickHourseObj.columns[0] = [
        ...new Set(data?.list.map((item) => item.roomNumber)),
      ];
      this.pickObj.columns[0] = [
        ...new Set(data?.list.map((item) => item.buildingNumber)),
      ];

      this.pickHourseObj.loading = false;
      this.pickObj.loading = false;
    },
  },
};
</script>

<style scoped lang="scss">
.buiding-app {
  background: #f5f7fb;
  box-sizing: border-box;

  .form {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 16rpx;
    padding: 0 30rpx;
    margin: 30rpx;
  }

  .sub {
    margin: 30rpx;
    margin-top: 40rpx;
    padding: 20rpx 0;
    background: #6377f5;
    border-radius: 8px;
    color: #fff;
  }
}
</style>
