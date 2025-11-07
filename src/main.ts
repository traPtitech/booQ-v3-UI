import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';

import router from './router';
import App from './App.vue';

import './index.scss';

import Aura from '@primeuix/themes/aura';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
    },
  },
});

app.use(router);
app.use(createPinia());
app.mount('#app');
