import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset, palette } from '@primeuix/themes';
import router from './router';
import App from './App.vue';

import './styles/tailwind.css';

const booQPreset = definePreset(Aura, {
  semantic: {
    primary: Object.assign({}, palette('#5cb860'), {
      50: '#eef7ee',
      100: '#dcefdd',
      500: '#5cb860',
    }),
  },
});

const app = createApp(App);

app.use(PrimeVue, {
  theme: {
    preset: booQPreset,
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
