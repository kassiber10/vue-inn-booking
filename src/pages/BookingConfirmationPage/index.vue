<template>
  <section>
    <h2>Booking Confirmation</h2>
    <div class="container" id="container">
      <div class="column">
        <h3>Date</h3>
        <span>{{ date }}</span>
        <hr />
        <div class="room-details">
          <RoomDetails v-if="roomBooked" :room="roomBooked" />
          <RoomExtras v-if="roomBooked" :extras="roomBooked.extras" />
        </div>
        <hr />
        <h3>Personal data</h3>
        <p>
          <span> Firstname: {{ userdata.firstname }} </span><br />
          <span> Lastname: {{ userdata.lastname }} </span><br />
          <span> E-Mail: {{ userdata.email }} </span><br />
          <span> Birthdate: {{ userdata.birthdate }} </span><br />
        </p>
        <hr />
      </div>
      <div class="column">
        <h3>How to find us</h3>
        <div class="map">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2792.484480167064!2d16.376209423804287!3d48.204686892173285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d0775e9310f37%3A0xdd21dda5af92badb!2sParkring%2011%2C%201010%20Wien!5e0!3m2!1sde!2sat!4v1671658558662!5m2!1sde!2sat"
            width="400"
            height="350"
            style="border: 0"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <hr />
        <h3>Contact</h3>
        <p>
          <span>
            Email:
            <a href="mailto:reservations@vue-inn.com"
              >reservations@vue-inn.com</a
            > </span
          ><br />
          <span>General enquiries: +43 45 431 5888</span><br />
          <span>Room reservations: +43 45 431 5800</span><br />
          <span>Address: Parkring 11 / A - 1010 Vienna</span><br />
        </p>
        <hr />
        <SecondaryButton @click="printConfirmation">
          Print Confirmation
        </SecondaryButton>
        <router-link to="/home">
          <SecondaryButton> Home </SecondaryButton>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { useBookingStore } from "@/stores/booking";
import { useRoomsStore } from "@/stores/rooms";
import RoomDetails from "../../components/Organisms/RoomDetails.vue";
import RoomExtras from "../BookingPage/RoomExtras.vue";
import SecondaryButton from "../../components/Atoms/SecondaryButton.vue";

export default {
  name: "BookingConfirmation",
  components: {
    RoomDetails,
    RoomExtras,
    SecondaryButton,
  },
  computed: {
    ...mapStores(useBookingStore),
    date() {
      const { startDate, endDate } = this.bookingStore.getDate;
      return `${startDate} - ${endDate}`;
    },
    userdata() {
      const userdata = this.bookingStore.getUser;
      return userdata;
    },
    room() {
      const room = this.bookingStore.getRoom;
      return room;
    },
    ...mapStores(useRoomsStore),
    roomBooked() {
      const allRooms = this.roomsStore.getRooms;
      const bookedRoom = allRooms.filter(
        (roomid) => roomid.id === this.room
      )[0];
      if (!bookedRoom) {
        this.noRoomBooked();
        return;
      }
      return bookedRoom;
    },
  },
  methods: {
    printConfirmation() {
      window.print();
    },
    noRoomBooked() {
      this.$router.push("/home");
    },
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
button {
  box-sizing: border-box;
  max-width: 100%;
  margin: 0.2rem;
}
.container {
  display: flex;
}
.room-details {
  width: 100%;
  padding: 0;
}
.info {
  color: lightgrey;
}
.map {
  margin: 0;
}

ul {
  display: inline;
}
li {
  list-style-type: none;
}

.column {
  flex: 50%;
  margin-right: 1rem;
}
@media screen and (max-width: 800px) {
  .container {
    display: flex;
    flex-direction: column;
  }
}
@media print {
  body * {
    visibility: hidden;
  }
  #container,
  #container * {
    visibility: visible;
    border: none;
  }
}
</style>
