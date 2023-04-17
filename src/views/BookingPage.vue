<template>
  <div>
    <h1 class="text-center text-3xl mb-4">Book seats for you show.</h1>
    <concert-card
      v-if="Object.keys(currentConcert).length !== 0"
      :concert="currentConcert"
      class="mb-5"
    />
    <div class="flex justify-center max-w-7xl mx-auto">
      <div v-if="booking == false">
        <div
          v-if="rows.length > 1"
          class="concert-ticket-booking max-w-5xl border border-black rounded-3xl p-8 mr-1"
        >
          <div
            class="stage max-w-sm border border-green-300 text-center py-4 mx-auto mb-4 bg-green-100"
          >
            Stage
          </div>
          <div class="seats max-w-4xl">
            <div
              class="row flex justify-between"
              v-for="row in rows"
              :key="row.id"
            >
              <div class="row-name mr-3">{{ row.name }}</div>
              <div class="seat" v-for="seat in row.seats.total" :key="seat">
                <div
                  class="circle p-2 border border-black rounded-full"
                  :class="{
                    unavailable: isSeatUnavailable(row.id, seat),
                    selected: isSelected(row.id, seat),
                  }"
                  @click="selectSeat(row, seat)"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="flex flex-col justify-between border border-black py-5 px-8 text-center"
      >
        <header class="font-bold">
          <h1 class="mb-10">Selected Seats</h1>
          <main>
            <main>
              <ul v-if="selectedSeats.length > 0">
                <li
                  v-for="seat in selectedSeats"
                  :key="`${seat.row}-${seat.seat}`"
                >
                  <strong>Row:</strong> {{ getRowName(seat.row) }},
                  <strong>Seat:</strong> {{ seat.seat }}
                </li>
              </ul>
              <div v-else>
                <h1>No seats selected.</h1>
              </div>
            </main>
          </main>
        </header>

        <footer>
          <h3 v-if="selectedSeats.length > 0 && booking == true">
            Your seats expire in: {{ formattedTime }}
          </h3>

          <button
            @click="this.booking = !this.booking"
            class="mt-10 px-2 py-1 border border-black rounded hover:bg-slate-100"
          >
            <div v-if="booking == false">Enter Booking Details</div>
            <div v-else>Change Seats</div>
          </button>
        </footer>
      </div>
      <booking-component v-if="booking == true" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import BookingComponent from "../components/BookingComponent.vue";
import ConcertCard from "../components/ConcertCard.vue";
export default {
  components: { BookingComponent, ConcertCard },
  data() {
    return {
      rows: [],
      currentConcert: {},
      booking: false,
      selectedSeats: [],
      timeRemaining: 300,
    };
  },
  async mounted() {
    try {
      let result = await axios.get(
        `https://apic.polytech.kz/api/v1/concerts/${this.$route.params.concertId}/shows/${this.$route.params.showId}/seating`
      );
      this.rows = result.data.rows;
      console.log(this.rows);
    } catch (error) {
      console.error("Failed: " + error);
    }
    this.$store.state.splitConcerts.forEach((concert) => {
      if (concert.id == this.$route.params.concertId) {
        concert.shows.forEach((show) => {
          if (show.id == this.$route.params.showId) {
            this.currentConcert = concert;
          }
        });
      }
    });
  },
  methods: {
    isSeatUnavailable(rowId, seat) {
      const row = this.rows.find((r) => r.id === rowId);
      return row && row.seats.unavailable.includes(seat);
    },

    selectSeat(row, seat) {
      if (!this.isSeatUnavailable(row.id, seat)) {
        const selectedSeat = { row: row.id, seat: seat };
        const index = this.selectedSeats.findIndex(
          (s) => s.rowId === row.id && s.seat === seat
        );

        if (index > -1) {
          this.selectedSeats.splice(index, 1);
        } else {
          this.selectedSeats.push(selectedSeat);
        }
      }
    },

    getRowName(rowId) {
      const row = this.rows.find((r) => r.id === rowId);
      return row ? row.name : "";
    },
  },
  computed: {
    isSelected() {
      return (rowId, seat) => {
        return (
          this.selectedSeats.findIndex(
            (s) => s.row === rowId && s.seat === seat
          ) > -1
        );
      };
    },
    formattedTime() {
      const minutes = Math.floor(this.timeRemaining / 60);
      const seconds = this.timeRemaining % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    },
  },

  watch: {
    booking(newValue) {
      if (newValue && this.selectedSeats.length > 0) {
        axios
          .post(
            `https://apic.polytech.kz/api/v1/concerts/${this.$route.params.concertId}/shows/${this.$route.params.showId}/reservation`,
            {
              reservation_token: this.$store.state.reservationToken
                ? this.$store.state.reservationToken
                : null,
              reservations: this.selectedSeats,
              duration: 300,
            }
          )
          .then((response) => {
            if (response.data.reservation_token !== null) {
              this.$store.state.reservationToken =
                response.data.reservation_token;
            }
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });
      }
      if (newValue && this.selectedSeats.length > 0) {
        this.timeRemaining = 300;
        const intervalId = setInterval(() => {
          this.timeRemaining--;
          if (this.timeRemaining === 0) {
            clearInterval(intervalId);
            this.$router.push("/");
            this.$store.state.reservationToken = null;
            alert("Reservation time has run out.");
          }
        }, 1000);
      }
    },
  },
};
</script>

<style>
.unavailable {
  background-color: #fecaca;
}

.selected {
  background-color: lightgreen;
}
</style>
