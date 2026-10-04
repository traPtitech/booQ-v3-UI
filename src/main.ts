import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';
import { definePreset, palette } from '@primeuix/themes';
import { primeVueLocaleJa } from './config/primeVueLocaleJa';
import router from './router';
import App from './App.vue';

import './styles/tailwind.css';

const booQPreset = definePreset(Aura, {
  semantic: {
    primary: palette('#5cb860'),
    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          inverseColor: '#ffffff',
        },
      },
    },
  },
});

const app = createApp(App);

app.use(PrimeVue, {
  locale: primeVueLocaleJa,
  theme: {
    preset: booQPreset,
    options: {
      prefix: 'p',
      darkModeSelector: false,
    },
  },
});

app.use(router);
app.use(createPinia());
app.mount('#app');
