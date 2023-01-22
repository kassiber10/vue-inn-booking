<template>
  <section>
    <div>
      <nav class="nav-icons">
        <img src="/assets/images/site/twitter.png" alt="Twitter Icon" />
        <img src="/assets/images/site/facebook.png" alt="Facebook Icon" />
        <img src="/assets/images/site/instagram.png" alt="Instagram Icon" />
      </nav>
      <nav class="nav-links">
        <a href="https://github.com/Lammer-FH/botique-hotel-technikum-gruppe-j"
          >Privacy Policy</a
        >
        <a href="https://github.com/Lammer-FH/botique-hotel-technikum-gruppe-j"
          >Bookings & Cancellations</a
        >
        <a href="https://github.com/Lammer-FH/botique-hotel-technikum-gruppe-j"
          >Website Terms</a
        >
      </nav>
    </div>
  </section>
</template>

<style scoped>
section {
  height: 20rem;
  background-color: #1a1a1a;
}

div {
  width: 90%;
  max-width: 70rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-content: space-evenly;
  margin: auto;
}

.nav-icons {
  width: 75%;
  max-width: 37.5rem;
  align-self: center;
  display: flex;
  justify-content: space-between;
}

.nav-icons img {
  width: 2.5rem;
  height: 2.5rem;
  filter: invert(100%) sepia(65%) saturate(0%) hue-rotate(173deg)
    brightness(113%) contrast(100%);
}

.nav-links {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.nav-links a {
  letter-spacing: 0.03125rem;
  font-size: 0.9375rem;
  line-height: 1.66;
  margin: 1rem 0;
  text-decoration: none;
  color: #fcfcfc;
}

@media (min-width: 60rem) {
  .nav-links {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
