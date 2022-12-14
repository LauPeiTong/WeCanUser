<template lang="pug">
.continue-course
  v-card.mx-4.rounded-lg(outlined @click="goToCourseDetailsPage()")
    v-list-item.pt-2(three-line)
      v-list-item-content
        v-list-item-title.secondary--text.font-weight-bold.text-h5.mt-2(v-if="course.name.length < 20") {{ course.name }}
        v-list-item-title.secondary--text.font-weight-bold.text-h5.mt-2(v-else) {{ course.name.substring(0,20) }}..
        v-list-item-subtitle.pt-1.secondary--text.font-weight-regular.text-h6 Status: {{ course.completed_level }} / {{ course.total_level }}
        v-list-item-subtitle.pt-6.brown--text.font-weight-regular.subtitle-1 Continue your course
      v-list-item-avatar.my-4(size="50" tile)
        eva-icon(name="award" :fill="$vuetify.theme.themes.light.primary" height="50" width="50")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CountinueCourse',
  components: {
  },
  props: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      course: 'course/getRecentCourse',
      recentCourse: 'course/getRecentCourse'
    })
  },
  methods: {
    ...mapActions({
      changeSelectedCourse: 'course/changeSelectedCourse'
    }),
    goToCourseDetailsPage () {
      this.changeSelectedCourse(this.recentCourse)
      this.$router.push('/coursedetails')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
