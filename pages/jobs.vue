<template lang="pug">
.fill-height.jobs-page.pa-0.ma-0(v-if="!!selectedCategory")
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:title="selectedCategory.name" :icon="'bookmark'" :title-class="'dark-background'" @goBack="goBackToPreviousPage" :back="true")
    w-search-bar.ma-0(@change="searchBy")
  .scroll.ma-0.justify-top.align-center(:style="scrollSize")
    job-list.px-4.pb-4.pt-11(:items="jobs" :tag="tag")

</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
import WSearchBar from '../components/componenets-custom/WSearchBar.vue'

export default {
  name: 'JobsPage',
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
      scrollSize: 'screen/getScrollClass',
      selectedCategory: 'job/getSelectedCategory',
      jobs: 'job/getJobs'
    }),
    tag () {
      if (this.selectedCategory.name.length < 5) {
        return this.selectedCategory.name + ' related job'
      } else {
        return this.selectedCategory.name
      }
    }
  },
  mounted () {
    this.check()
  },
  methods: {
    check () {
      if (this.selectedCategory === null) {
        this.$router.push('/home')
      }
    },
    searchBy (newValue) {
      this.search = newValue
    },
    goBackToPreviousPage () {
      this.$router.go(-1)
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
