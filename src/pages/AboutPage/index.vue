<template>
  <section>
    <h2>About Us</h2>
    <BaseContainer>
      <template #image>
        <img src="/assets/images/site/staff.png" alt="Receptionist" />
      </template>
      <template #header><h2>Faces of the Vue Inn</h2></template>
      <template #text>
        <p>
          At the Vue Inn, no detail is left to change. Go behind the scenes to
          meet some of our valued tea members tasked with bringing sparkle to
          the finer details, as they share their favourite moments at the Vue
          Inn
        </p>
      </template>
    </BaseContainer>
    <div>
      <h2>History and Culture</h2>
      <p>
        Enjoy culture with all the senses in Vienna. Experience pure culture in
        Vienna and be enchanted by the cultural offerings and attractions.
      </p>
    </div>
    <BaseContainer>
      <template #image>
        <img src="/assets/images/site/vienna.png" alt="Vienna" />
      </template>
      <template #header><h2>In the Heart of Vienna</h2></template>
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
import BaseContainer from "../../components/Molecules/BaseContainer.vue";
export default {
  name: "AboutPage",
  components: { BaseContainer },
};
</script>

<style scoped>
section {
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}

div {
  text-align: center;
  margin: 2rem;
}

img {
  width: 100%;
  max-width: 25rem;
  height: auto;
}
</style>
