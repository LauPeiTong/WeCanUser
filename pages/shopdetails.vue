<template lang="pug">
.fill-height.shop-details-page.pa-0.ma-0.full-width(v-if="!!shop")
  shop-top.ma-0.on-top(@goBack="goBackToPreviousPage" :id="shop.id")
  .scroll.ma-0.justify-top.align-center.full-width(:style="scrollSize")
    v-img.absolute-position(height="220" :src="shopBackground")
    v-row.pt-16
      v-col.pt-16.px-8.img-on-top.negative-margin.text-center(:cols="12")
        v-avatar(size="130" )
          v-img(:src="shopLogo" contain)

      v-col.px-8.second-on-top.white(:cols="12")
        .shop
          v-row.mt-10
            v-col.pb-0
              p.font-weight-medium.text-h5.secondary--text {{ shop.name }}
            v-col.pb-0.text-right
              v-chip.subtitle-1(label :color="$vuetify.theme.themes.light.primary" text-color="white") Following
          p.mb-0.font-weight-regular.caption.darkGrey--text {{ shop.address }}
          p.font-weight-regular.caption.darkGrey--text {{ shop.distance }} km
            |
            a.text-decoration-underline.font-weight-regular.caption.pl-2 View details
        v-divider.mt-4

        .choose
          v-list.pa-0
            v-list-item-group(:color="$vuetify.theme.themes.light.primary")
              .delivery
              v-list-item.px-0(value=1 @click="showTimeDialogue")
                v-list-item-icon.mr-4.my-4
                  eva-icon(name="cube" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
                v-list-item-content
                  v-list-item-title.secondary--text Delivery now
                  v-list-item-subtitle {{shop.duration}} mins .
                    |
                    img.mx-1(width="13" height="12" :src="require(`../assets/home/motorcycle.jpg`)")
                    |   {{$formatCurrency(shop.deliveryFee)}}
                v-list-item-action
                  eva-icon(name="arrow-ios-forward" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
              v-divider
              .ratings
              v-list-item.px-0(value=-1  @click="showRatingsDialogue")
                v-list-item-icon.mr-4.my-4
                  eva-icon(name="star" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
                v-list-item-content
                  v-list-item-title.secondary--text Ratings
                  v-list-item-subtitle
                    |
                    img(width="13" height="12" :src="require(`../assets/home/star.jpg`)")
                    |   {{shop.rating}} (212 Reviews)
                v-list-item-action
                  eva-icon(name="arrow-ios-forward" :fill="$vuetify.theme.themes.light.primary" height="30" width="30")
        v-divider

        //- .company
          v-row.mt-4
            v-col.py-0(:cols="7")
              p.mb-0.font-weight-bold.text-h6.secondary--text {{ company.name }}
            v-col.py-0.text-right
              v-chip(
                v-if="company.verified"
                outlined
                :color="$vuetify.theme.themes.light.success"
              )
                span Verified
                eva-icon.pt-2.pl-1(v-if="company.verified" :fill="this.$vuetify.theme.themes.light.success" name="checkmark-outline" width="18" height="18")
          p.mb-2.mt-3.font-weight-regular.subtile-1.secondary--text {{ company.location }}
          v-row.px-3.mt-0
            p.text-decoration-underline.mb-0.font-weight-regular.subtitle-1.darkGrey--text(@click="") View company details
            eva-icon.pt-1.pl-1(:fill="this.$vuetify.theme.themes.light.darkGrey" name="arrow-forward-outline" width="20" height="20")
        //- v-divider.mt-8

        //- .job-overview
          p.mt-4.mb-0.font-weight-bold.text-h6.secondary--text Job Overview
          job-description.pt-2(:company="company")

</template>

<script>
import { mapGetters } from 'vuex'

import UpperTitle from '../components/UpperTitle.vue'
import WIcon from '../components/componenets-custom/WIcon.vue'
import JobDescription from '../components/home/JobDescription.vue'
import ShopTop from '../components/shop/ShopTop.vue'

export default {
  name: 'ShopDetailsPage',
  components: {
    UpperTitle,
    WIcon,
    JobDescription,
    ShopTop
  },
  layout: 'welcome',
  data () {
    return {
      search: null
    }
  },

  computed: {
    ...mapGetters({
      shop: 'home/getSelectedShop',
      categories: 'home/getCategories',
      scrollSize: 'screen/getScrollYClass'
    }),
    shopLogo () {
      return require(`../assets/home/shops/${this.shop.src}.jpg`)
    },
    shopBackground () {
      return require(`../assets/home/shops/${this.shop.src}.jpg`)
    }
  },
  mounted () {
    this.check()
  },
  methods: {
    showTimeDialogue () {
      console.log('time')
    },
    showRatingsDialogue () {
      console.log('rating')
    },
    check () {
      if (this.shop === null) {
        this.$router.push('/home')
      }
    },
    searchBy (newValue) {
      this.search = newValue
    },
    goBackToPreviousPage () {
      this.$router.go(-1)
    },
    getTag (cid) {
      for (let i = 1; i <= this.categories.length; i++) {
        if (i === cid[0]) {
          return this.categories[i - 1].name
        }
      }
    },
    getTag2 (cid) {
      for (let i = 1; i <= this.categories.length; i++) {
        if (i === cid[1]) {
          return this.categories[i - 1].name
        }
      }
    }
  }
}
</script>

<style scoped>
:deep(.scroll) {
  overflow-x: hidden;
  overflow-y: auto;
  width: 100% !important;
}
.v-avatar {
  filter: drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.3));
}

.on-top {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
}

.img-on-top {
  z-index: 99;
}

.second-on-top {
  border-radius: 30px 30px 0 0;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.25));
  z-index: 98;
}

.absolute-position {
  filter: blur(7px);
  background: rgba(39, 37, 37, 0.5);
  position: absolute;
  width: 100%;
}

.negative-margin {
  margin-bottom: -65px;
}

.text-decoration-underline {
  text-underline-offset: 3px;
}
</style>
