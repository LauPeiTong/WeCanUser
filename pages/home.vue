<template lang="pug">
.fill-height.home-page.pa-0.ma-0
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:icon="'heart-outline'" :title-class="'dark-background'" :border="true")
    w-search-bar.ma-0(@change="searchBy")
  .scroll.scrollbar-hide.ma-0.justify-top.align-center(:style="scrollSize")
    category-list.pb-4.pt-6
    ads-carousel.pt-4
    shops-list.pb-4
    item-list.pb-4
    job-list.px-4.pb-4(:items="recommendedJob" :title="'Recommeded for you'")
</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
import WSearchBar from '../components/componenets-custom/WSearchBar.vue'
import AdsCarousel from '../components/Home/AdsCarousel.vue'
import ShopsList from '../components/Home/ShopsList.vue'
import ItemList from '../components/Home/ItemList.vue'
import CategoryList from '../components/Home/CategoryList.vue'
import JobList from '../components/Home/JobList.vue'

export default {
  name: 'HomePage',
  components: {
    UpperTitle,
    WSearchBar,
    AdsCarousel,
    ShopsList,
    ItemList,
    CategoryList,
    JobList
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
