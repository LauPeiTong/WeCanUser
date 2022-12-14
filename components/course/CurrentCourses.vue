<template lang="pug">
.current-courses
  v-row.pa-0.ma-0.px-4
    v-col.pa-0.ma-0
      p.text-h6.font-weight-bold.pt-4.mb-0 Courses Taken
    v-col.pa-0.ma-0.d-flex
      v-row.pt-4.mb-1.pr-4.align-end.justify-end(@click="")
        p.mb-0 View all
        w-icon.ml-3(
          :height="20"
          :width="20"
          :icon-name="'arrow-forward-outline'"
          :icon-fill="this.$vuetify.theme.themes.light.brown"
          @click=""
        )

  v-row.px-4.mx-0.scroll-x(:style="scrollSize")
    vue-horizontal-list(
      :items="courses"
      :options="options"
    )
      template(v-slot:default="{item}")
        w-card.d-flex.flex-column(
          @click="goToCourseDetailsPage(item)"
          :height="200"
          :label="item.name"
          :label2="'Lorem ipsum dolor sit amet, consectetur adipiscing elit'"
        )
          template(v-slot:action)
            v-row.mt-4
              v-col.py-0
                v-chip(
                  v-if="item.completed"
                  :color="$vuetify.theme.themes.light.success"
                )
                  span.white--text Completed
                  eva-icon.pt-2.pl-1(fill="white" name="checkmark-outline" width="18" height="18")
                v-chip(
                  v-else
                  outlined
                  :color="$vuetify.theme.themes.light.secondary"
                )
                  span Status: {{ item.completed_level }} / {{ item.total_level }}
              v-col.py-0.justify-end.text-right
                eva-icon(name="arrow-circle-right" :fill="$vuetify.theme.themes.light.secondary" height="32" width="32")

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueHorizontalList from 'vue-horizontal-list'
import WCard from '../componenets-custom/WCard.vue'
import WIcon from '../componenets-custom/WIcon.vue'

export default {
  name: 'CurrentCourses',
  components: {
    WCard,
    WIcon,
    VueHorizontalList
  },
  props: {
  },
  data () {
    return {
      options: {
        responsive: [
          { end: 500, size: 1.5 }
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
      courses: 'course/getCurrentCourses',
      scrollSize: 'screen/getScrollXClass'
    })
  },
  methods: {
    ...mapActions({
      changeSelectedCourse: 'course/changeSelectedCourse'
    }),
    goToCourseDetailsPage (item) {
      this.changeSelectedCourse(item)
      this.$router.push('/coursedetails')
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
