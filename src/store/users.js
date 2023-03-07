const state = {
  token: null,
  softDeletedUsers: []
}

const getters = {
  getAuthToken (state) {
    return state.token
  },
  getSoftDeletedUsers (state) {
    return state.softDeletedUsers
  }
}

const mutations = {
  setAuthToken (state, token) {
    state.token = token
  },
  setSoftDeletedUsers (state, user) {
    const hasData = state.softDeletedUsers.filter(softDeletedUser => softDeletedUser?.id === user?.id)
    if (hasData.length) return
    state.softDeletedUsers.push(user)
  },
  removeSoftDeletedUsers (state, user) {
    const findIndex = state.softDeletedUsers.findIndex(softDeletedUser => softDeletedUser?.id === user?.id)
    state.softDeletedUsers.splice(findIndex, 1)
  }
}

const actions = {
  setAuthToken ({ commit }, token) {
    commit('setAuthToken', token)
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
