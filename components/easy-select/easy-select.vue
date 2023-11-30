<template>
  <view class="easy-select" :class="[{ custom }, customClass]">
    <view
      class="uni-select--mask"
      v-if="showOptions"
      @click.stop="hideOptions"
    />
    <input
      type="text"
      :class="[inputClass, { show: showOptions }]"
      :style="[easySelectSize]"
      v-model="inputValue"
      :placeholder="placeholder"
      :placeholder-style="`color:${placeholderColor}`"
      @focus="showOptions = true"
      @confirm="$emit('confirm')"
      clearable
    />
    <view
      class="easy-select-options"
      :class="{ empty: isEmpty, up }"
      :data-empty="_emptyText"
      v-if="showOptions"
    >
      <view class="easy-select-options-loading" v-if="loading_">
        <u-loading-icon text="加载中" textSize="18"></u-loading-icon>
      </view>
      <load-list v-else-if="!isEmpty" :localData="listData">
        <template v-slot:default="{ list }">
          <view
            class="easy-select-options-item"
            v-for="item in list"
            :key="item.value"
            @click.stop="select(item)"
            :class="{
              selected: item[keyName] === selectValue,
            }"
          >
            <rich-text :nodes="highlight(item[keyName])"></rich-text>
          </view>
        </template>
      </load-list>
    </view>
  </view>
</template>

<script>
/**
 * @description: 数组对象去重(只支持单个属性是否重复去重)
 * @param {array} arr 待处理数组
 * @param {?function} filterFn 过滤函数
 * @param {string|array} [name="id"] 去重属性(支持多属性[|分割],不支持子对象属性)
 * @param {?collect} 是否收集重复项
 * @return {array}
 */
function arrayObjectDeWeight(
  arr = [],
  { filterFn, name = "id", collect } = {}
) {
  let map = new Map();
  let residue = []; //重复项收集数组
  const multiName = Array.isArray(name); //是否多属性去重

  //重复判断函数和数据设置函数
  const repetition = (() => {
    if (multiName) return (item) => name.some((key) => map.has(item[key]));
    return (item) => map.has(item[name]);
  })();
  const setMap = (() => {
    const key = multiName ? name[0] : name;
    if (filterFn instanceof Function)
      return (item) => map.set(item[key], filterFn(item));
    return (item) => map.set(item[key], item);
  })();
  //使用自执行函数进行单次判断获取目标函数,减少循环时不必要的重复判断

  for (let item of arr) {
    if (!repetition(item)) setMap(item);
    else residue.push(item);
  }

  const result = Array.from(map.values());
  if (collect) return [result, residue];
  residue = null; //如果不收集,则释放内存
  return result;
}
const COMPONENT_NAME = "easy-select";
//距离底部高度
const BOTTOM_HEIGHT = 60;
const SIZE = {
  medium: {
    width: "460rpx",
    height: "72rpx",
  },
  small: {
    width: "400rpx",
    height: "56rpx",
  },
  mini: {
    width: "320rpx",
    height: "56rpx",
  },
};

