<template lang="pug">
.job-list
  p.text-h6.font-weight-bold.pt-4(v-if="title") {{ title }}
  v-item-group.pt-2.pb-8
    template(v-for='item in items')
      v-row.d-flex.flex-column.px-4.pb-4.justify-center
        w-card.d-flex.flex-column(
          @click="goToJobDetailsPage(item)"
          :height="150"
          :style="widthX"
          :label="item.name"
          :label2="getCompany(item.company).name"
          :label3="getCompany(item.company).location"
          :corner-icon="'bookmark'"
        )
            template(v-slot:action)
              v-row.mt-8
                v-col.py-0.pl-2
                  v-chip(
                    outlined
                    :color="$vuetify.theme.themes.light.brown"
                  )
                    span {{ tag === null ? getTag(item.cid) : tag }}
                v-col.py-0.px-0
                  v-chip(
                    v-if="getCompany(item.company).verified"
                    outlined
                    :color="$vuetify.theme.themes.light.success"
                  )
                    span Verified
                v-col.py-0.justify-end.text-right
                  eva-icon(name="arrow-circle-right" :fill="$vuetify.theme.themes.light.secondary" height="32" width="32")

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WCard from '../componenets-custom/WCard.vue'

export default {
  name: 'JobList',
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
    },
    tag: {
      type: String,
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
      companies: 'home/getCompanies',
      categories: 'home/getCategories'
    })
  },
  methods: {
    ...mapActions({
      changeSelectedJob: 'home/changeSelectedJob'
    }),
    getCompany (id) {
      return this.companies.find((company) => {
        return company.id === id
      })
    },
    getTag (cid) {
      for (let i = 1; i <= this.categories.length; i++) {
        if (cid.includes(i)) {
          return this.categories[i - 1].name
        }
      }
    },
    goToJobDetailsPage (item) {
      this.changeSelectedJob(item)
      this.$router.push('/jobdetails')
    }
  }
}
</script>

<style lang="scss" scoped>
.min-350-width {
  min-width: 353px !important;
}
</style>
