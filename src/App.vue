<template>
  <div id="app">
    <div>
      state = {{$store.state.age}}
      <button @click="$store.commit('changeAge', 10)">state</button>

    </div>
    <div>
      a = {{$store.state.a.age}}
      <button @click="$store.commit('a/changeAge', 10)">state.a</button>

    </div>
    <div>
      a.ac = {{$store.state.a.ac.age}}
      <button @click="$store.commit('a/ac/changeAge', 10)">a.ac</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  }
}
</script>

<style>
</style>
