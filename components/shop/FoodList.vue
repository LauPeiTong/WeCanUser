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
            @click="goToProductDetailsPage(item)"
            outlined
          )
            v-img.rounded-lg.mx-auto.align-end.text-right(:src="require(`../../assets/food/noitem.png`)" width="140" height="110" v-if="item.image_url == '' || item.image_url == null")
              v-chip.ma-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.primary") {{parseInt(item.discount)}}%
            v-img.rounded-xl.mx-auto.align-end.text-right(:src="item.image_url" width="140" height="110" v-else)
              v-chip.ma-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.primary") {{parseInt(item.discount)}}%
            .px-4.py-2
              span.tertiary--text.font-weight-regular.mb-1 {{$formatCurrency(item.price)}}
                |
                span.pl-1.text-12.text-decoration-line-through {{$formatCurrency(item.original_price)}}
              p.secondary--text.font-weight-regular.mb-0 {{$strLimit(item.name, 12)}}
              p.caption.darkGrey--text.font-weight-light.mb-0 {{ item.quantity }} left
            v-card.quantity-card.my-2.rounded-xl.mx-5(outlined)
              v-row.align-center
                v-col.px-0.text-right
                  v-btn(icon)
                    eva-icon.pt-1(name="minus-outline" :fill="$vuetify.theme.themes.light.darkGrey")
                v-col.text-center.px-0
                  span.font-weight-medium {{getItemQuantity(item.id) }}
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
      }
    }
  },
  computed: {
    ...mapGetters({
      shops: 'home/getShops',
      scrollSize: 'screen/getScrollXClass',
      getItemQuantity: 'cart/getItemQuantity'
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
    }),
    goToProductDetailsPage (item) {
      try {
        this.$router.push({ name: 'products-productId', params: { productId: item.id } })
      } catch (e) {
        console.log(e)
      }
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
