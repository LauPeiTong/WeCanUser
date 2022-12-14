export const state = () => ({
  selectedCategory: null,
  selectedShop: null,
  selectedJob: null,
  categories: [
    { id: 1, name: 'All', new_job: 54 },
    { id: 2, name: 'Halal', new_job: 22 },
    { id: 3, name: 'Restaurant', new_job: 33 },
    { id: 4, name: 'Grocery', new_job: 23 },
    { id: 5, name: 'Supermarket', new_job: 26 },
    { id: 6, name: 'Hotel', new_job: 16 },
    { id: 7, name: 'Bakery', new_job: 71 }
  ],
  shops: [
    { id: 1, name: 'MyNews', address: 'Seri Kembangan, Selangor', distance: 1.2, rate: 4.8, src: 'mynews' },
    { id: 2, name: 'Sushi King', address: 'Shah Alam, Selangor', distance: 1.3, rate: 4.3, src: 'sushiking' },
    { id: 3, name: 'Secret Recipe', address: 'Shah Alam, Selangor', distance: 1.5, rate: 4.5, src: 'secretrecipe' },
    { id: 4, name: 'BananaBro', address: 'Shah Alam, Selangor', distance: 1.2, rate: 4.1, src: 'bananabro' },
    { id: 5, name: '99 Speedmart', address: 'Shah Alam, Selangor', distance: 1.2, rate: 4.8, src: '99speedmart' },
    { id: 6, name: 'Aeon', address: 'Petaling Jaya, Selangor', distance: 2.8, rate: 4.8, src: 'aeon' },
    { id: 7, name: 'Family Mart', address: 'Petaling Jaya, Selangor', distance: 2.8, rate: 4.8, src: 'familymart' }
  ],
  foods: [
    { id: 1, name: 'Rose Lychee Cake', shop: 3, discount: 0.5, originalPrice: 899, quantity: '1 pcs', expiredDate: 'Today, 11:00pm', src: 'roselycheecake' },
    { id: 2, name: 'Fried Chicken Rice', shop: 7, discount: 0.75, originalPrice: 1799, quantity: '1 pcs', expiredDate: 'Today, 11:00pm', src: 'friedchickenrice' },
    { id: 3, name: 'Sandwich', shop: 1, discount: 0.75, originalPrice: 480, quantity: '2 pcs', expiredDate: 'Today, 11:00pm', src: 'sandwich' },
    { id: 4, name: 'Udon', shop: 7, discount: 0.75, originalPrice: 800, quantity: '1 bowl', expiredDate: 'Today, 11:00pm', src: 'udon' },
    { id: 5, name: 'Kurma Milk', shop: 6, discount: 0.5, originalPrice: 350, quantity: '500 g', expiredDate: '18/12/2022', src: 'kurmamilk' }
  ],
  jobs: [
    { id: 1, name: 'Frontend Developer Intern', cid: [2, 3, 6], salary: 'MYR 750 - 1000', company: 1 },
    { id: 2, name: 'Accountant', cid: [1, 2, 5, 7], salary: 'MYR 3000 - 3500', company: 2 },
    { id: 4, name: 'Game Developer', cid: [5, 6], salary: 'MYR 5000-6000', company: 4 },
    { id: 5, name: 'Backend Developer Intern', cid: [2, 3, 6], salary: 'MYR 750 - 1000', company: 1 },
    { id: 6, name: 'Frontend Developer', cid: [1, 2, 5], salary: 'MYR 750 - 1000', company: 2 },
    { id: 7, name: 'Frontend Developer Freelancar', cid: [2, 4, 6], salary: 'MYR 750 - 1000', company: 3 },
    { id: 8, name: 'Frontend Developer Intern', cid: [2, 3, 6], salary: 'MYR 750 - 1000', company: 4 },
    { id: 9, name: 'Frontend Developer', cid: [2, 5, 6], salary: 'MYR 4000 - 5000', company: 1 },
    { id: 10, name: 'Backend Developer', cid: [2, 5, 6], salary: 'MYR 4000 - 5000', company: 1 },
    { id: 11, name: 'Senior Frontend Developer', cid: [2, 5, 6], salary: 'MYR 6000 - 7000', company: 1 },
    { id: 12, name: 'Senior Backend Developer', cid: [2, 5, 6], salary: 'MYR 5000 - 7000', company: 1 },
    { id: 13, name: 'Full-stack Developer', cid: [2, 5, 6], salary: 'MYR 4000 - 5000', company: 1 },
    { id: 14, name: 'UI/UX Developer', cid: [2, 5, 6], salary: 'MYR 4000 - 5000', company: 1 },
    { id: 15, name: 'Project Manager', cid: [2, 5, 6], salary: 'MYR 7000 - 10000', company: 1 },
    { id: 16, name: 'Junior Frontend Developer', cid: [2, 5, 6], salary: 'MYR 4000 - 5000', company: 1 },
    { id: 17, name: 'Web Developer Intern', cid: [2, 3, 6], salary: 'MYR 6000', company: 4 },
    { id: 18, name: 'Game Developer Freelancer', cid: [1, 4, 5, 6], salary: 'MYR 5000', company: 2 },
    { id: 19, name: 'Accountant', cid: [1, 2, 5, 7], salary: 'MYR 4000 - 5000', company: 2 },
    { id: 20, name: 'Mobile App Developer', cid: [1, 2, 5, 6], salary: 'MYR 7500 - 8000', company: 2 },
    { id: 22, name: 'Accountant', cid: [1, 2, 5, 7], salary: 'MYR 7500 - 8000', company: 2 },
    { id: 23, name: 'Frontend Developer', cid: [1, 2, 5], salary: 'MYR 750 - 1000', company: 2 }
  ],
  companies: [
    { id: 1, name: 'Yezza Sdn Bhd', location: 'Putrajaya, Selangor', img: 'yezza', verified: true },
    { id: 2, name: 'FinCare Sdn Bhd', location: 'Cheras, Kuala Lumpur', img: 'fincare', verified: false },
    { id: 3, name: 'EvoSports Sdn Bhd', location: 'Putrajaya, Selangor', img: 'evosports', verified: true },
    { id: 4, name: 'FreshBox Sdn Bhd', location: 'Kuala Lumpur', img: 'freshbox', verified: true }
  ]
})

