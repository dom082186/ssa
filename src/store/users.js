const state = {
  token: null,
  users: [],
  softDeletedUsers: []
}

const getters = {
  getAuthToken (state) {
    return state.token
  },
  getUsers (state) {
    return state.users
  },
  getSoftDeletedUsers (state) {
    return state.softDeletedUsers
  }
}

const mutations = {
  setAuthToken (state, token) {
    state.token = token
  },
  addUser (state, user) {
    state.users.push(user)
  },
  updateUser (state, user) {
    const userIndex = state.users.findIndex(x => x?.id === user.id)
    state.users[userIndex] = user
  },
  deleteUser (state, user) {
    const userIndex = state.users.findIndex(x => x?.id === user.id)
    state.users.splice(userIndex, 1)
  },
  setSoftDeletedUsers (state, user) {
    const hasData = state.softDeletedUsers.filter(
      softDeletedUser => softDeletedUser?.id === user?.id
    )
    if (hasData.length) return
    state.softDeletedUsers.push(user)
  },
  removeSoftDeletedUsers (state, user) {
    const findIndex = state.softDeletedUsers.findIndex(
      softDeletedUser => softDeletedUser?.id === user?.id
    )
    state.softDeletedUsers.splice(findIndex, 1)
  }
}

const actions = {
  setAuthToken ({ commit }, token) {
    commit('setAuthToken', token)
  },
  addUser ({ commit }, user) {
    commit('addUser', user)
  },
  updateUser ({ commit }, user) {
    commit('updateUser', user)
  },
  deleteUser ({ commit }, user) {
    commit('deleteUser', user)
  },
  setSoftDeletedUsers ({ commit }, user) {
    commit('setSoftDeletedUsers', user)
  },
  removeSoftDeletedUsers ({ commit }, user) {
    commit('removeSoftDeletedUsers', user)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
