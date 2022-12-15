export const state = () => ({
  selectedTime: 'Now',
  orders: [
    { id: 1, name: 'MyNews', subtitle: 'MyNews is preparing your food', src: 'mynews', amount: '1320', status: 'Processing' },
    { id: 2, name: 'Aeon', subtitle: 'Deliver now (40 mins)', src: 'aeon', amount: '2700', status: 'Out for delivery' },
    { id: 3, name: 'BananaBro', subtitle: 'Yesterday, 9.00pm', src: 'bananabro', amount: '1150', status: 'Completed' }
  ]
})

export const getters = {
  getOrders (state) {
    return state.orders
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
