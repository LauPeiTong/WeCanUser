<template lang="pug">
  v-row.pt-8.pb-6.upper-title(dense :class="titleClass")
    v-col.text-center(:cols="2")
      w-icon(
        v-if="back === true"
        :icon-name="'arrow-ios-back-outline'"
        :icon-fill="'white'"
        @click="emitBack()"
      )
    v-col.text-center(:cols="8")
      h3(:class="textColor") {{ title }}
    v-col.text-center(:cols="2")
      w-icon(
        :icon-name="icon"
        :icon-fill="iconColor"
        :border="border"
        @click=""
      )

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WIcon from './componenets-custom/WIcon.vue'

export default {
  name: 'UpperTitle',
  components: {
    WIcon
  },
  props: {
    title: {
      type: String,
      default: null
    },
    titleClass: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    back: {
      type: Boolean,
      default: false
    },
    border: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
    }),
    textColor () {
      if (this.titleClass === 'dark-background') {
        return 'white--text'
      } else {
        return 'secondary--text'
      }
    },
    iconColor () {
      if (this.titleClass === 'dark-background') {
        return 'white'
      } else {
        return 'primary'
      }
    }
  },
  methods: {
    ...mapActions({
    }),
    emitBack () {
      this.$emit('goBack')
    }
  }
}
</script>

<style lang="scss" scoped>
.upper-title {
  position: absolute;
  top: 0;
  width: 100%;
  border-radius: 0px 0px 25px 25px;
  z-index: 100;
}

.dark-background {
  background-color: #FAAF08;
}
</style>
