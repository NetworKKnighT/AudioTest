import { createApp } from 'vue'
import PrimeVue from 'primevue/config'
import StyleClass from "primevue/styleclass";
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
    unstyled: true
});
app.directive("styleclass", StyleClass);

app.mount('#app')
