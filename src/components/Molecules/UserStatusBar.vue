<template>
  <div v-if="getUserName != null">
    Hello! You're logged in as
    <span> <slot /> </span>
  </div>
  <div v-else>
    Loading your Username
    <span> <slot /> </span>
  </div>
</template>

<script>
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/users";

export default {
  name: "UserInfoBar",
  computed: {
    ...mapStores(useAuthStore),
    getUserName() {
      if (this.authStore.getUser) {

        const user = this.authStore.getUser;
        return user;
      }
      return null;
    },
  },
};
</script>

<style scoped>
div {
  display: flex;
  justify-content: center;
  font-size: 0.9375rem;
  padding: 0.3rem;
  font-weight: 500;
  background-color: #36485c;
  color: #fff;
}
</style>
