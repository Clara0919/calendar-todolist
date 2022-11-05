import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VCalendar from 'v-calendar';
import Vuex from 'vuex';

const app = createApp(App);


app.use(store).use(router).use(Vuex).use(VCalendar, {}).mount('#app')
