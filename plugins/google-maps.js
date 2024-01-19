import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps' // Import package

Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC7BzX2-rfxLGC4R-eMYn2X3tSV9v2LTVE',
    libraries: 'places'
  }
})
