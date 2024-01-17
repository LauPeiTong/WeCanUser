<template lang="pug">
.fill-height.home-page.pa-0.ma-0
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:icon="'file-text'" :title-class="'dark-background'")
    w-search-bar.ma-0(@change="searchBy")
  .scroll.scrollbar-hide.ma-0.justify-top.align-center(:style="scrollSize")
    category-list.pb-4.pt-6
    ads-carousel.pt-4
      v-carousel(
        cycle
        height="150"
        hide-delimiter-background
        show-arrows-on-hover
      )
        v-carousel-item(
          v-for="item in ads"
          :key="item.id"
          :src="require(`../assets/home/ads${item.id}.png`)"
          :style="scrollXSize"
        )
    shops-list.pb-4
    item-list.pb-4
    shop-vertical-list.px-4.pb-4(:items="menuRahmahShops" :title="'Shops offers Menu Rahmah'")
</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
import WSearchBar from '../components/componenets-custom/WSearchBar.vue'
import ShopsList from '../components/home/ShopsList.vue'
import ItemList from '../components/home/ItemList.vue'
import CategoryList from '../components/home/CategoryList.vue'
import ShopVerticalList from '../components/home/ShopVerticalList.vue'

export default {
  name: 'HomePage',
  components: {
    UpperTitle,
    WSearchBar,
    ShopsList,
    ItemList,
    CategoryList,
    ShopVerticalList
  },
  layout: 'default',
  data () {
    return {
      menuRahmahShops: [],
      search: null,
      ads: [
        { id: 1 },
        { id: 2 }
      ]
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollClass',
      scrollXSize: 'screen/getScrollXClass'
    })
  },
  async mounted () {
    try {
      const response = await this.$axios.get('/api/users/vendors/?tags=Menu Rahmah')
      this.menuRahmahShops = response.data
      // console.log(this.menuRahmahShops)

      // const newOrderData = {
      //   customer: this.$store.getters['auth/getAuthId'],
      //   vendor: 54,
      //   delivery_fee: 5.00,
      //   tax: 0.05,
      //   status: 'Processing',
      //   delivery_or_pickup: 'Delivery',
      //   notes: 'Special instructions for delivery',
      //   products: [
      //     {
      //       product: 4279,
      //       quantity: 1
      //     },
      //     {
      //       product: 4277,
      //       quantity: 2
      //     }
      //   ]
      // }

      // const order = await this.$axios.post('/api/orders/', newOrderData)
      // console.log('Order data:', order)
    } catch (e) {
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    searchBy (newValue) {
      this.search = newValue
    }
  }
}
</script>

<style scoped>
:deep(.scroll) {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100% !important;
}

</style>
