<template lang="pug">
  v-card.rounded-xl.d-flex.flex-column.justify-start(
    v-if="disabled === false"
    @click="emitClick();"
    :min-height="height"
    :color="color"
    outlined
    )
    .px-4.pt-4.mb-auto
      v-row
        v-col(:cols="10")
          p.mb-0.font-weight-medium.text-h6(:class="color ? 'white--text' : 'secondary--text'") {{ label }}
        v-col.text-right(v-if="cornerIcon" :cols="2")
          //- Error: child cannot be removed
          v-btn(icon @click.stop="emitIconClick")
            client-only
              eva-icon(:name="cornerIconName" :fill="cornerIconColor"  width='32' height='32')
      p.mb-0.caption.font-weight-regular(:class="color ? 'white--text' : 'secondary--text'") {{ label2 }}
      p.mb-0.caption.font-weight-light(:class="color ? 'white--text' : 'secondary--text'") {{ label3 }}
      slot(name="content")
    v-card-actions.px-4.pb-4
      slot(name="action")

  v-card.rounded-xl.d-flex.flex-column.justify-start(
    v-else
    :min-height="height"
    :color="color"
    outlined
    )
    .px-4.pt-4.mb-auto
      v-row
        v-col(:cols="10")
          p.mb-0.font-weight-medium.text-h6(:class="color ? 'white--text' : 'secondary--text'") {{ label }}
        v-col.text-right(v-if="cornerIcon" :cols="2")
          //- Error: child cannot be removed
          v-btn(icon)
            client-only
              eva-icon(:name="cornerIconName" :fill="cornerIconColor"  width='32' height='32')
      p.mb-0.caption.font-weight-regular(:class="color ? 'white--text' : 'secondary--text'") {{ label2 }}
      p.mb-0.caption.font-weight-light(:class="color ? 'white--text' : 'secondary--text'") {{ label3 }}
      slot(name="content")
    v-card-actions.px-4.pb-4
      slot(name="action")
</template>
<script>
export default {
  name: 'WCard',
  props: {
    label: {
      type: String,
      default: null
    },
    label2: {
      type: String,
      default: null
    },
    label3: {
      type: String,
      default: null
    },
    height: {
      type: Number,
      default: 95
    },
    color: {
      type: String,
      default: null
    },
    cornerIcon: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isIconClicked: false,
      cornerIconName: this.cornerIcon + '-outline',
      cornerIconColor: '#918679'
    }
  },
  computed: {
  },
  methods: {
    emitClick () {
      this.$emit('click')
    },
    emitIconClick () {
      if (!this.isIconClicked) {
        this.cornerIconColor = `${this.$vuetify.theme.themes.light.primary}`
        this.cornerIconName = this.cornerIcon
        this.isIconClicked = true
      } else {
        this.cornerIconColor = `${this.$vuetify.theme.themes.light.brown}`
        this.cornerIconName = this.cornerIcon + '-outline'
        this.isIconClicked = false
      }
    }
  }
}
</script>

<style scoped>

</style>
