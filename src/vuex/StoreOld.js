import { Vue } from './install';
import { forEach } from './utils';
class Store {
  constructor(options) {
    console.log(options);
    let { state, mutations, actions, module, strict, getters } = options;

    this.getters = {};
    const computed = {};

    forEach(getters, (fn, key) => {
      computed[key] = () => fn(this.state);
      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key], // 从computed上取值, 具备了缓存的功能
      });
    });

    this.mutations = {};
    forEach(mutations, (fn, key) => {
      // mutations: {changeAge: (state, payload) => {}}
      this.mutations[key] = (payload) => fn.call(this, this.state, payload);
    });

    this.actions = {};

    forEach(actions, (fn, key) => {
      this.actions[key] = (payload) => fn.call(this, this, payload);
    });
    // Object.keys(getters).forEach((key) => {
    //   computed[key] = () => getters[key](this.state);
    //   Object.defineProperty(this.getters, key, {
    //     get: () => this._vm[key], // 从computed上取值, 具备了缓存的功能
    //   });
    // });

    // 状态再页面渲染时, 需要手机对应的渲染watcher, 这样状态才会更新视图
    this._vm = new Vue({
      data: {
        $$state: state,
      },
      computed,
    });
    // this.state = state;
  }
  // 类的属性访问器
  get state() {
    return this._vm._data.$$state;
  }
  // 使用es7语法处理绑定this问题
  commit = (type, payload) => {
    this.mutations[type](payload);
  };
  // 使用es7语法处理绑定this问题
  dispatch = (type, payload) => {
    this.actions[type](payload);
  };
}

export default Store;
