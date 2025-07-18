import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import 'primeicons/primeicons.css'

import Aura from '@primeuix/themes/aura'

import InputText from 'primevue/inputtext'
import Textarea from 'primevue/textarea'
import Select from 'primevue/select'
import Button from 'primevue/button'
import Password from 'primevue/password'

const app = createApp(App)

app.component('UiInputText', InputText)
app.component('UiSelect', Select)
app.component('UiButton', Button)
app.component('UiTextarea', Textarea)
app.component('UiPassword', Password)

app.use(createPinia())
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
})

app.mount('#app')
