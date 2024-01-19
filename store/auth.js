
export const state = () => ({
  user: null
})

export const getters = {
  isAuthenticated (state) {
    return !!state.user
  },
  getAuthUser (state) {
    return state.user
  },
  getAuthId (state) {
    return state.user?.id ?? null
  },
  getAuthUsername (state) {
    return state.user?.username ?? null
  },
  getTokenFromLocalStorage () {
    return localStorage.token
  }
}

export const mutations = {
  updateAuthUser (state, user) {
    state.user = {
      id: user.id,
      token: user.token,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      points: user.points,
      imageUrl: user.imageUrl,
      latitude: user.latitude,
      longitude: user.longitude
    }
    // console.log('Authentication: ', state.user)
  },
  resetAuth (state) {
    state.user = null
  },
  updatePoints (state, points) {
    state.user.points = points
    console.log(state.user)
  }
}

export const actions = {
  storeTokenInLocalStorage (context, token) {
    localStorage.token = token
  },
  resetLocalStorage () {
    localStorage.removeItem('token')
  },
  addTokenToAxiosHeader ({ getters }, token) {
    this.$axios.defaults.headers.common.Authorization = `Token ${token}`
  },
  setAuthUser ({ commit }, user) {
    commit('updateAuthUser', user)
  },
  changePoints ({ commit }, points) {
    commit('updatePoints', points)
  },
  async logout ({ commit, dispatch }) {
    commit('resetAuth')
    await dispatch('resetLocalStorage')
  }
}
