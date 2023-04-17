import { createRouter, createWebHashHistory } from "vue-router";
import BookingPage from "@/views/BookingPage.vue";
import ConcertCardGrid from "@/components/ConcertCardGrid.vue";
import FilterView from "@/components/FilterView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    components: {
      default: ConcertCardGrid,
      filter: FilterView,
    },
  },
  {
    path: "/booking/:concertId/:showId",
    name: "booking",
    components: { default: BookingPage },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
