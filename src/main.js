import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'

//import { Message } from 'element-ui'
//导入全局样式
import './assets/css/global.css'
import axios from 'axios'
axios.defaults.baseURL='http://test.bwf.com/api/'
Vue.prototype.$http=axios


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
