<template lang="pug">
  v-row.shop-top.pt-8.pb-4(dense)
    v-col.text-center(:cols="2")
      w-icon(
        :icon-name="'arrow-ios-back-outline'"
        :icon-fill="whiteBackground || id === 4 || id === 5 || id === 7 ? $vuetify.theme.themes.light.darkGrey : 'white'"
        @click="emitBack()"
      )
    v-col.text-center(:cols="7")
      v-row.wecan-search-bar.pt-1
        v-text-field.pt-0.mt-0.rounded-lg(
          v-model="search"
          label="Search"
          single-line
          hide-details
          solo
        )
          template(v-slot:prepend-inner)
            client-only
              eva-icon(name="search-outline" height="20" :fill="$vuetify.theme.themes.light.secondary")
    v-col.text-right.pr-4(:cols="3")
      w-icon(
        :icon-name="'message-circle-outline'"
        :icon-fill="whiteBackground || id === 4 || id === 5 || id === 7 ? $vuetify.theme.themes.light.darkGrey : 'white'"
        @click=""
      )
      w-icon(
        :icon-name="'more-vertical-outline'"
        :icon-fill="whiteBackground || id === 4 || id === 5 || id === 7 ? $vuetify.theme.themes.light.darkGrey : 'white'"
        @click=""
      )

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WSearchBar from '../componenets-custom/WSearchBar.vue'
import WIcon from '../componenets-custom/WIcon.vue'

export default {
  name: 'ShopTop',
  components: {
    WIcon,
    WSearchBar
  },
  props: {
    id: {
      type: Number,
      default: 1
    },
    whiteBackground: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      search: ''
    }
  },
  computed: {
    ...mapGetters({
    })
  },
  methods: {
    ...mapActions({
    }),
    emitBack () {
      this.$emit('goBack')
    },
    searchBy (newValue) {
      this.search = newValue
    }
  }
}
</script>

<style lang="scss" scoped>
.dark-background {
  background-color: #FAAF08;
}

:deep(.v-text-field .v-input__slot){
  min-height: 40px;
  box-shadow: none !important;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25));
  background-color: rgba($color: #FFFFFF, $alpha: 0.9) !important;
}

.shop-top {
  border-radius: 0px 0px 25px 25px;
}

</style>
