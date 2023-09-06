export const state = () => ({
  selectedTime: 'Now',
  foods: [
    { id: 1, name: 'Sandwich', subtitle: '4 hours left', src: 'sandwich', status: 1, date: '29/8/2023 11:00pm', quantity: 2 },
    { id: 2, name: 'Kurmamilk', subtitle: '1 days left', src: 'kurmamilk', status: 2, date: '29/8/2023 11:00pm', quantity: 1 },
    { id: 3, name: 'Fried Chicken Rice', subtitle: '4 hours left', src: 'friedchickenrice', status: 1, date: '29/8/2023 11:00pm', quantity: 2 },
    { id: 4, name: 'Rosely Chee Cake', subtitle: '1 day left', src: 'roselycheecake', status: 2, date: '30/8/2023 11:00pm', quantity: 3 },
    { id: 5, name: 'Udon', subtitle: 'Expired', src: 'udon', status: 3, date: '28/8/2023 11:00pm', quantity: 1 }
  ]
})

export const getters = {
  getFoods (state) {
    return state.foods
  }
}

export const mutations = {
  updateCurrentPath (state, path) {
    state.currentPath = path
  }
}

export const actions = {
  changeCurrentPath ({ commit }, path) {
    commit('updateCurrentPath', path)
  }
}
