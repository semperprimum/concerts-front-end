<template>
  <div class="border border-black py-5 px-8 ml-1">
    <header class="font-bold mb-4">Please enter you details</header>
    <div class="flex">
      <main class="w-80">
        <div class="mb-2">
          <label class="font-semibold" for="name" id="name">Name</label>
          <input
            class="block border border-black w-full"
            type="text"
            name="name"
            id="name"
            v-model="name"
            required
          />
        </div>

        <div class="mb-2">
          <label class="font-semibold" for="address" id="address"
            >Address</label
          >
          <input
            class="block border border-black w-full"
            type="text"
            name="address"
            id="address"
            required
            v-model="address"
          />
        </div>

        <div class="flex">
          <div class="mb-2">
            <label class="font-semibold" for="zipcode" id="zipcode"
              >ZIP Code</label
            >
            <input
              class="block border border-black w-16 mr-4"
              type="text"
              name="zipcode"
              id="zipcode"
              required
              v-model="zip"
            />
          </div>

          <div class="mb-2">
            <label class="font-semibold" for="city" id="city">City</label>
            <input
              class="block border border-black w-60"
              type="text"
              name="city"
              id="city"
              required
              v-model="city"
            />
          </div>
        </div>
        <div class="mb-2">
          <select
            name="country"
            id="country"
            class="w-full px-2 py-1 rounded"
            required
            v-model="country"
          >
            <option value="" disabled selected>Country</option>
            <option
              :value="country[0]"
              v-for="country in countries"
              :key="country[0]"
            >
              {{ country[0] }}
            </option>
          </select>
        </div>
      </main>

      <div class="ml-2 p-2 border-l border-black flex flex-col justify-between">
        <p class="text-center max-w-xs mt-10">
          By clicking "Book" you accept that you are not actually booking a
          ticket as this is a test project and not a real website
        </p>

        <div class="flex justify-between">
          <div
            class="text-xs w-40 bg-slate-200 text-center p-1 border border-black mr-3"
          >
            Your ticket will be available immediately after booking
          </div>
          <button
            class="px-16 border border-black rounded"
            @click="bookTickets"
          >
            Book
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import csv from "csv-loader!./countries.csv";
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      address: "",
      city: "",
      zip: "",
      country: "",
      countries: [],
    };
  },
  mounted() {
    this.loadCsvData();
  },
  methods: {
    loadCsvData() {
      this.countries = csv;
      console.log(this.countries);
    },
    async bookTickets() {
      if (
        this.name !== "" &&
        this.address !== "" &&
        this.city !== "" &&
        this.zip !== "" &&
        this.country !== ""
      ) {
        try {
          let result = await axios.post(
            `https://apic.polytech.kz/api/v1/concerts/${this.$route.params.concertId}/shows/${this.$route.params.showId}/booking`,
            {
              reservation_token: this.$store.state.reservationToken,
              name: this.name,
              address: this.address,
              city: this.city,
              zip: this.zip,
              country: this.country,
            }
          );
          this.$router.push("/");
          console.log(result);
        } catch (error) {
          console.error("Failed: " + error);
        }
      }
    },
  },
};
</script>

<style></style>
