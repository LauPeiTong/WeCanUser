<template lang="pug">
.story-list
  v-row.pa-0.ma-0.px-4
    v-col.pa-0.ma-0
      p.text-h6.font-weight-medium.pt-4.mb-0 Your Groups (6)
    v-col.pa-0.ma-0.d-flex
      v-row.pt-4.mb-1.pr-2.align-end.justify-end(@click="")
        p.mb-0 View all
          w-icon.ml-3(
            :height="20"
            :width="20"
            :icon-name="'arrow-forward-outline'"
            :icon-fill="this.$vuetify.theme.themes.light.brown"
            @click=""
          )

  v-row.pl-0.mx-0.mt-0.scroll-x(:style="scrollSize")
    vue-horizontal-list(
      :items="story"
      :options="options"
    )
      template(v-slot:default="{item}")
        v-col.text-center.pt-0
          v-avatar(size="68")
            img(:src="avatar(item.id)")
          v-badge(
            bottom
            :color="'rgba(0, 0, 0, 0.7)'"
            offset-x="15"
            offset-y="-5"
            :content="item.new"
          )
          p.subtitle-2.line-height-0.pt-2.text-center {{$strLimit(item.name, 16)}}

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueHorizontalList from 'vue-horizontal-list'
import WIcon from '../componenets-custom/WIcon.vue'

export default {
  name: 'StoryList',
  components: {
    VueHorizontalList,
    WIcon
  },
  props: {
  },
  data () {
    return {
      story: [
        { id: 1, name: 'Food Protector', new: 150 },
        { id: 2, name: 'Save Money Group', new: 121 },
        { id: 3, name: 'I love discount', new: 87 },
        { id: 4, name: 'Selangor Food', new: 45 },
        { id: 5, name: 'Penang Discount Food', new: 35 },
        { id: 6, name: 'Healthy Food Group', new: 20 }
      ],
      options: {
        responsive: [
          { end: 500, size: 4 }
        ],
        list: {
          // Because: #app {padding: 80px 24px;}
          padding: 8
        }
      }
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollXClass'
    })
  },
  methods: {
    ...mapActions({
    }),
    avatar (id) {
      return require(`../../assets/avatar/avatar${id}.jpg`)
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.scroll-x) {
  overflow-x: auto !important;
  overflow-y: hidden;
}

.line-height-0 {
  line-height: 1;
}

:deep(.v-badge__badge) {
  border-radius: 50px;
  padding-top: 6px !important;
  padding-bottom: 0px !important;
}
</style>
