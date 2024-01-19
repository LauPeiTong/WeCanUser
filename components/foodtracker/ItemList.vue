<template lang="pug">
.item-list.py-6.px-2
  v-item-group.pt-2.pb-8
    template(v-for='item in items')
      v-row.d-flex.flex-column.px-4.pb-4.justify-center
        v-card.rounded-lg(
            @click="goToFoodDetailsPage(item)"
            outlined
          )
          v-row
            v-col.pr-0(:cols="4")
              v-img.rounded-lg.ma-2(:src="require(`../../assets/food/noitem.png`)" width="90" height="90" v-if="item.product.image_url == '' || item.product.image_url == null")
                v-badge.ml-1.mb-2(color="red" dot bordered v-if="item.product.status === 'Near Expiry'")
              v-img.rounded-lg.ma-2(:src="item.product.image_url" width="90" height="90" v-else)
                v-badge.ml-1.mb-2(color="red" dot bordered v-if="item.product.status === 'Near Expiry'")
            v-col.py-2.d-flex.flex-column.px-0(:cols="8")
              //- .d-flex.align-end.flex-wrap
              span.secondary--text.font-weight-medium.mb-0.pt-4.pr-2 {{item.product.name + '  '}}
                |
                span.mb-0.pt-4.darkGrey--text.caption x{{item.quantity}}
              p.caption.darkGrey--text.font-weight-light.mb-4 Expired date: {{formatDate(new Date(item.product.expired_date))}}
              v-row.d-flex.flex-row.mb-4.pl-2
                v-chip.mt-auto.mr-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.primary" v-if="item.product.status === 'Near Expiry'") {{item.product.time_left.hours}} hours left
                v-chip.mt-auto.mr-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.green" v-if="item.product.status === 'Within Shelf Life'") {{item.product.time_left.days}} days left
                v-chip.mt-auto.mr-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.danger" v-if="item.product.status === 'Expired' && item.product.time_left.days < -1") Expired at {{item.product.time_left.days * -1}} days ago
                v-chip.mt-auto.mr-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.danger" v-if="item.product.status === 'Expired' && item.product.time_left.days >= -1") Expired at {{item.product.time_left.hours * -1}} hours ago
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WCard from '../componenets-custom/WCard.vue'

export default {
  name: 'ItemList',
  components: {
    WCard
  },
  props: {
    items: {
      type: Array || Object,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      widthX: 'screen/getWidthClass'
    })
  },
  methods: {
    ...mapActions({
    }),
    formatDate (date) {
      const todayFormat = 'HH:mm a'
      const otherDayFormat = 'dd MMM yyyy, HH:mm a'

      const formattedDate = this.$dateFns.isToday(date)
        ? 'Today, ' + this.$dateFns.format(date, todayFormat)
        : this.$dateFns.format(date, otherDayFormat)

      return formattedDate
    },
    goToFoodDetailsPage (item) {
      this.$router.push({ name: 'foodtracker-foodId', params: { foodId: item.product.id, food: item } })
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
}
</style>
