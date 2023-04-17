import { createStore } from "vuex";

export default createStore({
  state: {
    concerts: [],
    splitConcerts: [],
    filteredConcerts: [],
    selectedArtist: "",
    selectedLocation: "",
    selectedDate: "",
    artistOptions: [],
    currentBookingShow: {},
    reservationToken: null,
    currentConcert: {},
  },
  getters: {
    filteredConcerts: (state) => {
      const filteredConcerts = state.splitConcerts.filter((concert) => {
        if (state.selectedArtist && state.selectedArtist !== concert.artist) {
          return false;
        }
        if (
          state.selectedLocation &&
          state.selectedLocation !== concert.location.name
        ) {
          return false;
        }
        if (
          state.selectedDate &&
          state.selectedDate !== concert.shows[0].start.slice(0, 10)
        ) {
          return false;
        }
        return true;
      });
      state.filteredConcerts = filteredConcerts;
      return state.filteredConcerts;
    },
  },
  mutations: {
    splitConcerts(state) {
      const newConcerts = [];
      state.concerts.forEach((concert) => {
        if (concert.shows.length > 1) {
          concert.shows.forEach((show) => {
            const newConcert = { ...concert };
            newConcert.shows = [show];
            newConcerts.push(newConcert);
          });
        } else {
          newConcerts.push(concert);
        }
      });
      state.splitConcerts = newConcerts;
    },
    setSelectedArtist(state, artist) {
      state.selectedArtist = artist;
    },
    setSelectedLocation(state, location) {
      state.selectedLocation = location;
    },
    setSelectedDate(state, date) {
      state.selectedDate = date;
    },
    clearFilters(state) {
      state.selectedArtist = "";
      state.selectedLocation = "";
      state.selectedDate = "";
    },
  },
  actions: {},
  modules: {},
});
