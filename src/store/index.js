import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state = {
  loginDrawerValue: false,
  regDrawerValue: false,
  userInfo: null,
  token: '',
  orderList: [],
  fidList: []
}

export default new Vuex.Store({
  state,
  mutations,
  actions
  // modules: {
  // }
})
