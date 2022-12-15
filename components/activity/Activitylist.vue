<template lang="pug">
.activity-list.pt-2
  v-tabs.scroll-x(
    background-color="white"
    :color="$vuetify.theme.themes.light.primary"
    :style="scrollSize"
    grow
  )
    v-tab(v-for="item in tabs" :key="item.name" @click="updateList(item.status)") {{item.name}}
  order-list(:items="activity")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueHorizontalList from 'vue-horizontal-list'
import WIcon from '../componenets-custom/WIcon.vue'
import OrderList from './OrderList.vue'

export default {
  name: 'ActivityList',
  components: {
    VueHorizontalList,
    WIcon,
    OrderList
  },
  props: {
  },
  data () {
    return {
      tabs: [
        { id: 1, name: 'To process', status: 'Processing' },
        { id: 2, name: 'To deliver', status: 'Finding driver' },
        { id: 3, name: 'To receive', status: 'Out for delivery' },
        { id: 4, name: 'Completed', status: 'Completed' },
        { id: 4, name: 'Cancelled', status: 'Cancelled' }
      ],
      activity: null
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollXClass',
      orders: 'order/getOrders'
    })
  },
  mounted () {
    this.updateList('Processing')
  },
  methods: {
    ...mapActions({
    }),
    updateList (status) {
      this.activity = this.orders.filter((order) => {
        return order.status === status
      })
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.scroll-x) {
  overflow-x: auto !important;
  overflow-y: hidden;
}

:deep(.v-slide-group__prev) {
  min-width: 0px !important;
  flex: 0px;
}

.v-tabs {
  filter: drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.025));
}

.v-tab {
  text-transform: none !important;
}
</style>
