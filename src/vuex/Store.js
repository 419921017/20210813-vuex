import { Vue } from './install';
import { forEach } from './utils';
import ModuleCollection from './module/ModuleCollection';
class Store {
  constructor(options) {
    // 对用户参数进行格式化操作
    this._modules = new ModuleCollection(options);
    console.log('this._modules', this._modules);
    this.mutations = {};
    this.actions = {};
    this.wrapperGetters = {};
    this.getters = {};

    const computed = {};

    // 没有namespace的时候, getter会都放在根上, actions和mutations会被合并成数组
    let state = options.state;

    installModule(this, state, [], this._modules.root);

    forEach(this.wrapperGetters, (getter, key) => {
      computed[key] = getter;

      Object.defineProperty(this.getters, key, {
        get: () => this._vm[key],
      });
    });

    this._vm = new Vue({
      data: {
        $$state: state,
      },
      computed,
    });

    console.log('this.getters', this.getters);
    console.log('this.mutations', this.mutations);
    console.log('this.actions', this.mutations);
  }
  get state() {
    return this._vm._data.$$state;
  }
  commit = (mutationName, payload) => {
    console.log('mutationName', mutationName);
    console.log('this.mutations[mutationName]', this.mutations[mutationName]);
    this.mutations[mutationName] &&
      this.mutations[mutationName].forEach((fn) => fn(payload));
  };
  dispatch = (actionName, payload) => {
    this.actions[actionName] &&
      this.actions[actionName].forEach((fn) => fn(payload));
  };
}

function installModule(store, rootState, path, module) {
  let ns = store._modules.getNamespace(path);

  if (path.length > 0) {
    let parent = path
      .slice(0, -1)
      .reduce((memo, current) => memo[current], rootState);
    // 添加响应式
    Vue.set(parent, path[path.length - 1], module.state);
  }
  module.forEachGetter((fn, key) => {
    store.wrapperGetters[ns + key] = () => fn.call(store, module.state);
  });

  module.forEachMutation((fn, key) => {
    store.mutations[ns + key] = store.mutations[ns + key] || [];
    store.mutations[ns + key].push((payload) =>
      fn.call(store, module.state, payload)
    );
  });

  module.forEachActions((fn, key) => {
    store.actions[ns + key] = store.actions[ns + key] || [];
    store.actions[ns + key].push((payload) => fn.call(store, store, payload));
  });

  module.forEachChildren((child, key) => {
    installModule(store, rootState, path.concat(key), child);
  });
}

export default Store;
