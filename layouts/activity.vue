<template lang="pug">
v-app
  v-main
    v-container.fill-height.pa-0(fluid)
      v-row.ma-0.fill-height
        Nuxt
        bottom-enroll-button
</template>

<script>
import BottomEnrollButton from '../components/BottomEnrollButton.vue'

export default {
  name: 'ActivityLayout',
  components: {
    BottomEnrollButton
  },
  data () {
    return {
    }
  }
}
</script>
