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
    { id: 1, name: 'All' },
    { id: 2, name: 'Halal' },
    { id: 3, name: 'Restaurant' },
    { id: 4, name: 'Grocery' },
    { id: 5, name: 'Supermarket' },
    { id: 7, name: 'Bakery' }
  ]
})

export const getters = {
  getCategories (state) {
    return state.categories
  },
  getSelectedCategory (state) {
    return state.selectedCategory
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
