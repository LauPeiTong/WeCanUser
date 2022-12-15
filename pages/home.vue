<template lang="pug">
.fill-height.home-page.pa-0.ma-0
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:icon="'heart'" :title-class="'dark-background'")
    w-search-bar.ma-0(@change="searchBy")
  .scroll.scrollbar-hide.ma-0.justify-top.align-center(:style="scrollSize")
    category-list.pb-4.pt-6
    ads-carousel.pt-4
    shops-list.pb-4
    item-list.pb-4
    shop-vertical-list.px-4.pb-4(:items="shops" :title="'Shops recommeded for you'")
</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
import WSearchBar from '../components/componenets-custom/WSearchBar.vue'
import AdsCarousel from '../components/home/AdsCarousel.vue'
import ShopsList from '../components/home/ShopsList.vue'
import ItemList from '../components/home/ItemList.vue'
import CategoryList from '../components/home/CategoryList.vue'
import ShopVerticalList from '../components/home/ShopVerticalList.vue'

export default {
  name: 'HomePage',
  components: {
    UpperTitle,
    WSearchBar,
    AdsCarousel,
    ShopsList,
    ItemList,
    CategoryList,
    ShopVerticalList
  },
  layout: 'default',
  data () {
    return {
      search: null
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollClass',
      shops: 'home/getShops',
      recommendedJob: 'home/getRecommededJob'
    })
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
