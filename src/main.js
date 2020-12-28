import Vue from 'vue'
import App from './App.vue'
import Ui from '@/libs/ui'

Vue.config.productionTip = false
Vue.use(Ui)
new Vue({
  render: h => h(App),
}).$mount('#app')
