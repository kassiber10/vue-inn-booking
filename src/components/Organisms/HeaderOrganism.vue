<template>
  <section v-if="isLoggedIn">
    <UserStatusBar>{{ getUserName }}</UserStatusBar>
  </section>
  <header>
    <div class="container">
      <div class="btn-container">
        <button class="toggleButton" @click="toggleNavbar">
          <span class="toggleButton__bar"></span>
          <span class="toggleButton__bar"></span>
          <span class="toggleButton__bar"></span>
        </button>
      </div>
      <div class="logo">
        <router-link to="/home">
          <img class="logo" src="/favicon.ico" alt="Vue Logo" />
        </router-link>
      </div>
      <div class="flex">
        <router-link class="auth" to="/auth">
          <img
            class="login"
            src="../../assets/icons/user_icon.svg"
            alt="Login"
          />
        </router-link>
        <router-link to="/booking">
          <PrimaryButton>BOOK NOW</PrimaryButton>
        </router-link>
      </div>
    </div>
  </header>
  <NavigationOffCanvas
    :loggedIn="isLoggedIn"
    :open="showNavbar"
    @toggleNavbar="toggleNavbar"
  />
</template>

<script>
import NavigationOffCanvas from "./NavigationOffCanvas.vue";
import UserStatusBar from "../Molecules/UserStatusBar.vue";
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/users";

export default {
  components: {
    NavigationOffCanvas,
    UserStatusBar,
  },
  name: "TheHeader",
  data() {
    return {
      showNavbar: false,
      userNameFound: false,
    };
  },
  computed: {
    ...mapStores(useAuthStore),
    isLoggedIn() {
      return this.authStore.isAuthenticated;
    },
    getUserName() {
      const user = this.authStore.getUser;
      return user
        ? `, ${
            user.firstname.charAt(0).toUpperCase() + user.firstname.slice(1)
          } ${user.lastname.charAt(0).toUpperCase() + user.lastname.slice(1)}!`
        : "!";
    },
  },

  methods: {
    toggleNavbar() {
      this.showNavbar = !this.showNavbar;
    },
  },
  watch: {
    showNavbar() {
      if (this.showNavbar) {
        document.body.classList.add("no-scroll");
      } else {
        document.body.classList.remove("no-scroll");
      }
    },
  },
};
</script>

<style scoped>
header {
  background-color: transparent;
  border-bottom: 0.0125rem solid #d0d1d3;
  padding: 0 1rem;
}

.container {
  width: 95%;
  max-width: 75rem;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 4rem;
}

.toggleButton {
  width: 3rem;
  border: none;
  cursor: pointer;
  background-color: #fff;
  padding-top: 0;
  padding-bottom: 0;
  vertical-align: middle;
  text-align: start;
}

.toggle-button:focus {
  outline: none;
}

.toggleButton__bar {
  width: 60%;
  height: 0.1rem;
  background: #1a1a1a;
  display: block;
  margin: 0.4rem 0.4rem;
}

.logo {
  
  display: flex;
  flex-direction: column;
}

.flex {
  display: none;
  align-items: center;
  justify-content: flex-end;
  height: 3rem;
  gap: 0.5rem;
}

.login {
  filter: invert(0%) sepia(8%) saturate(844%) hue-rotate(336deg) brightness(95%)
    contrast(80%);
  width: 2.25rem;
  height: 100%;
  margin-bottom: -0.4rem;
}

.login:hover {
  opacity: 0.6;
}

.login-status {
  padding-left: 0.5rem;
}
.username {
  font-weight: bold;
}
.book-btn {
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  padding: 0.6rem;
  border: none;
  background-color: #1a1a1a;
  color: #fff;
  border: none;
  text-decoration: none;
}

.book-btn:hover {
  opacity: 0.8;
}

@media (min-width: 40rem) {
  .btn-container {
    min-width: 12rem;
  }

  .flex {
    display: flex;
    min-width: 12rem;
  }

  .book-btn-add {
    display: unset;
  }
}
</style>