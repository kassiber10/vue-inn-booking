<template>
  <section>
    <h2>Reservation details</h2>
    <div class="container">
      <section v-if="roomBooked">
        <RoomDetails :room="roomBooked" />
      </section>
      <form @submit.prevent="submitReservation">
        <h3>Personal Data</h3>
        <label for="firstname">Firstname</label>
        <input
          type="text"
          name="firstname"
          id="name"
          v-model.trim="userData.firstname"
          :readonly="isAuth"
          :class="isAuth && 'readonly-disabled'"
        />
        <p v-if="!userData.firstname && checkValue" class="form-err">
          Please enter a firstname
        </p>

        <label for="lastname">Lastname</label>
        <input
          type="text"
          name="lastname"
          id="lastname"
          v-model.trim="userData.lastname"
          :readonly="isAuth"
          :class="isAuth && 'readonly-disabled'"
        />
        <p v-if="!userData.lastname && checkValue" class="form-err">
          Please enter a lastname
        </p>
        <label for="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          v-model.trim="userData.email"
          :readonly="isAuth"
          :class="isAuth && 'readonly-disabled'"
        />
        <p v-if="!userData.email && checkValue" class="form-err">
          Please enter a e-mail adress
        </p>

        <label for="birthdate">Birthdate</label>
        <input
          type="date"
          name="birthdate"
          id="birthdate"
          v-model.trim="userData.birthdate"
          :max="matureCheck"
          :readonly="isAuth"
          :class="isAuth && 'readonly-disabled'"
        />
        <p
          v-if="!userData.birthdate && checkValue && matureCheck"
          class="form-err"
        >
          Please enter a birthdate
        </p>
        <p class="info">
          * To successfully submit the Reservation, you must be 18 years or
          older
        </p>
        <PrimaryButton>Checkout Reservation</PrimaryButton>
      </form>
    </div>
  </section>

  <section v-if="showModal">
    <ConfirmationModal @close="showModal = false" />
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { useBookingStore } from "@/stores/booking";
import { useRoomsStore } from "@/stores/rooms";
import { useAuthStore } from "@/stores/users";
import RoomDetails from "../../components/Organisms/RoomDetails.vue";
import ConfirmationModal from "./ConfirmationModal.vue";

export default {
  name: "BookingDetail",
  components: {
    ConfirmationModal,
    RoomDetails,
  },
  data() {
    return {
      userData: {
        firstname: "",
        lastname: "",
        email: "",
        birthdate: "",
      },
      errors: {},
      checkValue: false,
      showModal: false,
      BtnText: "",
    };
  },

  computed: {
    ...mapStores(useBookingStore, useRoomsStore, useAuthStore),
    date() {
      const { startDate, endDate } = this.bookingStore.getDate;
      return `${startDate} - ${endDate}`;
    },
    matureCheck() {
      const newDate = new Date();
      newDate.setFullYear(newDate.getFullYear() - 18);
      return newDate.toISOString().split("T")[0];
    },
    roomBooked() {
      return this.roomsStore.getRoom(this.bookingStore.getRoom);
    },
    isAuth() {
      return this.authStore.isAuthenticated;
    },
  },
  methods: {
    submitReservation() {
      this.checkValue = true;

      if (!Object.values(this.userData).every((data) => data !== "")) {
        return;
      }
      this.bookingStore.setUserData(this.userData);
      this.showModal = true;
    },
  },
  async mounted() {
    const room = this.bookingStore.getRoom;

    if (!room) {
      this.$router.push("/home");
    }

    const isAuthenticated = this.authStore.isAuthenticated;
    const user = this.bookingStore.getUser;

    if (isAuthenticated) {
      await this.authStore.getUserData();
      const authUser = this.authStore.getUser;
      this.userData = { ...authUser };
    } else if (Object.values(user).every((data) => data !== undefined)) {
      this.userData = { ...user };
    }
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
  .container {
    display: flex;
    flex-direction: column;
  }
}
</style>
