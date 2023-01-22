<template>
  <video autoPlay muted loop>
    <source src="/assets/videos/commercial.mp4" type="video/mp4" />
  </video>
  <div class="content">
    <h1>Welcome</h1>
    <button @click="navigateHome">Explore</button>
  </div>
</template>

<script>
export default {
  name: "LandingPage",
  methods: {
    navigateHome() {
      this.$router.push("/home");
    },
  },
};
</script>

<style scoped>
video {
  object-fit: cover;
  position: fixed;
  width: 100%;
  height: 100%;
}

div {
  position: fixed;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  color: #f1f1f1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

button {
  width: 200px;
  font-size: 1.125rem;
  padding: 0.6rem;
  border: none;
  background: #000;
  color: #fff;
  cursor: pointer;
}

button:hover {
  opacity: 0.8;
}
</style>
