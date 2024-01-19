<template lang="pug">
.activity-list.pt-2.pb-12
  v-tabs.scroll-x(
    v-model="tab"
    background-color="white"
    :color="$vuetify.theme.themes.light.primary"
    :style="scrollSize"
    grow
  )
    v-tab(v-for="item in tabs" :key="'tab-' + item.id" :href="'#tab-' + item.id") {{item.name}}
      v-badge.mb-2.ml-2(v-if="item.id === 1" color="red" content="2")

  v-tabs-items.px-4.pt-4(v-model="tab")
    v-tab-item(v-for="i in tabs"
      :key="i.id"
      :value="'tab-' + i.id"
    )
      .feeds(v-if="i.id == 1")
        v-row
          v-col(cols="6")
            v-card.rounded-lg.pa-2.text-center(outlined)
              v-icon.mb-1(large :color="$vuetify.theme.themes.light.green") mdi-molecule-co2
              span.text-h5.success--text.font-weight-bold +27500kg
              p.caption.mb-0.font-weight-regular CO₂ emission prevented
          v-col(cols="6")
            v-card.rounded-lg.pa-2.text-center(outlined)
              v-icon.mb-1(large :color="$vuetify.theme.themes.light.primary") mdi-food-variant
              span.text-h5.tertiary--text.font-weight-bold +1100kg
              p.caption.mb-0.font-weight-regular meals rescued
          v-col(cols="12")
            p.mb-0.text-h6.font-weight-medium Latest News
            v-card.rounded-lg.pa-2.mb-3(outlined)
              .d-flex.justify-center
                v-img.rounded-lg(:src="require(`../../assets/donation/donation1.jpg`)"  height="200" width="300")
              p.pt-1.mb-1.font-weight-medium Bursa Malaysia Rewang Ramadan
              p.mb-0.caption.text-justify We had the pleasure of joining forces with Bursa Malaysia for the Rewang Ramadan and distributing 1200 bowls of tasty bubur lambuk to those in need. Distributed to five different locations across the city, including Perumahan Awam Sri Sarawak, Asrama…
            v-card.rounded-lg.pa-2(outlined)
              .d-flex.justify-center
                v-img.rounded-lg(:src="require(`../../assets/donation/donation2.jpg`)"  height="200" width="300")
              p.pt-1.mb-1.font-weight-medium PPB Group Berhad Food Relief 1st Session
              p.mb-0.caption.text-justify PPB Group Berhad has just completed a successful 1st session of food relief effort on March 19th, 2023! With the help of 20 dedicated volunteers, we cooked and packed 500 meals for lunch and 200 food bags for those in…

      .donate(v-if="i.id == 2")
        v-row
          v-col(cols="6")
            v-card.rounded-lg.pa-2.text-center(outlined)
              v-icon.mb-1.mr-1(large :color="$vuetify.theme.themes.light.primary") mdi-alpha-w-circle
              span.text-h5.tertiary--text.font-weight-bold {{user.points}}
              p.mb-0.font-weight-regular Your WePoints
          v-col(cols="6")
            v-card.rounded-lg.pa-2.text-center(outlined)
              v-icon.mb-1.mr-1(large :color="$vuetify.theme.themes.light.green") mdi-trophy
              span.text-h5.success--text.font-weight-bold {{getLevel}}
              p.mb-0.font-weight-regular Your level
          v-col(cols="12")
            p.mb-0.text-h6.font-weight-medium Donate your WePoints
            template(v-for="d in donations")
              v-card.rounded-lg.pa-2.mb-3(outlined @click="selectDonation(d)" :disabled="user.points < d.points")
                .d-flex.justify-center
                  v-img.rounded-lg(:src="require(`../../assets/donation/donation${d.id}.jpg`)"  height="200" width="300")
                p.pt-1.font-weight-medium.mb-0 {{d.name}}
                p.mb-1.caption.text-justify {{d.organization_name}}
                .d-flex.align-center
                  h2.primary--text {{d.points}}
                  p.mb-0.ml-2 WePoints

    v-dialog(
      v-model="dialog"
      max-width="290"
    )
      v-card.rounded-xl
        v-img(height="250" :src="require(`../../assets/donation/donation${selectedDonation?.id}.jpg`)" v-if="selectedDonation")
        v-card-title.text-h5 Donate {{selectedDonation?.points}} points?
        v-card-text Donate {{$formatCurrency(selectedDonation?.amount)}} to {{selectedDonation?.organization_name}}
        v-card-text
          a.text-decoration-underline View Details
        v-card-actions
          v-spacer
          v-btn(
            color="gray darken-1"
            text
            @click="dialog = false"
          ) Cancel
          v-btn.rounded-xl(
            color="primary"
            elevation="0"
            @click="makeDonation"
          ) Donate
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import VueHorizontalList from 'vue-horizontal-list'
import WIcon from '../componenets-custom/WIcon.vue'

export default {
  name: 'FoodList',
  components: {
    VueHorizontalList,
    WIcon
  },
  props: {
  },
  data () {
    return {
      tab: null,
      tabs: [
        { id: 1, name: 'Feeds', status: 1 },
        { id: 2, name: 'Donate', status: 2 }
      ],
      donations: [
        { id: 3, name: 'RM10 to fight hunger', points: 1000, organization_name: 'The Lost Food Project', amount: 10 },
        { id: 4, name: 'RM20 to fight hunger', points: 2000, organization_name: 'The Lost Food Project', amount: 20 },
        { id: 5, name: 'RM10 to fight hunger', points: 1000, organization_name: 'Yayasan Food Bank Malaysia', amount: 10 },
        { id: 6, name: 'RM20 to fight hunger', points: 2000, organization_name: 'Yayasan Food Bank Malaysia', amount: 20 }
      ],
      selectedDonation: null,
      items: null,
      dialog: false
    }
  },
  computed: {
    ...mapGetters({
      scrollSize: 'screen/getScrollXClass',
      user: 'auth/getAuthUser'
    }),
    getLevel () {
      if (this.user.points < 100) {
        return 'Bronze'
      } else if (this.user.points < 500) {
        return 'Silver'
      } else if (this.user.points < 1000) {
        return 'Gold'
      } else if (this.user.points < 5000) {
        return 'Platinum'
      }
      return 'Hero'
    }
  },
  methods: {
    ...mapActions({
    }),
    selectDonation (item) {
      this.selectedDonation = item
      console.log(this.selectedDonation)
      this.dialog = true
    },
    async makeDonation () {
      try {
        const donation = {
          customer: this.user.id,
          organization_name: this.selectedDonation.organization_name,
          amount: this.selectedDonation.amount,
          points: this.selectedDonation.points,
          type: 'Points'
        }

        const response = await this.$axios.post('/api/donations/', donation)
        console.log('Donaiton is done: ', response)

        const user = await this.$axios.get(`/api/users/user/${this.user.id}`)

        this.$store.dispatch('auth/changePoints', user.data.points)

        this.dialog = false
      } catch (e) {
        console.log('Fail to donate: ', e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
:deep(.scroll-x) {
  overflow-x: auto !important;
  overflow-y: hidden;
}

:deep(.v-slide-group__prev) {
  min-width: 0px !important;
  flex: 0px;
}

.v-tabs {
  filter: drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.025));
}

.v-tab {
  text-transform: none !important;
}
</style>
