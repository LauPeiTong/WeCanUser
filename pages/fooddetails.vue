<template lang="pug">
.fill-height.food-details-page.pa-0.ma-0.full-width(v-if="!!food")
  v-row.on-top.pt-8.pb-6.pa-0.ma-0.primary(dense)
    v-col.text-center(:cols="2")
      w-icon(
        :icon-name="'arrow-ios-back-outline'"
        :icon-fill="'white'"
        @click="goBackToPreviousPage()"
      )
    v-col.text-center(:cols="8")
    v-col.text-center(:cols="2")
      w-icon(
        :icon-name="'heart'"
        :icon-fill="'white'"
        @click=""
      )
  .scroll.ma-0.justify-top.align-center.full-width(:style="scrollSize" id="scroll-target" v-scroll:#scroll-target="onScroll")
    v-img.absolute-position(height="220")
    v-row.pt-16
      v-col.pt-16.px-8.img-on-top.negative-margin.text-center(:cols="12")
        v-avatar(size="150" )
          v-img(:src="foodImg")

      v-col.second-on-top.white(:cols="12")
        .food.px-4.pt-10
          .text-right
            v-chip.my-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.primary") {{food.discount * 100}}% discount
          v-card.py-2.px-3.rounded-lg(outlined)
            v-row
              v-col.pb-0(:cols="8")
                p.font-weight-medium.text-h6.secondary--text.mb-0 {{ food.name }}
                p.caption.darkGrey--text {{food.quantity}}
              v-col.pb-0.text-right
                p.font-weight-medium.text-h6.primary--text.mb-0 {{$formatCurrency($discountPrice(food.originalPrice, food.discount))}}
                p.text-12.text-decoration-line-through.primary--text {{$formatCurrency(food.originalPrice)}}
            v-divider.my-2
            v-row.mb-2
              v-col.pb-0(:cols="6")
                p.font-weight-medium.secondary--text.mb-0 Expired date & time
              v-col.pb-0.text-right.pt-4
                p.font-weight-medium.success--text.mb-0 {{food.expiredDate}}

    //-     .choose.px-4
    //-       v-list.pa-0
    //-         v-list-item-group(:color="$vuetify.theme.themes.light.primary")
    //-           .delivery
    //-           v-list-item.px-0(value=1 @click="showTimeDialogue")
    //-             v-list-item-icon.mr-4.my-4
    //-               eva-icon(name="cube" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
    //-             v-list-item-content
    //-               v-list-item-title.secondary--text Delivery now
    //-               v-list-item-subtitle {{shop.duration}} mins .
    //-                 |
    //-                 img.mx-1(width="13" height="12" :src="require(`../assets/home/motorcycle.jpg`)")
    //-                 |   {{$formatCurrency(shop.deliveryFee)}}
    //-             v-list-item-action
    //-               eva-icon(name="arrow-ios-forward" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
    //-           v-divider

    //-           .ratings
    //-           v-list-item.px-0(value=-1  @click="showRatingsDialogue")
    //-             v-list-item-icon.mr-4.my-4
    //-               eva-icon(name="star" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
    //-             v-list-item-content
    //-               v-list-item-title.secondary--text Ratings
    //-               v-list-item-subtitle
    //-                 |
    //-                 img(width="13" height="12" :src="require(`../assets/home/star.jpg`)")
    //-                 |   {{shop.rate}} (212 Reviews)
    //-             v-list-item-action
    //-               eva-icon(name="arrow-ios-forward" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
    //-     v-divider.mx-4

    //-     .foods.pt-2.pb-8
    //-       food-list(:foods="foods" :title="'Recommended for you'" :color="'success'")
    //-       food-list.pt-4(:foods="discountFood(0.75)" :title="'75% discount'" :color="'danger'")
    //-       food-list.pt-4(:foods="discountFood(0.5)" :title="'50% discount'" :color="'primary'")

</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
import WIcon from '../components/componenets-custom/WIcon.vue'
import JobDescription from '../components/home/JobDescription.vue'
import ShopTop from '../components/shop/ShopTop.vue'
import FoodList from '../components/shop/FoodList.vue'

export default {
  name: 'FoodDetailsPage',
  components: {
    UpperTitle,
    WIcon,
    JobDescription,
    ShopTop,
    FoodList
  },
  layout: 'welcome',
  data () {
    return {
      search: null,
      offsetTop: 0
    }
  },

  computed: {
    ...mapGetters({
      food: 'home/getSelectedfood',
      foods: 'home/getFood',
      categories: 'home/getCategories',
      scrollSize: 'screen/getScrollYClass'
    }),
    foodLogo () {
      return require(`../assets/food/${this.food.src}.jpg`)
    },
    foodImg () {
      return require(`../assets/food/${this.food.src}.jpg`)
    }
  },
  mounted () {
    this.check()
  },
  methods: {
    showTimeDialogue () {
      console.log('time')
    },
    showRatingsDialogue () {
      console.log('rating')
    },
    discountFood (discount) {
      return this.foods.filter((food) => {
        return food.discount === discount
      })
    },
    check () {
      if (this.food === null) {
        this.$router.push('/home')
      }
    },
    onScroll (e) {
      this.offsetTop = e.target.scrollTop
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
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
  border-radius: 0 0 25px 25px;
}

.on-top-200 {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
  background-color: white;
}

.img-on-top {
  z-index: 99;
}

.second-on-top {
  z-index: 98;
}

.absolute-position {
  border-radius: 0 0 60% 60%;
  background: #FAAF08;
  position: absolute;
  width: 100%;
}

.negative-margin {
  margin-bottom: -65px;
}

.text-decoration-underline {
  text-underline-offset: 3px;
}

.v-chip.v-chip--outlined.v-chip.v-chip {
  background-color: white !important;
  border-width: 2px;
  font-weight: 500;
  font-size: 13px;
  height: 20px
}
</style>
