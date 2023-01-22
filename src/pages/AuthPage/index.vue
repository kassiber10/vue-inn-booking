<template>
  <div class="container">
    <template v-if="isLoggedIn">
      <h3>Until next time</h3>
      <SecondaryButton class="btn" @click="logout"> Logout </SecondaryButton>
      <h3>Booking History</h3>
      <SecondaryButton class="btn" @click="toggleBookingHistory">
        {{showHistoryBtn}} History
      </SecondaryButton>
      <section v-if="showHistory">
        <BookingHistory />
      </section>
    </template>
    <template v-else>
      <template v-if="signupForm">
        <SignUp />
      </template>
      <SecondaryButton v-else class="btn" @click="changeForm('signup')">
        Signup
      </SecondaryButton>
      <div className="border"></div>
      <template v-if="loginForm">
        <SignIn />
      </template>
      <SecondaryButton v-else class="btn" @click="changeForm('login')">
        Login
      </SecondaryButton>
    </template>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/users";
import SignUp from "./SignUp.vue";
import SignIn from "./SignIn.vue";
import BookingHistory from "./BookingHistory.vue";

export default {
  name: "AuthenticationPage",
  components: { SignUp, SignIn, BookingHistory },
  data() {
    return {
      showForm: "signup",
      showHistory: false,
    };
  },
  computed: {
    ...mapStores(useAuthStore),
    isLoggedIn() {
      return this.authStore.isAuthenticated;
    },
    signupForm() {
      return this.showForm === "signup";
    },
    loginForm() {
      return this.showForm === "login";
    },
    showHistoryBtn() {
      return this.showHistory ? "Hide" : "Show";
    },
  },
  methods: {
    changeForm(form) {
      this.showForm = form;
    },
    logout() {
      this.authStore.logout();
    },
    toggleBookingHistory() {
      this.showHistory = !this.showHistory;
    },
  },
};
</script>

<style scoped>
.container {
  margin-top: 3.75rem;
  margin-bottom: 1.75rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.border {
  width: 100%;
  margin: 1.75rem 0rem;
  border-bottom: 0.06rem solid #d0d1d3;
}

.btn {
  width: 90%;
  max-width: 25rem;
}

@media (min-width: 40rem) {
  .btn {
    width: 50%;
  }
}
</style>