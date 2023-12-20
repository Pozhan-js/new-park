<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-12-03 11:53:11
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-12-20 11:33:04
 * @FilePath: /smart-park/subPages/market/product/shop-address.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <view>
    <!-- color：主题色 addressList:地址管理数据 @chooseClick：选择事件 @editClick：编辑事件  -->
    <cc-addressSet
      :colors="colors"
      :addressList="addressFilterList"
      @chooseClick="chooseClick"
      @editClick="editClick"
      @chooseDelete="chooseDelete"
    ></cc-addressSet>

    <view class="save">
      <view class="btn" :style="'background:' + colors" @click="addAddress">
        添加收货地址
      </view>
    </view>
  </view>
</template>

<script>
import { getModelList, deleteModel, updateModel } from "@/api";
export default {
  data() {
    return {
      colors: "#6377f5",
      addressList: [],
    };
  },

  props: {},
  computed: {
    addressFilterList() {
      let filterDefault = this.addressList.filter((item) => {
        return item.isdefult;
      });
      let notDefault = this.addressList.filter((item) => {
        return !item.isdefult;
      });

      return [...filterDefault, ...notDefault];
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function (options) {
    this.getAddress();
  },

  methods: {
    // 编辑地址
    editClick(item) {
      //   跳转到编辑页面
      uni.navigateTo({
        url: `/subPages/market/product/add-address?id=${item._id}`,
      });
    },

    async chooseClick(item) {
      //修改当前数据项
      let time = Date.now();
      console.log("时间", item.new_time);
      const result = await updateModel(
        "656c2230262fbe2d9d06756d",
        { ...item, new_time: time },
        item._id
      );
      console.log("data", result);
      this.getAddress();
    },

    // 增加地址
    addAddress() {
      uni.navigateTo({
        url: `/subPages/market/product/add-address?length=${this.addressList.length}`,
      });
    },

    // 获取地址
    async getAddress() {
      const { data } = await getModelList("656c2230262fbe2d9d06756d");
      this.addressList = data?.list;
    },

    // 删除
    async chooseDelete(data) {
      const { code } = await deleteModel("656c2230262fbe2d9d06756d", data._id);
      if (code === 200) {
        uni.showToast({
          title: "删除成功",
          duration: 2000,
        });
        // 重新获取地址
        this.getAddress();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.save {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 120upx;
  display: flex;
  justify-content: center;
  align-items: center;
}

.save view {
  display: flex;
}

.save .btn {
  box-shadow: 0upx 5upx 10upx rgba(0, 0, 0, 0.4);
  width: 80%;
  height: 80upx;
  border-radius: 80upx;
  background-color: #f23a3a;
  color: #fff;
  justify-content: center;
  align-items: center;
  font-size: 30upx;
  margin-bottom: 60px;

  &:active {
    transform: scale(0.98);
  }
}
</style>
