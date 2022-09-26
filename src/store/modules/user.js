import { login } from '@/api/login'
import { getInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    SET_USER_INFO(state, userInfo) {
      state.userInfo = userInfo
    },
    RMOVE_USER_INFO(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async loginAction({ commit }, loginData) {
      const data = await login(loginData)
      console.log(data)
      commit('SET_TOKEN', data)
    },
    async getUserInfo({ commit }) {
      // 接口请求
      const res = await getInfo()
      const res1 = await getUserDetailById(res.userId)
      const result = { ...res, ...res1 }
      commit('SET_USER_INFO', result)
      return JSON.parse(JSON.stringify(result))
    }

  }

}
