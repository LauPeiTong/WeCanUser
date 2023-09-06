import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps' // Import package

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAMMN9FRWSB8XCktD2LeO8cRB8mqKurlQg',
    libraries: 'places'
  }
})
