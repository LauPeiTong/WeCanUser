<template lang="pug">
.item-list
  v-row.pa-0.ma-0.px-4
    v-col.pa-0.ma-0
      p.text-h6.font-weight-medium.pt-4.mb-0 Items recommended for you
    v-col.pa-0.ma-0.d-flex(:cols="3")
      v-row.pt-4.mb-1.pr-0.align-end.justify-end(@click="")
        p.mb-0.primary--text View all
        w-icon.pt-1(
          :height="26"
          :width="26"
          :icon-name="'chevron-right-outline'"
          :icon-fill="$vuetify.theme.themes.light.primary"
          @click=""
        )

  v-row.pl-4.mx-0.scroll-x.text-left(:style="scrollSize")
    vue-horizontal-list(
      :items="recommendedFoods"
      :options="options"
    )
      template(v-slot:default="{item}")
        .align-center
          v-card.mx-auto.rounded-lg.pt-4(
            @click=""
            outlined
          )
            v-img.rounded-lg.mx-auto.align-end.text-right(:src="require(`../../assets/food/noitem.png`)" width="140" height="110" v-if="item.image_url == ''")
            v-img.rounded-xl.mx-auto.align-end.text-right(:src="item.image_url" width="140" height="110" v-else)
              v-chip.ma-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.primary") {{parseInt(item.discount)}}%
            .px-4.py-2
              p.secondary--text.font-weight-medium.mb-0.text-truncate {{item.name}}
              //- p.caption.darkGrey--text.font-weight-light.mb-0 5
              p.caption.darkGrey--text.font-weight-light.mb-1 Restoran Al Sarifa
              span.tertiary--text.font-weight-regular.mb-0 {{$formatCurrency(item.price)}}
                |
                span.pl-1.text-12.text-decoration-line-through {{$formatCurrency(item.original_price)}}

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueHorizontalList from 'vue-horizontal-list'
import WCard from '../componenets-custom/WCard.vue'
import WIcon from '../componenets-custom/WIcon.vue'

export default {
  name: 'ItemList',
  components: {
    WCard,
    WIcon,
    VueHorizontalList
  },
  props: {
  },
  data () {
    return {
      recommendedFoods: [],
      vendor: null,
      options: {
        responsive: [
          { end: 500, size: 2.1 },
          { end: 1000, size: 4 }
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
      // foods: 'home/getRecommendedFoods',
      scrollSize: 'screen/getScrollXClass'
    })
  },
  async mounted () {
    try {
      const response = await this.$axios.get('/api/products/?recommended=true')
      this.recommendedFoods = response.data.results
      console.log(this.recommendedFoods)
    } catch (e) {
      this.$router.push({ path: '/login' })
    }
  },
  methods: {
    ...mapActions({
      changeSelectedCategory: 'home/changeSelectedCategory'
    }),
    viewAllCategories () {
      this.$router.push('/categories')
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

.v-chip.v-chip--outlined.v-chip.v-chip {
  background-color: white !important;
  border-width: 2px;
  font-weight: 500;
  font-size: 13px;
  height: 16px
}

.text-12 {
  font-size: 12px;
}
</style>
