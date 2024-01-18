<template lang="pug">
.food-items.px-4(v-if="foods")
  .d-flex.justify-space-between
    h4 Order Details
    p.success--text.text-decoration-underline Edit
  .food-items-list
    v-item-group.pt-2
      template(v-for='item in foods')
        v-row.d-flex.flex-column.px-3.pb-4.justify-center(v-if="item.quantity > 0")
          v-card.rounded-lg(
              @click=""
              outlined
              height="135"
            )
              v-row
                v-col(:cols="5")
                  v-img.rounded-lg.ma-3.border(:src="require(`../../assets/food/noitem.png`)" width="110" height="110" v-if="item.item.image_url == '' || item.item.image_url == null")
                  v-img.rounded-lg.ma-3(:src="item.item.image_url" width="110" height="110" v-else)
                v-col.py-2.pl-0.d-flex.flex-column(:cols="7")
                  .d-flex.justify-space-between
                    p.secondary--text.font-weight-medium.mb-0.pt-4 {{$strLimit(item.item.name, 20)}}
                    v-btn(icon @click.stop="changeQuantity(item, item.quantity * -1)")
                      eva-icon.pt-3.pr-2(name="close" :fill="$vuetify.theme.themes.light.darkGrey")
                  p.caption.darkGrey--text.font-weight-light.mb-0.mb-auto {{item.item.description ? $strLimit(item.item.description, 32) : "No description"}}
                  .d-flex.justify-space-between.mb-4
                    v-card.quantity-card.rounded-xl(outlined)
                      v-row.align-center
                        v-col.px-0.text-right
                          v-btn(icon @click.stop="changeQuantity(item, -1)" :disabled="item.quantity <= 1")
                            eva-icon.pt-1.pl-5(name="minus-outline" :fill="$vuetify.theme.themes.light.darkGrey")
                        v-col.text-center.px-0
                          span.font-weight-medium.px-5 {{ item.quantity }}
                        v-col.px-0.text-left
                          v-btn(icon @click.stop="changeQuantity(item, 1)" :disabled="item.quantity >= item.item.quantity")
                            eva-icon.pt-1.pr-5(name="plus-outline" :fill="$vuetify.theme.themes.light.success")
                    p.pl-4.pr-2.mb-0.pt-2 {{ $formatCurrency(item.quantity * item.item.price) }}

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WCard from '../componenets-custom/WCard.vue'

export default {
  name: 'FoodItem',
  components: {
    WCard
  },
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters({
      widthX: 'screen/getWidthClass',
      foods: 'cart/getCartItem'
    })
  },
  mounted () {
  },
  methods: {
    ...mapActions({
      changeCartItem: 'cart/addCartItem'
    }),
    changeQuantity (selectdItem, num) {
      const cartItem = {
        item: selectdItem.item,
        quantity: selectdItem.quantity + num
      }
      this.changeCartItem(cartItem)
    }
  }
}
</script>

<style lang="scss" scoped>
.min-350-width {
  min-width: 353px !important;
}

.border {
  border: solid 1px gainsboro;
}

.quantity-card {
  border: 2px solid #FAAF08;
}

</style>
