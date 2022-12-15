<template lang="pug">
.category-list
  v-row.pa-0.ma-0.px-4
    v-col.pa-0.ma-0
      p.text-h6.font-weight-medium.pt-4.mb-0 Explore by category
    v-col.pa-0.ma-0.d-flex

  v-row.pl-4.mx-0.scroll-x.text-center(:style="scrollSize")
    vue-horizontal-list(
      :items="categories"
      :options="options"
    )
      template(v-slot:default="{item}")
        .align-center
          v-card.mx-auto.pa-4.mb-1.category-card(
            @click=""
            width="35"
            elevation="0"
            :color="$vuetify.theme.themes.light.primary"
          )
            v-img.category-card--img(:src="require(`../../assets/home/${item.name.toLowerCase()}.jpg`)" width="35")
          span.black--text {{item.name}}

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueHorizontalList from 'vue-horizontal-list'
import WCard from '../componenets-custom/WCard.vue'
import WIcon from '../componenets-custom/WIcon.vue'

export default {
  name: 'CategoryList',
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
          { end: 500, size: 4.5 },
          { end: 1000, size: 7.5 }
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
      categories: 'home/getCategories',
      scrollSize: 'screen/getScrollXClass'
    })
  },
  methods: {
    ...mapActions({
      changeSelectedCategory: 'home/changeSelectedCategory'
    }),
    cardColor (id) {
      if (id % 3 === 1) {
        return '#404348'
      } else if (id % 3 === 2) {
        return '#918679'
      } else {
        return '#FEB81E'
      }
    },
    getName (name) {
      return name === 'IT' ? 'information technology' : name.toLowerCase()
    },
    viewAllCategories () {
      this.$router.push('/categories')
    },
    goToJobsPage (item) {
      this.changeSelectedCategory(item)
      this.$router.push('/jobs')
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

.category-card {
  border-radius: 25px;
}

.category-card--img {
  border-radius: 0px !important;
}
</style>
