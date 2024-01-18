export const state = () => ({
  cartItems: [],
  pickupMethod: 'Delivery'
})

export const getters = {
  getCartItem (state) {
    return state.cartItems
  },
  getCartQuantity (state) {
    return state.cartItems.reduce((totalQuantity, cartItem) => {
      return totalQuantity + cartItem.quantity
    }, 0)
  },
  getCartTotalAmount (state) {
    return state.cartItems.reduce((total, cartItem) => {
      const itemPrice = cartItem.item.price
      const itemQuantity = cartItem.quantity
      return total + itemPrice * itemQuantity
    }, 0)
  },
  getOriginalTotalAmount (state) {
    return state.cartItems.reduce((total, cartItem) => {
      const itemPrice = cartItem.item.price
      const itemQuantity = cartItem.quantity
      return total + itemPrice * itemQuantity
    }, 0)
  },
  getItemQuantity: state => (id) => {
    const cartItem = state.cartItems.find(item => item.item.id === id)
    return cartItem ? cartItem.quantity : 0
  },
  getPickupMethod (state) {
    return state.pickupMethod
  }
}

export const mutations = {
  updateCartItem (state, item) {
    const existingCartItem = state.cartItems.find((c) => {
      return c.item.id === item.item.id
    })

    if (existingCartItem) {
      // Item already exists in cart, update the quantity
      existingCartItem.quantity += item.quantity
    } else {
      // Item doesn't exist in cart, add it
      state.cartItems.push(item)
    }

    console.log(state.cartItems)
  },
  updatePickupMethod (state, method) {
    state.pickupMethod = method
    console.log(state.pickupMethod)
  }
}

export const actions = {
  addCartItem ({ commit }, item) {
    commit('updateCartItem', item)
  },
  changePickupMethod ({ commit }, method) {
    commit('updatePickupMethod', method)
  }
}
