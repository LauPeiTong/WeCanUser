<template lang="pug">
.shop-list.py-6.px-2
  v-item-group.pt-2.pb-8
    template(v-for='item in items')
      v-row.d-flex.flex-column.px-4.pb-4.justify-center
        v-card.rounded-lg(
            @click=""
            outlined
          )
            v-row
              v-col.pr-0(:cols="4")
                v-img.rounded-lg.ma-2(:src="require(`../../assets/home/shops/${item.src.toLowerCase()}.jpg`)" width="90" height="90")
              v-col.py-2.d-flex.flex-column.px-0(:cols="5")
                p.secondary--text.font-weight-medium.mb-0.pt-4 {{item.name}}
                p.caption.darkGrey--text.font-weight-light.mb-0 {{item.subtitle}}
                v-row.d-flex.flex-row.mb-4.pl-2
                    v-chip.mt-auto.mr-2.rounded-xl(outlined :color="$vuetify.theme.themes.light.primary") {{item.status}}
              v-col.pl-0.py-2(:cols="3")
                p.primary--text.font-weight-medium.pt-4.pr-2 {{$formatCurrency(item.amount)}}
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import WCard from '../componenets-custom/WCard.vue'

export default {
  name: 'OrderList',
  components: {
    WCard
  },
  props: {
    items: {
      type: Array || Object,
      default: null
    }
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters({
      widthX: 'screen/getWidthClass',
      shops: 'home/getShops',
      categories: 'home/getCategories'
    })
  },
  methods: {
    ...mapActions({
      changeSelectedJob: 'home/changeSelectedJob'
    }),
    getCompany (id) {
      return this.companies.find((company) => {
        return company.id === id
      })
    },
    getTag (cid) {
      for (let i = 1; i <= this.categories.length; i++) {
        if (cid.includes(i)) {
          return this.categories[i - 1].name
        }
      }
    },
    goToJobDetailsPage (item) {
      this.changeSelectedJob(item)
      this.$router.push('/jobdetails')
    }
  }
}
</script>

<style lang="scss" scoped>
.min-350-width {
  min-width: 353px !important;
}

.v-chip.v-chip--outlined.v-chip.v-chip {
  background-color: white !important;
  border-width: 2px;
  font-weight: 400;
  font-size: 13px;
  height: 20px;
  max-width: 120px;
}
</style>
