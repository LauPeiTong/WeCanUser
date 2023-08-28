<template lang="pug">
.pickup-method
  v-tabs.px-4.justify-start.d-flex(
    v-model="tab"
    background-color="white"
    :color="$vuetify.theme.themes.light.tertairy"
    grow
  )
    v-tab(v-for="item in tabs" :key="'tab-' + item.id" @click="" :href="'#tab-' + item.id" flat)
      v-btn(outlined rounded small :color="$vuetify.theme.themes.light.primary" @click="changePickupMethod(item.name)") {{item.name}}

  v-tabs-items.px-4(v-model="tab")
    v-tab-item(v-for="i in tabs"
      :key="i.id"
      :value="'tab-' + i.id"
    )
      v-list.pa-0(v-if="i.id == 1" flat)
        v-list-item-group(:color="$vuetify.theme.themes.light.primary")
          v-list-item.px-0()
            v-list-item-icon.mr-4.my-4
              eva-icon(name="pin" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
            v-list-item-content
              v-list-item-title.secondary--text.mb-1 Deliver from
              p.mb-0.tertiary--text {{ shop ? shop.name : '-' }}
              v-list-item-subtitle {{ shop ? shop.address : '-' }}
            v-list-item-action
              eva-icon(name="arrow-ios-forward" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
          v-divider

          v-list-item.px-0()
            v-list-item-icon.mr-4.my-4
              eva-icon(name="pin" :fill="$vuetify.theme.themes.light.green" height="30" width="30")
            v-list-item-content
              v-list-item-title.secondary--text.mb-1 Deliver to
              p.mb-0.success--text {{ user.addressTitle }}
              v-list-item-subtitle {{ user.address }}
            v-list-item-action
              eva-icon(name="arrow-ios-forward" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")

      v-list.pa-0(v-if="i.id == 2" flat)
        v-list-item-group(:color="$vuetify.theme.themes.light.primary")
          v-list-item.px-0()
            v-list-item-icon.mr-4.my-4
              eva-icon(name="pin" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
            v-list-item-content
              v-list-item-title.secondary--text.mb-1 Pick-up at
              p.mb-0.tertiary--text {{ shop ? shop.name : '-' }}
              v-list-item-subtitle {{ shop ? shop.address : '-' }}
            v-list-item-action
              eva-icon(name="arrow-ios-forward" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WCard from '../componenets-custom/WCard.vue'

export default {
  name: 'PickupMethod',
  components: {
    WCard
  },
  data () {
    return {
      tab: null,
      tabs: [
        {
          id: 1,
          name: 'Delivery'
        },
        {
          id: 2,
          name: 'Self pick-up'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      widthX: 'screen/getWidthClass',
      shop: 'home/getSelectedShop',
      user: 'user/getUser'
    })
  },
  methods: {
    ...mapActions({
      changePickupMethod: 'cart/changePickupMethod'
    })
  }
}
</script>

<style lang="scss" scoped>
.min-350-width {
  min-width: 353px !important;
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

.v-btn {
  text-transform: none;
}

.v-tab {
  padding: 0 8px;
}
</style>
