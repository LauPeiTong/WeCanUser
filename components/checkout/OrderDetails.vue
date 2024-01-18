<template lang="pug">
.order-details.px-4(v-if="shop")
  v-list.pa-0(flat)
    v-list-item-group(:color="$vuetify.theme.themes.light.primary")
      v-list-item.px-0()
        v-list-item-icon.mr-4.my-4
          eva-icon(name="clock-outline" :fill="$vuetify.theme.themes.light.tertiary" height="30" width="30")
        v-list-item-content
          v-list-item-title.secondary--text.mb-1 {{ cart.pickupMethod == 'Delivery' ? 'Deliver Now' : 'Self pick-up'}}
        v-list-item-action
          eva-icon(name="arrow-ios-forward" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
      v-divider

      v-list-item.px-0(v-if="cart.pickupMethod == 'Delivery'")
        v-list-item-icon.mr-4.my-4
          eva-icon(name="shopping-bag-outline" :fill="$vuetify.theme.themes.light.green" height="30" width="30")
        v-list-item-content
          v-list-item-title.secondary--text.mb-1 Deliver to
          v-list-item-subtitle {{shop ? shop.distance.toFixed(2) : '0'}} km
        v-list-item-action
          p.mb-0 {{shop && shop.tags.includes('Free Delivery') ? 'Free' : $formatCurrency(Math.round(shop.distance * 1.2))}}
      v-divider(v-if="cart.pickupMethod == 'Delivery'")

      v-list-item.px-0(v-if="amountToRoundUp > 0")
        v-list-item-icon.mr-4.my-4
          eva-icon(name="star-outline" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
        v-list-item-content
          v-list-item-title.secondary--text.mb-1 Round up for donation?
          v-list-item-subtitle.text-decoration-underline View details
        v-list-item-action
          v-checkbox(v-model="donation" :fill="$vuetify.theme.themes.light.green" :label="$formatCurrency(amountToRoundUp)")
      v-divider(v-if="amountToRoundUp > 0")

      v-list-item.px-0()
        v-list-item-icon.mr-4.my-4
        v-list-item-content
          v-list-item-title.font-weight-bold.secondary--text Order Total
        v-list-item-action
          p.mb-0.font-weight-bold {{$formatCurrency(total + (pickupMethod == 'Pick-up' || shop.tags.includes('Free Delivery')? 0 : Math.round(shop.distance * 1.2)) + (donation ? amountToRoundUp : 0))}}
          p.mb-0.text-decoration-line-through {{$formatCurrency(originalAmount + (pickupMethod == 'Pick-up' || shop.tags.includes('Free Delivery') ? 0 : Math.round(shop.distance * 1.2)) + (donation ? amountToRoundUp : 0) )}}

  v-footer.white.rounded-t-xl(absolute elevation="4")
    v-col(cols="12")
      v-row
        v-col.pb-0(cols="7")
          p.mb-0 Merchandise subtotal
        v-col.pb-0.text-right(cols="5")
          p.mb-0 {{$formatCurrency(total)}}
      v-row(v-if="pickupMethod == 'Delivery'")
        v-col.py-0(cols="7")
          p.mb-0 Delivery subtotal
        v-col.py-0.text-right(cols="5")
          p.mb-0 {{shop.tags.includes('Free Delivery')? 0 : $formatCurrency(Math.round(shop.distance * 1.2))}}
      v-row
        v-col.pt-0(cols="7")
          p.mb-0 Donation
        v-col.pt-0.text-right(cols="5")
          p.mb-0 {{$formatCurrency(donation ? amountToRoundUp : 0)}}
      v-divider.my-2
      v-row
        v-col.pb-0(cols="7")
          p.mb-0.font-weight-bold Total Payment
        v-col.pb-0.text-right(cols="5")
          p.mb-0.font-weight-bold {{$formatCurrency(total + (pickupMethod == 'Pick-up' || shop.tags.includes('Free Delivery')? 0 : Math.round(shop.distance * 1.2)) + (donation ? amountToRoundUp : 0))}}
    v-col.text-center(cols="12")
      w-button.bottom-nav--button(
        :label="'Place Order (' + $formatCurrency(total + (pickupMethod == 'Pick-up' || shop.tags.includes('Free Delivery')? 0 : Math.round(shop.distance * 1.2)) + (donation ? amountToRoundUp : 0)) + ')'"
        block
        dark
        :color="$vuetify.theme.themes.light.primary"
        @click="goToSuccessPaymentPage"
      )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WCard from '../componenets-custom/WCard.vue'
import WButton from '../componenets-custom/WButton.vue'

export default {
  name: 'OrderDetails',
  components: {
    WCard,
    WButton
  },
  data () {
    return {
      donation: false
    }
  },
  computed: {
    ...mapGetters({
      widthX: 'screen/getWidthClass',
      shop: 'cart/getSelectedShop',
      total: 'cart/getCartTotalAmount',
      originalAmount: 'cart/getOriginalTotalAmount',
      pickupMethod: 'cart/getPickupMethod',
      cart: 'cart/getCart'
    }),
    amountToRoundUp () {
      const totalAmount = this.total
      const decimalPart = totalAmount - Math.floor(totalAmount)
      console.log(decimalPart)
      return decimalPart > 0 ? 1 - decimalPart : 0
    }
  },
  methods: {
    ...mapActions({
    }),
    goToSuccessPaymentPage () {
      this.$router.push('/successpayment')
    }
  }
}
</script>

<style lang="scss" scoped>
.min-350-width {
  min-width: 353px !important;
}

</style>
