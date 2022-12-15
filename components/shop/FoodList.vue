<template lang="pug">
.food-list
  v-row.pa-0.ma-0.px-4
    v-col.pa-0.ma-0
      p.text-h6.font-weight-medium.pt-4.mb-0(:class="colorClass") {{title}}
    v-col.pa-0.ma-0.d-flex.pr-2(:cols="3")
      v-row.pt-4.mb-1.pr-0.align-end.justify-end(@click="")
        p.mb-0(:class="colorClass") View all
        w-icon.pt-1(
          :height="26"
          :width="26"
          :icon-name="'chevron-right-outline'"
          :icon-fill="iconColor"
          @click=""
        )

  v-row.pl-4.mx-0.scroll-x.text-left(:style="scrollSize")
    vue-horizontal-list(
      :items="foods"
      :options="options"
    )
      template(v-slot:default="{item}")
        .align-center
          v-card.mx-auto.rounded-lg.pt-4(
            @click="goToFoodDetailsPage(item)"
            outlined
          )
            v-img.rounded-xl.mx-auto.align-end.text-right(:src="require(`../../assets/food/${item.src.toLowerCase()}.jpg`)" width="140")
              v-chip.ma-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.primary") {{item.discount * 100}}%
            .px-4.py-2
              span.tertiary--text.font-weight-regular.mb-1 {{$formatCurrency($discountPrice(item.originalPrice, item.discount))}}
                |
                span.pl-1.text-12.text-decoration-line-through {{$formatCurrency(item.originalPrice)}}
              p.secondary--text.font-weight-regular.mb-0 {{$strLimit(item.name, 16)}}
              p.caption.darkGrey--text.font-weight-light.mb-0 {{item.quantity}}
            v-card.quantity-card.my-2.rounded-xl.mx-5(outlined)
              v-row.align-center
                v-col.px-0.text-right
                  v-btn(icon)
                    eva-icon.pt-1(name="minus-outline" :fill="$vuetify.theme.themes.light.darkGrey")
                v-col.text-center.px-0
                  span.font-weight-medium {{quantityItem}}
                v-col.px-0.text-left
                  v-btn(icon)
                    eva-icon.pt-1(name="plus-outline" :fill="$vuetify.theme.themes.light.success")

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueHorizontalList from 'vue-horizontal-list'
import WCard from '../componenets-custom/WCard.vue'
import WIcon from '../componenets-custom/WIcon.vue'

export default {
  name: 'FoodList',
  components: {
    WCard,
    WIcon,
    VueHorizontalList
  },
  props: {
    title: {
      type: String,
      default: null
    },
    foods: {
      type: Array,
      default: null
    },
    color: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      options: {
        responsive: [
          { end: 500, size: 2.1 },
          { end: 1000, size: 4 }
        ],
        list: {
          // Because: #app {padding: 80px 24px;}
          padding: 8
        }
      },
      quantityItem: 0
    }
  },
  computed: {
    ...mapGetters({
      shops: 'home/getShops',
      scrollSize: 'screen/getScrollXClass'
    }),
    colorClass () {
      if (this.color === 'success') {
        return 'success--text'
      } else if (this.color === 'danger') {
        return 'danger--text'
      } else {
        return 'primary--text'
      }
    },
    iconColor () {
      if (this.color === 'success') {
        return '#009966'
      } else if (this.color === 'danger') {
        return '#C82F2F'
      } else {
        return '#FAAF08'
      }
    }
  },
  methods: {
    ...mapActions({
      changeSelectedCategory: 'home/changeSelectedCategory',
      changeSelectedFood: 'home/changeSelectedFood'
    }),
    getShopName (id) {
      return this.shops.find((shop) => {
        return shop.id === id
      }).name
    },
    goToFoodDetailsPage (food) {
      this.changeSelectedFood(food)
      this.$router.push('/fooddetails')
    },
    // job
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

.quantity-card {
  border: 2px solid #FAAF08;
  height: 32px;
}

</style>
