<template>
  <LandingSwiper />
  <section>
    <div class="welcome">
      <h2>Welcome to the Vue Inn!</h2>
      <p>In the heart of Vienna</p>
    </div>
    <BaseContainer>
      <template #image>
        <img src="/assets/images/site/sauna.png" alt="Sauna" />
      </template>
      <template #header><h2>Vue Inn Spa</h2></template>
      <template #text>
        <p>
          Experience culture, art and dining with all the senses in Vienna.
          Countless visitors from around the world travel to the Austrian
          capital each year to discover the cultural specialties of Vienna.
          Perhaps the most famous events to be discovered under the banner of
          Viennese culture are the Vienna Opera Ball at the Vienna State Opera,
          the New Year's concert in the Musikverein or the Vienna Festival, at
          which the world elite of opera and theater directors, conductors and
          orchestras present the very latest on the performing arts scene.
        </p>
      </template>
    </BaseContainer>
  </section>
</template>

<script>
import LandingSwiper from "./LandingSwiper.vue";
import BaseContainer from "../../components/Molecules/BaseContainer.vue";

export default {
  name: "LandingPage",
  components: {
    LandingSwiper,
    BaseContainer,
  },
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.welcome {
  margin: 2rem;
}

h2 {
  animation: fadeIn 2s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

img {
  width: 100%;
  max-width: 25rem;
  height: auto;
}
</style>
