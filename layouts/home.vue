<template lang="pug">
v-app
  v-main
    v-container.fill-height.pa-0(fluid)
      v-row.ma-0.fill-height
        Nuxt
        bottom-apply-button
</template>

<script>
import BottomApplyButton from '../components/BottomApplyButton.vue'

export default {
  name: 'HomeLayout',
  components: {
    BottomApplyButton
  },
  data () {
    return {
    }
  }
}
</script>
