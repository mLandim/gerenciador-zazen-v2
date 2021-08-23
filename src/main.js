import Vue from 'vue'
import './plugins/fontawesome'
import App from './App.vue'
import router from './router'
import store from './store'

import { db } from './database/database-conf' // private/database...
Vue.prototype.$db  = db

// Requisições http async Axios
import axios from 'axios'
Vue.prototype.$http = axios;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
