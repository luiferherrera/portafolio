import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const opts = {
  icons:{
      iconfont:'mdi'
  }
}

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  vuetify: new Vuetify(opts),
})
