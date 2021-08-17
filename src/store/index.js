import Vue from 'vue';
// import Vuex from 'vuex';
import Vuex from '../vuex';
console.log(Vuex);

Vue.use(Vuex);

export default new Vuex.Store({
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
