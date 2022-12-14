export const state = () => ({
  currentPath: 'home'
})

export const getters = {
  getCurrentPath (state) {
    return state.currentPath
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
