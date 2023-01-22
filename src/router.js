import { createRouter, createWebHistory } from "vue-router";

import DoorwayPage from "@/pages/DoorwayPage.vue";
import LandingPage from "@/pages/LandingPage/index.vue";
import ImprintPage from "@/pages/ImprintPage/index.vue";
import AboutPage from "@/pages/AboutPage/index.vue";
import AuthPage from "@/pages/AuthPage/index.vue";
import BookingPage from "@/pages/BookingPage/index.vue";
import BookingReservationPage from "@/pages/BookingReservationPage/index.vue";
import BookingConfirmationPage from "@/pages/BookingConfirmationPage/index.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: DoorwayPage,
    },
    {
      path: "/home",
      component: LandingPage,
    },
    {
      path: "/about",
      component: AboutPage,
    },
    {
      path: "/imprint",
      component: ImprintPage,
    },
    {
      path: "/booking",
      component: BookingPage,
    },
    {
      path: "/auth",
      component: AuthPage,
    },
    {
      path: "/booking/reservation",
      component: BookingReservationPage,
    },
    {
      path: "/booking/confirmation",
      component: BookingConfirmationPage,
    },
  ],
  linkActiveClass: "active",
});

export default router;
