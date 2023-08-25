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
      :src="require(`../../assets/home/ads${item.id}.png`)"
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
        { id: 1 },
        { id: 2 }
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
