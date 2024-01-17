<template lang="pug">
.fill-height.home-page.pa-0.ma-0.full-width
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:title="selectedCategory.name" :icon="'file-text'" :title-class="'dark-background'" @goBack="goBackToHomePage" :back="true")
    w-search-bar.ma-0(@change="searchBy")
  .scroll.scrollbar-hide.ma-0.justify-top.align-center(:style="scrollSize")
    shop-vertical-list.px-4.pt-12.pb-4(:items="shops")
</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../../components/UpperTitle.vue'
import WSearchBar from '../../components/componenets-custom/WSearchBar.vue'
import ShopVerticalList from '../../components/home/ShopVerticalList.vue'

export default {
  name: 'ShopListPage',
  components: {
    UpperTitle,
    WSearchBar,
    ShopVerticalList
  },
  layout: 'default',
  data () {
    return {
      shops: [],
      search: null
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollClass',
      scrollXSize: 'screen/getScrollXClass',
      selectedCategory: 'home/getSelectedCategory'
    })
  },
  async mounted () {
    try {
      let response = null
      if (this.selectedCategory.name === 'All') {
        response = await this.$axios.get('/api/users/vendors/')
      } else if (this.selectedCategory.name === 'Halal') {
        response = await this.$axios.get('/api/users/vendors/?tags=Halal')
      } else if (this.selectedCategory.name === 'Restaurant') {
        response = await this.$axios.get('/api/users/vendors/?category=Restaurant')
      } else if (this.selectedCategory.name === 'Grocery') {
        response = await this.$axios.get('/api/users/vendors/?category=Grocery')
      } else if (this.selectedCategory.name === 'Supermarket') {
        response = await this.$axios.get('/api/users/vendors/?category=Supermarket')
      } else if (this.selectedCategory.name === 'Bakery') {
        response = await this.$axios.get('/api/users/vendors/?category=Bakery')
      }
      this.shops = response.data
      console.log(this.shops)
    } catch (e) {
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    searchBy (newValue) {
      this.search = newValue
    },
    goBackToHomePage () {
      this.$router.push({ path: '/home' })
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
