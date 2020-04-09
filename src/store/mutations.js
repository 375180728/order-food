export default{
  handleLoginDrawer(state, value) {
    state.loginDrawerValue = value
  }, 
  handleRegDrawer(state, value) {
    state.regDrawerValue = value
  },
  // handleToken (state, value) {
  //   state.token = value
  //   window.localStorage.setItem('token', value)
  // },
  handleUserInfo(state, value) {
    state.userInfo = value
  },
  handleOrderList(state, value) {
    state.orderList = value
  },
  handleFidList(state, value) {
    state.orderList = value
  },
}