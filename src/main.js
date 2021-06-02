import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './core/use'
import './core/global'
import antDV from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css';

Vue.config.productionTip = false

new Vue({
  router,
  antDV,
  render: h => h(App),
}).$mount('#app')
