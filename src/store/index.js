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
  mutations: {},
  actions: {},
  modules: {},
  getters: {
    myAge(state) {
      return state.age + 19;
    },
  },
});
