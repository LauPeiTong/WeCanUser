<template lang="pug">
.welcome-page.text-center.mx-auto
  v-img.welcome-image(:src="logoPath" width="250")
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'IndexPage',
  layout: 'welcome',
  data () {
    return {
      logoPath: require('../assets/logo/Logo.jpg')
    }
  },
  created () {
    setTimeout(() => this.$router.push({ path: '/home' }), 1000)
  },
  methods: {
    ...mapActions({
    })
  }
}
</script>
