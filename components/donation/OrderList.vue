<template lang="pug">
.food-details.py-6.px-2
  v-item-group.pt-2.pb-8
    template(v-for='item in items')
      v-row.d-flex.flex-column.px-4.pb-4.justify-center
        v-card.rounded-lg(
            @click=""
            outlined
          )
          v-row
            v-col.pr-0(:cols="4")
              v-img.rounded-lg.ma-2(:src="require(`../../assets/food/${item.src.toLowerCase()}.jpg`)" width="90" height="90")
                v-badge.ml-1.mb-2(color="red" dot bordered v-if="item.status === 1")
            v-col.py-2.d-flex.flex-column.px-0(:cols="8")
              .d-flex.align-end
                span.secondary--text.font-weight-medium.mb-0.pt-4.pr-2 {{item.name}}
                span.mb-0.pt-4.darkGrey--text.caption x{{item.quantity}}
              p.caption.darkGrey--text.font-weight-light.mb-0 Expired date: {{item.date}}
              v-row.d-flex.flex-row.mb-4.pl-2
                v-chip.mt-auto.mr-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.primary" v-if="item.status === 1") {{item.subtitle}}
                v-chip.mt-auto.mr-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.green" v-if="item.status === 2") {{item.subtitle}}
                v-chip.mt-auto.mr-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.danger" v-if="item.status === 3") {{item.subtitle}}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WCard from '../componenets-custom/WCard.vue'

export default {
  name: 'FoodListDetails',
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
    })
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
  max-width: 120px;
}
</style>
