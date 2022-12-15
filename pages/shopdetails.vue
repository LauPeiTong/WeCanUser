<template lang="pug">
.fill-height.shop-details-page.pa-0.ma-0.full-width(v-if="!!shop")
  shop-top.ma-0.on-top(@goBack="goBackToPreviousPage" :id="shop.id" v-if="offsetTop < 200")
  shop-top.ma-0.on-top-200(@goBack="goBackToPreviousPage" :id="shop.id" :whiteBackground="true" v-else)

  .scroll.ma-0.justify-top.align-center.full-width(:style="scrollSize" id="scroll-target" v-scroll:#scroll-target="onScroll")
    v-img.absolute-position(height="220" :src="shopBackground")
    v-row.pt-16
      v-col.pt-16.px-8.img-on-top.negative-margin.text-center(:cols="12")
        v-avatar(size="130" )
          v-img(:src="shopLogo" contain)

      v-col.second-on-top.white(:cols="12")
        .shop.px-4
          v-row.mt-10
            v-col.pb-0
              p.font-weight-medium.text-h5.secondary--text {{ shop.name }}
            v-col.pb-0.text-right
              v-chip.subtitle-1(label :color="$vuetify.theme.themes.light.primary" text-color="white") Following
          p.mb-0.font-weight-regular.caption.darkGrey--text {{ shop.address }}
          p.font-weight-regular.caption.darkGrey--text {{ shop.distance }} km
            |
            a.text-decoration-underline.font-weight-regular.caption.pl-2 View details
        v-divider.mt-4.mx-4

        .choose.px-4
          v-list.pa-0
            v-list-item-group(:color="$vuetify.theme.themes.light.primary")
              .delivery
              v-list-item.px-0(value=1 @click="showTimeDialogue")
                v-list-item-icon.mr-4.my-4
                  eva-icon(name="cube" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
                v-list-item-content
                  v-list-item-title.secondary--text Delivery now
                  v-list-item-subtitle {{shop.duration}} mins .
                    |
                    img.mx-1(width="13" height="12" :src="require(`../assets/home/motorcycle.jpg`)")
                    |   {{$formatCurrency(shop.deliveryFee)}}
                v-list-item-action
                  eva-icon(name="arrow-ios-forward" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
              v-divider

              .ratings
              v-list-item.px-0(value=-1  @click="showRatingsDialogue")
                v-list-item-icon.mr-4.my-4
                  eva-icon(name="star" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
                v-list-item-content
                  v-list-item-title.secondary--text Ratings
                  v-list-item-subtitle
                    |
                    img(width="13" height="12" :src="require(`../assets/home/star.jpg`)")
                    |   {{shop.rate}} (212 Reviews)
                v-list-item-action
                  eva-icon(name="arrow-ios-forward" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
        v-divider.mx-4

        .foods.pt-2.pb-8
          food-list(:foods="foods" :title="'Recommended for you'" :color="'success'")
          food-list.pt-4(:foods="discountFood(0.75)" :title="'75% discount'" :color="'danger'")
          food-list.pt-4(:foods="discountFood(0.5)" :title="'50% discount'" :color="'primary'")

</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
import WIcon from '../components/componenets-custom/WIcon.vue'
import JobDescription from '../components/home/JobDescription.vue'
import ShopTop from '../components/shop/ShopTop.vue'
import FoodList from '../components/shop/FoodList.vue'

export default {
  name: 'ShopDetailsPage',
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
      shop: 'home/getSelectedShop',
      foods: 'home/getFood',
      categories: 'home/getCategories',
      scrollSize: 'screen/getScrollYClass'
    }),
    shopLogo () {
      return require(`../assets/home/shops/${this.shop.src}.jpg`)
    },
    shopBackground () {
      return require(`../assets/home/shops/${this.shop.src}.jpg`)
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
      if (this.shop === null) {
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
  border-radius: 30px 30px 0 0;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25));
  z-index: 98;
}

.absolute-position {
  filter: blur(7px);
  background: rgba(39, 37, 37, 0.5);
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
