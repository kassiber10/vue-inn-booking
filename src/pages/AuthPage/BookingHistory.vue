<template>
  <div v-if="isLoading" class="loading"><BaseSpinner /></div>
  <section v-else-if="bookingsLoaded">
    <div class="container">
      <h3>Your Booking History</h3>
      <ul>
        <li v-for="key in latestBookings" :key="key">
          Room Number: {{ key.rooms_id }}
          <br />
          Booking ID: {{ key.bookingId }}
          <br />
          From: {{ key.from }} To:
          {{ key.to }}
          <hr />
        </li>
      </ul>
    </div>
  </section>
  <p class="error" v-else>{{ error }}</p>
</template>

<script>
import { mapStores } from "pinia";
import { useBookingStore } from "@/stores/booking";

export default {
  name: "BookingHistory",
  data() {
    return {
      error: null,
      isLoading: false,
      bookingHistory: [],
    };
  },
  computed: {
    ...mapStores(useBookingStore),
    bookingsLoaded() {
      return !this.isLoading && !!this.bookingHistory.length;
    },
    latestBookings() {
      return this.bookingHistory.slice(-10);
    },
  },
  async mounted() {
    this.isLoading = true;
    try {
      await this.bookingStore.getBookings();
    } catch (error) {
      this.error = error.message || "Something went wrong!";
    }
    this.bookingHistory = this.bookingStore.getAllBookings;
    this.isLoading = false;
  },
};
</script>

<style scoped>
section {
  max-width: 75rem;
  margin: 0 auto;
  padding: 1rem;
}
h2 {
  border-bottom: 0.0125rem solid #d0d1d3;
}
.container {
  display: flex;
  flex-direction: column;
}
.readonly-disabled {
  color: rgba(0, 0, 0, 0.5);
}

.room-details {
  width: 100%;
}

.info {
  color: lightgrey;
}
form {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 3rem;
}

label {
  padding-bottom: 0.5rem;
}

form input {
  box-sizing: border-box;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 2;
  border: 0.02rem solid #1a1a1a;
  transition: outline 0.2s ease-in-out;
  width: 100%;
  margin-bottom: 2rem;
}

form input:hover,
form input:focus,
form input:active {
  outline: 0.08rem solid #1a1a1a;
}
.form-err {
  margin-top: -1rem;
  color: #f87272;
}

@media screen and (max-width: 800px) {
}
ul {
  list-style-type: none;
  margin-left: -2.3rem;
  line-height: 1.5;
}
h3 {
  text-align: center;
  margin-bottom: 0;
}
</style>
