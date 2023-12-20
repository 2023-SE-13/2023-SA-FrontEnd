import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import service from './api/service'

Vue.config.productionTip = false
Vue.prototype.service = service


Vue.use(ElementUI)

// axios.defaults.baseURL = 'https://mock.apifox.com/m1/3631387-0-default/api/'

Vue.prototype.$axios = axios

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
