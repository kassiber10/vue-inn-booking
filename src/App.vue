<template>
  <HeaderOrganism />
  <main>
    <router-view></router-view>
  </main>
  <FooterOrganism v-if="showFooter" />
</template>
<script>
import HeaderOrganism from "./components/Organisms/HeaderOrganism.vue";
import FooterOrganism from "./components/Organisms/FooterOrganism.vue";
import { mapStores } from "pinia";
import { useAuthStore } from "@/stores/users";

export default {
  components: {
    HeaderOrganism,
    FooterOrganism,
  },
  name: "app",
  computed: {
    ...mapStores(useAuthStore),

    showFooter() {
      return this.$route.path !== "/" && this.$route.path !== "/auth";
    },
  },
  async created() {
    this.authStore.tryLogin();
  },
};
</script>
