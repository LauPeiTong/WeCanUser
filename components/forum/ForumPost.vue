<template lang="pug">
.course-list.px-4
  v-row.align-center.py-2
    eva-icon.pt-2.px-2(name="options-2-outline" :fill="this.$vuetify.theme.themes.light.brown")
    p.subtitle-1.font-weight-medium.pt-4.brown--text(v-if="title === 'Post'") Latest Post
    p.subtitle-1.font-weight-medium.pt-4.brown--text(v-else) Popular Post
    eva-icon.pt-2.px-2(name="arrow-ios-downward-outline" :fill="this.$vuetify.theme.themes.light.brown")
  v-item-group.pt-4.pb-8
    template(v-for='item in posts')
      v-row.d-flex.flex-column.px-4.pb-4.justify-center
        v-card.rounded-xl.d-flex.flex-column.justify-start(
          @click=""
          :min-height="300"
          outlined
        )
          .px-4.pt-4.mb-auto
            v-row
              v-col.pt-4(:cols="2")
                v-avatar(size="36")
                  img(:src="avatar(item.id)")
              v-col.pl-0(:cols="8")
                p.mb-negative.font-weight-regular.subtitle-1.secondary--text {{ item.group }}
                p.mb-0.font-weight-regular.subtitle-2.secondary--text {{ item.user }} . {{ item.time }}
              v-col.pr-0.pt-4.text-right(:cols="2")
                eva-icon(name="more-vertical-outline" :fill="$vuetify.theme.themes.light.brown"  width='24' height='24')
            p.mb-0.pt-2.caption.font-weight-medium.text-h6.secondary--text {{ item.title }}
            v-row
              v-col
                p.mb-0.font-weight-regular.subtitle-2.secondary--text.text-justify {{ item.content }}
                v-img(v-if="item.img" :src="img(item.img)" :style="getImgWidth")
          v-card-actions.px-4.pt-4
            v-row
              v-col.d-flex.flex-row
                eva-icon(name="arrow-up" :fill="$vuetify.theme.themes.light.primary"  width='24' height='24')
                p.mr-auto.primary--text 414
                eva-icon(name="arrow-down" :fill="$vuetify.theme.themes.light.brown"  width='24' height='24')
              v-col.d-flex.flex-row
                eva-icon.pr-2(name="message-circle-outline" :fill="$vuetify.theme.themes.light.brown"  width='24' height='24')
                p Comment
              v-col.d-flex.flex-row
                eva-icon.pr-2(name="navigation-2-outline" :fill="$vuetify.theme.themes.light.brown"  width='24' height='24')
                p Share

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WCard from '../componenets-custom/WCard.vue'

export default {
  name: 'ForumPost',
  components: {
    WCard
  },
  props: {
    title: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      posts: [
        {
          id: 1,
          title: 'Best way to find job?',
          content: 'Grew up in a relatively poor environment in Chicago and my parents never really instilled sound financial values in me/prepared me for the expectations of fiscal life outside of “you need a degree for a good job and a good job for good money”.',
          user: 'Emma',
          time: '5 mins',
          group: 'Women Career'
        },
        {
          id: 2,
          title: 'Webinar: Schemes and Self Employment Opportunities for Women Entrepeneur',
          img: 'webinar',
          user: 'Miss Khoo',
          time: '9 mins',
          group: 'Woreerrrr'
        },
        {
          id: 3,
          title: 'Why is it difficult to find a suitable job?',
          content: 'There is really not a right or wrong answer to this question. I have been looking for a job for over a year. I think the interviews went well and then I get a robot email telling me thanks, but no thanks. There is really not a right or wrong answer to this question. ',
          user: 'Anna',
          time: '15 mins',
          group: 'Powerful Mothers'
        }

      ]
    }
  },
  computed: {
    ...mapGetters({
      widthX: 'screen/getWidthClass'
    }),
    getImgWidth () {
      return { width: `${window.innerWidth - 80}px` }
    }
  },
  methods: {
    ...mapActions({
    }),
    avatar (id) {
      return require(`../../assets/avatar/avatar${id}.jpg`)
    },
    img (name) {
      return require(`../../assets/img/${name}.jpg`)
    }
  }
}
</script>

<style lang="scss" scoped>
.min-350-width {
  min-width: 353px !important;
}

.mb-negative {
  margin-bottom: -7px;
}

</style>
