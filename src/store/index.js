import Vue from 'vue';
// import Vuex from 'vuex';
import Vuex from '../vuex';
import logger from 'vuex/dist/logger';

Vue.use(Vuex);

function log() {
  return function(store) {
    let prevState = JSON.stringify(store.state);
    // vuex中所有的操作都是基于mutation, 状态变化都是通过mutation
    // 直接手动更改状态, 此subscribe不会执行
    store.subscribe((mutation, state) => {
      console.log(prevState);
      console.log(mutation);
      console.log(JSON.stringify(state));
      prevState = JSON.stringify(state);
    });
  };
}

function persists() {
  return function(store) {
    let localState = JSON.parse(localStorage.getItem('VUEX:STATE'));
    if (localState) {
      store.replaceState(localStorage.getItem('VUEX:STATE'));
    }
    // TODO: 防抖
    store.subscribe((mutation, rootState) => {
      localStorage.setItem('VUEX:STATE', JSON.stringify(rootState));
    });
  };
}

export default new Vuex.Store({
  plugins: [log()],
  state: {
    name: 'aaa',
    age: 123,
  },
  mutations: {
    changeAge(state, payload) {
      state.age += payload;
    },
  },
  actions: {
    changeAge({ commit }, payload) {
      commit('changeAge', payload);
    },
  },
  getters: {
    myAge(state) {
      return state.age + 19;
    },
  },
  modules: {
    a: {
      namespace: true,
      state: {
        name: 'a1',
        age: 11,
      },
      actions: {
        changeAge({ commit }, payload) {
          commit('changeAge', payload);
        },
      },
      mutations: {
        changeAge(state, payload) {
          state.age += payload;
        },
      },
      getters: {
        aAge(state) {
          return state.age;
        },
      },
      modules: {
        ac: {
          namespace: true,
          state: {
            name: 'ac1',
            age: 111,
          },
          actions: {
            changeAge({ commit }, payload) {
              commit('changeAge', payload);
            },
          },
          mutations: {
            changeAge(state, payload) {
              state.age += payload;
            },
          },
        },
      },
    },
    b: {
      namespace: true,
      state: {
        name: 'b1',
        age: 13,
      },
      mutations: {
        changeAge(state, payload) {
          state.age += payload;
        },
      },
      actions: {
        changeAge({ commit }, payload) {
          commit('changeAge', payload);
        },
      },
      getters: {
        bAge(state) {
          return state.age;
        },
      },
    },
  },
});
