import { defineStore } from "pinia";
import axios from "axios";
const API = import.meta.env.VITE_APP_API;

export const useBookingStore = defineStore("booking", {
  state: () => ({
    available: undefined,
    room: undefined,
    date: { startDate: undefined, endDate: undefined },
    user: {
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      birthdate: undefined,
    },
    confirmation: undefined,
    bookings: [],
  }),
  getters: {
    getAvailability: (state) => state.available,
    getRoom: (state) => state.room,
    getDate: (state) => state.date,
    getStartDate: (state) => state.date.startDate,
    getEndDate: (state) => state.date.endDate,
    getUser: (state) => state.user,
    getNightsBooked: (state) => {
      const diffInTime =
        new Date(state.date.endDate).getTime() -
        new Date(state.date.startDate).getTime();
      const diffInDays = diffInTime / (1000 * 3600 * 24);
      return diffInDays;
    },
    getAllBookings: (state) => state.bookings,
  },
  actions: {
    async checkAvailability(id, from, to) {
      this.room = id;

      const response = await axios.get(
        API + `room/${id}/from/${from}/to/${to}`
      );

      this.available = response.data.available;
    },
    setRoom(id) {
      this.room = id;
    },
    setDate(from, to) {
      this.date.startDate = from;
      this.date.endDate = to;
    },
    setUserData(userdata) {
      this.user.firstname = userdata.firstname;
      this.user.lastname = userdata.lastname;
      this.user.email = userdata.email;
      this.user.birthdate = userdata.birthdate;
    },
    async sendBooking() {
      const { firstname, lastname, email, birthdate } = this.user;
      const roomId = this.room;
      const response = await axios.post(
        API +
          `room/${roomId}/from/${this.date.startDate}/to/${this.date.endDate}`,
        {
          firstname,
          lastname,
          email,
          birthdate,
        }
      );
      this.confirmation = response.data;
    },
    // Get all bookings
    async getBookings() {
      const response = await axios.get(API + "bookings");
      this.bookings = response.data;
    },
  },
});
