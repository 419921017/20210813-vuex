import { Vue } from './install';
import { forEach } from './utils';
import ModuleCollection from './module/ModuleCollection';
class Store {
  constructor(options) {
    // 对用户参数进行格式化操作
    this._modules = new ModuleCollection(options);
    this.mutations = {};
    this.actions = {};
    this.getters = {};

    // 没有namespace的时候, getter会都放在根上, actions和mutations会被合并成数组
    installModule(this, [], this._modules.root);
  }
}

function installModule(store, path, module) {
  module.forEachGetter((fn, key) => {
    store.getters[key] = function() {
      return fn.call(store, module.state);
    };
  });

  module.forEachMutation((fn, key) => {
    store.mutations[key] = store.mutations[key] || [];
    store.mutations[key].push((payload) => {
      return fn.call(store, module.state, payload);
    });
  });
  module.forEachActions((fn, key) => {
    store.actions[key] = store.mutations[key] || [];
    store.actions[key].push((payload) => {
      return fn.call(store, module.state, payload);
    });
  });
  module.forEachChildren((child, key) => {
    installModule(store, path.concat(key), child);
  });
}

export default Store;
