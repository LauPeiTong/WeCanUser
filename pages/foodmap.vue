<template lang="pug">
.fill-height.map-page.pa-0.ma-0
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:title="'Map'" :icon="'more-vertical'" @goBack="goBackToPreviousPage" :back="true")
  .scroll.ma-0.justify-top.align-center(:style="scrollSize")
    gmap-map(:zoom="12" :center="center" style="width: 100%; height: 100%" class="mb-5"
      :options="options"
    )
      gmap-marker(:key="index"
        v-for="(m, index) in locationMarkers"
        :position="m.position"
        :clickable="true"
        @click="center = m.position"
      )
    v-card
      p.pa-4.text-center Search for near by restaurants, convenient stores, groceries, shops and foodbanks.
    v-footer.px-0.pt-4.pb-0.white.rounded-t-lg(absolute elevation="4")
      v-col.overflow-auto.px-0(cols="12")
        v-tabs.justify-start.d-flex(
          v-model="tab"
          background-color="white"
          :color="$vuetify.theme.themes.light.tertairy"
        )
          v-tab(v-for="i in tabs" :key="'tab-' + i.id" :href="'#tab-' + i.id" flat)
            v-btn(outlined rounded small :color="$vuetify.theme.themes.light.primary") {{i.name}}

        v-tabs-items(v-model="tab")
          v-tab-item(v-for="i in tabs"
            :key="i.id"
            :value="'tab-' + i.id"
          )
            shops-list.pb-4(v-if="i.id == 1")
            shops-list.pb-4(v-else-if="i.id == 2" :type="'Menu Rahmah'" :title="'Shops offer Menu Rahmah'")
            shops-list.pb-4(v-else :type="'Free Delivery'" :title="'Shops with Free Delivery'")
</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
import WSearchBar from '../components/componenets-custom/WSearchBar.vue'
import ShopsList from '../components/home/ShopsList.vue'

export default {
  name: 'FoodMapPage',
  components: {
    UpperTitle,
    WSearchBar,
    ShopsList
  },
  layout: 'welcome',
  data () {
    return {
      tab: 'tab-1',
      tabs: [
        {
          id: 1,
          name: 'Nearby shops'
        },
        {
          id: 2,
          name: 'Menu Rahmah'
        },
        {
          id: 3,
          name: 'Free Delivery'
        }
      ],
      center: {
        lat: 3.1960522,
        lng: 101.595067
      },
      locationMarkers: [],
      locPlaces: [],
      existingPlace: null,
      options: {
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: true,
        disableDefaultUI: false
      }
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollTopClass'
    })
  },
  async mounted () {
    try {
      this.locateGeoLocation()
      const response = await this.$axios.get('/api/users/vendors/')
      const nearByRestaurants = response.data

      for (let i = 0; i < nearByRestaurants.length; i++) {
        const l = {
          id: nearByRestaurants[i].id,
          position: { lat: nearByRestaurants[i].latitude, lng: nearByRestaurants[i].longitude },
          title: nearByRestaurants[i].display_name
        }
        console.log(l)

        this.locationMarkers.push(l)
      }
      console.log('Explore vendors: ', this.locationMarkers)
    } catch (e) {
      console.log('Error: ', e)
    }
  },
  methods: {
    initMarker (loc) {
      this.existingPlace = loc
    },
    addLocationMarker () {
      if (this.existingPlace) {
        const marker = {
          lat: this.existingPlace.geometry.location.lat(),
          lng: this.existingPlace.geometry.location.lng()
        }
        this.locationMarkers.push({ position: marker })
        this.locPlaces.push(this.existingPlace)
        this.center = marker
        this.existingPlace = null
      }
    },
    locateGeoLocation: function () {
      // navigator.geolocation.getCurrentPosition((res) => {
      //   this.center = {
      //     lat: res.coords.latitude,
      //     lng: res.coords.longitude
      //   }
      // })

      this.center = {
        lat: this.$store.getters['auth/getAuthUser'].latitude,
        lng: this.$store.getters['auth/getAuthUser'].longitude
      }
    },
    goBackToPreviousPage () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.scroll) {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100% !important;
}

.overflow-auto {
  max-height: 300px;
}

:deep(.v-tabs-slider-wrapper) {
  border-bottom: none !important;
  display: none;
}

:deep(.v-tab--active .v-btn) {
  color: white !important;
  background-color: #FA812F;
  border-color: #FA812F;
}

:deep(.v-slide-group__prev.v-slide-group__prev--disabled) {
  display: none !important;
}
.v-btn {
  text-transform: none;
}

.v-tab {
  padding: 0 8px;
}
</style>
