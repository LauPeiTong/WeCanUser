export const state = () => ({
  user: {
    name: 'Wei Daxun',
    address: 'B-0A-12, Blok B, Apt Lestari, Jln Pju 10/1B, Damansara Damai, 47830, Petaling Jaya, Selangor',
    addressTitle: 'Home'
  }
})

export const getters = {
  getUser (state) {
    return state.user
  }
}

export const mutations = {

}

export const actions = {

}
