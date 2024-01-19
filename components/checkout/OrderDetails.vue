<template lang="pug">
.order-details.px-4(v-if="cart")
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
          v-list-item-title.secondary--text Tax
        v-list-item-action
          p.mb-0 {{$formatCurrency(tax)}}
      v-divider

      v-list-item.px-0()
        v-list-item-icon.mr-4.my-4
        v-list-item-content.pt-0.mb-3
          v-list-item-title.font-weight-bold.secondary--text Order Total
        v-list-item-action
          p.mb-0.font-weight-bold {{$formatCurrency(total + tax + (cart.pickupMethod == 'Pick-up' || shop.tags.includes('Free Delivery')? 0 : Math.round(shop.distance * 1.2)) + (donation ? amountToRoundUp : 0))}}
          p.mb-0.text-decoration-line-through {{$formatCurrency(originalAmount + tax + (cart.pickupMethod == 'Pick-up' || shop.tags.includes('Free Delivery') ? 0 : Math.round(shop.distance * 1.2)) + (donation ? amountToRoundUp : 0) )}}

  v-footer.white.rounded-t-xl(absolute elevation="4")
    v-col(cols="12")
      v-row
        v-col.pb-0(cols="7")
          p.mb-0 Merchandise subtotal
        v-col.pb-0.text-right(cols="5")
          p.mb-0 {{$formatCurrency(total + tax)}}
      v-row(v-if="cart.pickupMethod == 'Delivery'")
        v-col.py-0(cols="7")
          p.mb-0 Delivery subtotal
        v-col.py-0.text-right(cols="5")
          p.mb-0 {{shop.tags.includes('Free Delivery') ? 0 : $formatCurrency(Math.round(shop.distance * 1.2))}}
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
          p.mb-0.font-weight-bold {{$formatCurrency(totalPayment)}}
    v-col.text-center(cols="12")
      w-button.bottom-nav--button(
        :label="'Place Order (' + $formatCurrency(totalPayment) + ')'"
        block
        dark
        :color="$vuetify.theme.themes.light.primary"
        @click="placeOrder"
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
      cart: 'cart/getCart',
      user: 'auth/getAuthUser'
    }),
    amountToRoundUp () {
      const totalAmount = this.total + this.tax
      const decimalPart = totalAmount - Math.floor(totalAmount)
      // console.log(decimalPart)
      return decimalPart > 0 ? 1 - decimalPart : 0
    },
    totalPayment () {
      return this.total + (this.cart.pickupMethod === 'Pick-up' || this.shop.tags.includes('Free Delivery') ? 0 : Math.round(this.shop.distance * 1.2)) + (this.donation ? this.amountToRoundUp : 0) + this.tax
    },
    tax () {
      return 0.03 * this.total
    }
  },
  methods: {
    ...mapActions({
      removeCart: 'cart/removeCart'
    }),
    async placeOrder () {
      try {
        const formattedCartItem = this.cart.cartItems.map((cartItem) => {
          return {
            product: cartItem.item.id,
            quantity: cartItem.quantity
          }
        })

        const newOrderData = {
          customer: this.$store.getters['auth/getAuthId'],
          vendor: this.shop.id,
          delivery_fee: (this.cart.pickupMethod === 'Pick-up' || this.shop.tags.includes('Free Delivery') ? 0 : Math.round(this.shop.distance * 1.2)),
          tax: 0.03,
          round_up: this.donation ? this.amountToRoundUp.toFixed(2) : 0,
          status: 'Pending',
          delivery_or_pickup: this.cart.pickupMethod,
          notes: 'Need cutlery, thank you.',
          points: Math.round(this.total),
          products: formattedCartItem
        }
        const order = await this.$axios.post('/api/orders/', newOrderData)
        console.log('Order is placed: ', order)

        if (this.donation) {
          this.makeDonation(order.data.id)
        }

        this.removeCart(this.cart)
        console.log('Cart is removed')

        this.goToSuccessPaymentPage()
      } catch (e) {
        console.log('Order is failed: ', e)
      }
    },
    async makeDonation (id) {
      try {
        const donation = {
          customer: this.$store.getters['auth/getAuthId'],
          organization_name: 'WeCan Project',
          amount: this.amountToRoundUp.toFixed(2),
          order: id,
          type: 'Round-up'
        }

        const response = await this.$axios.post('/api/donations/', donation)
        console.log('Donation is done: ', response)

        const user = await this.$axios.get(`/api/users/user/${this.user.id}`)

        this.$store.dispatch('auth/changePoints', user.data.points)
      } catch (e) {
        console.log('Fail to donate: ', e)
      }
    },
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
