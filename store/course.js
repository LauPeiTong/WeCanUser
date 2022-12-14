export const state = () => ({
  selectedCourse: null,
  courses: [
    { id: 1, name: 'Interview Training 101', company: 1, premium: false, taken: true, completed: false, total_level: 5, completed_level: 1 },
    { id: 2, name: 'Leadership Training', company: 2, premium: true, taken: true, completed: false, total_level: 5, completed_level: 2 },
    { id: 3, name: 'Interview Training 202', company: 1, premium: false, taken: false, completed: false, total_level: 7 },
    { id: 4, name: 'English Communication 101', company: 2, premium: false, taken: true, completed: true, total_level: 5, completed_level: 5 },
    { id: 5, name: 'English Communication 202', company: 2, premium: false, taken: false, completed: false, total_level: 5 },
    { id: 6, name: 'Softskill Training 101', company: 1, premium: false, taken: true, completed: true, total_level: 5, completed_level: 5 },
    { id: 7, name: 'Web Development Bootcamp', company: 1, premium: true, taken: true, completed: false, total_level: 5, completed_level: 4 },
    { id: 8, name: 'AWS Certified Training', company: 3, premium: true, taken: false, completed: false, total_level: 10 },
    { id: 9, name: 'Stree Management Course', company: 3, premium: true, taken: false, completed: false, total_level: 10 },
    { id: 10, name: 'Microsoft Azure Certified Training', company: 4, premium: false, taken: true, completed: false, total_level: 10, completed_level: 5 },
    { id: 11, name: 'Emotional Intelligence at Work', company: 4, premium: true, taken: true, completed: false, total_level: 5, completed_level: 3 },
    { id: 12, name: 'Be a Greate Mentor: A Guide for mentorship', company: 4, premium: false, taken: false, completed: false, total_level: 10 }
  ]
})

export const getters = {
  getSelectedCourse (state) {
    return state.selectedCourse
  },
  getCourses (state) {
    return state.courses
  },
  getRecommendedCourses (state) {
    const c = state.courses.filter((course) => {
      return course.taken === false
    })
    return c
  },
  getCurrentCourses (state) {
    const c = state.courses.filter((course) => {
      return course.taken === true
    })
    return c
  },
  getRecentCourse (state) {
    return state.courses[0]
  },
  isEnrolled (state) {
    return state.selectedCourse.taken
  }
}

export const mutations = {
  updateSelectedCourse (state, course) {
    state.selectedCourse = course
  }
}

export const actions = {
  changeSelectedCourse ({ commit, state }, courses) {
    commit('updateSelectedCourse', courses)
  }
}
