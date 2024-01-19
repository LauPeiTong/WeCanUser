<template lang="pug">
.order-list.pt-2
  v-tabs.scroll-x(
    background-color="white"
    :color="$vuetify.theme.themes.light.primary"
    :style="scrollSize"
    grow
  )
    v-tab(v-for="item in tabs" :key="item.name" @click="updateList(item.name)") {{item.name}}
      v-badge.mb-2.ml-2(v-if="item.id === 1 && num > 0" color="red" :content="num")
  item-list(:items="items")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WIcon from '../componenets-custom/WIcon.vue'
import ItemList from '../orders/ItemList.vue'

export default {
  name: 'OrderList',
  components: {
    WIcon,
    ItemList
  },
  props: {
  },
  data () {
    return {
      orders: [],
      tabs: [
        { id: 1, name: 'Pending' },
        { id: 2, name: 'Processing' },
        { id: 3, name: 'To Receive' },
        { id: 4, name: 'Completed' },
        { id: 4, name: 'Cancelled' }
      ],
      items: null,
      num: 0
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollXClass'
    })
  },
  async mounted () {
    try {
      this.orders = await this.$axios.$get('/api/orders/')
      console.log('Order list: ', this.orders)
      this.updateList('Pending')
    } catch (e) {
      console.log('Fail to get order list: ', e)
    }
  },
  methods: {
    ...mapActions({
    }),
    updateList (status) {
      this.items = this.orders[status]
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
