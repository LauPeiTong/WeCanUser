<template lang="pug">
.shops-list
  v-row.pa-0.ma-0.px-4
    v-col.pa-0.ma-0
      p.text-h6.font-weight-medium.pt-4.mb-0 Shops near you
    v-col.pa-0.ma-0.d-flex
      v-row.pt-4.mb-1.pr-0.align-end.justify-end(@click="")
        p.mb-0.primary--text View all
        w-icon.pt-1(
          :height="26"
          :width="26"
          :icon-name="'chevron-right-outline'"
          :icon-fill="$vuetify.theme.themes.light.primary"
          @click=""
        )

  v-row.pl-4.mx-0.scroll-x.text-left(:style="scrollSize")
    vue-horizontal-list(
      :items="nearByRestaurants"
      :options="options"
    )
      template(v-slot:default="{item}")
        .align-center
          v-card.mx-auto.rounded-lg(
            @click="goToShopPage(item)"
            outlined
          )
            v-img.rounded-lg(:src="item.hero_listing_image" width="140" height="130")
            .pa-2
              p.secondary--text.font-weight-medium.mb-0 {{$strLimit(item.name, 18)}}
              p.caption.darkGrey--text.font-weight-light.mb-0 {{$strLimit(item.city.name, 14)}}
              span.caption.darkGrey--text.font-weight-light.mb-0.mt-0 {{item.distance}} km .
                |
                img(width="14" height="14" :src="require(`../../assets/home/star.jpg`)")
                |   {{item.rating}}

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueHorizontalList from 'vue-horizontal-list'
import WCard from '../componenets-custom/WCard.vue'
import WIcon from '../componenets-custom/WIcon.vue'

export default {
  name: 'ShopsList',
  components: {
    WCard,
    WIcon,
    VueHorizontalList
  },
  props: {
  },
  data () {
    return {
      options: {
        responsive: [
          { end: 500, size: 2.75 },
          { end: 1000, size: 5.5 }
        ],
        list: {
          // Because: #app {padding: 80px 24px;}
          padding: 8
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      shops: 'home/getNearShops',
      nearByRestaurants: 'home/getNearByRestaurants',
      scrollSize: 'screen/getScrollXClass'
    })
  },
  methods: {
    ...mapActions({
      changeSelectedShop: 'home/changeSelectedShop'
    }),
    cardColor (id) {
      if (id % 3 === 1) {
        return '#404348'
      } else if (id % 3 === 2) {
        return '#918679'
      } else {
        return '#FEB81E'
      }
    },
    getName (name) {
      return name === 'IT' ? 'information technology' : name.toLowerCase()
    },
    viewAllCategories () {
      this.$router.push('/categories')
    },
    goToShopPage (item) {
      this.changeSelectedShop(item)
      this.$router.push('/shopdetails')
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.scroll-x) {
  overflow-x: auto !important;
  overflow-y: hidden;
}

:deep(.vhl-item) {
  padding-top: 4px !important;
}

</style>
