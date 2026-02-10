import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import router from './router';
import App from './App.vue';

import './styles/tailwind.css';

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
      cssLayer: { name: 'primevue' },
    },
  },
});

app.use(router);
app.use(createPinia());
app.mount('#app');
