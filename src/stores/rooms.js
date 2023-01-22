import { defineStore } from "pinia";
import axios from "axios";
const API = import.meta.env.VITE_APP_API;

export const useRoomsStore = defineStore("rooms", {
  state: () => ({
    rooms: [],
  }),
  getters: {
    getRooms: (state) => state.rooms,
    getRoom: (state) => {
      return (id) => state.rooms.find((room) => room.id === id);
    },
  },
  actions: {
    async loadRooms() {
      const response = await axios.get(API + "rooms");
      this.rooms = response.data;
    },
  },
});
