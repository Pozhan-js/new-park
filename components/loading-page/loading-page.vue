<template>
  <view :class="[customClass, { 'overflow-auto': empty }]">
    <u-loading-page v-if="loading" loading loadingText="数据加载中..." />
    <u-empty
      v-else-if="empty"
      margin-top="50%"
      :text="emptyText"
      :mode="emptyModel"
      :icon="emptyIcon" />
    <slot v-else :show="show" />
  </view>
</template>

<script>
// 提示:使用该组件必须在父组件中定义loadPage方法
export default {
  name: "LoadingPage",
  // #ifdef MP-WEIXIN
  options: {
    //开启虚拟节点,去除外面多包裹的标签
    //(导致与uview一样不能接收class和style,只能通过customXXX传入)
    virtualHost: true,
  },
  // #endif
  props: {
    pageId: {
      //页面id
      type: String,
      default: null,
    },
    errorText: {
      //错误提示文字
      type: String,
      default: "数据加载失败",
    },
    emptyText: {
      //空数据提示文字
      type: String,
      default: "暂无数据",
    },
    emptyModel: {
      //空数据模板
      type: String,
      default: "list",
    }, //空数据内置模板
    emptyIcon: String, //空数据Icon
  },
  data() {
    return {
      loading: true,
      empty: false,
    };
  },
  computed: {
    show() {
      return !(this.loading || this.empty);
    },
  },
  mounted() {
    this.$nextTick(this.loadDetailPage);
  },
  methods: {
    async loadDetailPage() {
      try {
        if (!this.pageId || this.pageId === "undefined")
          throw { msg: "跳转参数有误,打开失败" };
        const fn = this.$parent.loadPage;
        if (!fn instanceof Function) throw { msg: "父组件缺少loadPage方法" };
        await fn(this.pageId);
      } catch (error) {
        console.log(error);
        this.empty = true;
        this.$message(error.msg || this.errorText, false);
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
