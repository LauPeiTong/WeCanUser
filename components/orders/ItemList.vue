<template lang="pug">
.item-list.py-6.px-2
  v-item-group.pt-2.pb-8
    template(v-for='item in items')
      v-row.d-flex.flex-column.px-4.pb-4.justify-center
        v-card.rounded-lg(
            @click="goToOrderDetailsPage(item)"
            outlined
          )
          v-row
            v-col.pr-0(:cols="4")
              v-img.rounded-lg.ma-2(:src="require(`../../assets/food/noitem.png`)" width="90" height="90" v-if="item.vendor.image_url == '' || item.vendor.image_url == null")
              v-img.rounded-lg.ma-2(:src="item.vendor.image_url" width="90" height="90" v-else)
            v-col.py-2.d-flex.flex-column.px-0(:cols="8")
              p.secondary--text.font-weight-medium.mb-0.pt-4 {{item.vendor.display_name}}
              p.mb-0.darkGrey--text {{$formatCurrency(item.total_price)}}
              p.caption.darkGrey--text.font-weight-light.mb-0.pb-4 At {{formatDate(new Date(item.created_at))}}
              v-row.d-flex.flex-row.mb-4.pl-2
                v-chip.mt-auto.mr-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.green" v-if="item.status === 'Completed'") {{item.status}}
                v-chip.mt-auto.mr-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.danger" v-else-if="item.status === 'Cancelled'") {{item.status}}
                v-chip.mt-auto.mr-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.primary" v-else) {{item.status}}
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
    goToOrderDetailsPage (item) {
      // this.$router.push({ name: 'orders-orderId', params: { orderId: item.id, order: item } })
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
