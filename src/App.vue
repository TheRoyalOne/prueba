<template>
  <div id="App" class="justify-center flex flex-col items-center h-screen bg-gradient-to-r from-gray-700 to-black via-gray-900">
    <router-view
      class=""
    ></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>
