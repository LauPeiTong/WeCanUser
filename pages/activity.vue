<template lang="pug">
.fill-height.activity-page.pa-0.ma-0
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:title="'Course'" :icon="'bookmark'")
    w-search-bar.ma-0(@change="searchBy")
  .scroll.ma-0.justify-top.align-center(:style="scrollSize")
    continue-course.pt-10.pb-2
    course-category.px-4.pb-4
    current-courses.pb-4
    course-list.px-4.pb-4(:items="recommendedCourse" :title="'Recomended for you'")
</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
import WSearchBar from '../components/componenets-custom/WSearchBar.vue'
import ContinueCourse from '../components/course/ContinueCourse.vue'
import CourseCategory from '../components/course/CourseCategory.vue'
import CurrentCourses from '../components/course/CurrentCourses.vue'
import CourseList from '../components/course/CourseList.vue'

export default {
  name: 'ActivityPage',
  components: {
    UpperTitle,
    WSearchBar,
    ContinueCourse,
    CourseCategory,
    CurrentCourses,
    CourseList
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
      recommendedCourse: 'course/getRecommendedCourses'
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
