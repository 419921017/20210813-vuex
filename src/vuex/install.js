export let Vue;

function install(_Vue) {
  Vue = _Vue;
  Vue.mixin({
    beforeCreate() {
      // this代表的是每个组件的实例
      //   console.log(this);
      let options = this.$options;
      if (options.store) {
        // 根元素
        this.$store = options.store;
      } else {
        // 非根元素
        if (this.$parent && this.$parent.$store) {
          this.$store = this.$parent.$store;
        }
      }
    },
  });
}
export default install;
