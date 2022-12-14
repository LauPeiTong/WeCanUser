<template lang="pug">
  v-row.bottom-nav.bottom-column-content-area.pa-4(no-gutters)
    v-col.flex.bottom-nav--col.px-0.mx-0(:cols="10")
      w-button.bottom-nav--button(
        :label="'Apply Now'"
        block
        dark
        :color="$vuetify.theme.themes.light.secondary"
        @click=""
      )
    v-col.flex.text-center.my-auto(:cols="2")
      w-icon.ml-3(
        :height="36"
        :width="36"
        :icon-name="'message-circle-outline'"
        :icon-fill="this.$vuetify.theme.themes.light.secondary"
        @click=""
      )
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WIcon from './componenets-custom/WIcon.vue'
import WButton from './componenets-custom/WButton.vue'

export default {
  name: 'BottomNav',
  components: { WButton, WIcon },
  data () {
    return {
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
.bottom-nav {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.bottom-column-content-area {
  border-width: 1px 0 0 0;
  border-color: rgba(193, 193, 193, 0.25);
  border-style: solid;
  background-color: white;
}

</style>
