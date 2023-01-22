<template>
  <h3>Extras:</h3>
  <ul>
    <template v-for="(amenitie, index) in amenities" :key="amenitie">
      <li v-if="checkAmenitie(index, amenitie)">
        <img :src="`${this.imageUrl}/${amenitie}.jpg`" :alt="amenitie" />
        <p>{{ amenitie }}</p>
      </li>
    </template>
    <li v-if="accessible">
      <img :src="`${this.imageUrl}/accessible.jpg`" alt="Accessible" />
      <p>accessible</p>
    </li>
  </ul>
</template>

<script>
export default {
  name: "RoomExtras",
  setup() {
    const imageUrl = "/assets/images/site/extras";
    return { imageUrl };
  },
  props: {
    extras: { type: Object, required: true },
  },
  computed: {
    amenities() {
      return this.extras.map((room) => Object.keys(room)[0]).slice(0, -1);
    },
    accessible() {
      return !!this.extras[7]["handicapped accessible"];
    },
  },
  methods: {
    checkAmenitie(index, amenitie) {
      return !!this.extras[index][amenitie];
    },
  },
};
</script>

<style scoped>
ul {
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  height: 50%;
  padding: 1rem;
  gap: 1rem;
}

li {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 85px;
  height: 75px;
}

img {
  width: 40px;
  height: 40px;
}

p,
h3 {
  font-size: 0.625rem;
  line-height: 1.5;
  letter-spacing: 0.09375rem;
  text-transform: uppercase;
}

h3 {
  font-size: 0.825rem;
}
</style>
