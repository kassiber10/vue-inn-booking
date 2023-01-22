import { createApp } from "vue";
import { createPinia } from "pinia";
import router from "./router";
import App from "./App.vue";
import "./assets/main.css";
import BaseSpinner from "./components/Atoms/BaseSpinner.vue";
import PrimaryButton from "./components/Atoms/PrimaryButton.vue";
import SecondaryButton from "./components/Atoms/SecondaryButton.vue";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);

app.component("BaseSpinner", BaseSpinner);
app.component("PrimaryButton", PrimaryButton);
app.component("SecondaryButton", SecondaryButton);

app.mount("#app");
