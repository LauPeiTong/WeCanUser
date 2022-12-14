<template lang="pug">
.course-list
  p.text-h6.font-weight-bold.pt-4(v-if="title") {{ title }}
  v-item-group.pt-2.pb-8
    template(v-for='item in items')
      v-row.d-flex.flex-column.px-4.pb-4.justify-center
        w-card.d-flex.flex-column(
          @click="goToCourseDetailsPage(item)"
          :height="150"
          :style="widthX"
          :label="item.name"
          :label2="'Lorem ipsum dolor sit amet, consectetur adipiscing elit'"
          :label3="getCompanyName(item.company).name"
          :corner-icon="'bookmark'"
        )
            template(v-slot:action)
              v-row.mt-8
                v-col.py-0.pl-2
                  v-chip(
                    outlined
                    :color="item.premium ? $vuetify.theme.themes.light.primary : $vuetify.theme.themes.light.success"
                  )
                    span {{ item.premium ? 'Premium' : 'Free' }}
                v-col.py-0.justify-end.text-right
                  eva-icon(name="arrow-circle-right" :fill="$vuetify.theme.themes.light.secondary" height="32" width="32")

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WCard from '../componenets-custom/WCard.vue'

export default {
  name: 'CourseList',
  components: {
    WCard
  },
  props: {
    title: {
      type: String,
      default: null
    },
    items: {
      type: Array || Object,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      widthX: 'screen/getWidthClass',
      companies: 'home/getCompanies'
    })
  },
  methods: {
    ...mapActions({
      changeSelectedCourse: 'course/changeSelectedCourse'
    }),
    getCompanyName (id) {
      return this.companies.find((company) => {
        return company.id === id
      })
    },
    goToCourseDetailsPage (item) {
      this.changeSelectedCourse(item)
      this.$router.push('/coursedetails')
    }
  }
}
</script>

<style lang="scss" scoped>
.min-350-width {
  min-width: 353px !important;
}
</style>
