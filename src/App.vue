<template>
  <div id="app">
    <div>
      {{$store.state.name}}
    </div>
    <div>
      {{$store.state.age}}
    </div>
    <div>
      {{$store.getters.myAge}}
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
