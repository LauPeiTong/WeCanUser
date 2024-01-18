<template lang="pug">
.shops-list
  v-row.pa-0.ma-0.px-4
    v-col.pa-0.ma-0
      p.text-h6.font-weight-medium.pt-4.mb-0 Shops near you
    v-col.pa-0.ma-0.d-flex
      v-row.pt-4.mb-1.pr-0.align-end.justify-end(@click="goToShopListPage")
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
            v-img.rounded-lg(:src="item.image_url" width="140" height="130")
            .pa-2
              .secondary--text.font-weight-medium.mb-0.text-truncate {{item.display_name}}
              .caption.darkGrey--text.font-weight-light.mb-0.text-truncate {{item.city}}
              span.caption.darkGrey--text.font-weight-light.mb-0.mt-0 {{item.distance.toFixed(2)}} km .
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
      nearByRestaurants: [],
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
      // nearByRestaurants: 'home/getNearByRestaurants',
      scrollSize: 'screen/getScrollXClass',
      categories: 'home/getCategories'
    })
  },
  async mounted () {
    try {
      const response = await this.$axios.get('/api/users/vendors/?type=near')
      this.nearByRestaurants = response.data
      // console.log(this.nearByRestaurants)
    } catch (e) {
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    ...mapActions({
      changeSelectedShop: 'home/changeSelectedShop',
      changeSelectedCategory: 'home/changeSelectedCategory'
    }),
    viewAllCategories () {
      this.$router.push('/categories')
    },
    goToShopListPage () {
      this.changeSelectedCategory(this.categories[0])
      this.$router.push('/shops')
    },
    goToShopPage (item) {
      this.$store.dispatch('cart/changeSelectedShop', item)
      this.$router.push({ name: 'shops-shopId', params: { shopId: item.id } })
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
