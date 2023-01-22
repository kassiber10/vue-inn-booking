<template>
  <div>
    <h2>Imprint</h2>
    <p><span>Email: </span> reservations@vue-inn.com</p>
    <p><span>General enquiries: </span>+43 45 431 5888</p>
    <p><span>Room reservations:</span> +43 45 431 5800</p>
    <p><span>Address:</span><br />Parkring 11<br />A - 1010 Vienna</p>
  </div>
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
</template>

<script>
export default {
  name: "ImprintPage",
};
</script>

<style scoped>
div {
  margin-top: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

span {
  font-weight: 800;
}
p {
  text-align: center;
}
.map {
  margin-top: 0;
  padding: 3rem;
}
</style>
