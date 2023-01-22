<template>
  <h2>Welcome back</h2>
  <p class="error" v-if="error">{{ error }}</p>
  <div v-if="isLoading" class="loading"><BaseSpinner /></div>
  <form @submit.prevent="submitForm" v-else>
    <input type="email" placeholder="Email" v-model.trim="userData.email" />
    <p v-if="!userData.email && validateData">Please enter a email</p>
    <div className="passwordInputDiv">
      <input
        :type="passwordType"
        placeholder="Password"
        id="password"
        v-model.trim="userData.password"
      />
      <img
        src="/assets/images/site/eyeoutline.png"
        class="showPassword"
        alt="Eye icon"
        @click="changeShowPassword"
      />
      <p v-if="!userData.password && validateData">Please enter a password</p>
    </div>
    <PrimaryButton>Login</PrimaryButton>
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
        email: "",
        password: "",
      },
      validateData: false,
      showPassword: false,
    };
  },
  computed: {
    ...mapStores(useAuthStore),
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
        await this.authStore.login({
          clientId: this.userData.email,
          secret: this.userData.password,
        });
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

form input:hover,
form input:focus,
form input:active {
  outline: 0.08rem solid #1a1a1a;
}

.passwordInputDiv {
  position: relative;
}

.showPassword {
  cursor: pointer;
  position: absolute;
  top: 10%;
  right: 2.5%;
  width: 1.8rem;
  height: 1.8rem;
  filter: invert(11%) sepia(5%) saturate(66%) hue-rotate(316deg) brightness(98%)
    contrast(79%);
}

.password-info {
  margin-top: -1rem;
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
