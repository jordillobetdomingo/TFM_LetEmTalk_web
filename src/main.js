import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import VueTimeago from 'vue-timeago'
import axios from 'axios'
import VueAxios from './plugins/axios'

//import { BootstrapVue } from 'bootstrap-vue'
//import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.use(VueTimeago, {
  name: 'Timeago',
  locale: 'en'
})

//Vue.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
