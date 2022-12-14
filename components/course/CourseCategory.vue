<template lang="pug">
.category-list
  v-row.pa-0.ma-0
    v-col.pa-0.ma-0
      p.text-h6.font-weight-bold.pt-4.mb-0 Category
    v-col.pa-0.ma-0.d-flex

  v-row.mt-0
    v-col.pr-1(:cols="6")
      w-card.d-flex.flex-column(
        @click=""
        :height="150"
        :label="'Free'"
        :label2="'Basic courses for you to learn'"
        :color="$vuetify.theme.themes.light.secondary"
      )
        template(v-slot:action)
          v-row.mt-4
            v-col.py-0
              v-chip(
                outlined
                color="white"
              )
                span 5 New
            v-col.py-0.justify-end.text-right
              eva-icon(name="file-text" fill="white" height="28" width="28")
    v-col.pl-1(:cols="6")
      w-card.d-flex.flex-column(
        @click=""
        :height="150"
        :label="'Premium'"
        :label2="'Advanced courses for you to learn'"
        :color="$vuetify.theme.themes.light.primary"
      )
        template(v-slot:action)
          v-row.mt-4
            v-col.py-0
              v-chip(
                outlined
                color="white"
              )
                span 17 New
            v-col.py-0.justify-end.text-right
              eva-icon(name="file-text" fill="white" height="28" width="28")

</template>

<script>
import { mapGetters, mapActions } from 'vuex'

import WCard from '../componenets-custom/WCard.vue'

export default {
  name: 'CourseCategory',
  components: {
    WCard
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollXClass'
    })
  },
  methods: {
    ...mapActions({
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
