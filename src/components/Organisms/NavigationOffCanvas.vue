<template>
  <div @click="$emit('toggleNavbar')" v-if="open" :class="{ userBar }"></div>
  <transition>
    <nav v-if="open" :class="{ userBar }">
      <ul>
        <li>
          <router-link @click="$emit('toggleNavbar')" to="/home"
            >Home
          </router-link>
        </li>
        <li>
          <router-link @click="$emit('toggleNavbar')" to="/booking"
            >BOOK NOW
          </router-link>
        </li>
        <li>
          <router-link @click="$emit('toggleNavbar')" to="/about"
            >About
          </router-link>
        </li>
        <li>
          <router-link @click="$emit('toggleNavbar')" to="/imprint"
            >Imprint
          </router-link>
        </li>
        <li>
          <router-link @click="$emit('toggleNavbar')" to="/auth"
            ><span v-if="loggedIn">Profile / Logout</span>
            <span v-if="!loggedIn">Register / Login</span>
          </router-link>
        </li>
      </ul>
    </nav>
  </transition>
 
</template>

<script>
export default {
  name: "TheNavigation",
  props: ["open", "loggedIn"],
  emits: ["toggleNavbar"],

  data() {
    return {
      showNavbar: true,
    };
  },
  computed: {
    userBar() {
      return this.loggedIn;
    },
  },
};
</script>

<style scoped>
div {
  position: fixed;
  top: 4rem;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 40;
  background-color: #000;
  opacity: 0.25;
  cursor: pointer;
  animation: fadein 400ms;
}

nav {
  position: fixed;
  border-top: 0.0125rem solid #d0d1d3;
  left: 0%;
  top: 4rem;
  width: 50%;
  min-width: 15rem;
  z-index: 50;
  height: 100vh;
  background-color: #fff;
  padding-top: 1.75rem;
  justify-content: flex-start;
}

nav {
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul {
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
  width: 75%;
  height: 10rem;
}

a {
  text-decoration: none;
  color: #000;
}

a:hover {
  color: #000;
  opacity: 0.8;
}

li {
  font-size: 1.2rem;
  width: 100%;
  text-align: start;
  padding: 0.9375rem 0;
  border-bottom: 0.0125rem solid #e6e6e6;
  font-size: 0.8125rem;
  font-weight: 600;
  text-transform: uppercase;
}

@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 0.25;
  }
}

.v-enter-active {
  animation: modal-slide 0.4s ease-out forwards;
}

.v-leave-active {
  animation: modal-slide 0.3s ease-in reverse;
}

@keyframes modal-slide {
  from {
    opacity: 0;
    transform: translateX(-100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.userBar {
  top: 5.75rem;
}

.flex {
  display: none;
  align-items: center;
  height: 3rem;
  gap: 0.5rem;
}
@media (min-width: 40rem) {
  .flex {
    display: flex;
  }
}
</style>
