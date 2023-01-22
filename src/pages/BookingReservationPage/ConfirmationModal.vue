<template>
  <BaseModal>
    <p v-if="error">{{ error }}</p>
    <div class="modal-header">
      <h3>Confirm Booking</h3>
    </div>
    <div class="modal-body">
      <div name="body">
        <h4>Personal Data</h4>
        <p>
          <span> Firstname: {{ user.firstname }} </span>
          <span> Lastname: {{ user.lastname }} </span>
          <span> E-Mail: {{ user.email }} </span>
          <span> Birthdate: {{ user.birthdate }} </span>
        </p>
        <SecondaryButton @click="$emit('close')" v-if="!isAuth">
          Change Userdata
        </SecondaryButton>
        <hr />
        <h4>Booking Data</h4>
        <p>
          <span>Date: {{ date }}</span>
          <span>Room number: {{ roomBooked.roomsNumber }}</span>
          <span>Room name: {{ roomBooked.roomsName }}</span>
          <span>Price per night: {{ roomBooked.pricePerNight }}</span>
        </p>
        <router-link to="/booking">
          <SecondaryButton>Change Booking</SecondaryButton>
        </router-link>
        <hr />
        <h4>Pricing</h4>
        <span
          >Price total for <span class="highlight">{{ days }}</span> day(s):
          <span class="highlight">{{ priceTotal }} €</span></span
        >
      </div>
      <hr />
      <div class="modal-footer">
        <PrimaryButton @click="submitBooking">
          Confirm Rerservation</PrimaryButton
        >
        <SecondaryButton @click="$emit('close')">Close</SecondaryButton>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import { mapStores } from "pinia";
import { useBookingStore } from "@/stores/booking";
import { useRoomsStore } from "@/stores/rooms";
import { useAuthStore } from "../../stores/users";
import BaseModal from "../../components/Organisms/BaseModal.vue";

export default {
  name: "ConfirmationModal",
  components: {
    BaseModal,
  },
  props: {
    show: Boolean,
  },
  data() {
    return {
      error: "",
    };
  },
  computed: {
    ...mapStores(useBookingStore, useRoomsStore, useAuthStore),
    date() {
      const { startDate, endDate } = this.bookingStore.getDate;
      return `${startDate} - ${endDate}`;
    },
    roomBooked() {
      return this.roomsStore.getRoom(this.bookingStore.getRoom);
    },
    user() {
      const user = this.bookingStore.getUser;
      return user;
    },
    days() {
      const days = this.bookingStore.getNightsBooked;
      return days;
    },
    priceTotal() {
      const priceNight = this.roomsStore.getRoom(
        this.bookingStore.getRoom
      ).pricePerNight;
      return priceNight;
    },
    isAuth() {
      return this.authStore.isAuthenticated;
    },
  },
  methods: {
    async submitBooking() {
      try {
        await this.bookingStore.sendBooking();
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.$router.push("/booking/confirmation");
    },
  },
};
</script>

<style scoped>
span {
  display: block;
}
.highlight {
  display: inline;
  font-weight: bold;
}
/* MODAL */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}
.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}
.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  overflow-y: scroll;
}

.modal-body {
  margin: 20px 0;
}
.modal-footer {
  height: 5rem;
}

.modal-footer > * {
  margin-bottom: 0.5rem;
}

.modal-default-button {
  float: right;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
