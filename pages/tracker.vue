<template lang="pug">
.fill-height.tracker-page.pa-0.ma-0
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:title="'Food Tracker'" :icon="'more-vertical'")
    w-search-bar.ma-0(@change="searchBy")
  .scroll.ma-0.justify-top.align-center(:style="scrollSize")
</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
import WSearchBar from '../components/componenets-custom/WSearchBar.vue'

export default {
  name: 'TrackerPage',
  components: {
    UpperTitle,
    WSearchBar
  },
  layout: 'default',
  data () {
    return {
      search: null
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollClass'
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
