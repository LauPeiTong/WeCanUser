<template lang="pug">
.shop-list
  p.text-h6.font-weight-medium.pt-4(v-if="title") {{ title }}
  v-item-group.pt-2.pb-8
    template(v-for='item in items')
      v-row.d-flex.flex-column.px-4.pb-4.justify-center
        v-card.rounded-lg(
            @click="goToShopPage(item)"
            outlined
            height="135"
          )
            v-row
              v-col(:cols="5")
                v-img.rounded-lg.ma-3(:src="require(`../../assets/food/noitem.png`)" width="110" height="110" v-if="item.hero_image == ''")
                v-img.rounded-lg.ma-3(:src="item.hero_image" width="110" height="110" v-else)
              v-col.py-2.pl-0.d-flex.flex-column(:cols="7")
                p.secondary--text.font-weight-medium.mb-0.pt-4 {{$strLimit(item.name, 20)}}
                p.caption.darkGrey--text.font-weight-light.mb-0 {{item.city.name}}
                p.caption.darkGrey--text.font-weight-light.mb-0.mt-0 {{item.distance}} km .
                  |
                  img.ml-1(width="14" height="14" :src="require(`../../assets/home/star.jpg`)")
                  |   {{item.rating}}
                p.caption.darkGrey--text.font-weight-light.mb-0.mt-0 {{ item.delivery_duration_range ? item.delivery_duration_range.lower_limit_in_minutes : item.minimum_pickup_time }} mins .
                  |
                  img.mx-1(width="13" height="12" :src="require(`../../assets/home/motorcycle.jpg`)")
                  |   {{$formatCurrency(300)}}
                v-row.d-flex.flex-row.mb-4.pl-2
                  template(v-for='tag in item.food_characteristics')
                    v-chip.mt-auto.mr-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.primary") {{tag.name}}

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WCard from '../componenets-custom/WCard.vue'

export default {
  name: 'ShopVerticalList',
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
      shops: 'home/getRecommendedShops',
      categories: 'home/getCategories'
    })
  },
  methods: {
    ...mapActions({
      changeSelectedShop: 'home/changeSelectedShop'
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
    },
    goToShopPage (item) {
      this.changeSelectedShop(item)
      this.$router.push('/shopdetails')
    }
  }
}
</script>

<style lang="scss" scoped>
.min-350-width {
  min-width: 353px !important;
}

.v-chip.v-chip--outlined.v-chip.v-chip {
  background-color: white !important;
  border-width: 2px;
  font-weight: 400;
  font-size: 13px;
  height: 20px;
  max-width: 100px;
}
</style>
