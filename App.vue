<!--
 * @Author: hashMi 854059946@qq.com
 * @Date: 2023-07-03 15:10:10
 * @LastEditors: hashMi 854059946@qq.com
 * @LastEditTime: 2023-09-04 16:20:37
 * @FilePath: /smart-park/App.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<script>
export default {
  globalData: {
    icon: {
      购物: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230627_c72b71a67abb484fabe24b1fb760ed81.png",
      交通: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230627_4b77fd34c0614ac0bbf0630577f18f89.png",
      餐饮: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230627_2e1379d007f0439299bb2845326a3273.png",
      通信: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230627_10c90b261f4d4d949c1f758c8d2130d3.png",
      娱乐: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230621_617b48b0e07843238392e79c5be552df.png",
      其他: "https://kindoucloud.com:8077/api/mongoFile/Image/systemicon/SmartPark/20230901_44dd4d96c6fb4b209929a1d9b15fbb89.png",
    },
  },
  onLaunch: function () {
    uni.$set = this.$set;
  },
  onShow: function () {
    // #ifdef APP-PLUS
    // 隐藏启动页
    plus.navigator.closeSplashscreen();
    // #endif

    uni.hideTabBar({
      animation: false,
      complete(e) {
        // console.log("隐藏tabbar", e);
      },
    });
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "uicon-iconfont";
  src: url("https://at.alicdn.com/t/font_2225171_8kdcwk4po24.ttf")
    format("truetype");
}
/*每个页面公共css */
@import "uview-ui/index.scss";
@import "@/common/css/project.scss";
@import "@/common/css/index.scss";
//#ifndef H5
@import "@/common/css/h5-tag.scss";
//#endif
</style>
