<template>
  <section>
    <h3>{{ room.roomsName }}</h3>
    <div class="container">
      <div>
        <div class="card">
          <img
            :src="`${this.imageUrl}room${room.id}.jpg`"
            :alt="room.roomsName"
          />
          <div class="card-info">
            <p>
              Room: <span>{{ room.roomsNumber }}</span>
            </p>
            <p>
              Price/Night: <span>{{ room.pricePerNight }}€</span>
            </p>
            <p>
              Beds: <span>{{ room.beds }}</span>
            </p>
          </div>
        </div>
      </div>
      <slot />
    </div>
  </section>
</template>

<script>
export default {
  name: "RoomDetails",
  setup() {
    const imageUrl = "/assets/images/rooms/";
    return { imageUrl };
  },

  props: {
    room: { type: Object, required: false },
  },
};
</script>

<style scoped>
section {
  border: 0.0125rem solid #d0d1d3;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
}

.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
.cardplain {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  background-color: limegreen;
}

.card-info {
  padding: 1rem;
  gap: 1rem;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  box-sizing: border-box;
}

img {
  width: 100%;
}

.flex {
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

span {
  font-weight: 600;
}

@media (min-width: 48rem) {
  section {
    border: 0.0125rem solid #f7f7f7;
    box-shadow: none;
  }
  .container {
    flex-direction: row;
  }
  .card {
    max-width: 21rem;
    border: 0.0125rem solid #d0d1d3;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
  }
  img {
    max-width: 21rem;
  }
  .card-info {
    flex-direction: column;
  }
}
</style>
