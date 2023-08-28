<template lang="pug">
.fill-height.cehckout-page.pa-0.ma-0.full-width
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:title="'Checkout'" :icon="'more-vertical'" @goBack="goBackToPreviousPage" :back="true")
  .scroll.ma-0.justify-top.align-center.full-width.pb-16(:style="scrollSize")
    .pb-16
      pickup-method.pb-2
      .thicker-divider
      food-item.py-2
      .thicker-divider-primary
      order-details.py-2
      .thicker-divider-primary
      h4.px-4.pt-2 WeCan Voucher
      v-list.pa-0.px-4(flat)
        v-list-item-group(:color="$vuetify.theme.themes.light.primary")
          v-list-item.px-0()
            v-list-item-icon.mr-4.my-4
              eva-icon(name="folder-outline" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
            v-list-item-content
              v-list-item-title.secondary--text.mb-1 Check for WeCan voucher
            v-list-item-action
              eva-icon(name="arrow-ios-forward" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
      .thicker-divider-primary
      h4.px-4.pt-2 Payment Method
      v-list.pa-0.px-4(flat)
        v-list-item-group(:color="$vuetify.theme.themes.light.primary")
          v-list-item.px-0()
            v-list-item-icon.mr-4.my-4
              eva-icon(name="credit-card-outline" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
            v-list-item-content
              v-list-item-title.secondary--text.mb-1 MasterCard 2293
            v-list-item-action
              eva-icon(name="arrow-ios-forward" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
      .thicker-divider.mb-16
      .pb-8
</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
import WSearchBar from '../components/componenets-custom/WSearchBar.vue'
import PickupMethod from '../components/checkout/PickupMethod.vue'
import FoodItem from '../components/checkout/FoodItem.vue'
import OrderDetails from '../components/checkout/OrderDetails.vue'

export default {
  name: 'CheckoutPage',
  components: {
    UpperTitle,
    WSearchBar,
    PickupMethod,
    FoodItem,
    OrderDetails
  },
  layout: 'welcome',
  data () {
    return {
      search: null
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollTopClass',
      shop: 'home/getSelectedShop',
      recommendedCourse: 'course/getRecommendedCourses'
    })
  },
  mounted () {
    this.check()
  },
  methods: {
    searchBy (newValue) {
      this.search = newValue
    },
    check () {
      if (this.shop === null) {
        this.$router.push('/home')
      }
    },
    goBackToPreviousPage () {
      this.$router.go(-1)
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

.thicker-divider {
  height: 10px !important;
  background-color: black;
  opacity: 0.05;
}

.thicker-divider-primary {
  height: 10px !important;
  background-color: #FAAF08;
  opacity: 0.1;
}
</style>