export default {
  name: COMPONENT_NAME,
  // #ifdef MP-WEIXIN
  options: {
    virtualHost: true,
  },
  // #endif
  props: {
    inputClass: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请选择",
    },
    value: {
      type: String,
      default: "",
    },
    size: {
      type: String,
      default: "medium",
    },
    options: {
      type: Array,
      default: () => [],
    },
    emptyText: {
      type: String,
      default: "无匹配数据",
    },
    custom: {
      type: Boolean,
      default: false,
    },
    keyName: {
      type: String,
      default: "label",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    placeholderColor: {
      type: String,
      default: "#c0c4cc",
    },
    loadData: Function, //数据加载函数
  },
  data() {
    return {
      inputValue: "",
      selectValue: "",
      showOptions: false,
      boundingClientRect: {},
      options_: [],
      loading_: false,
      up: false,
    };
  },
  computed: {
    easySelectSize() {
      //根据size计算input的宽高
      let size = this.size.toLowerCase();
      if (!this.custom && size in SIZE) {
        return {
          width: SIZE[size].width,
          height: SIZE[size].height,
        };
      } else {
        return {};
      }
    },
    listData() {
      //根据输入值过滤数据
      const { options_, inputValue: value, keyName } = this;
      if (value)
        return options_.filter((o) => (o[keyName] || "").includes(value));
      else return options_;
    },
    isEmpty() {
      return !(this.loading_ || this.listData.length);
    },
    _emptyText() {
      return this.options_.length ? this.emptyText : "暂无数据";
    },
  },
  mounted() {
    const res = uni.getSystemInfoSync();
    this.easyWindowHeight = res.windowHeight;
    const elQuery = uni.createSelectorQuery().in(this);
    elQuery
      .select(".easy-select")
      .boundingClientRect((data) => {
        this.boundingClientRect = data;
      })
      .exec();
    //保存计算初始值
  },
  methods: {
    highlight(text) {
      const query = this.inputValue;
      return text.replace(
        query,
        `<span style="color: #409eff">${query}</span>`
      );
    },
    trigger(e) {
      //计算下拉框位置(up,down)
      const view = uni.createSelectorQuery().in(this);
      view
        .select(".easy-select")
        .fields({ rect: true }, (data) => {
          let { top, bottom } = data;
          bottom =
            Number(this.easyWindowHeight) -
            (top + this.boundingClientRect.height);
          // 距离底部的距离等于视口的高度减上top加select组件的高度
          this.up = bottom < BOTTOM_HEIGHT;
          this.showOptions = !this.showOptions;
        })
        .exec();
    },
    select(opt) {
      //选择后关闭下拉框更新值并emit
      this.selectValue = this.inputValue = opt[this.keyName];
      this.showOptions = false;
      this.$emit("change", opt);
    },
    hideOptions() {
      this.showOptions = false;
    },
    async updateOptions(opt = this.options) {
      if (typeof this.loadData === "function") {
        //如果传入了loadData函数,则调用该函数获取数据并控制loading
        this.loading_ = true;
        opt = await this.loadData();
        if (!Array.isArray(opt)) opt = [];
        this.loading_ = false;
      }
      const { keyName } = this;
      this.options_ = arrayObjectDeWeight(opt, {
        name: keyName,
        filterFn: (item) =>
          typeof item === "string"
            ? {
                [keyName]: item,
              }
            : item,
      });
    },
  },
  watch: {
    options(opt) {
      //更新options(配合loading使用可发请求)
      this.updateOptions(opt);
    },
    loading(val) {
      //更新本地loading状态(可在外部控制loading)
      this.loading_ = val;
    },
    loading_(val) {
      //更新sync的loading状态
      this.$emit("update:loading", val);
    },
    showOptions(state) {
      if (state && !this.initData) {
        //第一次打开下拉框时初始化数据
        this.updateOptions().then(() => (this.initData = true));
      } else if (!state) {
        //关闭下拉框时,同步为选中值,防止传入其他值
        if (this.inputValue) this.inputValue = this.selectValue;
        else this.selectValue = "";
      }
      this.$emit(state ? "open" : "close", this.selectValue);
    },
    value: {
      handler(val) {
        this.selectValue = val;
      },
      immediate: true,
    },
    selectValue(val) {
      //值变化后触发v-model
      this.inputValue = val;
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="scss">
.easy-select {
  position: relative;

  &:not(.custom) {
    width: fit-content;
  }

  .uni-select--mask {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    z-index: 9;
  }

  &.custom > input {
    background-color: transparent;
    border: none;
  }

  input {
    position: relative;
    padding: 0 18rpx;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    border: 1px solid #dcdfe6;
    border-radius: 36px;
    color: #606266;
    outline: none;
    box-sizing: content-box;
    background-color: #fff;

    &.show {
      z-index: 10;
    }
  }

  .easy-select-options {
    position: absolute;
    width: 100%;
    padding-top: 12rpx;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    transform-origin: center top;
    z-index: 2238;
    overflow: scroll;
    height: 300rpx;

    &:not(.up) {
      margin-top: 10px;
    }

    &.up {
      bottom: calc(100% + 10px);
    }

    &.empty {
      padding: 20rpx 0;
      text-align: center;

      &::before {
        content: attr(data-empty);
        color: #999;
        font-size: 28rpx;
      }
    }

    &-loading {
      padding: 64rpx 0;
    }

    &-item {
      padding: 0 20rpx;
      position: relative;
      white-space: nowrap;
      font-size: 28rpx;
      color: #606266;
      height: 72rpx;
      line-height: 72rpx;
      box-sizing: border-box;

      &:active,
      &.selected {
        background-color: #f5f7fa;
      }

      &.selected {
        color: #409eff;
        font-weight: 700;
      }
    }
  }
}
</style>
