<template lang="pug">
v-app
  v-main
    v-container.fill-height.pa-0(fluid)
      Nuxt
</template>

<script>

export default {
  name: 'WelcomeLayout',
  data () {
    return {
    }
  },
  mounted () {
    if (!this.$store.getters['auth/isAuthenticated']) {
      console.log('No Authentication')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
