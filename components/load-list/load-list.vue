<template>
  <view class="page-load flex-center" v-if="loadingPage">
    <u-loading-icon text="数据加载中" textSize="36rpx" />
  </view>
  <u-empty
    :margin-top="marginTop"
    v-else-if="!(nomore || listData.length)"
    :text="emptyText"
    :mode="emptyModel"
    :icon="emptyIcon"
  >
  </u-empty>
  <u-list
    v-else
    :width="width"
    :height="height"
    @scroll="handleScroll"
    @scrolltolower="scrolltolower"
  >
    <slot
      :keyName="keyName"
      :valueName="valueName"
      :list="listData"
      :pagination="pagination"
    >
      <!-- 默认 -->
      <u-list-item v-for="(item, i) in listData" :key="getKey(item, i)">
        <u-cell isLink :border="false" @click="() => cellClickHandler(item)">
          <view slot="title" class="u-slot-title">
            <text class="text-ellipsis">
              {{ item[valueName] }}
            </text>
          </view>
        </u-cell>
      </u-list-item>
      <!-- 默认 -->
    </slot>
    <u-loadmore v-if="loading" line status="loading" marginTop="12" />
    <u-loadmore
      v-else-if="isEnd && nomore"
      line
      status="nomore"
      marginTop="12"
    />
  </u-list>
</template>