export const getters = {
  getCategories (state) {
    return state.categories
  },
  getNearShops (state) {
    return state.shops
  },
  getRecommendedFoods (state) {
    return state.foods
  },
  getSelectedShop (state) {
    return state.selectedShop
  },
  getShops (state) {
    return state.shops
  },
  // job
  getRecommededJob (state) {
    const j = state.jobs.filter((job) => {
      return job.id % 3 === 0
    })
    return j
  },
  getCompanies (state) {
    return state.companies
  },
  getSelectedCategory (state) {
    return state.selectedCategory
  },
  getJobs (state) {
    return state.jobs.filter((job) => {
      return job.cid.includes(state.selectedCategory.id)
    })
  },
  getSelectedJob (state) {
    return state.selectedJob
  },
  getCompany (state) {
    return state.companies.find((company) => {
      return company.id === state.selectedJob.company
    })
  }
}

export const mutations = {
  updateSelectedCategory (state, category) {
    state.selectedCategory = category
  },
  updateSelectedJob (state, job) {
    state.selectedJob = job
  },
  updateSelectedShop (state, shop) {
    state.selectedShop = shop
  }
}

export const actions = {
  changeSelectedCategory ({ commit, state }, category) {
    commit('updateSelectedCategory', category)
  },
  changeSelectedJob ({ commit, state }, job) {
    commit('updateSelectedJob', job)
  },
  changeSelectedShop ({ commit, state }, shop) {
    commit('updateSelectedShop', shop)
  }
}
