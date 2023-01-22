<template>
  <h2>Welcome</h2>
  <p class="error" v-if="error">{{ error }}</p>
  <div v-if="isLoading" class="loading"><BaseSpinner /></div>
  <form @submit.prevent="submitForm">
    <input
      type="text"
      placeholder="Firstname"
      v-model.trim="userData.firstname"
    />
    <p v-if="!userData.firstname && validateData">Please enter a firstname</p>
    <input
      type="text"
      placeholder="Lastname"
      v-model.trim="userData.lastname"
    />
    <p v-if="!userData.lastname && validateData">Please enter a lastname</p>
    <input type="email" placeholder="Email" v-model.trim="userData.email" />
    <p v-if="!userData.email && validateData">
      Please enter a valid email address
    </p>
    <input
      type="date"
      :class="dateStyle"
      placeholder="Birthdate"
      :max="matureCheck"
      v-model.trim="userData.birthdate"
    />
    <p v-if="!userData.birthdate && validateData">
      Please enter a valid birthdate
    </p>
    <div>
      <input
        :type="passwordType"
        placeholder="Password"
        id="password"
        v-model.trim="userData.password"
      />
      <img
        src="/assets/images/site/eyeoutline.png"
        alt="Eye icon"
        @click="changeShowPassword"
      />
      <p v-if="passwordValidation">Please enter a valid password</p>
    </div>
    <p class="info">Please fill out all the fields</p>
    <p class="info">Password must be at least 6 characters long</p>
    <PrimaryButton>Signup</PrimaryButton>
  </form>
</template>

<script>
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/users";

export default {
  name: "SignUp",
  data() {
    return {
      isLoading: false,
      error: null,
      userData: {
        firstname: "",
        lastname: "",
        email: "",
        birthdate: "",
        password: "",
      },
      validateData: false,
      showPassword: false,
    };
  },
  computed: {
    ...mapStores(useAuthStore),
    passwordValidation() {
      if (this.validateData && !(this.userData.password.length >= 6)) {
        return true;
      }
      return false;
    },
    matureCheck() {
      const newDate = new Date();
      newDate.setFullYear(newDate.getFullYear() - 18);
      return newDate.toISOString().split("T")[0];
    },

    dateStyle() {
      return !this.userData.birthdate ? "date empty" : "date";
    },
    passwordType() {
      return this.showPassword ? "text" : "password";
    },
  },
  methods: {
    changeShowPassword() {
      this.showPassword = !this.showPassword;
    },
    async submitForm() {
      this.error = null;
      this.validateData = true;
      if (!Object.values(this.userData).every((data) => data !== "")) {
        return;
      }
      this.isLoading = true;

      try {
        await this.authStore.register({ ...this.userData });
      } catch (error) {
        this.error = error.message || "Something went wrong!";
      }
      this.isLoading = false;
    },
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
}

form {
  box-sizing: border-box;
  width: 90%;
  max-width: 25rem;
}

form input {
  box-sizing: border-box;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 2;
  border: 0.02rem solid #1a1a1a;
  transition: outline 0.2s ease-in-out;
  width: 100%;
  margin-bottom: 2rem;
}

.date {
  color: #1a1a1a;
}

.empty {
  color: #66676e;
}

form input:hover,
form input:focus,
form input:active {
  outline: 0.08rem solid #1a1a1a;
}

div {
  position: relative;
}

img {
  cursor: pointer;
  position: absolute;
  top: 10%;
  right: 2.5%;
  width: 1.8rem;
  height: 1.8rem;
  filter: invert(11%) sepia(5%) saturate(66%) hue-rotate(316deg) brightness(98%)
    contrast(79%);
}

p {
  margin-top: -1rem;
  color: #f87272;
}

.info {
  margin-top: -0.5rem;
  color: #262626;
}

.invalid {
  outline: 0.1rem solid #f87272;
  border-color: transparent;
}

@media (min-width: 40rem) {
  form {
    width: 50%;
  }
}
</style>
