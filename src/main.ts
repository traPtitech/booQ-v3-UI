import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/aura-light-green/theme.css';
import router from './router';
import App from './App.vue';

import './index.scss';
import '@purge-icons/generated';

const app = createApp(App);

app.use(PrimeVue);
app.use(router);
app.use(createPinia());
app.mount('#app');
