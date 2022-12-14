<template lang="pug">
.ads-carousel
  v-carousel(
    cycle
    height="150"
    hide-delimiter-background
    show-arrows-on-hover
  )
    v-carousel-item(
      v-for="item in ads"
      :key="item.id"
      :src="item.src"
      :style="scrollSize"
    )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AdsCarousel',
  components: {
  },
  props: {
  },
  data () {
    return {
      ads: [
        { id: 1, src: require('../../assets/home/ads/ads1.png') },
        { id: 2, src: require('../../assets/home/ads/ads2.png') }
      ]
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollXClass'
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
