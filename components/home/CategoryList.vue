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
            @click="goToShopListPage(item)"
            width="35"
            elevation="0"
            :color="$vuetify.theme.themes.light.primary"
          )
            v-img.category-card--img(:src="require(`../../assets/home/${item.name.toLowerCase()}.jpg`)" width="35")
          .black--text.text-truncate(v-if="item.name==='Supermarket'") {{item.name}}
          .black--text(v-else) {{item.name}}

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
    goToShopListPage (item) {
      this.changeSelectedCategory(item)
      this.$router.push('/shops')
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
