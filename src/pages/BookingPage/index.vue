<template>
  <section>
    <h2>Select Room</h2>
    <RoomPagination
      :pages="roomsPages"
      @changePage="changePage"
      :currentPage="page"
    />
    <div v-if="isLoading" class="loading"><BaseSpinner /></div>
    <ul v-else-if="roomsLoaded">
      <li v-for="room in rooms" :key="room.id + room.roomsNumber">
        <RoomDetails :room="room">
          <div class="flex">
            <RoomExtras :extras="room.extras" />
            <RoomAvailability :id="room.id" />
          </div>
        </RoomDetails>
      </li>
    </ul>
    <p class="error" v-else>{{ error }}</p>
  </section>
</template>

<script>
import { mapStores } from "pinia";
import { useRoomsStore } from "@/stores/rooms";
import RoomDetails from "../../components/Organisms/RoomDetails.vue";
import RoomExtras from "./RoomExtras.vue";
import RoomAvailability from "./RoomAvailability.vue";
import RoomPagination from "./RoomPagination.vue";

export default {
  name: "BookingPage",
  components: {
    RoomDetails,
    RoomExtras,
    RoomAvailability,
    RoomPagination,
  },
  data() {
    return {
      error: null,
      isLoading: false,
      page: 1,
      maxPageItems: 5,
    };
  },
  computed: {
    ...mapStores(useRoomsStore),
    rooms() {
      const from = (this.page - 1) * this.maxPageItems;
      const to = this.page * this.maxPageItems;
      const selectedRooms = this.roomsStore.getRooms.filter(
        (_, index) => index >= from && index < to
      );
      return selectedRooms;
    },
    roomsLoaded() {
      return !this.isLoading && this.roomsStore.getRooms.length !== 0;
    },
    roomsPages() {
      const pages = this.roomsStore.getRooms.length / this.maxPageItems;
      return Array.from({ length: pages }, (_, i) => i + 1);
    },
  },
  methods: {
    changePage(page) {
      this.page = page;
    },
  },
  async mounted() {
    this.isLoading = true;
    try {
      await this.roomsStore.loadRooms();
    } catch (error) {
      this.error = error.message || "Something went wrong!";
    }
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

ul {
  padding: 0;
}

li {
  list-style: none;
  margin-bottom: 1rem;
}

h2 {
  border-bottom: 0.0125rem solid #d0d1d3;
}

.error,
.loading {
  margin-bottom: 60vh;
}

.flex {
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
</style>
