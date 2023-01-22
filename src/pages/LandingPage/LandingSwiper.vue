<template>
  <swiper :pagination="true" :modules="modules" class="mySwiper">
    <swiper-slide>
      <img src="/assets/images/rooms/room1.jpg" alt="Room number 1" />
    </swiper-slide>
    <swiper-slide
      ><img src="/assets/images/rooms/room2.jpg" alt="Room number 2" />
      <h1>
        Spacious <br />Rooms and<br />
        Suites
      </h1></swiper-slide
    >
    <swiper-slide
      ><img src="/assets/images/rooms/room3.jpg" alt="Room number 3"
    /></swiper-slide>

    <swiper-slide
      ><img src="/assets/images/rooms/room4.jpg" alt="Room number 4"
    /></swiper-slide>
  </swiper>
</template>
<script>
// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";

import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination],
    };
  },
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
  height: 100%;
  max-height: 30rem;
  width: 100%;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-slide h1 {
  color: white;
  text-transform: uppercase;
  position: absolute;
  font-family: "Times New Roman", Times, serif;
  top: 15%;
  left: 5%;
  font-size: 1.25rem;
  letter-spacing: 0.3125rem;
  background-color: rgba(0, 0, 0, 0.4);
  line-height: 1.25;
}

@media (min-width: 40rem) {
  .swiper-slide h1 {
    font-size: 2rem;
  }
}
</style>
