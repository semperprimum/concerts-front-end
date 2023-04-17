<template>
  <div class="mx-auto max-w-4xl text-center">
    <h1 class="text-3xl">Checkout these amazing concerts in Graz.</h1>
    <main class="mt-5 space-x-3 mx-auto">
      <select
        class="px-4 py-2 bg-slate-200 rounded-md mb-3"
        name="artist"
        id="artist"
        @change="updateSelectedArtist($event.target.value)"
      >
        <option value="" :selected="$store.state.selectedArtist === ''">
          All Artists
        </option>
        <option v-for="artist in filteredArtists" :key="artist" :value="artist">
          {{ artist }}
        </option>
      </select>
      <select
        class="px-4 py-2 bg-slate-200 rounded-md mb-3"
        name="location"
        id="location"
        @change="updateSelectedLocation($event.target.value)"
      >
        <option value="" :selected="$store.state.selectedLocation === ''">
          All Locations
        </option>
        <option
          v-for="location in filteredLocations"
          :key="location"
          :value="location"
        >
          {{ location }}
        </option>
      </select>
      <input
        class="px-4 py-2 bg-slate-200 rounded-md"
        type="date"
        placeholder="Date"
        :value="
          $store.state.selectedDate === '' ? null : $store.state.selectedDate
        "
        @change="updateSelectedDate($event.target.value)"
      />
      <a
        v-if="
          $store.state.selectedArtist !== '' ||
          $store.state.selectedLocation !== '' ||
          $store.state.selectedDate !== ''
        "
        @click="$store.commit('clearFilters')"
        class="absolute mx-auto text-center mt-3 font-semibold text-slate-400 hover:cursor-pointer hover:underline"
      >
        Clear Filers
      </a>
    </main>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: {
    ...mapState(["splitConcerts"]),
    filteredArtists() {
      const artists = new Set();
      this.splitConcerts.forEach((concert) => {
        artists.add(concert.artist);
      });
      return Array.from(artists);
    },
    filteredLocations() {
      const locations = new Set();
      this.splitConcerts.forEach((concert) => {
        locations.add(concert.location.name);
      });
      return Array.from(locations);
    },
  },
  methods: {
    updateSelectedArtist(artist) {
      this.$store.commit("setSelectedArtist", artist);
    },
    updateSelectedLocation(location) {
      this.$store.commit("setSelectedLocation", location);
    },
    updateSelectedDate(date) {
      this.$store.commit("setSelectedDate", date);
    },
  },
};
</script>

<style></style>
