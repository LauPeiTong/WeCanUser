<template lang="pug">
.fill-height.activity-details-page.pa-0.ma-0.full-width(v-if="!!course")
  upper-title.ma-0.on-top(:title="'Course Details'" :icon="'bookmark'" :title-class="'dark-background'" @goBack="goBackToPreviousPage" :back="true")
  .scroll.ma-0.mt-16.justify-top.align-center.full-width(:style="scrollSize")
    v-img.absolute-position(height="250" :src="background")
    v-row.mt-16
      v-col.mb-16
      v-col.mt-16.px-8.second-on-top.white(:cols="12")
        .course.mb-4
          p.mt-4.mb-0.font-weight-bold.text-h5.secondary--text {{ course.name }}
          p.font-weight-regular.subtitle-1.brown--text Learn to lorem ipsum dolor sit amet, consect adipiscing elit.
          v-chip(
            outlined
            :color="course.premium ? $vuetify.theme.themes.light.primary : $vuetify.theme.themes.light.success"
          )
            span {{ course.premium ? 'Premium' : 'Free' }}
          v-chip.ml-3(
            v-if="isEnrolled"
            outlined
            :color="$vuetify.theme.themes.light.secondary"
          )
            span Enrolled
        v-divider

        .duration-details
          v-row.mt-0
            v-col(:cols="9")
              p.font-weight-medium.subtitle-1 Expected completion duration
            v-col(:cols="3")
              p.font-weight-medium.subtitle-1.success--text 2 Weeks

        .course-ovrview
           course-description
</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
import WIcon from '../components/componenets-custom/WIcon.vue'
import CourseDescription from '../components/course/CourseDescription.vue'

export default {
  name: 'ActivityDetailsPage',
  components: {
    UpperTitle,
    WIcon,
    CourseDescription
  },
  layout: 'activity',
  data () {
    return {
      search: null
    }
  },

  computed: {
    ...mapGetters({
      course: 'course/getSelectedCourse',
      isEnrolled: 'course/isEnrolled',
      scrollSize: 'screen/getScrollClass'
    }),
    background () {
      return require('../assets/img/courses.jpg')
    }
  },
  mounted () {
    this.check()
  },
  methods: {
    check () {
      if (this.course === null) {
        this.$router.push('/activity')
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
.v-avatar {
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
}

.on-top {
  z-index: 100;
}

.img-on-top {
  z-index: 99;
}

.second-on-top {
  z-index: 98;
}

.absolute-position {
  position: absolute;
  width: 100%;
}

.negative-margin {
  margin-bottom: -65px;
}

.text-decoration-underline {
  text-underline-offset: 3px;
}
</style>
