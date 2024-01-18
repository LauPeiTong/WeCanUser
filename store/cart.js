export const state = () => ({
  selectedShop: null,
  cartList: [],
  pickupMethod: 'Delivery'
})

export const getters = {
  getSelectedShop (state) {
    return state.selectedShop
  },
  getCart (state) {
    return state.cartList.find((c) => {
      return c.vendor === state.selectedShop.id
    })
  },
  getCartItem (state) {
    return state.cartList.find((c) => {
      return c.vendor === state.selectedShop.id
    }).cartItems
  },
  getCartQuantity (state) {
    const c = state.cartList.find((c) => {
      return c.vendor === state.selectedShop.id
    })

    if (c) {
      return c.cartItems.reduce((totalQuantity, cartItem) => {
        return totalQuantity + cartItem.quantity
      }, 0)
    }
    return 0
  },
  getCartTotalAmount (state) {
    const c = state.cartList.find((c) => {
      return c.vendor === state.selectedShop.id
    })

    if (c) {
      return c.cartItems.reduce((total, cartItem) => {
        const itemPrice = cartItem.item.price
        const itemQuantity = cartItem.quantity
        return total + itemPrice * itemQuantity
      }, 0)
    }
    return 0
  },
  getOriginalTotalAmount (state) {
    const c = state.cartList.find((c) => {
      return c.vendor === state.selectedShop.id
    })

    if (c) {
      return c.cartItems.reduce((total, cartItem) => {
        const itemPrice = cartItem.item.original_price
        const itemQuantity = cartItem.quantity
        return total + itemPrice * itemQuantity
      }, 0)
    }
    return 0
  },
  getItemQuantity: state => (id) => {
    const c = state.cartList.find((c) => {
      return c.vendor === state.selectedShop.id
    })
    if (c) {
      const cartItem = c.cartItems.find(item => item.item.id === id)
      return cartItem ? cartItem.quantity : 0
    }
    return 0
  },
  getPickupMethod (state) {
    const cartItems = state.cartList.find((c) => {
      return c.vendor === state.selectedShop.id
    })

    return cartItems.pickupMethod
  }
}

export const mutations = {
  updateCartItem (state, item) {
    const existingCart = state.cartList.find((c) => {
      return c.vendor === state.selectedShop.id
    })

    if (existingCart) {
      const existingCartItem = existingCart.cartItems.find((c) => {
        return c.item.id === item.item.id
      })

      if (existingCartItem) {
        // Item already exists in cart, update the quantity
        existingCartItem.quantity = item.quantity
        console.log('Cart is updated: ', existingCartItem)
      } else {
        // Item doesn't exist in cart, add it
        existingCart.cartItems.push(item)
        console.log('New cart item is added: ', existingCart)
      }
    } else {
      // Add new cart list
      const cart = {
        vendor: state.selectedShop.id,
        cartItems: [item],
        pickupMethod: 'Delivery'
      }
      state.cartList.push(cart)
      console.log('New cart is added: ', cart)
    }
  },
  updatePickupMethod (state, method) {
    const c = state.cartList.find((c) => {
      return c.vendor === state.selectedShop.id
    })
    if (c) {
      c.pickupMethod = method
      console.log('Selected method: ' + c.pickupMethod)
    }
  },
  updateSelectedShop (state, shop) {
    state.selectedShop = shop
  }
}

export const actions = {
  addCartItem ({ commit }, item) {
    commit('updateCartItem', item)
  },
  changePickupMethod ({ commit }, method) {
    commit('updatePickupMethod', method)
  },
  changeSelectedShop ({ commit, state }, shop) {
    commit('updateSelectedShop', shop)
  }
}
