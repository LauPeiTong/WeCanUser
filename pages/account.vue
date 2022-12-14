<template lang="pug">
.fill-height.account-page.pa-0.ma-0
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:title="'Account'" :icon="'more-vertical'")
  .scroll.ma-0.justify-top.align-center(:style="scrollSize")
</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
export default {
  name: 'AccountPage',
  components: {
    UpperTitle
  },
  layout: 'default',
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollClass',
    })
  },
  methods: {
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