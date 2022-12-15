<template lang="pug">
.fill-height.job-details-page.pa-0.ma-0.full-width(v-if="!!job")
  upper-title.ma-0.on-top(:title="'Job Details'" :icon="'heart-outline'" :title-class="'dark-background'" @goBack="goBackToPreviousPage" :back="true")
  .scroll.ma-0.mt-16.justify-top.align-center.full-width(:style="scrollSize")
    v-img.absolute-position(height="190" :src="companyBackground")
    v-row.pt-16
      v-col.pt-16.px-8.img-on-top.negative-margin(:cols="12")
        v-avatar(size="130" )
          v-img(:src="companyLogo" contain)

      v-col.px-8.second-on-top.white(:cols="12")
        .job
          p.mt-14.mb-0.font-weight-bold.text-h5.secondary--text {{ job.name }}
          p.font-weight-bold.text-h6.primary--text {{ job.salary }} / month
          v-chip(
            outlined
            :color="$vuetify.theme.themes.light.secondary"
          )
            span {{ getTag(job.cid) }}
          v-chip.ml-3(
            outlined
            :color="$vuetify.theme.themes.light.secondary"
          )
            span {{ getTag2(job.cid) }}
          p.mt-2.font-weight-medium.subtitle-1.secondary--text Posted on 04 Noc 2022
        v-divider

        .company
          v-row.mt-4
            v-col.py-0(:cols="7")
              p.mb-0.font-weight-bold.text-h6.secondary--text {{ company.name }}
            v-col.py-0.text-right
              v-chip(
                v-if="company.verified"
                outlined
                :color="$vuetify.theme.themes.light.success"
              )
                span Verified
                eva-icon.pt-2.pl-1(v-if="company.verified" :fill="this.$vuetify.theme.themes.light.success" name="checkmark-outline" width="18" height="18")
          p.mb-2.mt-3.font-weight-regular.subtile-1.secondary--text {{ company.location }}
          v-row.px-3.mt-0
            p.text-decoration-underline.mb-0.font-weight-regular.subtitle-1.darkGrey--text(@click="") View company details
            eva-icon.pt-1.pl-1(:fill="this.$vuetify.theme.themes.light.darkGrey" name="arrow-forward-outline" width="20" height="20")
        v-divider.mt-8

        .job-overview
          p.mt-4.mb-0.font-weight-bold.text-h6.secondary--text Job Overview
          job-description.pt-2(:company="company")

</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
import WIcon from '../components/componenets-custom/WIcon.vue'
import JobDescription from '../components/home/JobDescription.vue'

export default {
  name: 'JobDetailsPage',
  components: {
    UpperTitle,
    WIcon,
    JobDescription
  },
  layout: 'job',
  data () {
    return {
      search: null
    }
  },

  computed: {
    ...mapGetters({
      job: 'home/getSelectedJob',
      company: 'home/getCompany',
      categories: 'home/getCategories',
      scrollSize: 'screen/getScrollClass'
    }),
    companyLogo () {
      return require(`../assets/logo/${this.company.img}.jpg`)
    },
    companyBackground () {
      return require(`../assets/logo/${this.company.img}2.jpg`)
    }
  },
  mounted () {
    this.check()
  },
  methods: {
    check () {
      if (this.job === null) {
        this.$router.push('/home')
      }
    },
    searchBy (newValue) {
      this.search = newValue
    },
    goBackToPreviousPage () {
      this.$router.go(-1)
    },
    getTag (cid) {
      for (let i = 1; i <= this.categories.length; i++) {
        if (i === cid[0]) {
          return this.categories[i - 1].name
        }
      }
    },
    getTag2 (cid) {
      for (let i = 1; i <= this.categories.length; i++) {
        if (i === cid[1]) {
          return this.categories[i - 1].name
        }
      }
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
