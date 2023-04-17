<template>
  <div>
    <header-view :headerText="headerText" />
    <router-view name="filter"></router-view>
    <router-view></router-view>
  </div>
</template>

<script>
import HeaderView from "@/components/HeaderView.vue";

import axios from "axios";

export default {
  data() {
    return {
      concerts: [],
      headerText: "",
    };
  },
  components: {
    HeaderView,
  },
  async mounted() {
    let result = await axios.get("https://apic.polytech.kz/api/v1/concerts");
    this.$store.state.concerts = result.data.concerts;
    this.$store.commit("splitConcerts");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
