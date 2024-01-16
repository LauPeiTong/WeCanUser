<template lang="pug">
v-app
  v-main
    v-container.fill-height.pa-0(fluid)
      v-row.ma-0.fill-height
        Nuxt
        bottom-nav
</template>

<script>
import BottomNav from '../components/BottomNav'

export default {
  name: 'DefaultLayout',
  components: {
    BottomNav
  },
  data () {
    return {
    }
  },
  // asyncData ({ store, redirect }) {
  //   if (!store.state.auth.isAuthenticated) {
  //     console.log('hello')
  //     return redirect('/login')
  //   }
  // },
  mounted () {
    if (!this.$store.getters['auth/isAuthenticated']) {
      console.log('No Authentication')
      this.$router.push({ path: '/login' })
    }
  }
}
</script>
