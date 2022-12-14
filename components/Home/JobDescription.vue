<template lang="pug">
//- hard code of job description
.job-desciption
  .job-highlight
    w-card.d-flex.flex-column(
      :style="widthX"
      :label="'Job Hightlight'"
    )
      template(v-slot:content)
        ul.pt-2
          li.pb-2 Strategic Location (5 mins walk to MRT)
          li.pb-2 Family-friendly (nearby nursery)
          li.pb-2 Medical and dental benefits
          li.pb-2 Fun and dynamic working environment

  .job-responsibilities
    w-card.mt-4.d-flex.flex-column(
      :style="widthX"
      :label="'Job Responsibility'"
    )
      template(v-slot:content)
        ul.pt-2
          li.pb-2 Builds, designs, and maintains all websites and software applications.
          li.pb-2 Regulates exposure to business stakeholders and executive management as well as other authorities.
          li.pb-2 Understands UI, cross-browser compatibility, and general web functions and standards.
          li.pb-2 Designs assignments with web services like REST, SOAP, etc.
          li.pb-2 Maintains a professional understanding of web development by tracking trends and participating in study groups.

  .job-requirement
    w-card.mt-4.d-flex.flex-column(
      :style="widthX"
      :label="'Job Requirement'"
    )
      template(v-slot:content)
        ul.pt-2
          li.pb-2 Bachelor’s degree in computer science
          li.pb-2 Minimum of 3.0 years’ experience as a web developer
          li.pb-2 Ability to write and edit technical documentation
          li.pb-2 Knowledge of modern HTML/CSS
          li.pb-2 Creative problem-solving skills

  .why-join-us
    w-card.mt-4.d-flex.flex-column(
      :style="widthX"
      :label="'Why Join Us?'"
    )
      template(v-slot:content)
        p.pt-2.text-justify {{ company.name }} is a company that support diversity and inclusion in the workplace. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

  .additional-information
     w-card.mt-4.d-flex.flex-column(
      :style="widthX"
      :label="'Additional Information'"
    )
      template(v-slot:content)
        v-col.px-0.pt-2.bottom-border
          p.mb-0.subtitle-1.font-weight-medium Position Level
          p.mb-0 Entry level
        v-col.px-0.pt-2.bottom-border
          p.mb-0.subtitle-1.font-weight-medium Qualification
          p.mb-0 Bachelor's Degree, Professional Degree
        v-col.px-0.pt-2.bottom-border
          p.mb-0.subtitle-1.font-weight-medium Employment Type
          p.mb-0 Full-time
        v-col.px-0.pt-2.bottom-border
          p.mb-0.subtitle-1.font-weight-medium Specializations
          p.mb-0 IT/Computer - Software

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WCard from '../componenets-custom/WCard.vue'

export default {
  name: 'JobDescription',
  components: {
    WCard
  },
  props: {
    job: {
      type: Object,
      default: null
    },
    company: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      widthX: 'screen/getWidthClass'
    })
  },
  methods: {
    ...mapActions({
    })
  }
}
</script>

<style lang="scss" scoped>
:deep(.bottom-border) {
  border-width: 0 0 1px 0;
  border-color: rgba(193, 193, 193, 0.25);
  border-style: solid;
  position: relative;
}
</style>
