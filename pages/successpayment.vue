<template lang="pug">
.fill-height.cehckout-page.pa-0.ma-0.full-width
  v-row.pa-0.ma-0.upper-row
    upper-title.ma-0(:title="''" :icon="'more-vertical'" @goBack="goBackToPreviousPage" :back="true")
  .scroll.ma-0.justify-top.align-center.full-width.pb-16(:style="scrollSize")
    v-img.mx-auto(:src="require(`../assets/img/success1.png`)" max-height="300" max-width="300")
    v-card.mt-8.py-2.d-flex.align-end.justify-center.rounded-xl.mx-auto(outlined max-width="180")
      h1.primary--text.text-center.font-weight-bold +5
      h4.mb-2.ml-2.primary--text.primary--text WePoints
    h2.text-center.font-weight-regular.pt-4 Your Order has been accepted
    p.darkGrey--text.text-center {{ pickupMethod == 'Delivery' ? 'We’ll let you know when rider is found.' : 'We’ll remind when the order is ready to pick-up.'}}
    v-row.mx-6.pt-5
      w-button.bottom-nav--button(
          :label="'Track Order'"
          block
          dark
          :color="$vuetify.theme.themes.light.primary"
          @click=""
        )
      w-button.bottom-nav--button.mt-4(
          :label="'Back to home'"
          block
          outlined
          :color="'black'"
          @click="goBackToHomePage"
        )
</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
import WSearchBar from '../components/componenets-custom/WSearchBar.vue'
import WButton from '../components/componenets-custom/WButton.vue'

export default {
  name: 'SuccessPaymentPage',
  components: {
    UpperTitle,
    WSearchBar,
    WButton
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
      pickupMethod: 'cart/getPickupMethod'
    })
  },
  methods: {
    searchBy (newValue) {
      this.search = newValue
    },
    goBackToPreviousPage () {
      this.$router.go(-1)
    },
    goBackToHomePage () {
      this.$router.push('/home')
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

</style>
