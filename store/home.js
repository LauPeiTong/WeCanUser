import restaurants from '~/assets/data/restaurants.json'
import menu from '~/assets/data/info_menu.json'

export const state = () => ({
  selectedCategory: null,
  selectedShop: null,
  selectedFood: null,
  selectedJob: null,
  recommendations: restaurants,
  foods: menu,
  categories: [
    { id: 1, name: 'All', new_job: 54 },
    { id: 2, name: 'Halal', new_job: 22 },
    { id: 3, name: 'Restaurant', new_job: 33 },
    { id: 4, name: 'Grocery', new_job: 23 },
    { id: 5, name: 'Supermarket', new_job: 26 },
    { id: 6, name: 'Hotel', new_job: 16 },
    { id: 7, name: 'Bakery', new_job: 71 }
  ]
})

export const getters = {
  getCategories (state) {
    return state.categories
  },
  getNearByRestaurants (state) {
    const r = state.recommendations.find((r) => {
      return r.headline === 'Delivery fees below RM1.99'
    })

    return r.vendors
  },
  getRecommendedShops (state) {
    const r = state.recommendations.find((r) => {
      // return r.headline === 'Popular Shops - 1'
      return r.headline === 'panda pick | only on foodpanda'
    })

    return r.vendors
  },
  getNearShops (state) {
    return state.shops
  },
  getRecommendedFoods (state) {
    const f = state.foods[34]
    // const f = state.foods[20]
    return f.menus[0].menu_categories[0].products
  },
  getSelectedShop (state) {
    return state.selectedShop
  },
  getSelectedfood (state) {
    return state.selectedFood
  },
  getShops (state) {
    return state.shops
  },
  getFoods (state) {
    const f = state.foods.find((f) => {
      return f.id === state.selectedShop.id
    })
    return f.menus[0].menu_categories
  }
}

export const mutations = {
  updateSelectedCategory (state, category) {
    state.selectedCategory = category
  },
  updateSelectedShop (state, shop) {
    state.selectedShop = shop
  },
  updateSelectedFood (state, food) {
    state.selectedFood = food
  }
}

export const actions = {
  changeSelectedCategory ({ commit, state }, category) {
    commit('updateSelectedCategory', category)
  },
  changeSelectedShop ({ commit, state }, shop) {
    commit('updateSelectedShop', shop)
  },
  changeSelectedFood ({ commit, state }, food) {
    commit('updateSelectedFood', food)
  }
}
