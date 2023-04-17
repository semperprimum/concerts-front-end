<template>
  <div>
    <div
      v-if="Object.keys($store.state.filteredConcerts).length !== 0"
      class="grid grid-cols-4 gap-5 max-w-4xl mx-auto mt-10"
    >
      <concert-card
        v-for="concert in $store.state.filteredConcerts"
        :key="concert.id"
        :concert="concert"
      />
    </div>
    <div v-if="$store.state.filteredConcerts.length == 0">
      <h1 class="text-center font-semibold text-xl">
        No shows are matching the current filter criteria.
      </h1>
    </div>
  </div>
</template>

<script>
import ConcertCard from "./ConcertCard.vue";
export default {
  components: {
    ConcertCard,
  },
};
</script>

<style></style>
