<template>
  <div
    class="border border-black rounded-xl w-48 p-4 text-center mx-auto max-h-72 cursor-pointer"
    @click="goToBookingPage"
  >
    <header class="mb-10">
      <div class="text-md">{{ concert.shows[0].start.slice(0, 10) }}</div>
      <div class="text-2xl">{{ concert.artist }}</div>
      <div>{{ concert.location.name }}</div>
    </header>
    <footer>
      {{ concert.shows[0].start.slice(11, 16) }} -
      {{ concert.shows[0].end.slice(11, 16) }}
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goToBookingPage() {
      const showId = this.concert.shows[0].id;
      const concertId = this.concert.id;
      this.$router.push({
        name: "booking",
        params: { concertId: concertId, showId: showId },
      });
    },
  },
  props: {
    concert: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style></style>