<script>
import {
  message,
  lockFunction,
  isFunction,
  createTimer,
} from "@/common/function";
import { getModelList, getPublicModelList } from "@/api";
function pagesLoadState({ total, currentPage, pageSize } = {}) {
  return currentPage * pageSize - total < pageSize;
}
export default {
  name: "LoadList",
  // #ifdef MP-WEIXIN
  options: { virtualHost: true },
  // #endif
  props: {
    modelId: {
      //模块id
      type: String,
      require: true,
    },
    params: {
      //发请求时需要携带的参数
      type: [Object, Array],
      default: () => ({}),
    },
    keyName: {
      //循环键名
      type: String,
      default: "id",
    },
    valueName: {
      //循环值名
      type: String,
      default: "title",
    },
    showLoading: {
      //是否显示初始化加载(不关闭没办法显示骨架屏)
      type: Boolean,
      default: true,
    },
    initLoad: {
      //是否初始化加载
      type: Boolean,
      default: true,
    },
    marginTop: {
      type: String,
      default: "50%",
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
    width: {
      //loadlist宽度
      type: String,
      default: "100%",
    },
    height: {
      //loadlist高度
      type: String,
      default: "100%",
    },
    localData: {
      //启用本地数据(拿总数据进行分页,优化多节点加载卡顿问题)
      type: Array,
      default: null,
    },
    localDataLoading: {
      //本地数据加载中
      type: Boolean,
      default: false,
    },
    paginationData: {
      //分页数据
      type: Object,
      default: () => ({}),
    },
    useOpenRequest: Boolean, //启用免token请求
    nomore: Boolean, //是否显示没有更多数据
    loadDataFn: Function, //数据加载函数
    filterFn: Function, //数据过滤函数
  },
  data() {
    return {
      listData: [],
      showEmpty: false,
      loading: false,
      initLoading: true,
      isUpLoadKey: 1,
      isEnd: false,
      pagination: {
        currentPage: 1,
        pageSize: 10,
        total: 0,
      },
    };
  },
  computed: {
    loadingPage() {
      return this.localDataLoading || (this.showLoading && this.initLoading);
    },
  },
  beforeCreate() {
    // v-if为false时,uniApp中beforeCreate,beforeDestroy,destroyed会执行
    this.timer = createTimer();
    this.loadLock = lockFunction();
  },
  created() {
    if (this.localDataLoading) this.initLoad = false;
    this.initLoading = this.initLoad;
    Object.assign(this.pagination, this.paginationData);
  },
  async mounted() {
    //组件mounted前都无法拿到props(且create优先onload)
    this.requestModel = this.useOpenRequest ? getPublicModelList : getModelList;
    if (Array.isArray(this.localData)) {
      this.loadData = this.loadLocalData;
    } else {
      this.loadData = this.loadRequestData;
    }
    if (this.initLoad) this.initLoadFn();
  },
  methods: {
    async initLoadFn() {
      this.initLoading = true;
      this.$emit("init", await this.loadData());
      this.initLoading = false;
    },
    getKey(item, index) {
      return item[this.keyName] || "item_" + index;
    },
    handleScroll(e) {
      this.$emit("scroll", e);
    },
    scrolltolower() {
      //上拉加载
      this.loadLock(async (unlock) => {
        this.pagination.currentPage++;
        if (pagesLoadState(this.pagination)) {
          this.isEnd = false;
          this.updateCurrentPage(true, unlock);
        } else {
          this.isEnd = true;
        }
      });
    },
    scrolltoupper(fn) {
      //下拉刷新
      if (this.isUpLoadKey !== 0) {
        this.isUpLoadKey = 0;
        this.loadLock("unlock");
        this.loadLock((unlock) => {
          this.updateCurrentPage(false, () => {
            this.isUpLoadKey = 1;
            isFunction(fn, true);
            unlock();
          });
        });
      }
    },
    async updateCurrentPage(isPush = true, fn) {
      this.loading = true;
      await this.loadData(isPush);
      this.loading = false;
      isFunction(fn, true);
    },
    async loadRequestData(isPush = false) {
      try {
        let resolve = null;
        var { params, pagination, modelId } = this;
        if (!isPush) pagination.currentPage = 1;
        const key = Date.now(); //使用时间戳记录请求,如果后面把前面的覆盖了,则中断请求后的执行
        this.isUpLoadKey = key;
        if (!this.loadingPage) uni.showLoading({ title: "数据加载中" }); //页面加载时不显示
        if (isFunction(this.loadDataFn)) {
          resolve = await this.loadDataFn({ params, pagination, modelId });
        } else {
          if (!modelId) return message("缺少modelId", false);
          resolve = await this.requestModel(modelId, {
            ...params,
            ...pagination,
          });
        }
        if (this.isUpLoadKey !== key) return;
        if (resolve.code !== 200) throw { msg: resolve.msg };
        var { list = [], pagination = {} } = resolve?.data || {};
        // 如果传入了过滤方法则会执行,如果函数没有返回值则返回默认值false
        // 这样就能不是函数时或者无返回值时还是原值
        list = isFunction.call(this, this.filterFn, true, {
          params: list,
          defaultVal: list,
        });
        if (isPush) list = [...this.listData, ...list];
        Object.assign(this, { pagination, listData: list });
      } catch (error) {
        console.log(error);
        message(error?.msg || "加载数据失败", false);
      } finally {
        uni.hideLoading();
      }
      return this.listData;
    },
    loadLocalData(isPush = false) {
      const { pagination: pg, localData: data } = this;
      if (!isPush) {
        pg.currentPage = 1;
        pg.total = data.length || 0;
        this.listData = [];
      }
      const start = (pg.currentPage - 1) * pg.pageSize;
      const end = start + pg.pageSize;
      const list = data.slice(start, end);
      this.listData.push(...list);
    },
    cellClickHandler(item) {
      this.$emit("click", item);
    },
    refreshData() {
      this.loadLock("unlock"); //解锁
      this.timer.openTimer(() => this.$nextTick(this.initLoadFn), 60);
    },
  },
  beforeDestroy() {
    this.loadLock("close");
    this.timer.clearTimer();
  },
  watch: {
    localData() {
      this.refreshData();
    },
    params: {
      deep: true,
      handler() {
        this.refreshData();
      },
    },
  },
};
</script>
<style lang="scss">
.page-load {
  height: 100%;
  min-height: 240rpx;
}
</style>
