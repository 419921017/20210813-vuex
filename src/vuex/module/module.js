import { forEach } from '../utils';

class Module {
  constructor(rawModule) {
    this._raw = rawModule;
    this._children = {};
    this.state = rawModule.state;
  }
  getChild(childName) {
    return this._children[childName];
  }
  addChild(childName, childModule) {
    this._children[childName] = childModule;
  }
  forEachGetter(cb) {
    this._raw.getters && forEach(this._raw.getters, cb);
  }
  forEachMutation(cb) {
    this._raw.mutations && forEach(this._raw.mutations, cb);
  }
  forEachActions(cb) {
    this._raw.actions && forEach(this._raw.actions, cb);
  }
  forEachChildren(cb) {
    this._children && forEach(this._children, cb);
  }
  // 用于标识是否使用了namespace
  get namespace() {
    return !!this._raw.namespace;
  }
}

export default Module;
