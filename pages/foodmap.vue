<template lang="pug">
.fill-height.map-page.pa-0.ma-0
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:title="'Map'" :icon="'more-vertical'" @goBack="goBackToPreviousPage" :back="true")
  .scroll.ma-0.justify-top.align-center(:style="scrollSize")
    gmap-map(:zoom="17" :center="center" style="width: 100%; height: 100%" class="mb-5"
      :options="options"
    )
      gmap-marker(:key="index"
        v-for="(m, index) in locationMarkers"
        :position="m.position"
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
          v-tab(v-for="item in tabs" :key="'tab-' + item.id" flat)
            v-btn(outlined rounded small :color="$vuetify.theme.themes.light.primary") {{item.name}}
        shops-list.pb-4
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
      tab: null,
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
          name: 'Foodbanks'
        }
      ],
      center: {
        lat: 3.1960522,
        lng: 101.595067
      },
      locationMarkers: [
        { id: 1, position: { lat: 3.1960522, lng: 101.595067 } },
        { id: 2, position: { lat: 3.197281397990241, lng: 101.59388994498003 } },
        { id: 2, position: { lat: 3.1969203321745496, lng: 101.59376165676089 } },
        { id: 2, position: { lat: 3.1977727716066355, lng: 101.59301167636636 } },
        { id: 2, position: { lat: 3.1953579175758318, lng: 101.5933018253177 } }
      ],
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
  mounted () {
    this.locateGeoLocation()
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
      navigator.geolocation.getCurrentPosition((res) => {
        this.center = {
          lat: res.coords.latitude,
          lng: res.coords.longitude
        }
      })
    },
    goBackToPreviousPage () {
      this.$router.go(-1)
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
