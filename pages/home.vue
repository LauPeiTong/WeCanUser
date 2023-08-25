<template lang="pug">
.fill-height.home-page.pa-0.ma-0
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:icon="'heart'" :title-class="'dark-background'")
    w-search-bar.ma-0(@change="searchBy")
  .scroll.scrollbar-hide.ma-0.justify-top.align-center(:style="scrollSize")
    category-list.pb-4.pt-6
    .ads-carousel.pt-4
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
    shop-vertical-list.px-4.pb-4(:items="recommendedShops" :title="'Shops recommeded for you'")
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
    AdsCarousel,
    ShopsList,
    ItemList,
    CategoryList,
    ShopVerticalList
  },
  layout: 'default',
  data () {
    return {
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
      shops: 'home/getShops',
      recommendedShops: 'home/getRecommendedShops',
      scrollXSize: 'screen/getScrollXClass'
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
