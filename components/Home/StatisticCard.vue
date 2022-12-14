<template lang="pug">
.statistic-card.px-4
  v-card.rounded-lg(outlined @click="")
    v-list-item.pt-2(three-line)
      v-list-item-content
        v-list-item-title.secondary--text.font-weight-bold.text-h5.mt-2 Job Statistics
        v-list-item-subtitle View the most popular job in Malaysia
      v-list-item-avatar(size="60" tile)
        v-img(:src="statisticLogo")
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'StatisticCard',
  components: {
  },
  props: {
  },
  data () {
    return {
      statisticLogo: require('../../assets/logo/StatisticLogo.jpg')
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
    ...mapActions({
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
