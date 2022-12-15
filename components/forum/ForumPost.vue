<template lang="pug">
.course-list.px-4
  v-row.align-center.py-2
    eva-icon.pt-2.px-2(name="options-2-outline" :fill="this.$vuetify.theme.themes.light.brown")
    p.subtitle-1.font-weight-medium.pt-4.brown--text(v-if="title === 'Post'") Latest Post
    p.subtitle-1.font-weight-medium.pt-4.brown--text(v-else) Popular Post
    eva-icon.pt-2.px-2(name="arrow-ios-downward-outline" :fill="this.$vuetify.theme.themes.light.brown")
  v-item-group.pt-4.pb-8
    template(v-for='item in posts')
      v-row.d-flex.flex-column.px-4.pb-4.justify-center.mb-4
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
                p.mb-0.font-weight-regular.subtitle-2.secondary--text.text-justify {{ $strLimit(item.content, 300) }}
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
          title: '15 way to save money on food',
          content: 'When you start shopping for your own food at uni, one of the biggest shocks is just how expensive it can be – especially cheese, right? According to our yearly National Student Money Survey, students spend on average £116 a month on groceries alone – that\'s more cash than they spend on anything else apart from rent! When it comes to food shopping, students tend to fall into the same pitfalls over and over again. How many times have you bought a one-off meal from the Tesco Express around the corner instead of stocking up at a big-budget supermarket?',
          user: 'Emma',
          time: '5 mins',
          group: 'Food Protector'
        },
        {
          id: 2,
          title: 'Discount Food, Up to 50%',
          img: 'discount',
          user: 'Secret Recipe',
          time: '9 mins',
          group: 'Save Moeny Group'
        },
        {
          id: 3,
          title: '10 Malaysia Day food promotions & specials you can’t miss',
          content: 'One of the joys of being Malaysian next to being a melting pot of cultures or a world-renowned food haven, is the number of public holidays we have. And with Malaysia Day just around the corner, it’s the perfect time to take advantage of the holiday’s best dining promotions. In commemoration of the establishment of the Malaysian federation, we’ve curated a delicious list of our favourite franchises and restaurants that are having amazing discounts, offers and promotions right up to 16 September 2022. Happy Malaysia Day, fellow foodies!',
          user: 'Anna',
          time: '15 mins',
          group: 'I love discount'
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
