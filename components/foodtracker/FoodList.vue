<template lang="pug">
.activity-list.pt-2
  v-tabs.scroll-x(
    background-color="white"
    :color="$vuetify.theme.themes.light.primary"
    :style="scrollSize"
    grow
  )
    v-tab(v-for="item in tabs" :key="item.name" @click="updateList(item.status)") {{item.name}}
      v-badge.mb-2.ml-2(v-if="item.id === 1" color="red" content="2")
  order-list(:items="items")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueHorizontalList from 'vue-horizontal-list'
import WIcon from '../componenets-custom/WIcon.vue'
import OrderList from '../foodtracker/OrderList.vue'

export default {
  name: 'FoodList',
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
        { id: 1, name: 'Near Expiry', status: 1 },
        { id: 2, name: 'Within Shelf Life', status: 2 },
        { id: 3, name: 'Expired', status: 3 }
      ],
      items: null
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollXClass',
      foods: 'food/getFoods'
    })
  },
  mounted () {
    this.updateList(1)
  },
  methods: {
    ...mapActions({
    }),
    updateList (status) {
      this.items = this.foods.filter((food) => {
        return food.status === status
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
