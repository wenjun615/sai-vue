import Vue from 'vue'
import Vuex from 'vuex'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { login, getInfo, logout } from '@/api/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getToken(),
    name: '',
    icon: '',
    roles: []
  },
  mutations: {
    SET_TOKEN (state, token) {
      state.token = token
    },
    SET_NAME (state, name) {
      state.name = name
    },
    SET_ICON (state, icon) {
      state.icon = icon
    },
    SET_ROLES (state, roles) {
      state.roles = roles
    }
  },
  actions: {
    login ({ commit }, userInfo) {
      const { username, password } = userInfo
      return new Promise((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then(response => {
            const { token } = response.data
            commit('SET_TOKEN', token)
            setToken(token)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    getInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then(response => {
            const { name, icon, roles } = response.data
            commit('SET_NAME', name)
            commit('SET_ICON', icon)
            commit('SET_ROLES', roles)
            resolve(response.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    logout ({ commit }) {
      return new Promise((resolve, reject) => {
        logout()
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_NAME', '')
            commit('SET_ICON', '')
            commit('SET_ROLES', [])
            removeToken()
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // 重置 Token
    resetToken ({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_ICON', '')
        commit('SET_ROLES', [])
        removeToken()
        resolve()
      })
    }
  },
  modules: {}
})
