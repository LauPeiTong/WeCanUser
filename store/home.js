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
  // shops: [
  //   { id: 1, name: 'MyNews', address: 'Seri Kembangan, Selangor', distance: 1.2, rate: 4.8, src: 'mynews', tags: ['Halal'], duration: 20, deliveryFee: 400 },
  //   { id: 2, name: 'Sushi King', address: 'Shah Alam, Selangor', distance: 1.3, rate: 4.3, src: 'sushiking', tags: ['Halal'], duration: 20, deliveryFee: 400 },
  //   { id: 3, name: 'Secret Recipe', address: 'Shah Alam, Selangor', distance: 1.5, rate: 4.5, src: 'secretrecipe', tags: ['Halal', 'Free delivery'], duration: 20, deliveryFee: 500 },
  //   { id: 4, name: 'BananaBro', address: 'Shah Alam, Selangor', distance: 1.2, rate: 4.1, src: 'bananabro', tags: ['Halal'], duration: 20, deliveryFee: 400 },
  //   { id: 5, name: '99 Speedmart', address: 'Shah Alam, Selangor', distance: 1.2, rate: 4.8, src: '99speedmart', tags: [], duration: 20, deliveryFee: 400 },
  //   { id: 6, name: 'Aeon', address: 'Petaling Jaya, Selangor', distance: 2.8, rate: 4.8, src: 'aeon', tags: ['Free delivery'], duration: 30, deliveryFee: 600 },
  //   { id: 7, name: 'Family Mart', address: 'Petaling Jaya, Selangor', distance: 2.8, rate: 4.8, src: 'familymart', tags: [], duration: 30, deliveryFee: 600 }
  // ],
  // foods: [
  //   { id: 1, name: 'Rose Lychee Cake', shop: 3, discount: 0.5, originalPrice: 899, quantity: '1 pcs', expiredDate: 'Today, 11:00pm', src: 'roselycheecake' },
  //   { id: 2, name: 'Fried Chicken Rice', shop: 7, discount: 0.75, originalPrice: 1799, quantity: '1 pcs', expiredDate: 'Today, 11:00pm', src: 'friedchickenrice' },
  //   { id: 3, name: 'Sandwich', shop: 1, discount: 0.75, originalPrice: 480, quantity: '2 pcs', expiredDate: 'Today, 11:00pm', src: 'sandwich' },
  //   { id: 4, name: 'Udon', shop: 7, discount: 0.75, originalPrice: 800, quantity: '1 bowl', expiredDate: 'Today, 11:00pm', src: 'udon' },
  //   { id: 5, name: 'Kurma Milk', shop: 6, discount: 0.5, originalPrice: 350, quantity: '500 g', expiredDate: '18/12/2022', src: 'kurmamilk' }
  // ]
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
