import { forEach } from '../utils';
import Module from './module';

class ModuleCollection {
  constructor(options) {
    this.root = null;
    this.register([], options);
  }
  register(path, rawModule) {
    let newModule = new Module(rawModule);
    // let newModule = {
    //   _raw: rawModule,
    //   _children: {},
    //   state: rawModule.state,
    // };

    if (path.length == 0) {
      this.root = newModule;
    } else {
      // 向上寻找父级
      // 定位到数组的倒数第二个
      let parent = path
        .slice(0, -1)
        .reduce((memo, current) => memo.getChild(current), this.root);

      parent.addChild([path[path.length - 1]], newModule);
    }
    if (rawModule.modules) {
      forEach(rawModule.modules, (module, key) => {
        this.register(path.concat(key), module);
      });
    }
  }
}

export default ModuleCollection;
