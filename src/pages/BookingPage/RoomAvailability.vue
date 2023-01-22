<template>
  <form @submit.prevent="submitCheckAvailability">
    <div class="form-input">
      <div class="form-element">
        <label for="start">From:</label>
        <input type="date" :min="currentDate" id="start" v-model="startDate" />
      </div>
      <div class="form-element">
        <label for="end">To:</label>
        <input type="date" :min="currentDate" id="end" v-model="endDate" />
      </div>
    </div>
    <p v-if="showError">{{ message }}</p>
    <button v-if="!available" :class="buttonStyle">
      <span v-if="buttonStyle.includes('loading')">
        <img
          class="spinner"
          src="/assets/images/site/spinner.gif"
          alt="Loading..."
      /></span>
      <span v-else>Check Availability</span>
    </button>
    <button
      class="check-btn available"
      v-if="available"
      @click.prevent="roomReservation"
    >
      Available! Book now
    </button>
  </form>
</template>

<script>
import { mapStores } from "pinia";
import { useBookingStore } from "@/stores/booking";

export default {
  name: "RoomAvailability",
  data() {
    return {
      startDate: null,
      endDate: null,
      isLoading: false,
      error: false,
      message: "",
    };
  },
  computed: {
    ...mapStores(useBookingStore),
    available() {
      if (
        this.bookingStore.getAvailability &&
        this.id === this.bookingStore.getRoom &&
        !this.isLoading &&
        !this.error &&
        this.startDate &&
        this.endDate
      ) {
        return true;
      }
      return false;
    },
    showError() {
      if (this.id === this.bookingStore.getRoom && this.error) {
        return true;
      }
      return false;
    },
    buttonStyle() {
      if (this.isLoading) {
        return "check-btn loading";
      } else {
        return "check-btn";
      }
    },
    currentDate() {
      const newDate = new Date();
      return newDate.toISOString().split("T")[0];
    },
  },
  props: {
    id: { type: Number, required: true },
  },
  watch: {
    startDate() {
      this.bookingStore.setRoom(undefined);
    },
    endDate() {
      this.bookingStore.setRoom(undefined);
    },
  },
  methods: {
    async submitCheckAvailability() {
      this.bookingStore.setRoom(this.id);
      this.isLoading = true;
      this.error = false;

      const validDates = this.dateValidation();
      if (!validDates) return;

      try {
        await this.bookingStore.checkAvailability(
          this.id,
          this.startDate,
          this.endDate
        );
      } catch (error) {
        this.setError(error.message || "Something went wrong!");
        return;
      }

      if (!this.bookingStore.getAvailability) {
        this.setError("Not available - Please choose another date");
        return;
      }

      this.isLoading = false;
    },
    dateValidation() {
      if (!this.startDate || !this.endDate) {
        this.setError("Please enter a date");
        return false;
      }

      const start = this.startDate.replace(/[-]/g, "");
      const end = this.endDate.replace(/[-]/g, "");

      if (!(+start < +end)) {
        this.setError("End date has to be after start");
        return false;
      }
      return true;
    },
    setError(message) {
      this.message = message;
      this.error = true;
      this.isLoading = false;
    },
    roomReservation() {
      this.bookingStore.setDate(this.startDate, this.endDate);
      this.$router.push("/booking/reservation");
    },
  },
};
</script>

<style scoped>
form {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
  gap: 2rem;
  color: #262626;
  padding: 1rem;
  border: 0.0125rem solid #d0d1d3;
  width: 100%;
  max-width: 25rem;
}

.form-input {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
}

.form-element {
  display: flex;
  align-items: center;
  gap: 0.2rem;
  font-size: 0.825rem;
}

label {
  width: 3rem;
}

input {
  border: none;
  font-size: 0.825rem;
  border-bottom: 0.02rem solid #1a1a1a;
  transition: outline 0.2s ease-in-out;
}

input:hover,
input:focus,
input:active {
  outline: none;
}

.check-btn {
  width: 100%;
  max-width: 22rem;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  font-size: 0.9375rem;
  line-height: 1.5;
  background-color: #1a1a1a;
  color: #fff;
  border: none;
}

.available {
  background-color: #41b883;
}

.spinner {
  width: 1.4rem;
  height: 1.4rem;
  margin: auto;
  display: block;
}

a {
  color: white;
  text-decoration: none;
}

p {
  margin: -1rem;
  color: #ff7e61;
  text-align: center;
}

@media (min-width: 40rem) {
  .form-input {
    display: flex;
    flex-direction: row;
  }
}
</style>
